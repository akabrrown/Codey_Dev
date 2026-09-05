"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { fetchWithAuth } from "../../lib/api-client";
import { createClient } from "../../lib/supabase-browser";

export interface RequestItem {
  id: string;
  referenceNo: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  serviceName: string;
  estimatedMin: number;
  estimatedMax: number;
  finalPrice?: number | null;
  status: "submitted" | "in_review" | "quote_sent" | "approved" | "declined" | "archived" | "new" | "reviewed" | "accepted";
  isRead: boolean;
  createdAt: string;
}

// Synthesized soft chime using Web Audio API (zero external asset dependency)
function playNotificationChime() {
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    const now = ctx.currentTime;

    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gainNode = ctx.createGain();

    osc1.type = "sine";
    osc1.frequency.setValueAtTime(587.33, now); // D5
    osc1.frequency.exponentialRampToValueAtTime(880, now + 0.15); // A5

    osc2.type = "triangle";
    osc2.frequency.setValueAtTime(880, now + 0.05); // A5
    osc2.frequency.exponentialRampToValueAtTime(1174.66, now + 0.25); // D6

    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(0.15, now + 0.05);
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

    osc1.connect(gainNode);
    osc2.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc1.start(now);
    osc2.start(now + 0.05);
    osc1.stop(now + 0.45);
    osc2.stop(now + 0.45);
  } catch {
    // AudioContext blocked by user-interaction policy until interacted
  }
}

