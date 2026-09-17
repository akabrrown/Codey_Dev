import type { Metadata } from "next";
import Link from "next/link";
import ReviewForm from "../../components/ReviewForm";
import SiteHeader from "../../components/SiteHeader";
import SiteFooter from "../../components/SiteFooter";

export const metadata: Metadata = {
  title: "Leave a Review — Codey Dev",
  description: "Share your experience working with Codey Dev.",
};

export default function LeaveReviewPage() {
  return (
    <>
      <SiteHeader />
      <main id="main-content" style={{ backgroundColor: "var(--color-bg)", minHeight: "80vh" }}>
        <section style={{ backgroundColor: "var(--color-navy-dark)", padding: "var(--space-12) 0" }}>
          <div className="container" style={{ textAlign: "center" }}>
            <h1 style={{ color: "var(--color-white)", marginBottom: "var(--space-4)" }}>
              Leave a Review
            </h1>
            <p style={{ color: "rgba(255,255,255,0.7)", maxWidth: 480, margin: "0 auto" }}>
              We value your feedback. Let us know how your experience was working with Codey Dev.
            </p>
          </div>
        </section>

        <section className="container" style={{ padding: "var(--space-12) 0" }}>
          <div
            style={{
              maxWidth: 600,
              margin: "0 auto",
              backgroundColor: "var(--color-white)",
              padding: "var(--space-8)",
              borderRadius: "var(--radius-lg)",
              border: "1px solid var(--color-border)",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
            }}
          >
            <ReviewForm />
          </div>
          <div style={{ textAlign: "center", marginTop: "var(--space-8)" }}>
            <Link href="/" style={{ color: "var(--color-navy-dark)", fontWeight: 500, textDecoration: "none" }}>
              &larr; Back to Home
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
