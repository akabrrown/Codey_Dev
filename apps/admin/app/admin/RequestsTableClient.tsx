"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { fetchWithAuth } from "../../lib/api-client";

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
  status: "submitted" | "in_review" | "quote_sent" | "approved" | "declined" | "archived";
  isRead: boolean;
  createdAt: string;
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
  const [error, setError] = useState<string | null>(null);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const isFirstMount = useRef(true);

  const loadRequests = async (query = search, status = statusFilter, page = currentPage) => {
    setLoading(true);
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
      setError(err instanceof Error ? err.message : "Failed to load requests");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
      if (initialRequests.length > 0 || initialMeta.total > 0) return;
    }
    const timer = setTimeout(() => {
      loadRequests(search, statusFilter, currentPage);
    }, 300);
    return () => clearTimeout(timer);
  }, [search, statusFilter, currentPage]);

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
    submitted: requests.filter((r) => r.status === "submitted").length,
    inReview: requests.filter((r) => r.status === "in_review").length,
    quoteSent: requests.filter((r) => r.status === "quote_sent").length,
  };

  return (
    <div>
      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-title">Total Inquiries</div>
          <div className="stat-value">{counts.total}</div>
        </div>
        <div className="stat-card" style={{ borderLeft: "4px solid #1D4ED8" }}>
          <div className="stat-title">New / Submitted</div>
          <div className="stat-value" style={{ color: "#1D4ED8" }}>{counts.submitted}</div>
        </div>
        <div className="stat-card" style={{ borderLeft: "4px solid #B45309" }}>
          <div className="stat-title">In Review</div>
          <div className="stat-value" style={{ color: "#B45309" }}>{counts.inReview}</div>
        </div>
        <div className="stat-card" style={{ borderLeft: "4px solid var(--color-teal)" }}>
          <div className="stat-title">Quotes Sent</div>
          <div className="stat-value" style={{ color: "var(--color-teal)" }}>{counts.quoteSent}</div>
        </div>
      </div>

      {/* Main Card with filters & table */}
      <div className="card">
        <div className="card-header" style={{ flexWrap: "wrap", gap: "1rem" }}>
          <h2 className="card-title">All Project Inquiries</h2>

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
              style={{ width: "240px", padding: "0.5rem 0.75rem" }}
            />

            <select
              aria-label="Filter requests by submission status"
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="form-select"
              style={{ width: "160px", padding: "0.5rem 0.75rem" }}
            >
              <option value="all">All Statuses</option>
              <option value="submitted">Submitted</option>
              <option value="in_review">In Review</option>
              <option value="quote_sent">Quote Sent</option>
              <option value="approved">Approved</option>
              <option value="declined">Declined</option>
              <option value="archived">Archived</option>
            </select>
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
                    <td><span className="skeleton" style={{ width: "110px", height: "1.25rem" }} /></td>
                    <td>
                      <div className="skeleton" style={{ width: "130px", height: "1rem", marginBottom: "0.25rem" }} />
                      <div className="skeleton" style={{ width: "160px", height: "0.75rem" }} />
                    </td>
                    <td><span className="skeleton" style={{ width: "120px", height: "1rem" }} /></td>
                    <td><span className="skeleton" style={{ width: "140px", height: "1rem" }} /></td>
                    <td><span className="skeleton" style={{ width: "80px", height: "1.25rem", borderRadius: "var(--radius-sm)" }} /></td>
                    <td><span className="skeleton" style={{ width: "90px", height: "0.875rem" }} /></td>
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
                : "New quote submissions from the public website will appear here in real time."}
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
                {requests.map((req) => (
                  <tr key={req.id}>
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
                      >
                        Review →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {meta.totalPages > 1 && (
          <div style={{
            padding: "1rem 1.5rem",
            borderTop: "1px solid var(--color-border)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}>
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
    </div>
  );
}
