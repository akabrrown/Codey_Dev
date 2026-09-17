import { type NextRequest } from "next/server";
import { db } from "@codey/db";
import { reviews } from "@codey/db";
import { AdminUpdateReviewSchema } from "@codey/validators";
import { apiResponse, apiError, getCorsHeaders } from "../../../../../../lib/api-helpers";
import { eq } from "drizzle-orm";

export async function OPTIONS(req: Request) {
  return new Response(null, { status: 204, headers: getCorsHeaders(req) });
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const body = await req.json();
    const parsed = AdminUpdateReviewSchema.safeParse(body);

    if (!parsed.success) {
      return apiError(
        "VALIDATION_ERROR",
        "Invalid update data.",
        { status: 400, req, details: parsed.error.format() }
      );
    }

    const { status } = parsed.data;

    // We only expect 'status' updates for reviews at this time
    if (!status) {
      return apiError(
        "VALIDATION_ERROR",
        "No updatable fields provided.",
        { status: 400, req }
      );
    }

    const [updated] = await db
      .update(reviews)
      .set({ status })
      .where(eq(reviews.id, id))
      .returning();

    if (!updated) {
      return apiError(
        "NOT_FOUND",
        `Review ${id} not found.`,
        { status: 404, req }
      );
    }

    return apiResponse(updated, {
      req,
      headers: getCorsHeaders(req),
      status: 200,
    });
  } catch (error: any) {
    console.error("PATCH /api/v1/admin/reviews/[id] error:", error);
    return apiError(
      "SERVER_ERROR",
      "Internal server error while updating review.",
      { status: 500, req }
    );
  }
}
