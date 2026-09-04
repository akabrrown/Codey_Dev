export default function PricingPageLoading() {
  return (
    <div aria-label="Loading pricing catalog...">
      {/* Page Header Skeleton */}
      <section style={{ backgroundColor: "var(--color-navy-dark)", padding: "var(--space-12) 0" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <div className="skeleton-dark" style={{ width: "320px", height: "2.5rem", margin: "0 auto var(--space-4)", borderRadius: "var(--radius-md)" }} />
          <div className="skeleton-dark" style={{ width: "520px", height: "1.125rem", margin: "0 auto var(--space-2)" }} />
          <div className="skeleton-dark" style={{ width: "380px", height: "1.125rem", margin: "0 auto" }} />
        </div>
      </section>

      {/* Pricing Tables Skeleton */}
      <div className="container" style={{ padding: "var(--space-12) 0", display: "flex", flexDirection: "column", gap: "var(--space-12)" }}>
        {[1, 2, 3].map((i) => (
          <section key={i} className="card" style={{ padding: "var(--space-6)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "var(--space-6)" }}>
              <div>
                <div className="skeleton" style={{ width: "240px", height: "1.75rem", marginBottom: "var(--space-2)" }} />
                <div className="skeleton" style={{ width: "360px", height: "0.875rem" }} />
              </div>
              <div className="skeleton" style={{ width: "160px", height: "1.75rem" }} />
            </div>

            <div style={{ border: "1px solid var(--color-border)", borderRadius: "var(--radius-md)", overflow: "hidden" }}>
              {[1, 2, 3, 4].map((row) => (
                <div key={row} style={{ display: "flex", justifyContent: "space-between", padding: "var(--space-4) var(--space-5)", borderBottom: "1px solid var(--color-border)", backgroundColor: row % 2 === 0 ? "var(--color-white)" : "var(--color-alt-row)" }}>
                  <div className="skeleton" style={{ width: "40%", height: "1rem" }} />
                  <div className="skeleton" style={{ width: "15%", height: "1rem" }} />
                </div>
              ))}
            </div>

            <div style={{ marginTop: "var(--space-4)", display: "flex", justifyContent: "flex-end" }}>
              <div className="skeleton" style={{ width: "240px", height: "2.25rem", borderRadius: "var(--radius-sm)" }} />
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
