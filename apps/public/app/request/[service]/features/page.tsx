"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useFormContext, type CustomRequirement } from "../../../../lib/form-context";
import { formatPriceRange } from "@codey/engine";

const GROUP_ORDER: Array<{ type: string; title: string; subtitle: string; placeholder: string; customType: "page" | "feature" | "integration" }> = [
  {
    type: "page",
    title: "Pages & Screen Scope",
    subtitle: "Select the pages you want designed, or add your own custom page.",
    placeholder: "Add custom page (e.g., Investor Relations, 3D Showcase)...",
    customType: "page",
  },
  {
    type: "feature",
    title: "Core Features & Modules",
    subtitle: "Select functionalities and tools for your project.",
    placeholder: "Add custom feature (e.g., Transcript Generator, Biometric Login)...",
    customType: "feature",
  },
  {
    type: "integration",
    title: "Integrations & Third-Party Services",
    subtitle: "Connect payment gateways, SMS gateways, APIs, or marketing tools.",
    placeholder: "Add custom integration (e.g., Aramex API, Customs / GRA Sync)...",
    customType: "integration",
  },
];

export default function FeaturesPage() {
  const {
    formState,
    services,
    estimatedMin,
    estimatedMax,
    toggleOption,
    addCustomRequirement,
    removeCustomRequirement,
  } = useFormContext();

  const router = useRouter();
  const params = useParams<{ service: string }>();

  const [customInputs, setCustomInputs] = useState<{ page: string; feature: string; integration: string }>({
    page: "",
    feature: "",
    integration: "",
  });

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

  const priceDisplay =
    estimatedMin === 0
      ? "Select options to see estimate"
      : formatPriceRange({ min: estimatedMin, max: estimatedMax });

  const selectedFeatureLabels = formState.selectedOptionIds.flatMap((id) => {
    const opt = service.options.find((o) => o.id === id);
    if (!opt || opt.optionType === "timeline" || opt.optionType === "subtype") return [];
    return [{ label: opt.label, price: Number(opt.priceImpact) }];
  });

  const handleAddCustom = (type: "page" | "feature" | "integration") => {
    const value = customInputs[type].trim();
    if (!value) return;
    addCustomRequirement(value, type);
    setCustomInputs((prev) => ({ ...prev, [type]: "" }));
  };

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
            <span className="progress-bar__label">Scope & Features</span>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="step-layout">
          {/* Main Feature & Custom Checklist */}
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
              ← Back to Project Type
            </a>
            <h1 style={{ marginBottom: "var(--space-2)" }}>Customize your scope &amp; features</h1>
            <p style={{ color: "var(--color-muted)", marginBottom: "var(--space-8)" }}>
              Choose from standard options below, or type in your own custom requirements. You can adjust these at any time.
            </p>

            {GROUP_ORDER.map((group) => {
              const opts = featureOptions.filter((o) => o.optionType === group.type);
              const customItemsInGroup = formState.customRequirements.filter(
                (item) => item.type === group.customType
              );

              if (opts.length === 0 && customItemsInGroup.length === 0) return null;

              return (
                <div key={group.type} className="checklist-group" style={{ marginBottom: "var(--space-8)" }}>
                  <div style={{ marginBottom: "var(--space-3)" }}>
                    <p className="checklist-group__heading" style={{ marginBottom: "0.25rem" }}>
                      {group.title}
                    </p>
                    <p style={{ fontSize: "0.8125rem", color: "var(--color-muted)", margin: 0 }}>
                      {group.subtitle}
                    </p>
                  </div>

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

                  {/* Render Custom User Items */}
                  {customItemsInGroup.length > 0 && (
                    <div style={{ marginTop: "var(--space-3)", display: "flex", flexDirection: "column", gap: "var(--space-2)" }}>
                      {customItemsInGroup.map((item) => (
                        <div
                          key={item.id}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            padding: "0.625rem 0.875rem",
                            backgroundColor: "rgba(10, 186, 181, 0.08)",
                            border: "1px solid var(--color-teal)",
                            borderRadius: "var(--radius-md)",
                            fontSize: "0.875rem",
                          }}
                        >
                          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                            <span
                              style={{
                                fontSize: "0.7rem",
                                fontWeight: 700,
                                textTransform: "uppercase",
                                padding: "0.15rem 0.4rem",
                                borderRadius: "4px",
                                backgroundColor: "var(--color-teal)",
                                color: "#0A1628",
                              }}
                            >
                              Custom
                            </span>
                            <span style={{ fontWeight: 500, color: "var(--color-navy)" }}>{item.name}</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeCustomRequirement(item.id)}
                            style={{
                              background: "none",
                              border: "none",
                              color: "#DC2626",
                              cursor: "pointer",
                              fontSize: "1rem",
                              padding: "0.25rem",
                              lineHeight: 1,
                            }}
                            aria-label={`Remove custom item ${item.name}`}
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Add Custom Item Input */}
                  <div
                    style={{
                      marginTop: "var(--space-3)",
                      display: "flex",
                      gap: "var(--space-2)",
                      alignItems: "center",
                    }}
                  >
                    <input
                      type="text"
                      className="form-input"
                      placeholder={group.placeholder}
                      value={customInputs[group.customType]}
                      onChange={(e) =>
                        setCustomInputs((prev) => ({
                          ...prev,
                          [group.customType]: e.target.value,
                        }))
                      }
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleAddCustom(group.customType);
                        }
                      }}
                      style={{ fontSize: "0.875rem", padding: "0.5rem 0.75rem" }}
                    />
                    <button
                      type="button"
                      className="btn btn--outline"
                      onClick={() => handleAddCustom(group.customType)}
                      style={{ fontSize: "0.8125rem", whiteSpace: "nowrap", padding: "0.5rem 0.875rem" }}
                    >
                      + Add
                    </button>
                  </div>
                </div>
              );
            })}

            <button
              type="button"
              className="btn btn--navy btn--lg"
              onClick={() => router.push(`/request/${service.slug}/timeline`)}
              style={{ marginTop: "var(--space-4)", marginBottom: "var(--space-8)" }}
            >
              Choose delivery speed →
            </button>
          </div>

          {/* Live estimate panel */}
          <div style={{ paddingTop: "var(--space-8)" }}>
            <div className="estimate-panel" aria-live="polite" aria-label="Live price estimate">
              <p className="estimate-panel__label">Estimated price</p>
              <p className="estimate-panel__range">{priceDisplay}</p>

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

                {formState.customRequirements.length > 0 && (
                  <div
                    style={{
                      marginTop: "var(--space-3)",
                      paddingTop: "var(--space-3)",
                      borderTop: "1px solid rgba(255,255,255,0.1)",
                    }}
                  >
                    <p
                      style={{
                        color: "var(--color-teal)",
                        fontSize: "0.75rem",
                        fontWeight: 600,
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                        margin: "0 0 var(--space-2)",
                      }}
                    >
                      Custom Client Additions ({formState.customRequirements.length})
                    </p>
                    {formState.customRequirements.map((item) => (
                      <div
                        key={item.id}
                        className="estimate-panel__item"
                        style={{ fontSize: "0.8125rem" }}
                      >
                        <span className="estimate-panel__item-label">• {item.name}</span>
                        <span className="estimate-panel__item-amount" style={{ color: "rgba(255,255,255,0.6)" }}>
                          Under review
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <p
                style={{
                  color: "rgba(255,255,255,0.5)",
                  fontSize: "0.75rem",
                  marginTop: "var(--space-4)",
                  marginBottom: 0,
                  lineHeight: 1.4,
                }}
              >
                Includes revision buffer. Custom items are individually priced and confirmed during quote review.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
