import { type NextRequest } from "next/server";
import { db } from "@codey/db";
import { services, serviceOptions } from "@codey/db";
import { CreateServiceOptionSchema } from "@codey/validators";
import { eq, and } from "drizzle-orm";
import { getAuthenticatedUser, apiResponse, apiError, getCorsHeaders } from "../../../../../../lib/api-helpers";

type RouteContext = { params: Promise<{ serviceId: string }> };

export const dynamic = "force-dynamic";

export async function OPTIONS(req: Request) {
  return new Response(null, { status: 204, headers: getCorsHeaders(req) });
}

export async function GET(req: NextRequest, context: RouteContext) {
  try {
    const user = await getAuthenticatedUser(req);
    if (!user) return apiError("UNAUTHORIZED", "Authentication required.", { status: 401, req });

    const { serviceId } = await context.params;

    const [service] = await db.select().from(services).where(eq(services.id, serviceId)).limit(1);
    if (!service) return apiError("NOT_FOUND", "Service not found.", { status: 404, req });

    const options = await db
      .select()
      .from(serviceOptions)
      .where(eq(serviceOptions.serviceId, serviceId))
      .orderBy(serviceOptions.sortOrder);

    return apiResponse({ service, options }, { req });
  } catch (error: any) {
    console.error("GET /api/v1/admin/pricing/[serviceId] error:", error);
    return apiError("SERVER_ERROR", error?.message || "Failed to retrieve service pricing.", { status: 500, req });
  }
}

export async function POST(req: NextRequest, context: RouteContext) {
  try {
    const user = await getAuthenticatedUser(req);
    if (!user) return apiError("UNAUTHORIZED", "Authentication required.", { status: 401, req });

    const { serviceId } = await context.params;

    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return apiError("INVALID_JSON", "Request body must be valid JSON.", { status: 400, req });
    }

    const parsed = CreateServiceOptionSchema.safeParse({ ...body as object, serviceId });
    if (!parsed.success) {
      const firstError = parsed.error.errors[0];
      return apiError("VALIDATION_ERROR", firstError?.message ?? "Validation failed", {
        status: 400,
        field: firstError?.path.join("."),
        req,
      });
    }

    const [newOption] = await db
      .insert(serviceOptions)
      .values({
        serviceId: parsed.data.serviceId,
        label: parsed.data.label,
        optionType: parsed.data.optionType,
        priceImpact: String(parsed.data.priceImpact),
        isMultiplier: parsed.data.isMultiplier,
        multiplierValue: parsed.data.multiplierValue ? String(parsed.data.multiplierValue) : null,
        helperText: parsed.data.helperText,
        sortOrder: parsed.data.sortOrder,
      })
      .returning();

    return apiResponse(newOption, { status: 201, req });
  } catch (error: any) {
    console.error("POST /api/v1/admin/pricing/[serviceId] error:", error);
    return apiError("SERVER_ERROR", error?.message || "Failed to create service option.", { status: 500, req });
  }
}

export async function PATCH(req: NextRequest, context: RouteContext) {
  try {
    const user = await getAuthenticatedUser(req);
    if (!user) return apiError("UNAUTHORIZED", "Authentication required.", { status: 401, req });

    const { serviceId } = await context.params;

    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return apiError("INVALID_JSON", "Request body must be valid JSON.", { status: 400, req });
    }

    const [existing] = await db.select().from(services).where(eq(services.id, serviceId)).limit(1);
    if (!existing) return apiError("NOT_FOUND", "Service not found.", { status: 404, req });

    const { UpdateServiceBasePriceSchema } = await import("@codey/validators");
    const parsed = UpdateServiceBasePriceSchema.safeParse(body);
    if (!parsed.success) {
      const firstError = parsed.error.errors[0];
      return apiError("VALIDATION_ERROR", firstError?.message ?? "Validation failed", {
        status: 400,
        field: firstError?.path.join("."),
        req,
      });
    }

    const [updatedService] = await db
      .update(services)
      .set({
        basePriceMin: String(parsed.data.basePriceMin),
        basePriceMax: String(parsed.data.basePriceMax),
        updatedAt: new Date(),
      })
      .where(eq(services.id, serviceId))
      .returning();

    return apiResponse(updatedService, { req });
  } catch (error: any) {
    console.error("PATCH /api/v1/admin/pricing/[serviceId] error:", error);
    return apiError("SERVER_ERROR", error?.message || "Failed to update base price.", { status: 500, req });
  }
}
