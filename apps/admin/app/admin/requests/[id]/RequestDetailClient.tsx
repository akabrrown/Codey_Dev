"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { fetchWithAuth } from "../../../../lib/api-client";

interface ServiceOptionSelection {
  id: string;
  labelAtTime: string;
  priceImpactAtTime: string;
  isMultiplierAtTime: boolean;
  multiplierValueAtTime: string | null;
  optionType: string;
}

interface RequestFileItem {
  id: string;
  fileName: string;
  fileSize: number;
  mimeType: string;
  cloudinaryPublicId: string;
}

interface StatusLogEntry {
  id: string;
  fromStatus: string | null;
  toStatus: string;
  changedAt: string;
}

export interface RequestDetailData {
  id: string;
  referenceNo: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string | null;
  organization?: string | null;
  timeline?: string | null;
  projectDescription?: string | null;
  estimatedMin: number;
  estimatedMax: number;
  finalPrice?: string | null;
  priceAdjustmentReason?: string | null;
  adminNotes?: string | null;
  status: "submitted" | "in_review" | "quote_sent" | "approved" | "declined" | "archived";
  createdAt: string;
  service?: {
    id: string;
    name: string;
    slug: string;
    description: string;
  };
  selections: ServiceOptionSelection[];
  files: RequestFileItem[];
  statusHistory: StatusLogEntry[];
}

