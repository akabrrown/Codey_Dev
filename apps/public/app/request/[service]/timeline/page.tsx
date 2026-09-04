"use client";

import { useRouter } from "next/navigation";
import { useFormContext } from "../../../../lib/form-context";
import { formatPriceRange } from "@codey/engine";

export default function TimelinePage() {
  const { formState, services, estimatedMin, estimatedMax, toggleOption } = useFormContext();
  const router = useRouter();

  const service = services.find((s) => s.slug === formState.serviceSlug);
  if (!service) {
    return (
      <div className="container" style={{ padding: "var(--space-10) 0" }}>
        <p>Please <a href="/request">start from the beginning</a>.</p>
      </div>
    );
  }

  const timelineOptions = service.options.filter((o) => o.optionType === "timeline");
  const selectedTimeline = timelineOptions.find((o) =>
    formState.selectedOptionIds.includes(o.id)
  );

  const priceDisplay =
    estimatedMin === 0
      ? "Select options above"
      : formatPriceRange({ min: estimatedMin, max: estimatedMax });

  return (
    <>
      <div
        className="progress-bar"
        role="progressbar"
        aria-valuenow={4}
        aria-valuemin={1}
        aria-valuemax={6}
        aria-label="Step 4 of 6"
      >
        <div className="container">
          <div className="progress-bar__inner">
            <span className="progress-bar__label">Step 4 of 6</span>
            <div className="progress-bar__track">
              <div className="progress-bar__fill" style={{ width: "66.67%" }} />
            </div>
            <span className="progress-bar__label">Timeline</span>
          </div>
        </div>
      </div>

      <div className="container" style={{ paddingTop: "var(--space-8)", paddingBottom: "var(--space-12)" }}>
        <a
          href={`/request/${service.slug}/features`}
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

        <h1 style={{ marginBottom: "var(--space-2)" }}>How soon do you need this?</h1>
        <p style={{ color: "var(--color-muted)", marginBottom: "var(--space-6)" }}>
          Rush projects are prioritised in our schedule. A 25% premium applies.
        </p>

        <div className="timeline-grid" role="radiogroup" aria-label="Project timeline">
          {timelineOptions.map((opt) => {
            const isRush = opt.isMultiplier;
            const isSelected = formState.selectedOptionIds.includes(opt.id);

            return (
              <button
                key={opt.id}
                type="button"
                role="radio"
                aria-checked={isSelected}
                className={`timeline-card${isSelected ? " timeline-card--selected" : ""}`}
                onClick={() => toggleOption(opt.id, service.options)}
              >
                {isRush && (
                  <span className="timeline-card__badge">+25%</span>
                )}
                <p className="timeline-card__title">{opt.label}</p>
                {opt.helperText && (
                  <p className="timeline-card__desc">{opt.helperText}</p>
                )}
              </button>
            );
          })}
        </div>

        {/* Live estimate updates when rush selected */}
        <div
          className="estimate-panel"
          aria-live="polite"
          aria-label="Price estimate with selected timeline"
          style={{ maxWidth: 400 }}
        >
          <p className="estimate-panel__label">Estimated price</p>
          <p className="estimate-panel__range">{priceDisplay}</p>
          {selectedTimeline?.isMultiplier && (
            <p
              style={{
                color: "#F0522A",
                fontSize: "0.8125rem",
                margin: "var(--space-2) 0 0",
              }}
            >
              Rush premium (+25%) applied
            </p>
          )}
        </div>

        <div style={{ marginTop: "var(--space-8)" }}>
          <button
            type="button"
            className="btn btn--navy btn--lg"
            onClick={() => router.push(`/request/${service.slug}/details`)}
            disabled={!selectedTimeline}
            style={{
              opacity: !selectedTimeline ? 0.5 : 1,
              cursor: !selectedTimeline ? "not-allowed" : "pointer",
            }}
          >
            Enter contact details →
          </button>
        </div>
      </div>
    </>
  );
}
