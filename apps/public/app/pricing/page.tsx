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

import { loadServices } from "../../lib/services";

export default async function PricingPage() {
  const services = await loadServices();

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
