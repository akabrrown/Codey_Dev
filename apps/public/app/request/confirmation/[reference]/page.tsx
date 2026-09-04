import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "../../../../components/SiteHeader";
import SiteFooter from "../../../../components/SiteFooter";
import { PhoneIcon, EmailIcon } from "../../../../components/Icons";

export const metadata: Metadata = {
  title: "Request Submitted",
  description: "Your quote request has been received. Codey Dev will follow up within 24 hours.",
  robots: { index: false, follow: false }, // don't index confirmation pages
};

export default async function ConfirmationPage({
  params,
}: {
  params: Promise<{ reference: string }>;
}) {
  const { reference } = await params;

  return (
    <>
      <SiteHeader />
      <main id="main-content" style={{ padding: "var(--space-16) 0" }}>
        <div className="container">
          <div className="confirmation">
            <div className="confirmation__card">
              <div className="confirmation__check" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>

              <p className="confirmation__ref" aria-label={`Reference number: ${reference}`}>
                {reference}
              </p>

              <h1 style={{ fontSize: "1.75rem", marginBottom: "var(--space-3)" }}>
                Request received
              </h1>
              <p style={{ color: "var(--color-muted)", marginBottom: "var(--space-6)" }}>
                We have received your quote request. You will get a confirmation
                email shortly, and a reviewed quote within 24 hours.
              </p>

              <div
                style={{
                  backgroundColor: "var(--color-teal-tint)",
                  border: "1px solid var(--color-teal)",
                  borderRadius: "var(--radius-md)",
                  padding: "var(--space-5)",
                  marginBottom: "var(--space-8)",
                }}
              >
                <p
                  style={{
                    color: "var(--color-navy-dark)",
                    fontSize: "0.875rem",
                    margin: 0,
                    lineHeight: 1.6,
                  }}
                >
                  <strong>What happens next:</strong>
                  <br />
                  1. Our technical lead reviews your request (usually within a few hours).
                  <br />
                  2. We send a confirmed quote by email with a full price breakdown.
                  <br />
                  3. If you accept, we schedule a project kick-off review.
                </p>
              </div>

              <div className="confirmation__contact">
                <p
                  style={{
                    fontWeight: 700,
                    color: "var(--color-navy-dark)",
                    marginBottom: "var(--space-3)",
                  }}
                >
                  Need to reach us?
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-2)", color: "var(--color-text)", fontSize: "0.9375rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)" }}>
                    <PhoneIcon size={18} className="text-teal" />
                    <span>Direct Call: <strong>0592722997</strong></span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)" }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                    </svg>
                    <span>WhatsApp: <strong>0203813606</strong></span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)" }}>
                    <EmailIcon size={18} className="text-teal" />
                    <span>Email: <strong>codey.it360@gmail.com</strong></span>
                  </div>
                  <div style={{ marginTop: "var(--space-2)", fontSize: "0.875rem", color: "var(--color-muted)" }}>
                    Reference number: <strong style={{ color: "var(--color-navy-dark)" }}>{reference}</strong>
                  </div>
                </div>
              </div>

              <Link href="/" className="btn btn--navy" style={{ marginTop: "var(--space-6)" }}>
                Back to homepage
              </Link>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
