"use client";

import { useRouter, useParams } from "next/navigation";
import { useFormContext } from "../../../../lib/form-context";
import { formatPriceRange } from "@codey/engine";

const OPTION_TYPE_GROUPS: Record<string, string> = {
  page: "Pages",
  feature: "Features",
  integration: "Integrations",
};

export default function FeaturesPage() {
  const { formState, services, estimatedMin, estimatedMax, toggleOption } = useFormContext();
  const router = useRouter();
  const params = useParams<{ service: string }>();

  const service = services.find(
    (s) => s.slug === (formState.serviceSlug || params?.service)
  );

  if (!service) {
    return (
      <div className="container" style={{ padding: "var(--space-10) 0" }}>
        <p>Please <a href="/request">start from the beginning</a>.</p>
      </div>
    );
  }

  const featureOptions = service.options.filter(
    (o) => o.optionType !== "subtype" && o.optionType !== "timeline"
  );

  const grouped = featureOptions.reduce<Record<string, typeof featureOptions>>((acc, opt) => {
    const group = OPTION_TYPE_GROUPS[opt.optionType] ?? "Other";
    if (!acc[group]) acc[group] = [];
    acc[group]!.push(opt);
    return acc;
  }, {});

  const priceDisplay =
    estimatedMin === 0
      ? "Select options to see estimate"
      : formatPriceRange({ min: estimatedMin, max: estimatedMax });

  const selectedFeatureLabels = formState.selectedOptionIds.flatMap((id) => {
    const opt = service.options.find((o) => o.id === id);
    if (!opt || opt.optionType === "timeline") return [];
    return [{ label: opt.label, price: Number(opt.priceImpact) }];
  });

  return (
    <>
      <div
        className="progress-bar"
        role="progressbar"
        aria-valuenow={3}
        aria-valuemin={1}
        aria-valuemax={6}
        aria-label="Step 3 of 6"
      >
        <div className="container">
          <div className="progress-bar__inner">
            <span className="progress-bar__label">Step 3 of 6</span>
            <div className="progress-bar__track">
              <div className="progress-bar__fill" style={{ width: "50%" }} />
            </div>
            <span className="progress-bar__label">Features</span>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="step-layout">
          {/* Feature checklist */}
          <div style={{ paddingTop: "var(--space-8)" }}>
            <a
              href={`/request/${service.slug}`}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "var(--space-2)",
                color: "var(--color-teal)",
                fontSize: "0.875rem",
                fontWeight: 500,
                marginBottom: "var(--space-6)",
                textDecoration: "none",
              }}
            >
              ← Back
            </a>
            <h1 style={{ marginBottom: "var(--space-2)" }}>Select the features you need</h1>
            <p style={{ color: "var(--color-muted)", marginBottom: "var(--space-8)" }}>
              Each option shows how it affects your estimate. You can change selections any time.
            </p>

            {Object.entries(grouped).map(([groupName, opts]) => (
              <div key={groupName} className="checklist-group">
                <p className="checklist-group__heading">{groupName}</p>
                {opts.map((opt) => {
                  const isChecked = formState.selectedOptionIds.includes(opt.id);
                  const priceLabel =
                    Number(opt.priceImpact) === 0
                      ? ""
                      : `+GH₵ ${Number(opt.priceImpact).toLocaleString("en-GH")}`;

                  return (
                    <label
                      key={opt.id}
                      className="checklist-item"
                      htmlFor={`opt-${opt.id}`}
                    >
                      <input
                        id={`opt-${opt.id}`}
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleOption(opt.id, service.options)}
                        aria-describedby={opt.helperText ? `help-${opt.id}` : undefined}
                      />
                      <span className="checklist-item__label">
                        {opt.label}
                        {opt.helperText && (
                          <span
                            id={`help-${opt.id}`}
                            style={{
                              display: "block",
                              fontSize: "0.8125rem",
                              color: "var(--color-muted)",
                              marginTop: 2,
                            }}
                          >
                            {opt.helperText}
                          </span>
                        )}
                      </span>
                      {priceLabel && (
                        <span className="checklist-item__price">{priceLabel}</span>
                      )}
                    </label>
                  );
                })}
              </div>
            ))}

            <button
              type="button"
              className="btn btn--navy btn--lg"
              onClick={() => router.push(`/request/${service.slug}/timeline`)}
              style={{ marginTop: "var(--space-4)" }}
            >
              Choose delivery speed →
            </button>
          </div>

          {/* Live estimate panel */}
          <div style={{ paddingTop: "var(--space-8)" }}>
            <div className="estimate-panel" aria-live="polite" aria-label="Live price estimate">
              <p className="estimate-panel__label">Estimated price</p>
              <p className="estimate-panel__range">{priceDisplay}</p>
              {selectedFeatureLabels.length > 0 && (
                <div className="estimate-panel__items">
                  <div className="estimate-panel__item">
                    <span className="estimate-panel__item-label">
                      {service.name} (base)
                    </span>
                    <span className="estimate-panel__item-amount">
                      GH₵ {Number(service.basePriceMin).toLocaleString("en-GH")} –{" "}
                      {Number(service.basePriceMax).toLocaleString("en-GH")}
                    </span>
                  </div>
                  {selectedFeatureLabels.map((item) => (
                    <div key={item.label} className="estimate-panel__item">
                      <span className="estimate-panel__item-label">{item.label}</span>
                      <span className="estimate-panel__item-amount">
                        +GH₵ {item.price.toLocaleString("en-GH")}
                      </span>
                    </div>
                  ))}
                </div>
              )}
              <p
                style={{
                  color: "rgba(255,255,255,0.4)",
                  fontSize: "0.75rem",
                  marginTop: "var(--space-4)",
                  marginBottom: 0,
                }}
              >
                Includes 12% revision buffer. Final quote confirmed after review.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
