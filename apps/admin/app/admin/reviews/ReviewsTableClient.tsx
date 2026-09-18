"use client";

import { useState } from "react";
import { fetchWithAuth } from "../../../lib/api-client";

interface Review {
  id: string;
  customerName: string;
  companyName: string | null;
  rating: number;
  content: string;
  status: "pending" | "approved" | "declined";
  createdAt: string;
}

export default function ReviewsTableClient({ initialReviews }: { initialReviews: Review[] }) {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [isLoadingId, setIsLoadingId] = useState<string | null>(null);

  const handleUpdateStatus = async (id: string, status: "approved" | "declined") => {
    setIsLoadingId(id);
    try {
      const res = await fetchWithAuth(`/api/v1/admin/reviews/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        setReviews((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
      } else {
        alert("Failed to update review status.");
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred while updating review.");
    } finally {
      setIsLoadingId(null);
    }
  };

  if (reviews.length === 0) {
    return (
      <div className="card" style={{ textAlign: "center", padding: "var(--space-8)" }}>
        <p style={{ color: "var(--color-muted)" }}>No reviews found.</p>
      </div>
    );
  }

  return (
    <div className="card" style={{ overflowX: "auto" }}>
      <table className="table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Customer</th>
            <th>Rating</th>
            <th>Review</th>
            <th>Status</th>
            <th style={{ textAlign: "right" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {reviews.map((review) => (
            <tr key={review.id}>
              <td style={{ whiteSpace: "nowrap", color: "var(--color-muted)", fontSize: "0.875rem" }}>
                {new Date(review.createdAt).toLocaleDateString()}
              </td>
              <td>
                <div style={{ fontWeight: 500 }}>{review.customerName}</div>
                {review.companyName && <div style={{ fontSize: "0.75rem", color: "var(--color-muted)" }}>{review.companyName}</div>}
              </td>
              <td>
                <div style={{ display: "flex", gap: "2px", color: "var(--color-teal)" }}>
                  {[...Array(review.rating)].map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                  {[...Array(5 - review.rating)].map((_, i) => (
                    <span key={i} style={{ color: "var(--color-border)" }}>★</span>
                  ))}
                </div>
              </td>
              <td style={{ maxWidth: "300px" }}>
                <p style={{ margin: 0, fontSize: "0.875rem", display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                  {review.content}
                </p>
              </td>
              <td>
                <span
                  className={`status-badge status-${review.status === "pending" ? "new" : review.status === "approved" ? "accepted" : "declined"}`}
                >
                  {review.status}
                </span>
              </td>
              <td style={{ textAlign: "right", whiteSpace: "nowrap" }}>
                {review.status === "pending" && (
                  <div style={{ display: "flex", gap: "var(--space-2)", justifyContent: "flex-end" }}>
                    <button
                      className="btn btn--sm"
                      style={{ backgroundColor: "var(--color-teal)", color: "var(--color-white)", border: "none" }}
                      disabled={isLoadingId === review.id}
                      onClick={() => handleUpdateStatus(review.id, "approved")}
                    >
                      Approve
                    </button>
                    <button
                      className="btn btn--sm btn--outline"
                      style={{ color: "var(--color-red)", borderColor: "var(--color-red)" }}
                      disabled={isLoadingId === review.id}
                      onClick={() => handleUpdateStatus(review.id, "declined")}
                    >
                      Decline
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
