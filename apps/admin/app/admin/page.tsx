import type { Metadata } from "next";
import { fetchServerWithAuth } from "../../lib/api-server";
import RequestsTableClient from "./RequestsTableClient";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Quote Requests Queue",
};

export default async function AdminDashboardPage() {
  let initialRequests = [];
  let initialMeta = { total: 0, page: 1, limit: 20, totalPages: 1 };

  try {
    const res = await fetchServerWithAuth("/api/v1/admin/requests?page=1&limit=20", {
      cache: "no-store",
    });
    if (res.ok) {
      const json = await res.json();
      if (json.success) {
        initialRequests = json.data || [];
        if (json.meta) initialMeta = json.meta;
      }
    }
  } catch (err) {
    console.error("Failed to load initial requests server-side:", err);
  }

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Quote Inquiries & Requests</h1>
          <p className="page-subtitle">
            Manage incoming client project requests, review estimates, customize line items, and issue official quotes.
          </p>
        </div>
      </div>

      <RequestsTableClient initialRequests={initialRequests} initialMeta={initialMeta} />
    </div>
  );
}
