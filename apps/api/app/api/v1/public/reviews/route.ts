import { type NextRequest } from "next/server";
import { db } from "@codey/db";
import { reviews } from "@codey/db";
import { SubmitReviewSchema } from "@codey/validators";
import { apiResponse, apiError, getCorsHeaders } from "../../../../../lib/api-helpers";
import { sendAdminNewReviewNotification } from "../../../../../lib/services/email";

export async function OPTIONS(req: Request) {
  return new Response(null, { status: 204, headers: getCorsHeaders(req) });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = SubmitReviewSchema.safeParse(body);

    if (!parsed.success) {
      return apiError(
        "VALIDATION_ERROR",
        "Invalid review submission data.",
        { status: 400, req, details: parsed.error.format() }
      );
    }

    const { customerName, companyName, rating, content } = parsed.data;

    const [inserted] = await db
      .insert(reviews)
      .values({
        customerName,
        companyName,
        rating,
        content,
        status: "pending",
      })
      .returning();

    // Send email notification to admin asynchronously (don't block the response)
    sendAdminNewReviewNotification({
      customerName,
      companyName,
      rating,
      content,
    }).catch((err) => {
      console.error("Failed to send admin notification for new review:", err);
    });

    return apiResponse(inserted, {
      req,
      headers: getCorsHeaders(req),
      status: 201,
      message: "Review submitted successfully and is pending approval.",
    });
  } catch (error: any) {
    console.error("POST /api/v1/public/reviews error:", error);
    return apiError(
      "SERVER_ERROR",
      "Internal server error occurred while processing your review.",
      { status: 500, req }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const approvedReviews = await db.query.reviews.findMany({
      where: (reviews, { eq }) => eq(reviews.status, "approved"),
      orderBy: (reviews, { desc }) => [desc(reviews.createdAt)],
      limit: 10,
    });

    return apiResponse(approvedReviews, {
      req,
      headers: getCorsHeaders(req),
      status: 200,
    });
  } catch (error: any) {
    console.error("GET /api/v1/public/reviews error:", error);
    return apiError(
      "SERVER_ERROR",
      "Failed to load reviews.",
      { status: 500, req }
    );
  }
}
