export default function PricingLoading() {
  return (
    <div aria-label="Loading pricing catalog...">
      {/* Page Header Skeleton */}
      <div className="page-header" style={{ marginBottom: "2rem" }}>
        <div>
          <div className="skeleton" style={{ width: "260px", height: "2rem", marginBottom: "0.5rem" }} />
          <div className="skeleton" style={{ width: "420px", height: "1rem" }} />
        </div>
      </div>

      {/* Service Selector Tabs Skeleton */}
      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.5rem", overflowX: "auto", paddingBottom: "0.5rem" }}>
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="skeleton" style={{ width: "160px", height: "2.5rem", borderRadius: "var(--radius-md)" }} />
        ))}
      </div>

      {/* Base Rate Card Skeleton */}
      <div className="card" style={{ marginBottom: "1.5rem" }}>
        <div className="card-body" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <div className="skeleton" style={{ width: "200px", height: "1.25rem", marginBottom: "0.5rem" }} />
            <div className="skeleton" style={{ width: "320px", height: "0.875rem" }} />
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
            <div style={{ textAlign: "right" }}>
              <div className="skeleton" style={{ width: "100px", height: "0.75rem", marginBottom: "0.25rem" }} />
              <div className="skeleton" style={{ width: "160px", height: "1.5rem" }} />
            </div>
            <div className="skeleton" style={{ width: "120px", height: "2rem", borderRadius: "var(--radius-md)" }} />
          </div>
        </div>
      </div>

      {/* Options Table Skeleton */}
      <div className="card">
        <div className="card-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div className="skeleton" style={{ width: "240px", height: "1.25rem", marginBottom: "0.375rem" }} />
            <div className="skeleton" style={{ width: "360px", height: "0.875rem" }} />
          </div>
          <div className="skeleton" style={{ width: "120px", height: "2.25rem", borderRadius: "var(--radius-md)" }} />
        </div>

        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Option Label</th>
                <th>Category</th>
                <th>Price Impact (GH₵)</th>
                <th>Description / Helper</th>
                <th>Status</th>
                <th style={{ textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3, 4, 5].map((i) => (
                <tr key={i}>
                  <td><span className="skeleton" style={{ width: "160px", height: "1.125rem" }} /></td>
                  <td><span className="skeleton" style={{ width: "80px", height: "1.25rem", borderRadius: "var(--radius-sm)" }} /></td>
                  <td><span className="skeleton" style={{ width: "100px", height: "1.125rem" }} /></td>
                  <td><span className="skeleton" style={{ width: "200px", height: "0.875rem" }} /></td>
                  <td><span className="skeleton" style={{ width: "60px", height: "1.25rem", borderRadius: "var(--radius-sm)" }} /></td>
                  <td style={{ textAlign: "right" }}>
                    <span className="skeleton" style={{ width: "110px", height: "1.75rem", borderRadius: "var(--radius-sm)" }} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
