export default function RequestStepOneLoading() {
  return (
    <div aria-label="Loading quote scoping wizard...">
      {/* Progress Bar Skeleton */}
      <div className="progress-bar">
        <div className="container">
          <div className="progress-bar__inner">
            <span className="progress-bar__label">Step 1 of 6</span>
            <div className="progress-bar__track">
              <div className="progress-bar__fill" style={{ width: "16.67%" }} />
            </div>
            <span className="progress-bar__label">Service Selection</span>
          </div>
        </div>
      </div>

      <div className="container" style={{ paddingTop: "var(--space-10)", paddingBottom: "var(--space-12)" }}>
        <div className="skeleton" style={{ width: "340px", height: "2.25rem", marginBottom: "var(--space-2)" }} />
        <div className="skeleton" style={{ width: "460px", height: "1.125rem", marginBottom: "var(--space-8)" }} />

        {/* 5 Service Selection Cards Skeleton */}
        <div className="service-grid">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="service-card"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                pointerEvents: "none",
                cursor: "wait",
              }}
            >
              <div className="skeleton" style={{ width: "48px", height: "48px", borderRadius: "var(--radius-md)", marginBottom: "var(--space-4)" }} />
              <div className="skeleton" style={{ width: "70%", height: "1.25rem", marginBottom: "var(--space-2)" }} />
              <div className="skeleton" style={{ width: "100%", height: "0.875rem", marginBottom: "var(--space-1)" }} />
              <div className="skeleton" style={{ width: "85%", height: "0.875rem" }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
