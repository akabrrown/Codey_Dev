import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";
import {
  WebIcon,
  SoftwareIcon,
  MobileIcon,
  MaintenanceIcon,
  SeoIcon,
  CheckIcon,
  ShieldCheckIcon,
} from "../components/Icons";

export const metadata: Metadata = {
  title: "Codey Dev — Software Engineering & Project Quotations in Ghana",
  description:
    "Accra software engineering studio. Configure your web platform, management system, or mobile app scope and get a verified price estimate in Ghana Cedis.",
};

const SERVICE_ITEMS = [
  {
    icon: <WebIcon size={28} />,
    title: "Web design and development",
    desc: "Custom corporate websites, e-commerce storefronts, and school or organisation portals built for fast loading on Ghanaian mobile networks.",
    tag: "From GH₵ 1,800",
  },
  {
    icon: <SoftwareIcon size={28} />,
    title: "Custom business software",
    desc: "Point of sale (POS), stock and inventory control, school management, and HR payroll engines configured for local workflows.",
    tag: "From GH₵ 4,500",
  },
  {
    icon: <MobileIcon size={28} />,
    title: "Mobile application engineering",
    desc: "Cross-platform iOS and Android applications with offline caching, push notifications, and native mobile payment flows.",
    tag: "From GH₵ 5,500",
  },
  {
    icon: <MaintenanceIcon size={28} />,
    title: "Website support and maintenance",
    desc: "Scheduled security hardening, uptime monitoring, monthly data backups, and prompt content updates.",
    tag: "From GH₵ 450/mo",
  },
  {
    icon: <SeoIcon size={28} />,
    title: "Technical search optimization",
    desc: "Google Business profile setup, schema markup, Core Web Vitals tuning, and local search visibility for Ghanaian commercial queries.",
    tag: "From GH₵ 800",
  },
];

const CREDIBILITY_PILLARS = [
  {
    title: "Performance & mobile responsive",
    desc: "Engineered specifically for Ghanaian mobile networks and devices. Fast load times, responsive breakpoints, and zero bloat.",
  },
  {
    title: "Secure, reliable & SEO optimized",
    desc: "Built with security best practices, technical on-page SEO, Google Business profile setup, and Core Web Vitals optimization.",
  },
  {
    title: "Cloud hosting & payment integration",
    desc: "Direct Paystack and Mobile Money (MTN MoMo, Telecel Cash) checkout flows plus cloud infrastructure configuration.",
  },
  {
    title: "24/7 support & direct engineer contact",
    desc: "Work directly with the developers building your software via dedicated WhatsApp channels (0203813606) and weekly milestones.",
  },
];

