import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="site-footer" role="contentinfo">
      <div className="container">
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "var(--space-8)",
          padding: "var(--space-12) 0 var(--space-8)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
        }}>
          {/* Brand Column */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)", marginBottom: "var(--space-4)" }}>
              <span className="site-header__logo-mark" aria-hidden="true" />
              <span style={{ fontWeight: 800, letterSpacing: "0.12em", color: "var(--color-white)" }}>
                CODEY DEV
              </span>
            </div>
            <p style={{ color: "rgba(255, 255, 255, 0.65)", fontSize: "0.875rem", lineHeight: 1.6, maxWidth: "260px" }}>
              Tailored software development, web engineering, and digital solutions for growing Ghanaian businesses and institutions.
            </p>
          </div>

          {/* Services Column */}
          <div>
            <h3 style={{ color: "var(--color-white)", fontSize: "0.875rem", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "var(--space-4)" }}>
              Services
            </h3>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "var(--space-2)" }}>
              <li><Link href="/request" style={{ color: "rgba(255, 255, 255, 0.7)", fontSize: "0.875rem" }}>Web Design & Development</Link></li>
              <li><Link href="/request" style={{ color: "rgba(255, 255, 255, 0.7)", fontSize: "0.875rem" }}>Custom Software (POS, ERP)</Link></li>
              <li><Link href="/request" style={{ color: "rgba(255, 255, 255, 0.7)", fontSize: "0.875rem" }}>Mobile App Development</Link></li>
              <li><Link href="/request" style={{ color: "rgba(255, 255, 255, 0.7)", fontSize: "0.875rem" }}>Website Maintenance & Support</Link></li>
              <li><Link href="/request" style={{ color: "rgba(255, 255, 255, 0.7)", fontSize: "0.875rem" }}>Technical SEO Services</Link></li>
            </ul>
          </div>

          {/* Quote & Pricing Column */}
          <div>
            <h3 style={{ color: "var(--color-white)", fontSize: "0.875rem", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "var(--space-4)" }}>
              Quick Navigation
            </h3>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "var(--space-2)" }}>
              <li><Link href="/request" style={{ color: "var(--color-teal)", fontWeight: 600, fontSize: "0.875rem" }}>Start a Quote Request →</Link></li>
              <li><Link href="/pricing" style={{ color: "rgba(255, 255, 255, 0.7)", fontSize: "0.875rem" }}>Pricing Overview</Link></li>
              <li><Link href="/#how-it-works" style={{ color: "rgba(255, 255, 255, 0.7)", fontSize: "0.875rem" }}>How It Works</Link></li>
              <li><Link href="/contact" style={{ color: "rgba(255, 255, 255, 0.7)", fontSize: "0.875rem" }}>Contact & WhatsApp</Link></li>
            </ul>
          </div>

          {/* Legal & Policies Column */}
          <div>
            <h3 style={{ color: "var(--color-white)", fontSize: "0.875rem", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "var(--space-4)" }}>
              Governance & Policies
            </h3>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "var(--space-2)" }}>
              <li><Link href="/terms" style={{ color: "rgba(255, 255, 255, 0.7)", fontSize: "0.875rem" }}>Terms & Conditions</Link></li>
              <li><Link href="/policies" style={{ color: "rgba(255, 255, 255, 0.7)", fontSize: "0.875rem" }}>Company Policies</Link></li>
              <li><Link href="/terms#payment" style={{ color: "rgba(255, 255, 255, 0.7)", fontSize: "0.875rem" }}>Payment & MoMo Milestones</Link></li>
              <li><Link href="/policies#refunds" style={{ color: "rgba(255, 255, 255, 0.7)", fontSize: "0.875rem" }}>Refunds & Cancellation</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          padding: "var(--space-6) 0",
          gap: "var(--space-4)",
          color: "rgba(255, 255, 255, 0.5)",
          fontSize: "0.8125rem",
        }}>
          <div>
            © {new Date().getFullYear()} Codey Dev. All rights reserved. Accra, Ghana.
          </div>
          <div style={{ display: "flex", gap: "var(--space-6)" }}>
            <Link href="/terms" style={{ color: "rgba(255, 255, 255, 0.5)" }}>Terms</Link>
            <Link href="/policies" style={{ color: "rgba(255, 255, 255, 0.5)" }}>Privacy & Policies</Link>
            <Link href="/contact" style={{ color: "rgba(255, 255, 255, 0.5)" }}>Support</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
