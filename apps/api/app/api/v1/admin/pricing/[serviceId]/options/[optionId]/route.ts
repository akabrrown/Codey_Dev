import { type NextRequest } from "next/server";
import { db } from "@codey/db";
import { serviceOptions } from "@codey/db";
import { UpdateServiceOptionSchema } from "@codey/validators";
import { eq, and } from "drizzle-orm";
import { getAuthenticatedUser, apiResponse, apiError, getCorsHeaders } from "../../../../../../../../lib/api-helpers";

type RouteContext = { params: Promise<{ serviceId: string; optionId: string }> };

export const dynamic = "force-dynamic";

export async function OPTIONS(req: Request) {
  return new Response(null, { status: 204, headers: getCorsHeaders(req) });
}

export async function PATCH(req: NextRequest, context: RouteContext) {
  try {
    const user = await getAuthenticatedUser(req);
    if (!user) return apiError("UNAUTHORIZED", "Authentication required.", { status: 401, req });

    const { serviceId, optionId } = await context.params;

    // IDOR: option must belong to the specified service
    const [existing] = await db
      .select()
      .from(serviceOptions)
      .where(and(eq(serviceOptions.id, optionId), eq(serviceOptions.serviceId, serviceId)))
      .limit(1);

    if (!existing) return apiError("NOT_FOUND", "Option not found.", { status: 404, req });

    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return apiError("INVALID_JSON", "Request body must be valid JSON.", { status: 400, req });
    }

    const parsed = UpdateServiceOptionSchema.safeParse(body);
    if (!parsed.success) {
      const firstError = parsed.error.errors[0];
      return apiError("VALIDATION_ERROR", firstError?.message ?? "Validation failed", {
        status: 400,
        field: firstError?.path.join("."),
        req,
      });
    }

    const input = parsed.data;
    const [updated] = await db
      .update(serviceOptions)
      .set({
        ...(input.label !== undefined && { label: input.label }),
        ...(input.optionType !== undefined && { optionType: input.optionType }),
        ...(input.priceImpact !== undefined && { priceImpact: String(input.priceImpact) }),
        ...(input.isMultiplier !== undefined && { isMultiplier: input.isMultiplier }),
        ...(input.multiplierValue !== undefined && { multiplierValue: String(input.multiplierValue) }),
        ...(input.helperText !== undefined && { helperText: input.helperText }),
        ...(input.isActive !== undefined && { isActive: input.isActive }),
        ...(input.sortOrder !== undefined && { sortOrder: input.sortOrder }),
      })
      .where(eq(serviceOptions.id, optionId))
      .returning();

    return apiResponse(updated, { req });
  } catch (error: any) {
    console.error("PATCH /api/v1/admin/pricing/[serviceId]/options/[optionId] error:", error);
    return apiError("SERVER_ERROR", error?.message || "Failed to update service option.", { status: 500, req });
  }
}

// Soft-deactivate rather than delete — preserves historical request display
export async function DELETE(req: NextRequest, context: RouteContext) {
  try {
    const user = await getAuthenticatedUser(req);
    if (!user) return apiError("UNAUTHORIZED", "Authentication required.", { status: 401, req });

    const { serviceId, optionId } = await context.params;

    const [existing] = await db
      .select()
      .from(serviceOptions)
      .where(and(eq(serviceOptions.id, optionId), eq(serviceOptions.serviceId, serviceId)))
      .limit(1);

    if (!existing) return apiError("NOT_FOUND", "Option not found.", { status: 404, req });

    await db
      .update(serviceOptions)
      .set({ isActive: false })
      .where(eq(serviceOptions.id, optionId));

    return apiResponse({ id: optionId, deactivated: true }, { req });
  } catch (error: any) {
    console.error("DELETE /api/v1/admin/pricing/[serviceId]/options/[optionId] error:", error);
    return apiError("SERVER_ERROR", error?.message || "Failed to deactivate service option.", { status: 500, req });
  }
}
