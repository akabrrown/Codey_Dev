export default function PublicRootLoading() {
  return (
    <div aria-label="Loading page...">
      {/* Hero Skeleton */}
      <section className="hero" style={{ padding: "var(--space-16) 0" }}>
        <div className="container">
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "var(--space-10)",
            alignItems: "center",
          }}>
            {/* Left Column Skeleton */}
            <div>
              <div className="skeleton-dark" style={{ width: "80%", height: "3rem", marginBottom: "var(--space-4)", borderRadius: "var(--radius-md)" }} />
              <div className="skeleton-dark" style={{ width: "60%", height: "3rem", marginBottom: "var(--space-6)", borderRadius: "var(--radius-md)" }} />
              <div className="skeleton-dark" style={{ width: "100%", height: "1.25rem", marginBottom: "var(--space-2)" }} />
              <div className="skeleton-dark" style={{ width: "90%", height: "1.25rem", marginBottom: "var(--space-8)" }} />
              <div style={{ display: "flex", gap: "var(--space-4)" }}>
                <div className="skeleton" style={{ width: "200px", height: "3rem", borderRadius: "var(--radius-md)" }} />
                <div className="skeleton-dark" style={{ width: "180px", height: "3rem", borderRadius: "var(--radius-md)" }} />
              </div>
            </div>

            {/* Right Column: Live Sample Estimate Card Skeleton */}
            <div>
              <div style={{
                backgroundColor: "#0B1D2F",
                borderRadius: "var(--radius-lg)",
                border: "1px solid rgba(53, 196, 224, 0.2)",
                padding: "var(--space-6)",
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "var(--space-6)" }}>
                  <div>
                    <div className="skeleton-dark" style={{ width: "120px", height: "0.75rem", marginBottom: "0.5rem" }} />
                    <div className="skeleton-dark" style={{ width: "180px", height: "1.25rem" }} />
                  </div>
                  <div className="skeleton-dark" style={{ width: "90px", height: "1.5rem", borderRadius: "var(--radius-sm)" }} />
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)", marginBottom: "var(--space-6)" }}>
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} style={{ display: "flex", justifyContent: "space-between" }}>
                      <div className="skeleton-dark" style={{ width: "60%", height: "1rem" }} />
                      <div className="skeleton-dark" style={{ width: "25%", height: "1rem" }} />
                    </div>
                  ))}
                </div>
                <div className="skeleton-dark" style={{ width: "100%", height: "4rem", borderRadius: "var(--radius-md)" }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid Skeleton */}
      <section style={{ padding: "var(--space-16) 0", backgroundColor: "var(--color-surface)" }}>
        <div className="container">
          <div style={{ maxWidth: "600px", marginBottom: "var(--space-10)" }}>
            <div className="skeleton" style={{ width: "320px", height: "2rem", marginBottom: "var(--space-3)" }} />
            <div className="skeleton" style={{ width: "480px", height: "1rem" }} />
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "var(--space-6)",
          }}>
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="skeleton-card">
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "var(--space-4)" }}>
                  <div className="skeleton" style={{ width: "48px", height: "48px", borderRadius: "var(--radius-md)" }} />
                  <div className="skeleton" style={{ width: "90px", height: "1.5rem", borderRadius: "var(--radius-sm)" }} />
                </div>
                <div className="skeleton" style={{ width: "70%", height: "1.25rem", marginBottom: "var(--space-3)" }} />
                <div className="skeleton" style={{ width: "100%", height: "0.875rem", marginBottom: "var(--space-2)" }} />
                <div className="skeleton" style={{ width: "85%", height: "0.875rem" }} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
