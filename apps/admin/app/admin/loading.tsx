export default function AdminDashboardLoading() {
  return (
    <div aria-label="Loading admin dashboard...">
      {/* Top Header Skeleton */}
      <div style={{ marginBottom: "2rem" }}>
        <div className="skeleton" style={{ width: "240px", height: "2rem", marginBottom: "0.5rem" }} />
        <div className="skeleton" style={{ width: "380px", height: "1rem" }} />
      </div>

      {/* Stats Grid Skeleton */}
      <div className="stats-grid" style={{ marginBottom: "2rem" }}>
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="stat-card">
            <div className="skeleton" style={{ width: "100px", height: "0.75rem", marginBottom: "0.75rem" }} />
            <div className="skeleton" style={{ width: "60px", height: "2rem" }} />
          </div>
        ))}
      </div>

      {/* Table Card Skeleton */}
      <div className="card">
        <div className="card-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
          <div className="skeleton" style={{ width: "180px", height: "1.5rem" }} />
          <div style={{ display: "flex", gap: "0.75rem" }}>
            <div className="skeleton" style={{ width: "220px", height: "2.25rem", borderRadius: "var(--radius-md)" }} />
            <div className="skeleton" style={{ width: "140px", height: "2.25rem", borderRadius: "var(--radius-md)" }} />
          </div>
        </div>

        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Ref No</th>
                <th>Client</th>
                <th>Service</th>
                <th>Estimate Range</th>
                <th>Status</th>
                <th>Submitted</th>
                <th style={{ textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <tr key={i}>
                  <td><span className="skeleton" style={{ width: "110px", height: "1.25rem" }} /></td>
                  <td>
                    <div className="skeleton" style={{ width: "130px", height: "1rem", marginBottom: "0.25rem" }} />
                    <div className="skeleton" style={{ width: "160px", height: "0.75rem" }} />
                  </td>
                  <td><span className="skeleton" style={{ width: "120px", height: "1rem" }} /></td>
                  <td><span className="skeleton" style={{ width: "140px", height: "1rem" }} /></td>
                  <td><span className="skeleton" style={{ width: "80px", height: "1.25rem", borderRadius: "var(--radius-sm)" }} /></td>
                  <td><span className="skeleton" style={{ width: "90px", height: "0.875rem" }} /></td>
                  <td style={{ textAlign: "right" }}>
                    <span className="skeleton" style={{ width: "70px", height: "1.75rem", borderRadius: "var(--radius-sm)" }} />
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
