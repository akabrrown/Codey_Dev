export default function RequestStepLoading() {
  return (
    <div aria-label="Loading project configuration options...">
      {/* Progress Bar Track */}
      <div className="progress-bar">
        <div className="container">
          <div className="progress-bar__inner">
            <span className="progress-bar__label">Loading step...</span>
            <div className="progress-bar__track">
              <div className="progress-bar__fill" style={{ width: "40%" }} />
            </div>
            <span className="progress-bar__label">Configuration</span>
          </div>
        </div>
      </div>

      <div className="container" style={{ paddingTop: "var(--space-10)", paddingBottom: "var(--space-12)" }}>
        <div className="skeleton" style={{ width: "80px", height: "1rem", marginBottom: "var(--space-6)" }} />

        <div className="step-layout">
          {/* Left Column Skeleton */}
          <div style={{ paddingTop: "var(--space-4)" }}>
            <div className="skeleton" style={{ width: "75%", height: "2.25rem", marginBottom: "var(--space-2)" }} />
            <div className="skeleton" style={{ width: "50%", height: "1.125rem", marginBottom: "var(--space-8)" }} />

            <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)" }}>
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="radio-card"
                  style={{ pointerEvents: "none", cursor: "wait" }}
                >
                  <div className="skeleton" style={{ width: "20px", height: "20px", borderRadius: "50%", flexShrink: 0 }} />
                  <div style={{ width: "100%" }}>
                    <div className="skeleton" style={{ width: "40%", height: "1.125rem", marginBottom: "var(--space-1)" }} />
                    <div className="skeleton" style={{ width: "70%", height: "0.875rem" }} />
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: "var(--space-8)" }}>
              <div className="skeleton" style={{ width: "180px", height: "3rem", borderRadius: "var(--radius-md)" }} />
            </div>
          </div>

          {/* Right Column: Live Estimate Panel Skeleton */}
          <div style={{ paddingTop: "var(--space-4)" }}>
            <div className="estimate-panel">
              <div className="skeleton-dark" style={{ width: "120px", height: "0.875rem", marginBottom: "var(--space-2)" }} />
              <div className="skeleton-dark" style={{ width: "200px", height: "2.25rem", marginBottom: "var(--space-6)" }} />
              <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)", marginBottom: "var(--space-6)" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <div className="skeleton-dark" style={{ width: "50%", height: "1rem" }} />
                  <div className="skeleton-dark" style={{ width: "30%", height: "1rem" }} />
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <div className="skeleton-dark" style={{ width: "60%", height: "1rem" }} />
                  <div className="skeleton-dark" style={{ width: "25%", height: "1rem" }} />
                </div>
              </div>
              <div className="skeleton-dark" style={{ width: "100%", height: "1.5rem" }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
