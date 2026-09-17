import type { Metadata } from "next";
import { fetchServerWithAuth } from "../../../lib/api-server";
import ReviewsTableClient from "./ReviewsTableClient";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Customer Reviews",
};

export default async function AdminReviewsPage() {
  let initialReviews = [];

  try {
    const res = await fetchServerWithAuth("/api/v1/admin/reviews?page=1&limit=50", {
      cache: "no-store",
    });
    if (res.ok) {
      const json = await res.json();
      if (json.success) {
        initialReviews = json.data || [];
      }
    }
  } catch (err) {
    console.error("Failed to load reviews server-side:", err);
  }

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Customer Reviews</h1>
          <p className="page-subtitle">
            Manage customer feedback and testimonials. Approved reviews will appear on the public Coming Soon page.
          </p>
        </div>
      </div>

      <ReviewsTableClient initialReviews={initialReviews} />
    </div>
  );
}
