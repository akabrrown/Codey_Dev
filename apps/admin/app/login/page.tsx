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
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      if (!supabaseUrl || supabaseUrl.includes("placeholder")) {
        setError("Authentication service is not configured. Please add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in Vercel project settings and redeploy.");
        setLoading(false);
        return;
      }

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
    } catch (err: any) {
      if (err?.message?.includes("Failed to fetch") || err?.name === "TypeError") {
        setError("Unable to reach authentication server. Please check your Supabase URL configuration.");
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
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
          <div style={{ position: "relative" }}>
            <input
              type={showPassword ? "text" : "password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="form-input"
              autoComplete="current-password"
              style={{ paddingRight: "2.75rem" }}
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              style={{
                position: "absolute",
                right: "0.75rem",
                top: "50%",
                transform: "translateY(-50%)",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                padding: "0.25rem",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--color-text-muted)",
                transition: "color 0.15s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-navy-dark)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-text-muted)")}
            >
              {showPassword ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                  <line x1="1" y1="1" x2="23" y2="23" />
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              )}
            </button>
          </div>
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