export default function LandingPage() {
  return (
    <>
      <SiteHeader />

      <main id="main-content">
        {/* Asymmetrical Editorial Hero */}
        <section className="hero" aria-labelledby="hero-heading">
          <div className="hero__circuit" aria-hidden="true" />
          <div className="container">
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "var(--space-10)",
              alignItems: "center",
              position: "relative",
              zIndex: 2,
            }}>
              {/* Left Column: Mission & Action */}
              <div>

                <h1
                  id="hero-heading"
                  style={{
                    color: "var(--color-white)",
                    fontSize: "clamp(2rem, 4vw, 3.25rem)",
                    lineHeight: 1.15,
                    marginBottom: "var(--space-4)",
                    letterSpacing: "-0.03em",
                  }}
                >
                  Your business deserves better than templates.
                </h1>

                <p
                  style={{
                    color: "rgba(255, 255, 255, 0.78)",
                    fontSize: "1.0625rem",
                    lineHeight: 1.6,
                    maxWidth: "520px",
                    marginBottom: "var(--space-8)",
                  }}
                >
                  Configure your project scope, select the exact features you need, and receive an instant estimate in Ghana Cedis. Custom engineered by our Accra software team for speed, security, and local reliability.
                </p>

                <div style={{ display: "flex", gap: "var(--space-4)", flexWrap: "wrap", alignItems: "center" }}>
                  <Link href="/request" className="btn btn--primary btn--lg">
                    Calculate Project Quote →
                  </Link>
                  <Link href="/pricing" className="btn btn--outline btn--lg" style={{ color: "var(--color-white)", borderColor: "rgba(255, 255, 255, 0.3)" }}>
                    Browse Pricing Catalog
                  </Link>
                </div>
              </div>

              {/* Right Column: Live Sample Estimate Card (Proof of Concept) */}
              <div>
                <div style={{
                  backgroundColor: "#0B1D2F",
                  borderRadius: "var(--radius-lg)",
                  border: "1px solid rgba(53, 196, 224, 0.35)",
                  boxShadow: "0 20px 40px -10px rgba(0,0,0,0.5)",
                  padding: "var(--space-6)",
                  color: "var(--color-white)",
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "var(--space-4)", borderBottom: "1px solid rgba(255, 255, 255, 0.1)", paddingBottom: "var(--space-3)" }}>
                    <div>
                      <div style={{ fontSize: "0.75rem", color: "var(--color-teal)", textTransform: "uppercase", fontWeight: 700, letterSpacing: "0.08em" }}>
                        Sample Live Breakdown
                      </div>
                      <div style={{ fontSize: "1rem", fontWeight: 700, color: "var(--color-white)", marginTop: "2px" }}>
                        E-commerce Web Platform
                      </div>
                    </div>
                    <span style={{
                      backgroundColor: "rgba(53, 196, 224, 0.15)",
                      color: "var(--color-teal)",
                      fontSize: "0.75rem",
                      fontWeight: 600,
                      padding: "0.25rem 0.5rem",
                      borderRadius: "var(--radius-sm)",
                    }}>
                      Instant Estimate
                    </span>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)", marginBottom: "var(--space-6)", fontSize: "0.875rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", color: "rgba(255, 255, 255, 0.8)" }}>
                      <span>Online Store Core Base (1-5 products)</span>
                      <span style={{ fontWeight: 600, color: "var(--color-white)" }}>GH₵ 3,500</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", color: "rgba(255, 255, 255, 0.8)" }}>
                      <span>Paystack Mobile Money & Card Gateway</span>
                      <span style={{ fontWeight: 600, color: "var(--color-white)" }}>+GH₵ 600</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", color: "rgba(255, 255, 255, 0.8)" }}>
                      <span>WhatsApp Direct Checkout Order Button</span>
                      <span style={{ fontWeight: 600, color: "var(--color-white)" }}>+GH₵ 300</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", color: "rgba(255, 255, 255, 0.8)" }}>
                      <span>Standard Delivery Schedule (3 weeks)</span>
                      <span style={{ fontWeight: 600, color: "var(--color-teal)" }}>1.0x</span>
                    </div>
                  </div>

                  <div style={{
                    backgroundColor: "rgba(255, 255, 255, 0.04)",
                    borderRadius: "var(--radius-md)",
                    padding: "var(--space-4)",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}>
                    <div>
                      <div style={{ fontSize: "0.75rem", color: "rgba(255, 255, 255, 0.6)", textTransform: "uppercase" }}>
                        Calculated Estimate Range
                      </div>
                      <div style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--color-teal)" }}>
                        GH₵ 4,400 – 4,800
                      </div>
                    </div>
                    <Link href="/request" className="btn btn--primary btn--sm" style={{ fontWeight: 600 }}>
                      Customize Yours
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Real Engineering Commitments */}
        <section aria-label="Our commitments to your business" style={{ padding: "var(--space-12) 0", borderBottom: "1px solid var(--color-border)" }}>
          <div className="container">
            <div style={{ textAlign: "center", maxWidth: "600px", margin: "0 auto var(--space-10)" }}>
              <h2 style={{ fontSize: "1.75rem", marginBottom: "var(--space-2)" }}>
                Built on engineering rigor, not vague promises
              </h2>
              <p style={{ color: "var(--color-muted)", fontSize: "1rem" }}>
                Every digital product built at Codey Dev follows contractual guarantees tailored to the Ghanaian business environment.
              </p>
            </div>

            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "var(--space-8)",
            }}>
              {CREDIBILITY_PILLARS.map((pillar) => (
                <div key={pillar.title} style={{ display: "flex", flexDirection: "column", gap: "var(--space-2)" }}>
                  <div style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "var(--radius-md)",
                    backgroundColor: "var(--color-teal-tint)",
                    color: "#0E7490",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "var(--space-2)",
                  }}>
                    <ShieldCheckIcon size={22} />
                  </div>
                  <h3 style={{ fontSize: "1.125rem", fontWeight: 700, color: "var(--color-navy-dark)", margin: 0 }}>
                    {pillar.title}
                  </h3>
                  <p style={{ color: "var(--color-text)", fontSize: "0.875rem", lineHeight: 1.6, margin: 0 }}>
                    {pillar.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services Catalog */}
        <section
          id="services"
          style={{ backgroundColor: "var(--color-surface)", padding: "var(--space-16) 0" }}
          aria-labelledby="services-heading"
        >
          <div className="container">
            <div style={{ maxWidth: "640px", marginBottom: "var(--space-10)" }}>
              <h2
                id="services-heading"
                style={{ fontSize: "2rem", marginBottom: "var(--space-3)" }}
              >
                Engineering services available for instant estimation
              </h2>
              <p style={{ color: "var(--color-muted)", fontSize: "1rem" }}>
                Select any discipline to launch its specialized multi-step scoping wizard.
              </p>
            </div>

            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "var(--space-6)",
            }}>
              {SERVICE_ITEMS.map((svc) => (
                <Link
                  key={svc.title}
                  href="/request"
                  style={{
                    display: "block",
                    backgroundColor: "var(--color-white)",
                    borderRadius: "var(--radius-md)",
                    border: "1px solid var(--color-border)",
                    padding: "var(--space-6)",
                    textDecoration: "none",
                    transition: "all var(--transition-default)",
                    boxShadow: "var(--shadow-sm)",
                  }}
                  className="contact-channel-card"
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "var(--space-4)" }}>
                    <div style={{
                      width: "48px",
                      height: "48px",
                      borderRadius: "var(--radius-md)",
                      backgroundColor: "var(--color-navy-dark)",
                      color: "var(--color-teal)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}>
                      {svc.icon}
                    </div>
                    <span style={{
                      fontSize: "0.8125rem",
                      fontWeight: 700,
                      color: "var(--color-navy-dark)",
                      backgroundColor: "var(--color-surface)",
                      padding: "0.25rem 0.625rem",
                      borderRadius: "var(--radius-sm)",
                    }}>
                      {svc.tag}
                    </span>
                  </div>

                  <h3 style={{ fontSize: "1.1875rem", fontWeight: 700, color: "var(--color-navy-dark)", marginBottom: "var(--space-2)" }}>
                    {svc.title}
                  </h3>
                  <p style={{ color: "var(--color-muted)", fontSize: "0.875rem", lineHeight: 1.6, margin: 0 }}>
                    {svc.desc}
                  </p>
                </Link>
              ))}
            </div>

            <div style={{ textAlign: "center", marginTop: "var(--space-10)" }}>
              <Link href="/request" className="btn btn--primary btn--lg">
                Open Scoping Wizard
              </Link>
            </div>
          </div>
        </section>

        {/* How It Works: 4 Concrete Steps */}
        <section id="how-it-works" style={{ padding: "var(--space-16) 0" }} aria-labelledby="how-heading">
          <div className="container">
            <div style={{ textAlign: "center", maxWidth: "600px", margin: "0 auto var(--space-12)" }}>
              <h2 id="how-heading" style={{ fontSize: "2rem", marginBottom: "var(--space-3)" }}>
                How quotation and delivery work
              </h2>
              <p style={{ color: "var(--color-muted)", fontSize: "1rem" }}>
                A structured four-step methodology ensuring complete transparency before a single line of code is written.
              </p>
            </div>

            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "var(--space-8)",
            }}>
              {[
                {
                  step: "01",
                  title: "Scope selection",
                  desc: "Choose your service and tick required modules (payment gateway, user accounts, CMS) to see immediate price feedback.",
                },
                {
                  step: "02",
                  title: "Review and proposal",
                  desc: "Within 24 hours, our technical lead audits your brief, verifies feasibility, and sends a formal contract quote.",
                },
                {
                  step: "03",
                  title: "Sprint execution",
                  desc: "Development begins upon 50% deposit. You receive weekly staging builds and direct WhatsApp updates.",
                },
                {
                  step: "04",
                  title: "Handoff and launch",
                  desc: "After final testing and sign-off, remaining balance is settled. All source repositories, hosting credentials, and manuals are handed over.",
                },
              ].map((item) => (
                <div key={item.step} style={{ borderLeft: "3px solid var(--color-teal)", paddingLeft: "var(--space-4)" }}>
                  <div style={{ fontFamily: "var(--font-heading)", fontSize: "1.75rem", fontWeight: 800, color: "var(--color-teal)", marginBottom: "var(--space-2)" }}>
                    {item.step}
                  </div>
                  <h3 style={{ fontSize: "1.125rem", fontWeight: 700, color: "var(--color-navy-dark)", marginBottom: "var(--space-2)" }}>
                    {item.title}
                  </h3>
                  <p style={{ color: "var(--color-muted)", fontSize: "0.875rem", lineHeight: 1.6, margin: 0 }}>
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Practical Founder FAQ */}
        <section style={{ backgroundColor: "var(--color-surface)", padding: "var(--space-16) 0" }}>
          <div className="container" style={{ maxWidth: "800px" }}>
            <div style={{ textAlign: "center", marginBottom: "var(--space-10)" }}>
              <h2 style={{ fontSize: "1.875rem", marginBottom: "var(--space-2)" }}>
                Frequently asked questions
              </h2>
              <p style={{ color: "var(--color-muted)" }}>
                Common questions about our pricing structure and contracts.
              </p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-6)" }}>
              {[
                {
                  q: "How accurate is the instant online estimate?",
                  a: "The online estimate calculates exact historical line items. Unless your custom requirements involve third-party API fees or unlisted integrations, our formal contract quote will match within the estimated range.",
                },
                {
                  q: "What payment milestones do you accept?",
                  a: "Standard projects operate on a 50% upfront deposit to commence engineering, with the final 50% payable upon staging approval before production deployment and code transfer. We accept MTN Mobile Money, Telecel Cash, and direct bank transfer.",
                },
                {
                  q: "Who owns the intellectual property and code?",
                  a: "You retain full ownership. Once the final milestone is completed, all GitHub repositories, database schemas, and documentation are transferred to your accounts.",
                },
                {
                  q: "What happens if our requirements change mid-project?",
                  a: "Scope changes are documented through a written change request with exact price impact agreed upon before implementing, avoiding surprise invoices.",
                },
              ].map((faq) => (
                <div key={faq.q} style={{ backgroundColor: "var(--color-white)", padding: "var(--space-6)", borderRadius: "var(--radius-md)", border: "1px solid var(--color-border)" }}>
                  <h3 style={{ fontSize: "1.0625rem", fontWeight: 700, color: "var(--color-navy-dark)", marginBottom: "var(--space-2)" }}>
                    {faq.q}
                  </h3>
                  <p style={{ color: "var(--color-text)", fontSize: "0.875rem", lineHeight: 1.6, margin: 0 }}>
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
