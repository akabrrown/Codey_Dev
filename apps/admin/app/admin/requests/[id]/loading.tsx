export default function RequestDetailLoading() {
  return (
    <div aria-label="Loading inquiry details...">
      {/* Top Header / Breadcrumb Skeleton */}
      <div style={{ marginBottom: "1.5rem" }}>
        <div className="skeleton" style={{ width: "160px", height: "1rem", marginBottom: "0.75rem" }} />
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <div className="skeleton" style={{ width: "220px", height: "2rem" }} />
            <div className="skeleton" style={{ width: "90px", height: "1.5rem", borderRadius: "var(--radius-sm)" }} />
          </div>
          <div className="skeleton" style={{ width: "180px", height: "1rem" }} />
        </div>
      </div>

      {/* Two Column Layout Skeleton */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))", gap: "1.5rem" }}>
        {/* Left Column: Details, Scope, Files, History */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {/* Client Card Skeleton */}
          <div className="card">
            <div className="card-header">
              <div className="skeleton" style={{ width: "160px", height: "1.25rem" }} />
            </div>
            <div className="card-body" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }}>
              {[1, 2, 3, 4].map((i) => (
                <div key={i}>
                  <div className="skeleton" style={{ width: "80px", height: "0.75rem", marginBottom: "0.375rem" }} />
                  <div className="skeleton" style={{ width: "140px", height: "1.125rem" }} />
                </div>
              ))}
            </div>
          </div>

          {/* Scope Card Skeleton */}
          <div className="card">
            <div className="card-header">
              <div className="skeleton" style={{ width: "200px", height: "1.25rem" }} />
            </div>
            <div className="card-body" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div className="skeleton" style={{ width: "100%", height: "2.5rem" }} />
              <div className="skeleton" style={{ width: "100%", height: "2.5rem" }} />
              <div className="skeleton" style={{ width: "100%", height: "2.5rem" }} />
            </div>
          </div>

          {/* Files Card Skeleton */}
          <div className="card">
            <div className="card-header">
              <div className="skeleton" style={{ width: "150px", height: "1.25rem" }} />
            </div>
            <div className="card-body">
              <div className="skeleton" style={{ width: "100%", height: "3.5rem" }} />
            </div>
          </div>
        </div>

        {/* Right Column: Quote Calculation & Actions Skeleton */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <div className="card" style={{ borderTop: "4px solid var(--color-navy-dark)" }}>
            <div className="card-header">
              <div className="skeleton" style={{ width: "210px", height: "1.25rem" }} />
            </div>
            <div className="card-body">
              {/* Automated Estimate Range Skeleton */}
              <div style={{
                padding: "1.25rem",
                backgroundColor: "var(--color-surface)",
                borderRadius: "var(--radius-md)",
                marginBottom: "1.5rem",
                border: "1px solid var(--color-border)",
              }}>
                <div className="skeleton" style={{ width: "160px", height: "0.75rem", marginBottom: "0.5rem" }} />
                <div className="skeleton" style={{ width: "220px", height: "2rem", marginBottom: "0.5rem" }} />
                <div className="skeleton" style={{ width: "100%", height: "0.75rem" }} />
              </div>

              {/* Form inputs skeletons */}
              <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                <div>
                  <div className="skeleton" style={{ width: "130px", height: "0.875rem", marginBottom: "0.375rem" }} />
                  <div className="skeleton" style={{ width: "100%", height: "2.5rem", borderRadius: "var(--radius-md)" }} />
                </div>
                <div>
                  <div className="skeleton" style={{ width: "150px", height: "0.875rem", marginBottom: "0.375rem" }} />
                  <div className="skeleton" style={{ width: "100%", height: "2.5rem", borderRadius: "var(--radius-md)" }} />
                </div>
                <div>
                  <div className="skeleton" style={{ width: "140px", height: "0.875rem", marginBottom: "0.375rem" }} />
                  <div className="skeleton" style={{ width: "100%", height: "5rem", borderRadius: "var(--radius-md)" }} />
                </div>
                <div className="skeleton" style={{ width: "100%", height: "2.75rem", borderRadius: "var(--radius-md)" }} />
                <hr style={{ margin: "1rem 0", borderColor: "var(--color-border)" }} />
                <div className="skeleton" style={{ width: "100%", height: "2.75rem", borderRadius: "var(--radius-md)" }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