export default function RequestDetailClient({ initialData }: { initialData: RequestDetailData }) {
  const router = useRouter();
  const [data, setData] = useState<RequestDetailData>(initialData);

  // Form edit states
  const [status, setStatus] = useState(data.status);
  const [finalPriceGhs, setFinalPriceGhs] = useState<string>(
    data.finalPrice ? Number(data.finalPrice).toString() : ""
  );
  const [priceAdjustmentReason, setPriceAdjustmentReason] = useState(data.priceAdjustmentReason || "");
  const [adminNotes, setAdminNotes] = useState(data.adminNotes || "");

  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  const [sendingQuote, setSendingQuote] = useState(false);
  const [quoteSuccess, setQuoteSuccess] = useState(false);
  const [quoteError, setQuoteError] = useState<string | null>(null);

  const [downloadingFileId, setDownloadingFileId] = useState<string | null>(null);
  const [downloadError, setDownloadError] = useState<string | null>(null);

  const formatGHS = (amount: number | string) => {
    const val = typeof amount === "string" ? parseFloat(amount) : amount;
    return new Intl.NumberFormat("en-GH", {
      style: "currency",
      currency: "GHS",
      maximumFractionDigits: 0,
    }).format(val || 0);
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

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSaveSuccess(false);
    setSaveError(null);

    try {
      const payload: Record<string, any> = {
        status,
        adminNotes: adminNotes.trim() || undefined,
        priceAdjustmentReason: priceAdjustmentReason.trim() || undefined,
      };

      if (finalPriceGhs.trim()) {
        const parsed = parseFloat(finalPriceGhs);
        if (isNaN(parsed) || parsed < 0) {
          throw new Error("Final price must be a valid positive amount in GH₵.");
        }
        payload.finalPrice = parsed;
      }

      const res = await fetchWithAuth(`/api/v1/admin/requests/${data.id}`, {
        method: "PATCH",
        body: JSON.stringify(payload),
      });

      const resData = await res.json();
      if (!res.ok || !resData.success) {
        throw new Error(resData.error?.message || "Failed to save request updates.");
      }

      setSaveSuccess(true);
      router.refresh();
    } catch (err) {
      setSaveError(err instanceof Error ? err.message : "Failed to save updates.");
    } finally {
      setSaving(false);
    }
  };

  const [confirmingSend, setConfirmingSend] = useState(false);

  const executeSendQuote = async () => {
    if (!finalPriceGhs.trim()) {
      setQuoteError("Please enter and save a Final Quote Price before sending the quote to the client.");
      return;
    }

    setSendingQuote(true);
    setQuoteSuccess(false);
    setQuoteError(null);
    setConfirmingSend(false);

    try {
      const res = await fetchWithAuth(`/api/v1/admin/requests/${data.id}/send-quote`, {
        method: "POST",
      });

      const resData = await res.json();
      if (!res.ok || !resData.success) {
        throw new Error(resData.error?.message || "Failed to send quote.");
      }

      setQuoteSuccess(true);
      setStatus("quote_sent");
      router.refresh();
    } catch (err) {
      setQuoteError(err instanceof Error ? err.message : "Failed to send quote.");
    } finally {
      setSendingQuote(false);
    }
  };

  const handleDownloadFile = async (fileId: string) => {
    setDownloadingFileId(fileId);
    try {
      const res = await fetchWithAuth(`/api/v1/admin/requests/${data.id}/files/${fileId}`);
      const resData = await res.json();
      if (!res.ok || !resData.success) {
        throw new Error(resData.error?.message || "Failed to generate download URL.");
      }

      if (resData.data?.downloadUrl) {
        window.open(resData.data.downloadUrl, "_blank", "noopener,noreferrer");
      }
    } catch (err) {
      setDownloadError(err instanceof Error ? err.message : "Failed to download file.");
    } finally {
      setDownloadingFileId(null);
    }
  };

  return (
    <div>
      {/* Top Header / Breadcrumb */}
      <div style={{ marginBottom: "1.5rem" }}>
        <Link
          href="/admin"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.375rem",
            fontSize: "0.875rem",
            color: "var(--color-text-muted)",
            marginBottom: "0.75rem",
          }}
        >
          ← Back to All Requests
        </Link>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <h1 className="page-title" style={{ fontFamily: "monospace", letterSpacing: "0.02em" }}>
              {data.referenceNo}
            </h1>
            <span className={`badge badge-${status}`}>
              {status.replace("_", " ")}
            </span>
          </div>
          <div style={{ fontSize: "0.875rem", color: "var(--color-text-muted)" }}>
            Submitted on {formatDate(data.createdAt)}
          </div>
        </div>
      </div>

      {/* Two Column Layout */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))", gap: "1.5rem" }}>
        {/* Left Column: Details, Scope, Files, History */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {/* Customer Card */}
          <div className="card">
            <div className="card-header">
              <h2 className="card-title">Client Information</h2>
            </div>
            <div className="card-body" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }}>
              <div>
                <div style={{ fontSize: "0.75rem", color: "var(--color-text-muted)", textTransform: "uppercase", fontWeight: 600 }}>
                  Client Name
                </div>
                <div style={{ fontWeight: 600, color: "var(--color-navy-dark)", marginTop: "0.25rem" }}>
                  {data.customerName}
                </div>
              </div>
              <div>
                <div style={{ fontSize: "0.75rem", color: "var(--color-text-muted)", textTransform: "uppercase", fontWeight: 600 }}>
                  Email Address
                </div>
                <div style={{ fontWeight: 500, marginTop: "0.25rem" }}>
                  <a href={`mailto:${data.customerEmail}`} style={{ color: "var(--color-navy-dark)" }}>
                    {data.customerEmail}
                  </a>
                </div>
              </div>
              <div>
                <div style={{ fontSize: "0.75rem", color: "var(--color-text-muted)", textTransform: "uppercase", fontWeight: 600 }}>
                  Phone / WhatsApp
                </div>
                <div style={{ fontWeight: 500, marginTop: "0.25rem" }}>
                  {data.customerPhone ? (
                    <a href={`https://wa.me/${data.customerPhone.replace(/[^0-9]/g, "")}`} target="_blank" rel="noreferrer" style={{ color: "#16A34A" }}>
                      {data.customerPhone} (WhatsApp)
                    </a>
                  ) : (
                    <span style={{ color: "var(--color-text-muted)" }}>Not provided</span>
                  )}
                </div>
              </div>
              <div>
                <div style={{ fontSize: "0.75rem", color: "var(--color-text-muted)", textTransform: "uppercase", fontWeight: 600 }}>
                  Organization
                </div>
                <div style={{ fontWeight: 500, marginTop: "0.25rem" }}>
                  {data.organization || <span style={{ color: "var(--color-text-muted)" }}>None specified</span>}
                </div>
              </div>
            </div>
          </div>

          {/* Project Scope & Selections */}
          <div className="card">
            <div className="card-header">
              <h2 className="card-title">Project Scope & Selections</h2>
              <span style={{ fontWeight: 700, color: "var(--color-navy-dark)", fontSize: "0.9375rem" }}>
                {data.service?.name || "Custom Project"}
              </span>
            </div>
            <div className="card-body">
              {data.projectDescription && (
                <div style={{ marginBottom: "1.5rem", padding: "1rem", backgroundColor: "var(--color-surface)", borderRadius: "var(--radius-md)" }}>
                  <div style={{ fontSize: "0.75rem", color: "var(--color-text-muted)", textTransform: "uppercase", fontWeight: 600, marginBottom: "0.25rem" }}>
                    Project Notes / Brief
                  </div>
                  <div style={{ fontSize: "0.875rem", whiteSpace: "pre-wrap", color: "var(--color-text)" }}>
                    {data.projectDescription}
                  </div>
                </div>
              )}

              <h3 style={{ fontSize: "0.875rem", textTransform: "uppercase", color: "var(--color-text-muted)", marginBottom: "0.75rem" }}>
                Selected Features & Add-ons
              </h3>
              {data.selections.length === 0 ? (
                <p style={{ fontSize: "0.875rem", color: "var(--color-text-muted)" }}>
                  No extra options selected. Base service package applies.
                </p>
              ) : (
                <div className="table-container">
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>Option / Feature</th>
                        <th>Type</th>
                        <th style={{ textAlign: "right" }}>Impact</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.selections.map((sel) => (
                        <tr key={sel.id}>
                          <td style={{ fontWeight: 500 }}>{sel.labelAtTime}</td>
                          <td>
                            <span style={{ fontSize: "0.75rem", textTransform: "uppercase", color: "var(--color-text-muted)" }}>
                              {sel.optionType}
                            </span>
                          </td>
                          <td style={{ textAlign: "right", fontWeight: 600 }}>
                            {sel.isMultiplierAtTime
                              ? `${sel.multiplierValueAtTime}x`
                              : formatGHS(sel.priceImpactAtTime)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

          {/* Uploaded Files */}
          <div className="card">
            <div className="card-header">
              <h2 className="card-title">Client Uploaded Files ({data.files.length})</h2>
            </div>
            <div className="card-body">
              {downloadError && (
                <div style={{ padding: "0.75rem 1rem", backgroundColor: "#FEE2E2", border: "1px solid #FCA5A5", color: "#B91C1C", borderRadius: "var(--radius-md)", fontSize: "0.875rem", marginBottom: "1rem" }}>
                  {downloadError}
                </div>
              )}
              {data.files.length === 0 ? (
                <p style={{ fontSize: "0.875rem", color: "var(--color-text-muted)" }}>
                  No files or assets uploaded with this quote inquiry.
                </p>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  {data.files.map((file) => (
                    <div
                      key={file.id}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "0.75rem 1rem",
                        backgroundColor: "var(--color-surface)",
                        borderRadius: "var(--radius-md)",
                        border: "1px solid var(--color-border)",
                      }}
                    >
                      <div>
                        <div style={{ fontWeight: 600, fontSize: "0.875rem", color: "var(--color-navy-dark)" }}>
                          {file.fileName}
                        </div>
                        <div style={{ fontSize: "0.75rem", color: "var(--color-text-muted)" }}>
                          {file.mimeType} • {(file.fileSize / 1024).toFixed(0)} KB
                        </div>
                      </div>
                      <button
                        onClick={() => handleDownloadFile(file.id)}
                        disabled={downloadingFileId === file.id}
                        className="btn btn-navy btn-sm"
                        style={{ display: "inline-flex", alignItems: "center", gap: "0.375rem" }}
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                          <polyline points="7 10 12 15 17 10" />
                          <line x1="12" y1="15" x2="12" y2="3" />
                        </svg>
                        <span>{downloadingFileId === file.id ? "Preparing..." : "Download file"}</span>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Status History */}
          <div className="card">
            <div className="card-header">
              <h2 className="card-title">Activity & Status History</h2>
            </div>
            <div className="card-body">
              {data.statusHistory.length === 0 ? (
                <p style={{ fontSize: "0.875rem", color: "var(--color-text-muted)" }}>
                  No status transitions logged yet.
                </p>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  {data.statusHistory.map((item) => (
                    <div key={item.id} style={{ display: "flex", alignItems: "flex-start", gap: "1rem", fontSize: "0.875rem" }}>
                      <div style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "var(--color-teal)", marginTop: "6px" }} />
                      <div>
                        <div>
                          Status changed to{" "}
                          <span style={{ fontWeight: 600, textTransform: "capitalize" }}>
                            {item.toStatus.replace("_", " ")}
                          </span>
                          {item.fromStatus && (
                            <span style={{ color: "var(--color-text-muted)" }}>
                              {" "}from {item.fromStatus.replace("_", " ")}
                            </span>
                          )}
                        </div>
                        <div style={{ fontSize: "0.75rem", color: "var(--color-text-muted)", marginTop: "0.125rem" }}>
                          {formatDate(item.changedAt)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Quote Management & Actions */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <div className="card" style={{ borderTop: "4px solid var(--color-navy-dark)" }}>
            <div className="card-header">
              <h2 className="card-title">Quote Calculation & Actions</h2>
            </div>
            <div className="card-body">
              {/* Calculated Range */}
              <div style={{
                padding: "1.25rem",
                backgroundColor: "var(--color-surface)",
                borderRadius: "var(--radius-md)",
                marginBottom: "1.5rem",
                border: "1px solid var(--color-border)",
              }}>
                <div style={{ fontSize: "0.8125rem", color: "var(--color-text-muted)", textTransform: "uppercase", fontWeight: 600 }}>
                  Automated Estimate Range
                </div>
                <div style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--color-navy-dark)", marginTop: "0.25rem" }}>
                  {formatGHS(data.estimatedMin)} – {formatGHS(data.estimatedMax)}
                </div>
                <div style={{ fontSize: "0.75rem", color: "var(--color-text-muted)", marginTop: "0.25rem" }}>
                  Based on current catalog base rate, selected options & timeline multiplier.
                </div>
              </div>

              {saveSuccess && (
                <div style={{
                  padding: "0.75rem 1rem",
                  backgroundColor: "#DCFCE7",
                  border: "1px solid #86EFAC",
                  color: "#15803D",
                  borderRadius: "var(--radius-md)",
                  fontSize: "0.875rem",
                  marginBottom: "1rem",
                }}>
                  Changes saved successfully!
                </div>
              )}

              {saveError && (
                <div style={{
                  padding: "0.75rem 1rem",
                  backgroundColor: "#FEE2E2",
                  border: "1px solid #FCA5A5",
                  color: "#B91C1C",
                  borderRadius: "var(--radius-md)",
                  fontSize: "0.875rem",
                  marginBottom: "1rem",
                }}>
                  {saveError}
                </div>
              )}

              <form onSubmit={handleSave} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 600, color: "var(--color-navy-dark)", marginBottom: "0.375rem" }}>
                    Lifecycle Status
                  </label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as any)}
                    className="form-select"
                  >
                    <option value="submitted">Submitted (New)</option>
                    <option value="in_review">In Review</option>
                    <option value="quote_sent">Quote Sent</option>
                    <option value="approved">Approved</option>
                    <option value="declined">Declined</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 600, color: "var(--color-navy-dark)", marginBottom: "0.375rem" }}>
                    Final Quotation Price (GH₵)
                  </label>
                  <div style={{ position: "relative" }}>
                    <span style={{
                      position: "absolute",
                      left: "0.75rem",
                      top: "50%",
                      transform: "translateY(-50%)",
                      fontWeight: 600,
                      color: "var(--color-text-muted)",
                      fontSize: "0.875rem",
                    }}>
                      GH₵
                    </span>
                    <input
                      type="number"
                      step="any"
                      placeholder="e.g. 5500"
                      value={finalPriceGhs}
                      onChange={(e) => setFinalPriceGhs(e.target.value)}
                      className="form-input"
                      style={{ paddingLeft: "3.25rem" }}
                    />
                  </div>
                  <span style={{ fontSize: "0.75rem", color: "var(--color-text-muted)", marginTop: "0.25rem", display: "block" }}>
                    The exact price to appear on the formal quotation issued to the client.
                  </span>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 600, color: "var(--color-navy-dark)", marginBottom: "0.375rem" }}>
                    Price Adjustment Reason
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Custom API integration complexity"
                    value={priceAdjustmentReason}
                    onChange={(e) => setPriceAdjustmentReason(e.target.value)}
                    className="form-input"
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 600, color: "var(--color-navy-dark)", marginBottom: "0.375rem" }}>
                    Internal Admin Notes
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Private notes for the engineering and management team..."
                    value={adminNotes}
                    onChange={(e) => setAdminNotes(e.target.value)}
                    className="form-textarea"
                  />
                </div>

                <button
                  type="submit"
                  disabled={saving}
                  className="btn btn-navy"
                  style={{ width: "100%", padding: "0.75rem" }}
                >
                  {saving ? "Saving Changes..." : "Save Updates"}
                </button>
              </form>

              <hr style={{ margin: "1.75rem 0", borderColor: "var(--color-border)" }} />

              {/* Quote Dispatch Section */}
              <div>
                <h3 style={{ fontSize: "1rem", fontWeight: 600, color: "var(--color-navy-dark)", marginBottom: "0.5rem" }}>
                  Official Client Quote Dispatch
                </h3>
                <p style={{ fontSize: "0.8125rem", color: "var(--color-text-muted)", marginBottom: "1rem" }}>
                  Dispatches a formal proposal email directly to {data.customerEmail} with the fixed price of{" "}
                  <strong>{finalPriceGhs ? `GH₵ ${finalPriceGhs}` : "[Not set]"}</strong> and comprehensive terms.
                </p>

                {quoteSuccess && (
                  <div style={{
                    padding: "0.75rem 1rem",
                    backgroundColor: "#DCFCE7",
                    border: "1px solid #86EFAC",
                    color: "#15803D",
                    borderRadius: "var(--radius-md)",
                    fontSize: "0.875rem",
                    marginBottom: "1rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>Quote proposal successfully dispatched to {data.customerEmail}</span>
                  </div>
                )}

                {quoteError && (
                  <div style={{
                    padding: "0.75rem 1rem",
                    backgroundColor: "#FEE2E2",
                    border: "1px solid #FCA5A5",
                    color: "#B91C1C",
                    borderRadius: "var(--radius-md)",
                    fontSize: "0.875rem",
                    marginBottom: "1rem",
                  }}>
                    {quoteError}
                  </div>
                )}

                {confirmingSend ? (
                  <div style={{
                    padding: "1rem",
                    backgroundColor: "#FEF3C7",
                    border: "1px solid #FCD34D",
                    borderRadius: "var(--radius-md)",
                    marginBottom: "0.5rem",
                  }}>
                    <p style={{ fontSize: "0.875rem", fontWeight: 600, color: "#92400E", marginBottom: "0.75rem" }}>
                      Send official quote of GH₵ {finalPriceGhs} to {data.customerEmail}?
                    </p>
                    <div style={{ display: "flex", gap: "0.5rem" }}>
                      <button
                        type="button"
                        onClick={executeSendQuote}
                        disabled={sendingQuote}
                        className="btn btn-primary"
                        style={{ flex: 1, padding: "0.5rem", fontSize: "0.8125rem", fontWeight: 700 }}
                      >
                        {sendingQuote ? "Sending..." : "Yes, Dispatch Proposal"}
                      </button>
                      <button
                        type="button"
                        onClick={() => setConfirmingSend(false)}
                        disabled={sendingQuote}
                        className="btn btn-secondary"
                        style={{ padding: "0.5rem 1rem", fontSize: "0.8125rem" }}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      if (!finalPriceGhs.trim()) {
                        setQuoteError("Please enter and save a Final Quote Price before sending the quote to the client.");
                        return;
                      }
                      setConfirmingSend(true);
                    }}
                    disabled={sendingQuote || !finalPriceGhs.trim()}
                    className="btn btn-primary"
                    style={{ width: "100%", padding: "0.75rem", fontWeight: 700, display: "inline-flex", justifyContent: "center", alignItems: "center", gap: "0.5rem" }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                    <span>{sendingQuote ? "Dispatching quote proposal..." : "Send official quote to client"}</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
