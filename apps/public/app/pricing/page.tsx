import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "../../components/SiteHeader";
import SiteFooter from "../../components/SiteFooter";

export const metadata: Metadata = {
  title: "Pricing — What Does It Cost?",
  description:
    "Transparent, GH₵-denominated pricing for web design, custom software, mobile app development, maintenance, and SEO services from Codey Dev.",
};

interface ServiceOption {
  id: string;
  label: string;
  optionType: string;
  priceImpact: string | number;
  isMultiplier: boolean;
  multiplierValue: string | number | null;
  helperText?: string | null;
}

interface ServiceData {
  id: string;
  name: string;
  slug: string;
  description: string;
  basePriceMin: string | number;
  basePriceMax: string | number;
  options: ServiceOption[];
}

// Fallback pricing data matching Codey Dev catalog if API is offline
const FALLBACK_SERVICES: ServiceData[] = [
  {
    id: "web-design",
    name: "Web Design & Development",
    slug: "web-design",
    description: "Corporate websites, online stores, and customer web applications",
    basePriceMin: 2000,
    basePriceMax: 8000,
    options: [
      { id: "1", label: "Business website (1–5 pages)", optionType: "subtype", priceImpact: 2000, isMultiplier: false, multiplierValue: null },
      { id: "2", label: "E-commerce / Online Store", optionType: "subtype", priceImpact: 5000, isMultiplier: false, multiplierValue: null },
      { id: "3", label: "School / NGO / Corporate portal", optionType: "subtype", priceImpact: 3000, isMultiplier: false, multiplierValue: null },
      { id: "4", label: "Extra pages (6–10)", optionType: "page", priceImpact: 1200, isMultiplier: false, multiplierValue: null },
      { id: "5", label: "Booking / Appointment system", optionType: "feature", priceImpact: 2000, isMultiplier: false, multiplierValue: null },
      { id: "6", label: "Admin / CMS content panel", optionType: "feature", priceImpact: 1500, isMultiplier: false, multiplierValue: null },
      { id: "7", label: "Paystack & Mobile Money integration", optionType: "integration", priceImpact: 1200, isMultiplier: false, multiplierValue: null },
      { id: "8", label: "Rush delivery schedule", optionType: "timeline", priceImpact: 0, isMultiplier: true, multiplierValue: 1.25 },
    ],
  },
  {
    id: "custom-software",
    name: "Custom Software Development",
    slug: "custom-software",
    description: "POS systems, inventory tracking, HR payroll, and internal business platforms",
    basePriceMin: 8000,
    basePriceMax: 20000,
    options: [
      { id: "9", label: "POS / Inventory system", optionType: "subtype", priceImpact: 8000, isMultiplier: false, multiplierValue: null },
      { id: "10", label: "HR Management system", optionType: "subtype", priceImpact: 10000, isMultiplier: false, multiplierValue: null },
      { id: "11", label: "School Management system", optionType: "subtype", priceImpact: 12000, isMultiplier: false, multiplierValue: null },
      { id: "12", label: "Reports & analytics dashboard", optionType: "feature", priceImpact: 2000, isMultiplier: false, multiplierValue: null },
      { id: "13", label: "Multi-branch / Multi-user access", optionType: "feature", priceImpact: 2000, isMultiplier: false, multiplierValue: null },
      { id: "14", label: "Payroll processing module", optionType: "feature", priceImpact: 2500, isMultiplier: false, multiplierValue: null },
      { id: "15", label: "Paystack / MoMo API integration", optionType: "integration", priceImpact: 1200, isMultiplier: false, multiplierValue: null },
      { id: "16", label: "Rush delivery schedule", optionType: "timeline", priceImpact: 0, isMultiplier: true, multiplierValue: 1.25 },
    ],
  },
  {
    id: "mobile-app",
    name: "Mobile App Development",
    slug: "mobile-app",
    description: "Native and cross-platform mobile apps for Android and iOS devices",
    basePriceMin: 6000,
    basePriceMax: 18000,
    options: [
      { id: "17", label: "Android only", optionType: "subtype", priceImpact: 6000, isMultiplier: false, multiplierValue: null },
      { id: "18", label: "iOS only", optionType: "subtype", priceImpact: 6000, isMultiplier: false, multiplierValue: null },
      { id: "19", label: "Android + iOS (shared codebase)", optionType: "subtype", priceImpact: 10000, isMultiplier: false, multiplierValue: null },
      { id: "20", label: "Push notifications engine", optionType: "feature", priceImpact: 1000, isMultiplier: false, multiplierValue: null },
      { id: "21", label: "In-app chat / messaging", optionType: "feature", priceImpact: 2500, isMultiplier: false, multiplierValue: null },
      { id: "22", label: "Admin web panel", optionType: "feature", priceImpact: 2500, isMultiplier: false, multiplierValue: null },
      { id: "23", label: "Paystack / MoMo payments", optionType: "integration", priceImpact: 1500, isMultiplier: false, multiplierValue: null },
      { id: "24", label: "Rush delivery schedule", optionType: "timeline", priceImpact: 0, isMultiplier: true, multiplierValue: 1.25 },
    ],
  },
  {
    id: "maintenance",
    name: "Website Maintenance & Support",
    slug: "maintenance",
    description: "Retainers, security updates, daily backups, and ongoing web care",
    basePriceMin: 500,
    basePriceMax: 2000,
    options: [
      { id: "25", label: "Basic monthly retainer (up to 4 hrs)", optionType: "subtype", priceImpact: 500, isMultiplier: false, multiplierValue: null },
      { id: "26", label: "Standard monthly retainer (up to 8 hrs)", optionType: "subtype", priceImpact: 1000, isMultiplier: false, multiplierValue: null },
      { id: "27", label: "Security & plugin updates", optionType: "feature", priceImpact: 300, isMultiplier: false, multiplierValue: null },
      { id: "28", label: "Performance optimization", optionType: "feature", priceImpact: 500, isMultiplier: false, multiplierValue: null },
      { id: "29", label: "Monthly automated backup", optionType: "feature", priceImpact: 200, isMultiplier: false, multiplierValue: null },
    ],
  },
  {
    id: "seo",
    name: "Technical SEO Services",
    slug: "seo",
    description: "Search engine optimization, Google Business profile, and local ranking",
    basePriceMin: 1000,
    basePriceMax: 4000,
    options: [
      { id: "30", label: "One-off SEO comprehensive audit", optionType: "subtype", priceImpact: 1000, isMultiplier: false, multiplierValue: null },
      { id: "31", label: "Monthly SEO management", optionType: "subtype", priceImpact: 1500, isMultiplier: false, multiplierValue: null },
      { id: "32", label: "Keyword research & competitor audit", optionType: "feature", priceImpact: 500, isMultiplier: false, multiplierValue: null },
      { id: "33", label: "On-page optimization", optionType: "feature", priceImpact: 800, isMultiplier: false, multiplierValue: null },
      { id: "34", label: "Google Business Profile setup", optionType: "feature", priceImpact: 400, isMultiplier: false, multiplierValue: null },
      { id: "35", label: "Local SEO (Ghana market)", optionType: "feature", priceImpact: 800, isMultiplier: false, multiplierValue: null },
    ],
  },
];

