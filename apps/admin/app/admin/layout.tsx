import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "../../lib/supabase-server";
import AdminNavLinks from "./AdminNavLinks";
import SignOutButton from "./SignOutButton";
import OneSignalInitializer from "./OneSignalInitializer";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="admin-layout">
      <OneSignalInitializer userId={user.id} />
      {/* Sidebar */}
      <aside className="admin-sidebar" aria-label="Admin Navigation">
        <div className="sidebar-header">
          <Link href="/admin" className="sidebar-logo">
            <span style={{ color: "var(--color-teal)", fontWeight: 800 }}>&lt;/&gt;</span>
            <span>Codey Dev</span>
          </Link>
          <span className="sidebar-logo-badge">Admin</span>
        </div>

        <nav className="sidebar-nav">
          <AdminNavLinks />
        </nav>

        <div className="sidebar-footer">
          <div style={{ marginBottom: "0.75rem" }}>
            <div style={{ fontSize: "0.8125rem", color: "#E2E8F0", fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {user.email}
            </div>
            <div style={{ fontSize: "0.75rem", color: "#94A3B8" }}>
              Administrator
            </div>
          </div>
          <SignOutButton />
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="admin-main">
        <header className="admin-header">
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <span style={{ fontSize: "0.875rem", color: "var(--color-text-muted)" }}>
              Quote Portal Internal Management
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <a
              href={process.env.NEXT_PUBLIC_SITE_URL || "https://codeydev.vercel.app"}
              target="_blank"
              rel="noreferrer"
              className="btn btn-outline btn-sm"
            >
              Open Public Site ↗
            </a>
          </div>
        </header>

        <main className="admin-content">
          {children}
        </main>
      </div>
    </div>
  );
}
