import { type NextRequest } from "next/server";
import { db } from "@codey/db";
import { reviews } from "@codey/db";
import { ReviewListQuerySchema } from "@codey/validators";
import { apiResponse, apiError, getCorsHeaders } from "../../../../../lib/api-helpers";
import { eq, desc } from "drizzle-orm";

export async function OPTIONS(req: Request) {
  return new Response(null, { status: 204, headers: getCorsHeaders(req) });
}

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const queryData = Object.fromEntries(url.searchParams.entries());
    const parsed = ReviewListQuerySchema.safeParse(queryData);

    if (!parsed.success) {
      return apiError(
        "VALIDATION_ERROR",
        "Invalid query parameters.",
        { status: 400, req, details: parsed.error.format() }
      );
    }

    const { page, limit, status } = parsed.data;
    const offset = (page - 1) * limit;

    const whereConditions = status ? eq(reviews.status, status) : undefined;

    const data = await db.query.reviews.findMany({
      where: whereConditions,
      orderBy: [desc(reviews.createdAt)],
      limit,
      offset,
    });

    return apiResponse(data, {
      req,
      headers: getCorsHeaders(req),
      status: 200,
    });
  } catch (error: any) {
    console.error("GET /api/v1/admin/reviews error:", error);
    return apiError(
      "SERVER_ERROR",
      "Failed to load reviews.",
      { status: 500, req }
    );
  }
}