async function loadPricingCatalog(): Promise<ServiceData[]> {
  const apiUrl = process.env["NEXT_PUBLIC_API_URL"] ?? "http://localhost:3002";
  try {
    const res = await fetch(`${apiUrl}/api/v1/services`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return FALLBACK_SERVICES;
    const json = await res.json();
    if (json.success && Array.isArray(json.data) && json.data.length > 0) {
      return json.data;
    }
    return FALLBACK_SERVICES;
  } catch {
    return FALLBACK_SERVICES;
  }
}

export default async function PricingPage() {
  const services = await loadPricingCatalog();

  const formatPrice = (val: number | string) => {
    const num = typeof val === "string" ? parseFloat(val) : val;
    return new Intl.NumberFormat("en-GH", {
      style: "currency",
      currency: "GHS",
      maximumFractionDigits: 0,
    }).format(num || 0);
  };

  return (
    <>
      <SiteHeader />
      <main id="main-content">
        <section
          style={{
            backgroundColor: "var(--color-navy-dark)",
            padding: "var(--space-12) 0 var(--space-10)",
          }}
        >
          <div className="container" style={{ textAlign: "center" }}>

            <h1 style={{ color: "var(--color-white)", marginBottom: "var(--space-4)" }}>
              What does it cost?
            </h1>
            <p style={{ color: "rgba(255,255,255,0.7)", maxWidth: 520, margin: "0 auto var(--space-6)" }}>
              All prices are in Ghana Cedis (GH₵). Estimates include a 12% contingency
              buffer. Final pricing is confirmed after reviewing your specific
              requirements.
            </p>
            <Link href="/request" className="btn btn--primary">
              Calculate Custom Quote
            </Link>
          </div>
        </section>

        <div className="container" style={{ padding: "var(--space-12) 0" }}>
          {services.map((service) => (
            <section
              key={service.id}
              style={{ marginBottom: "var(--space-12)" }}
              aria-labelledby={`pricing-${service.slug}`}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  justifyContent: "space-between",
                  gap: "var(--space-4)",
                  flexWrap: "wrap",
                  marginBottom: "var(--space-4)",
                  paddingBottom: "var(--space-4)",
                  borderBottom: "2px solid var(--color-navy-dark)",
                }}
              >
                <div>
                  <h2
                    id={`pricing-${service.slug}`}
                    style={{ fontSize: "1.25rem", margin: "0 0 var(--space-1)" }}
                  >
                    {service.name}
                  </h2>
                  {service.description && (
                    <p style={{ fontSize: "0.875rem", color: "var(--color-muted)", margin: 0 }}>
                      {service.description}
                    </p>
                  )}
                </div>
                <span
                  style={{
                    color: "var(--color-teal)",
                    fontSize: "1.125rem",
                    fontWeight: 700,
                  }}
                >
                  {formatPrice(service.basePriceMin)} – {formatPrice(service.basePriceMax)}
                </span>
              </div>

              <div
                style={{
                  border: "1px solid var(--color-border)",
                  borderRadius: "var(--radius-md)",
                  overflow: "hidden",
                }}
              >
                <table
                  style={{ width: "100%", borderCollapse: "collapse" }}
                  aria-label={`${service.name} pricing breakdown`}
                >
                  <thead className="visually-hidden">
                    <tr>
                      <th>Feature / Scope Option</th>
                      <th>Price Impact</th>
                    </tr>
                  </thead>
                  <tbody>
                    {service.options && service.options.length > 0 ? (
                      service.options.map((opt, i) => {
                        const priceDisplay = opt.isMultiplier
                          ? `+${Math.round(((Number(opt.multiplierValue) || 1.25) - 1) * 100)}% rush fee`
                          : Number(opt.priceImpact) > 0
                          ? `+${formatPrice(opt.priceImpact)}`
                          : "Included";

                        return (
                          <tr
                            key={opt.id}
                            style={{
                              backgroundColor: i % 2 === 0 ? "var(--color-white)" : "var(--color-alt-row)",
                              borderBottom: "1px solid var(--color-border)",
                            }}
                          >
                            <td
                              style={{
                                padding: "var(--space-3) var(--space-5)",
                                fontSize: "0.9375rem",
                                color: "var(--color-text)",
                              }}
                            >
                              <div style={{ fontWeight: 500 }}>{opt.label}</div>
                              {opt.helperText && (
                                <div style={{ fontSize: "0.75rem", color: "var(--color-muted)", marginTop: "2px" }}>
                                  {opt.helperText}
                                </div>
                              )}
                            </td>
                            <td
                              style={{
                                padding: "var(--space-3) var(--space-5)",
                                fontSize: "0.9375rem",
                                fontWeight: 600,
                                color: "var(--color-navy-dark)",
                                textAlign: "right",
                                whiteSpace: "nowrap",
                              }}
                            >
                              {priceDisplay}
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td
                          colSpan={2}
                          style={{
                            padding: "var(--space-4) var(--space-5)",
                            color: "var(--color-muted)",
                            fontSize: "0.875rem",
                            textAlign: "center",
                          }}
                        >
                          Custom quoted per project scope.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              <div style={{ marginTop: "var(--space-4)", textAlign: "right" }}>
                <Link
                  href={`/request/${service.slug}`}
                  className="btn btn--teal-outline btn--sm"
                  aria-label={`Configure quote for ${service.name}`}
                >
                  Configure scope for this service →
                </Link>
              </div>
            </section>
          ))}

          <div
            className="callout"
            style={{ maxWidth: 640 }}
          >
            <p className="callout__text">
              <strong>Note:</strong> All prices shown reflect live catalog values managed by Codey Dev
              and include a 12% contingency buffer for revisions. A final confirmed
              price is agreed upon after Codey Dev reviews your specific
              requirements. Payment is 50% deposit up front, 50% on delivery.
            </p>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
