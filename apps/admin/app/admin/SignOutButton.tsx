"use client";

import { useRouter } from "next/navigation";
import { createClient } from "../../lib/supabase-browser";

export default function SignOutButton() {
  const router = useRouter();

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  };

  return (
    <button
      onClick={handleSignOut}
      className="btn btn-outline btn-sm"
      style={{
        width: "100%",
        color: "#EF4444",
        borderColor: "rgba(239, 68, 68, 0.3)",
        backgroundColor: "transparent",
      }}
    >
      Sign Out
    </button>
  );
}
