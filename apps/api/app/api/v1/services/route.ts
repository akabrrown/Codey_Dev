import { type NextRequest } from "next/server";
import { db } from "@codey/db";
import { services, serviceOptions } from "@codey/db";
import { eq, and } from "drizzle-orm";
import { apiResponse, getCorsHeaders } from "../../../../lib/api-helpers";

export const dynamic = "force-dynamic";

export async function OPTIONS(req: Request) {
  return new Response(null, { status: 204, headers: getCorsHeaders(req) });
}

export async function GET(req: NextRequest) {
  try {
    const allServices = await db
      .select({
        id: services.id,
        name: services.name,
        slug: services.slug,
        description: services.description,
        basePriceMin: services.basePriceMin,
        basePriceMax: services.basePriceMax,
        sortOrder: services.sortOrder,
      })
      .from(services)
      .where(eq(services.isActive, true))
      .orderBy(services.sortOrder);

    const allOptions = await db
      .select({
        id: serviceOptions.id,
        serviceId: serviceOptions.serviceId,
        label: serviceOptions.label,
        optionType: serviceOptions.optionType,
        priceImpact: serviceOptions.priceImpact,
        isMultiplier: serviceOptions.isMultiplier,
        multiplierValue: serviceOptions.multiplierValue,
        helperText: serviceOptions.helperText,
        sortOrder: serviceOptions.sortOrder,
      })
      .from(serviceOptions)
      .where(and(eq(serviceOptions.isActive, true)))
      .orderBy(serviceOptions.sortOrder);

    // Nest options under their parent service
    const servicesWithOptions = allServices.map((svc) => ({
      ...svc,
      options: allOptions.filter((o) => o.serviceId === svc.id),
    }));

    return apiResponse(servicesWithOptions, { req, headers: getCorsHeaders(req) });
  } catch (error: any) {
    console.error("GET /api/v1/services error:", error);
    return apiResponse([], { req, headers: getCorsHeaders(req) });
  }
}
