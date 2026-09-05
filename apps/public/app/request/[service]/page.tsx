"use client";

import { useRouter, useParams } from "next/navigation";
import { useFormContext } from "../../../lib/form-context";

export default function SubTypePage() {
  const params = useParams<{ service: string }>();
  const routeSlug = params?.service;
  const { formState, services, toggleOption } = useFormContext();
  const router = useRouter();

  const service = services.find((s) => s.slug === (formState.serviceSlug || routeSlug));
  if (!service) {
    return (
      <div className="container" style={{ padding: "var(--space-10) 0" }}>
        <p>
          Service not found. <a href="/request">Start over</a>
        </p>
      </div>
    );
  }

  const subtypeOptions = service.options.filter((o) => o.optionType === "subtype");
  const selectedSubtypeId = formState.selectedOptionIds.find((id) =>
    subtypeOptions.some((o) => o.id === id)
  );

  function handleContinue() {
    if (!selectedSubtypeId) return;
    router.push(`/request/${service!.slug}/features`);
  }

  return (
    <>
      <div
        className="progress-bar"
        role="progressbar"
        aria-valuenow={2}
        aria-valuemin={1}
        aria-valuemax={6}
        aria-label="Step 2 of 6"
      >
        <div className="container">
          <div className="progress-bar__inner">
            <span className="progress-bar__label">Step 2 of 6</span>
            <div className="progress-bar__track">
              <div className="progress-bar__fill" style={{ width: "33.33%" }} />
            </div>
            <span className="progress-bar__label">Project Type</span>
          </div>
        </div>
      </div>

      <div className="container" style={{ paddingTop: "var(--space-10)", paddingBottom: "var(--space-12)" }}>
        <a
          href="/request"
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

        <h1 style={{ marginBottom: "var(--space-2)" }}>
          What type of {service.name.toLowerCase()} do you need?
        </h1>
        <p style={{ color: "var(--color-muted)", marginBottom: "var(--space-8)" }}>
          Select one option to continue.
        </p>

        {subtypeOptions.length === 0 ? (
          <div className="callout">
            <p className="callout__text">
              This service does not have specific sub-types — continue to select features.
            </p>
          </div>
        ) : (
          <div
            style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)" }}
            role="radiogroup"
            aria-label="Project sub-type"
          >
            {subtypeOptions.map((opt) => {
              const selected = opt.id === selectedSubtypeId;
              return (
                <button
                  key={opt.id}
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  className={`radio-card${selected ? " radio-card--selected" : ""}`}
                  onClick={() => toggleOption(opt.id, service.options)}
                >
                  <div
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: "50%",
                      border: `2px solid ${selected ? "var(--color-teal)" : "var(--color-border-strong)"}`,
                      backgroundColor: selected ? "var(--color-teal)" : "transparent",
                      flexShrink: 0,
                      marginTop: 2,
                      transition: "all var(--transition-fast)",
                    }}
                    aria-hidden="true"
                  />
                  <div>
                    <p className="radio-card__title">{opt.label}</p>
                    {opt.helperText && (
                      <p className="radio-card__desc">{opt.helperText}</p>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        )}

        <div style={{ marginTop: "var(--space-8)" }}>
          <button
            type="button"
            className="btn btn--navy btn--lg"
            onClick={handleContinue}
            disabled={subtypeOptions.length > 0 && !selectedSubtypeId}
            style={{
              opacity: subtypeOptions.length > 0 && !selectedSubtypeId ? 0.5 : 1,
              cursor: subtypeOptions.length > 0 && !selectedSubtypeId ? "not-allowed" : "pointer",
            }}
          >
            Select features →
          </button>
        </div>
      </div>
    </>
  );
}