export default function RequestsTableClient({
  initialRequests = [],
  initialMeta = { total: 0, page: 1, limit: 20, totalPages: 1 },
}: {
  initialRequests?: RequestItem[];
  initialMeta?: { total: number; page: number; limit: number; totalPages: number };
}) {
  const [requests, setRequests] = useState<RequestItem[]>(initialRequests);
  const [meta, setMeta] = useState(initialMeta);
  const [loading, setLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [liveBanner, setLiveBanner] = useState<{ id: string; ref: string; name: string } | null>(null);
  const [highlightedId, setHighlightedId] = useState<string | null>(null);

  const isFirstMount = useRef(true);

  const loadRequests = useCallback(
    async (query = search, status = statusFilter, page = currentPage, silent = false) => {
      if (!silent) setLoading(true);
      else setIsRefreshing(true);
      setError(null);

      try {
        const params = new URLSearchParams();
        params.set("page", page.toString());
        params.set("limit", "20");
        if (query.trim()) params.set("search", query.trim());
        if (status !== "all") params.set("status", status);

        const res = await fetchWithAuth(`/api/v1/admin/requests?${params.toString()}`);
        if (!res.ok) {
          throw new Error(`Failed to load requests: ${res.statusText}`);
        }
        const data = await res.json();
        if (data.success) {
          setRequests(data.data || []);
          if (data.meta) setMeta(data.meta);
        }
      } catch (err) {
        if (!silent) {
          setError(err instanceof Error ? err.message : "Failed to load requests");
        }
      } finally {
        setLoading(false);
        setIsRefreshing(false);
      }
    },
    [search, statusFilter, currentPage]
  );

  // Initial and filter debounce loading
  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
      if (initialRequests.length > 0 || initialMeta.total > 0) return;
    }
    const timer = setTimeout(() => {
      loadRequests(search, statusFilter, currentPage);
    }, 300);
    return () => clearTimeout(timer);
  }, [search, statusFilter, currentPage, loadRequests, initialRequests.length, initialMeta.total]);

  // ── 1. Supabase Realtime Subscription ───────────────────────────────────────
  useEffect(() => {
    const supabase = createClient();
    const channel = supabase
      .channel("admin-requests-live-feed")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "requests",
        },
        (payload) => {
          if (payload.eventType === "INSERT") {
            const newRecord = payload.new as any;
            setLiveBanner({
              id: newRecord.id,
              ref: newRecord.reference_no,
              name: newRecord.customer_name,
            });
            setHighlightedId(newRecord.id);
            playNotificationChime();
            // Silent refresh table without flicker
            loadRequests(search, statusFilter, currentPage, true);
          } else {
            loadRequests(search, statusFilter, currentPage, true);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [search, statusFilter, currentPage, loadRequests]);

  // ── 2. Smart Polling (every 12s when page is active) & Tab Focus Sync ───────
  useEffect(() => {
    const interval = setInterval(() => {
      if (document.visibilityState === "visible") {
        loadRequests(search, statusFilter, currentPage, true);
      }
    }, 12000);

    const onVisibilityOrFocus = () => {
      if (document.visibilityState === "visible") {
        loadRequests(search, statusFilter, currentPage, true);
      }
    };

    window.addEventListener("focus", onVisibilityOrFocus);
    document.addEventListener("visibilitychange", onVisibilityOrFocus);

    return () => {
      clearInterval(interval);
      window.removeEventListener("focus", onVisibilityOrFocus);
      document.removeEventListener("visibilitychange", onVisibilityOrFocus);
    };
  }, [search, statusFilter, currentPage, loadRequests]);

  const formatGHS = (cedis: number) => {
    return new Intl.NumberFormat("en-GH", {
      style: "currency",
      currency: "GHS",
      maximumFractionDigits: 0,
    }).format(cedis || 0);
  };

  const formatDate = (isoString: string) => {
    try {
      return new Intl.DateTimeFormat("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }).format(new Date(isoString));
    } catch {
      return isoString;
    }
  };

  const counts = {
    total: meta.total || requests.length,
    submitted: requests.filter((r) => r.status === "submitted" || r.status === "new").length,
    inReview: requests.filter((r) => r.status === "in_review" || r.status === "reviewed").length,
    quoteSent: requests.filter((r) => r.status === "quote_sent").length,
  };

  return (
    <div>
      {/* Realtime Live Incoming Notification Toast */}
      {liveBanner && (
        <div
          role="alert"
          style={{
            marginBottom: "1.25rem",
            padding: "0.875rem 1.25rem",
            background: "linear-gradient(135deg, #0E2338 0%, #173656 100%)",
            color: "#FFFFFF",
            borderRadius: "var(--radius-md, 8px)",
            border: "1px solid rgba(0, 180, 216, 0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            boxShadow: "0 8px 24px rgba(14, 35, 56, 0.25)",
            animation: "fadeInDown 0.3s ease-out",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <span
              style={{
                display: "inline-block",
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                backgroundColor: "#10B981",
                boxShadow: "0 0 10px #10B981",
                animation: "pulse 1.5s infinite",
              }}
            />
            <div>
              <strong style={{ color: "var(--color-teal, #00B4D8)" }}>New Inquiry Received:</strong>{" "}
              {liveBanner.name} (Ref: {liveBanner.ref})
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <Link
              href={`/admin/requests/${liveBanner.id}`}
              className="btn btn-primary btn-sm"
              style={{ padding: "0.35rem 0.85rem", fontSize: "0.8125rem", display: "inline-flex", alignItems: "center", gap: "0.3rem" }}
            >
              <span>Review Now</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
            <button
              onClick={() => setLiveBanner(null)}
              style={{
                background: "transparent",
                border: "none",
                color: "#94A3B8",
                cursor: "pointer",
                padding: "0.25rem 0.5rem",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              title="Dismiss alert"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-title">Total Inquiries</div>
          <div className="stat-value">{counts.total}</div>
        </div>
        <div className="stat-card" style={{ borderLeft: "4px solid #1D4ED8" }}>
          <div className="stat-title">New / Submitted</div>
          <div className="stat-value" style={{ color: "#1D4ED8" }}>
            {counts.submitted}
          </div>
        </div>
        <div className="stat-card" style={{ borderLeft: "4px solid #B45309" }}>
          <div className="stat-title">In Review</div>
          <div className="stat-value" style={{ color: "#B45309" }}>
            {counts.inReview}
          </div>
        </div>
        <div className="stat-card" style={{ borderLeft: "4px solid var(--color-teal, #00B4D8)" }}>
          <div className="stat-title">Quotes Sent</div>
          <div className="stat-value" style={{ color: "var(--color-teal, #00B4D8)" }}>
            {counts.quoteSent}
          </div>
        </div>
      </div>

      {/* Main Card with filters & table */}
      <div className="card">
        <div className="card-header" style={{ flexWrap: "wrap", gap: "1rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <h2 className="card-title" style={{ margin: 0 }}>
              All Project Inquiries
            </h2>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.35rem",
                padding: "0.2rem 0.55rem",
                borderRadius: "999px",
                fontSize: "0.6875rem",
                fontWeight: 700,
                backgroundColor: "rgba(16, 185, 129, 0.12)",
                color: "#059669",
                border: "1px solid rgba(16, 185, 129, 0.25)",
              }}
            >
              <span
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  backgroundColor: "#10B981",
                }}
              />
              LIVE SYNC
            </span>
          </div>

          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", alignItems: "center" }}>
            <input
              type="search"
              placeholder="Search by client or ref..."
              aria-label="Search requests by client name or reference number"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              className="form-input"
              style={{ width: "220px", padding: "0.5rem 0.75rem" }}
            />

            <select
              aria-label="Filter requests by submission status"
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="form-select"
              style={{ width: "150px", padding: "0.5rem 0.75rem" }}
            >
              <option value="all">All Statuses</option>
              <option value="submitted">Submitted / New</option>
              <option value="in_review">In Review</option>
              <option value="quote_sent">Quote Sent</option>
              <option value="approved">Approved</option>
              <option value="declined">Declined</option>
              <option value="archived">Archived</option>
            </select>

            <button
              onClick={() => loadRequests(search, statusFilter, currentPage, false)}
              className="btn btn-outline btn-sm"
              title="Refresh requests list"
              style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem" }}
              disabled={loading || isRefreshing}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{
                  animation: loading || isRefreshing ? "spin 1s linear infinite" : "none",
                }}
                aria-hidden="true"
              >
                <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                <path d="M3 3v5h5" />
                <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
                <path d="M16 21h5v-5" />
              </svg>
              <span>Refresh</span>
            </button>
          </div>
        </div>

        {error && (
          <div style={{ padding: "1.5rem", color: "#B91C1C", backgroundColor: "#FEE2E2", fontSize: "0.875rem" }}>
            {error}
          </div>
        )}

        {loading ? (
          <div className="table-container" aria-label="Loading inquiries...">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Ref No</th>
                  <th>Client</th>
                  <th>Service</th>
                  <th>Estimate Range</th>
                  <th>Status</th>
                  <th>Submitted</th>
                  <th style={{ textAlign: "right" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {[1, 2, 3, 4, 5].map((idx) => (
                  <tr key={idx}>
                    <td>
                      <span className="skeleton" style={{ width: "110px", height: "1.25rem" }} />
                    </td>
                    <td>
                      <div className="skeleton" style={{ width: "130px", height: "1rem", marginBottom: "0.25rem" }} />
                      <div className="skeleton" style={{ width: "160px", height: "0.75rem" }} />
                    </td>
                    <td>
                      <span className="skeleton" style={{ width: "120px", height: "1rem" }} />
                    </td>
                    <td>
                      <span className="skeleton" style={{ width: "140px", height: "1rem" }} />
                    </td>
                    <td>
                      <span className="skeleton" style={{ width: "80px", height: "1.25rem", borderRadius: "var(--radius-sm)" }} />
                    </td>
                    <td>
                      <span className="skeleton" style={{ width: "90px", height: "0.875rem" }} />
                    </td>
                    <td style={{ textAlign: "right" }}>
                      <span className="skeleton" style={{ width: "70px", height: "1.75rem", borderRadius: "var(--radius-sm)" }} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : requests.length === 0 ? (
          <div style={{ padding: "4rem 2rem", textAlign: "center", color: "var(--color-text-muted)" }}>
            <p style={{ fontSize: "1.125rem", fontWeight: 600, color: "var(--color-navy-dark)", marginBottom: "0.5rem" }}>
              No inquiries found
            </p>
            <p style={{ fontSize: "0.875rem" }}>
              {search || statusFilter !== "all"
                ? "Try adjusting your search criteria or status filter."
                : "New quote submissions from the public website will appear here in real time automatically."}
            </p>
          </div>
        ) : (
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Ref No</th>
                  <th>Client</th>
                  <th>Service</th>
                  <th>Estimate Range</th>
                  <th>Status</th>
                  <th>Submitted</th>
                  <th style={{ textAlign: "right" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {requests.map((req) => {
                  const isHighlighted = highlightedId === req.id;
                  return (
                    <tr
                      key={req.id}
                      style={{
                        backgroundColor: isHighlighted ? "rgba(0, 180, 216, 0.08)" : undefined,
                        transition: "background-color 0.5s ease",
                      }}
                    >
                      <td>
                        <Link
                          href={`/admin/requests/${req.id}`}
                          style={{
                            fontWeight: 700,
                            color: "var(--color-navy-dark)",
                            fontFamily: "monospace",
                          }}
                        >
                          {req.referenceNo}
                        </Link>
                      </td>
                      <td>
                        <div style={{ fontWeight: 600, color: "var(--color-navy-dark)" }}>
                          {req.customerName}
                        </div>
                        <div style={{ fontSize: "0.75rem", color: "var(--color-text-muted)" }}>
                          {req.customerEmail}
                        </div>
                      </td>
                      <td>
                        <span style={{ fontWeight: 500 }}>{req.serviceName}</span>
                      </td>
                      <td>
                        <span style={{ fontWeight: 600, color: "var(--color-navy-dark)" }}>
                          {formatGHS(req.estimatedMin)} – {formatGHS(req.estimatedMax)}
                        </span>
                      </td>
                      <td>
                        <span className={`badge badge-${req.status}`}>
                          {req.status.replace("_", " ")}
                        </span>
                      </td>
                      <td style={{ fontSize: "0.8125rem", color: "var(--color-text-muted)", whiteSpace: "nowrap" }}>
                        {formatDate(req.createdAt)}
                      </td>
                      <td style={{ textAlign: "right" }}>
                        <Link
                          href={`/admin/requests/${req.id}`}
                          className="btn btn-navy btn-sm"
                          style={{ display: "inline-flex", alignItems: "center", gap: "0.25rem" }}
                        >
                          <span>Review</span>
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <line x1="5" y1="12" x2="19" y2="12" />
                            <polyline points="12 5 19 12 12 19" />
                          </svg>
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {meta.totalPages > 1 && (
          <div
            style={{
              padding: "1rem 1.5rem",
              borderTop: "1px solid var(--color-border)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <span style={{ fontSize: "0.875rem", color: "var(--color-text-muted)" }}>
              Page {meta.page} of {meta.totalPages} ({meta.total} inquiries)
            </span>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <button
                disabled={currentPage <= 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                className="btn btn-outline btn-sm"
              >
                Previous
              </button>
              <button
                disabled={currentPage >= meta.totalPages}
                onClick={() => setCurrentPage((p) => Math.min(meta.totalPages, p + 1))}
                className="btn btn-outline btn-sm"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      <style jsx global>{`
        @keyframes pulse {
          0% {
            transform: scale(0.95);
            box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7);
          }
          70% {
            transform: scale(1);
            box-shadow: 0 0 0 8px rgba(16, 185, 129, 0);
          }
          100% {
            transform: scale(0.95);
            box-shadow: 0 0 0 0 rgba(16, 185, 129, 0);
          }
        }
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
