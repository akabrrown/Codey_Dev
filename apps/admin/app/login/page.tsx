"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "../../lib/supabase-browser";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") || "/admin";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const supabase = createClient();
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        setError(signInError.message);
        setLoading(false);
        return;
      }

      router.push(redirectTo);
      router.refresh();
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div style={{
      maxWidth: "420px",
      width: "100%",
      backgroundColor: "#FFFFFF",
      borderRadius: "var(--radius-lg)",
      padding: "2.5rem 2rem",
      boxShadow: "var(--shadow-lg)",
    }}>
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <div style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: "48px",
          height: "48px",
          borderRadius: "var(--radius-md)",
          backgroundColor: "var(--color-navy-dark)",
          color: "var(--color-teal)",
          marginBottom: "1rem",
          fontSize: "1.5rem",
          fontWeight: 800,
        }}>
          &lt;/&gt;
        </div>
        <h1 style={{ fontSize: "1.5rem", color: "var(--color-navy-dark)", fontWeight: 700 }}>
          Codey Dev Admin
        </h1>
        <p style={{ fontSize: "0.875rem", color: "var(--color-text-muted)", marginTop: "0.25rem" }}>
          Sign in to manage client quote requests and pricing
        </p>
      </div>

      {error && (
        <div style={{
          backgroundColor: "#FEE2E2",
          border: "1px solid #FCA5A5",
          color: "#B91C1C",
          padding: "0.75rem 1rem",
          borderRadius: "var(--radius-md)",
          fontSize: "0.875rem",
          marginBottom: "1.25rem",
        }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
        <div>
          <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 600, color: "var(--color-navy-dark)", marginBottom: "0.375rem" }}>
            Email Address
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@codeydev.com"
            className="form-input"
            autoComplete="email"
          />
        </div>

        <div>
          <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 600, color: "var(--color-navy-dark)", marginBottom: "0.375rem" }}>
            Password
          </label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••••••"
            className="form-input"
            autoComplete="current-password"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn btn-navy"
          style={{ width: "100%", padding: "0.75rem", fontSize: "0.9375rem", marginTop: "0.5rem" }}
        >
          {loading ? "Authenticating..." : "Sign In to Admin"}
        </button>
      </form>

      <div style={{ textAlign: "center", marginTop: "1.5rem", fontSize: "0.8125rem", color: "var(--color-text-muted)" }}>
        Restricted access. Authorized Codey Dev personnel only.
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "var(--color-navy-dark)",
      padding: "1.5rem",
    }}>
      <Suspense fallback={
        <div style={{
          maxWidth: "420px",
          width: "100%",
          backgroundColor: "#FFFFFF",
          borderRadius: "var(--radius-lg)",
          padding: "2.5rem 2rem",
          boxShadow: "var(--shadow-lg)",
        }} aria-label="Loading login form...">
          <div style={{ textAlign: "center", marginBottom: "2rem" }}>
            <div className="skeleton" style={{ width: "48px", height: "48px", borderRadius: "var(--radius-md)", marginBottom: "1rem" }} />
            <div>
              <div className="skeleton" style={{ width: "180px", height: "1.5rem", marginBottom: "0.5rem" }} />
            </div>
            <div className="skeleton" style={{ width: "240px", height: "0.875rem" }} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <div>
              <div className="skeleton" style={{ width: "90px", height: "0.875rem", marginBottom: "0.375rem" }} />
              <div className="skeleton" style={{ width: "100%", height: "2.5rem", borderRadius: "var(--radius-md)" }} />
            </div>
            <div>
              <div className="skeleton" style={{ width: "70px", height: "0.875rem", marginBottom: "0.375rem" }} />
              <div className="skeleton" style={{ width: "100%", height: "2.5rem", borderRadius: "var(--radius-md)" }} />
            </div>
            <div className="skeleton" style={{ width: "100%", height: "2.75rem", borderRadius: "var(--radius-md)", marginTop: "0.5rem" }} />
          </div>
        </div>
      }>
        <LoginForm />
      </Suspense>
    </div>
  );
}
