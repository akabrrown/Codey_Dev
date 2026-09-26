import { type NextRequest } from "next/server";
import { db } from "@codey/db";
import { services, serviceOptions } from "@codey/db";
import { getAuthenticatedUserWithReason, apiResponse, apiError, getCorsHeaders } from "../../../../../../lib/api-helpers";

export const dynamic = "force-dynamic";

export async function OPTIONS(req: Request) {
  return new Response(null, { status: 204, headers: getCorsHeaders(req) });
}

export async function GET(req: NextRequest) {
  try {
    const { user, reason } = await getAuthenticatedUserWithReason(req);
    if (!user) {
      return apiError(
        "UNAUTHORIZED",
        `Authentication required (${reason || "Unauthorized"}).`,
        { status: 401, req }
      );
    }

    const allServices = await db
      .select({
        id: services.id,
        name: services.name,
        slug: services.slug,
        description: services.description,
        basePriceMin: services.basePriceMin,
        basePriceMax: services.basePriceMax,
        sortOrder: services.sortOrder,
        isActive: services.isActive,
      })
      .from(services)
      .orderBy(services.sortOrder);

    const headers = getCorsHeaders(req);

    return apiResponse(allServices, { req, headers });
  } catch (error: any) {
    console.error("GET /api/v1/admin/services error:", error);
    return apiError("SERVER_ERROR", error?.message || "Failed to retrieve services.", { status: 500, req });
  }
}
