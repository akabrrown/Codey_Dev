export interface ReviewData {
  id: string;
  customerName: string;
  companyName: string | null;
  rating: number;
  content: string;
  createdAt: string;
}

export async function loadApprovedReviews(): Promise<ReviewData[]> {
  const apiUrl = process.env["NEXT_PUBLIC_API_URL"] || process.env["API_URL"];
  if (!apiUrl) return [];

  try {
    const res = await fetch(`${apiUrl}/api/v1/public/reviews`, {
      next: { revalidate: 60, tags: ["reviews"] },
      signal: AbortSignal.timeout(3000),
      headers: {
        Accept: "application/json",
      },
    });

    if (!res.ok) return [];
    const json = await res.json();
    if (json.success && Array.isArray(json.data)) {
      return json.data;
    }
    return [];
  } catch (error) {
    console.error("Failed to load reviews:", error);
    return [];
  }
}
