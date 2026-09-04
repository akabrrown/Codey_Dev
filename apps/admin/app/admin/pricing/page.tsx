import type { Metadata } from "next";
import PricingManagerClient from "./PricingManagerClient";

export const metadata: Metadata = {
  title: "Pricing Rules & Catalog",
};

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3002";

export default async function PricingPage() {
  let services = [];

  try {
    const res = await fetch(`${API_URL}/api/v1/services`, {
      next: { revalidate: 60 },
    });
    if (res.ok) {
      const data = await res.json();
      if (data.success) {
        services = data.data || [];
      }
    }
  } catch {
    // Graceful fallback
  }

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Service Pricing & Option Catalog</h1>
          <p className="page-subtitle">
            Manage base prices, addon line-items, and timeline multipliers across all 5 core service offerings.
          </p>
        </div>
      </div>

      <PricingManagerClient initialServices={services} />
    </div>
  );
}
