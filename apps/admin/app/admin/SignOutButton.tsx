"use client";

import { useState } from "react";
import { createClient } from "../../lib/supabase-browser";

export default function SignOutButton() {
  const [isSigningOut, setIsSigningOut] = useState(false);

  const handleSignOut = async () => {
    setIsSigningOut(true);
    try {
      // 1. Client-side Supabase signOut
      const supabase = createClient();
      await supabase.auth.signOut();
    } catch {
      // Ignore
    }

    try {
      // 2. Server-side cookie purge
      await fetch("/api/auth/signout", { method: "POST" });
    } catch {
      // Ignore
    }

    // 3. Clear storage and hard redirect to login
    try {
      if (typeof window !== "undefined") {
        sessionStorage.clear();
      }
    } catch {
      // Ignore
    }

    window.location.href = "/login";
  };

  return (
    <button
      onClick={handleSignOut}
      disabled={isSigningOut}
      className="btn btn-outline btn-sm"
      style={{
        width: "100%",
        color: "#EF4444",
        borderColor: "rgba(239, 68, 68, 0.3)",
        backgroundColor: "transparent",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "0.375rem",
      }}
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
        <polyline points="16 17 21 12 16 7" />
        <line x1="21" y1="12" x2="9" y2="12" />
      </svg>
      <span>{isSigningOut ? "Signing Out..." : "Sign Out"}</span>
    </button>
  );
}
