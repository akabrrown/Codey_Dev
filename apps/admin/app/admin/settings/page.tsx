import type { Metadata } from "next";
import PushNotificationsCard from "./PushNotificationsCard";

export const metadata: Metadata = {
  title: "Portal Settings",
};

export default function AdminSettingsPage() {
  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Portal Settings & Integration Status</h1>
          <p className="page-subtitle">
            System configuration, notification destinations, security limits, and external service credentials.
          </p>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", maxWidth: "900px" }}>
        {/* Push Notifications Card */}
        <PushNotificationsCard />

        {/* Email Notifications */}
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Notification Channels</h2>
          </div>
          <div className="card-body" style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <div>
              <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 600, color: "var(--color-navy-dark)", marginBottom: "0.375rem" }}>
                Admin Notification Recipient
              </label>
              <input
                type="email"
                disabled
                value="codey.it360@gmail.com"
                className="form-input"
                style={{ backgroundColor: "var(--color-surface)", cursor: "not-allowed" }}
              />
              <span style={{ fontSize: "0.75rem", color: "var(--color-text-muted)", marginTop: "0.25rem", display: "block" }}>
                All new quote requests and customer uploads immediately alert this email address.
              </span>
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 600, color: "var(--color-navy-dark)", marginBottom: "0.375rem" }}>
                Outgoing Email Sender (Resend)
              </label>
              <input
                type="text"
                disabled
                value="quotes@codeydev.com"
                className="form-input"
                style={{ backgroundColor: "var(--color-surface)", cursor: "not-allowed" }}
              />
              <span style={{ fontSize: "0.75rem", color: "var(--color-text-muted)", marginTop: "0.25rem", display: "block" }}>
                Verified sending domain for customer confirmation and quote proposal emails.
              </span>
            </div>
          </div>
        </div>

        {/* Cloudinary Storage */}
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Cloudinary Secure Storage</h2>
          </div>
          <div className="card-body" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }}>
            <div>
              <div style={{ fontSize: "0.75rem", color: "var(--color-text-muted)", textTransform: "uppercase", fontWeight: 600 }}>
                Cloud Name
              </div>
              <div style={{ fontWeight: 600, color: "var(--color-navy-dark)", marginTop: "0.25rem" }}>
                qltqebvw
              </div>
            </div>
            <div>
              <div style={{ fontSize: "0.75rem", color: "var(--color-text-muted)", textTransform: "uppercase", fontWeight: 600 }}>
                Upload Preset
              </div>
              <div style={{ fontWeight: 600, color: "var(--color-navy-dark)", marginTop: "0.25rem" }}>
                Codey dev
              </div>
            </div>
            <div>
              <div style={{ fontSize: "0.75rem", color: "var(--color-text-muted)", textTransform: "uppercase", fontWeight: 600 }}>
                Upload Security
              </div>
              <div style={{ fontWeight: 600, color: "#16A34A", marginTop: "0.25rem" }}>
                Signed Upload URLs (Direct Browser-to-Cloud)
              </div>
            </div>
            <div>
              <div style={{ fontSize: "0.75rem", color: "var(--color-text-muted)", textTransform: "uppercase", fontWeight: 600 }}>
                File Download Security
              </div>
              <div style={{ fontWeight: 600, color: "var(--color-navy-dark)", marginTop: "0.25rem" }}>
                Time-limited Signed URLs (5-minute expiration)
              </div>
            </div>
          </div>
        </div>

        {/* Security & Rate Limiting */}
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Security & Rate Limiting Policies</h2>
          </div>
          <div className="card-body" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "0.75rem 0", borderBottom: "1px solid var(--color-border)" }}>
              <div>
                <div style={{ fontWeight: 600, color: "var(--color-navy-dark)", fontSize: "0.875rem" }}>
                  Quote Submission Rate Limit
                </div>
                <div style={{ fontSize: "0.75rem", color: "var(--color-text-muted)" }}>
                  Protects public quote submission endpoint from spam
                </div>
              </div>
              <span className="badge badge-quote_sent">5 req / 10 min</span>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", padding: "0.75rem 0", borderBottom: "1px solid var(--color-border)" }}>
              <div>
                <div style={{ fontWeight: 600, color: "var(--color-navy-dark)", fontSize: "0.875rem" }}>
                  File Upload Rate Limit
                </div>
                <div style={{ fontSize: "0.75rem", color: "var(--color-text-muted)" }}>
                  Signed upload signatures per IP
                </div>
              </div>
              <span className="badge badge-quote_sent">10 uploads / 10 min</span>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", padding: "0.75rem 0" }}>
              <div>
                <div style={{ fontWeight: 600, color: "var(--color-navy-dark)", fontSize: "0.875rem" }}>
                  Admin Authorization (IDOR Protection)
                </div>
                <div style={{ fontSize: "0.75rem", color: "var(--color-text-muted)" }}>
                  Every record and file checked against request ownership
                </div>
              </div>
              <span className="badge badge-approved">Enforced</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
