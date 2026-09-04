import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "../../components/SiteHeader";
import SiteFooter from "../../components/SiteFooter";
import { WhatsAppIcon, EmailIcon, PhoneIcon } from "../../components/Icons";

export const metadata: Metadata = {
  title: "Contact Codey Dev",
  description:
    "Reach Codey Dev by phone, WhatsApp, or email. The fastest way to get a quote is through our online form.",
};

export default function ContactPage() {
  return (
    <>
      <SiteHeader />
      <main id="main-content">
        <section style={{ backgroundColor: "var(--color-navy-dark)", padding: "var(--space-12) 0" }}>
          <div className="container" style={{ textAlign: "center" }}>
            <h1 style={{ color: "var(--color-white)", marginBottom: "var(--space-4)" }}>
              Get in touch
            </h1>
            <p style={{ color: "rgba(255,255,255,0.7)", maxWidth: 480, margin: "0 auto" }}>
              The fastest way to get a price is the online quote form. But if you
              prefer to talk first, you can always reach us directly.
            </p>
          </div>
        </section>

        <div className="container" style={{ padding: "var(--space-12) 0" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "var(--space-6)",
              marginBottom: "var(--space-10)",
            }}
          >
            {[
              {
                icon: <WhatsAppIcon size={30} />,
                label: "WhatsApp",
                value: "0203813606",
                href: "https://wa.me/233203813606",
                hint: "Fastest response — typically replied within a few hours",
              },
              {
                icon: <PhoneIcon size={30} />,
                label: "Telephone / Direct Call",
                value: "0592722997",
                href: "tel:0592722997",
                hint: "Monday – Friday, 8am – 6pm (Ghana Time)",
              },
              {
                icon: <EmailIcon size={30} />,
                label: "Email",
                value: "codey.it360@gmail.com",
                href: "mailto:codey.it360@gmail.com",
                hint: "Formal briefs and inquiries answered within 24 hours",
              },
            ].map((channel) => (
              <a
                key={channel.label}
                href={channel.href}
                target={channel.href.startsWith("http") ? "_blank" : undefined}
                rel={channel.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="contact-channel-card"
                style={{
                  display: "block",
                  border: "2px solid var(--color-border)",
                  borderRadius: "var(--radius-md)",
                  padding: "var(--space-6)",
                  textDecoration: "none",
                  transition: "border-color var(--transition-fast), box-shadow var(--transition-fast)",
                }}
              >
                <span style={{ display: "inline-block", color: "var(--color-navy-dark)", marginBottom: "var(--space-3)" }}>
                  {channel.icon}
                </span>
                <p
                  style={{
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    color: "var(--color-muted)",
                    margin: "0 0 var(--space-1)",
                  }}
                >
                  {channel.label}
                </p>
                <p
                  style={{
                    fontSize: "1.125rem",
                    fontWeight: 700,
                    color: "var(--color-navy-dark)",
                    margin: "0 0 var(--space-2)",
                  }}
                >
                  {channel.value}
                </p>
                <p style={{ fontSize: "0.8125rem", color: "var(--color-muted)", margin: 0 }}>
                  {channel.hint}
                </p>
              </a>
            ))}
          </div>

          <div
            style={{
              borderTop: "1px solid var(--color-border)",
              paddingTop: "var(--space-10)",
              textAlign: "center",
            }}
          >
            <h2 style={{ marginBottom: "var(--space-3)" }}>Prefer the online form?</h2>
            <p style={{ color: "var(--color-muted)", maxWidth: 440, margin: "0 auto var(--space-6)" }}>
              The quote form takes less than 2 minutes and shows you an instant
              price estimate as you pick your requirements.
            </p>
            <Link href="/request" className="btn btn--primary btn--lg">
              Start a Quote Request
            </Link>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
