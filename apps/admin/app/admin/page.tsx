import type { Metadata } from "next";
import RequestsTableClient from "./RequestsTableClient";

export const metadata: Metadata = {
  title: "Quote Requests Queue",
};

export default function AdminDashboardPage() {
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

      <RequestsTableClient />
    </div>
  );
}
