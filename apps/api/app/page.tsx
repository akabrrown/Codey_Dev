export default function ApiRootPage() {
  return (
    <main style={{ padding: "3rem", fontFamily: "system-ui, -apple-system, sans-serif", maxWidth: "600px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "1.5rem", color: "#0E2338", marginBottom: "0.5rem" }}>Codey Dev API</h1>
      <p style={{ color: "#64748B", fontSize: "0.875rem", marginBottom: "1.5rem" }}>
        Backend REST API service for the Codey Dev Quote Portal.
      </p>
      <div style={{ padding: "1rem", backgroundColor: "#F8FAFC", border: "1px solid #E2E8F0", borderRadius: "6px", fontSize: "0.8125rem", fontFamily: "monospace" }}>
        Status: Online · Version 1.0.0
      </div>
    </main>
  );
}
