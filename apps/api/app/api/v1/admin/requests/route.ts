import { type NextRequest } from "next/server";
import { db } from "@codey/db";
import { requests, services } from "@codey/db";
import { RequestListQuerySchema } from "@codey/validators";
import { eq, desc, asc, ilike, and, isNull, count } from "drizzle-orm";
import { getAuthenticatedUser, apiResponse, apiError, getCorsHeaders } from "../../../../../lib/api-helpers";

export const dynamic = "force-dynamic";

export async function OPTIONS(req: Request) {
  return new Response(null, { status: 204, headers: getCorsHeaders(req) });
}

export async function GET(req: NextRequest) {
  try {
    const user = await getAuthenticatedUser(req);
    if (!user) {
      return apiError("UNAUTHORIZED", "Authentication required.", { status: 401, req });
    }

    const { searchParams } = new URL(req.url);
    const parsed = RequestListQuerySchema.safeParse(Object.fromEntries(searchParams));
    if (!parsed.success) {
      return apiError("VALIDATION_ERROR", "Invalid query parameters.", { status: 400, req });
    }

    const { page, limit, status, serviceId, search, sort, order } = parsed.data;
    const offset = (page - 1) * limit;

    const conditions = [isNull(requests.deletedAt)];
    if (status) conditions.push(eq(requests.status, status));
    if (serviceId) conditions.push(eq(requests.serviceId, serviceId));
    if (search) {
      conditions.push(
        ilike(requests.customerName, `%${search}%`)
      );
    }

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;
    const sortColumn = sort === "estimated_max" ? requests.estimatedMax : requests.createdAt;
    const orderClause = order === "asc" ? asc(sortColumn) : desc(sortColumn);

    const [rows, countResult] = await Promise.all([
      db
        .select({
          id: requests.id,
          referenceNo: requests.referenceNo,
          customerName: requests.customerName,
          customerEmail: requests.customerEmail,
          customerPhone: requests.customerPhone,
          serviceName: services.name,
          estimatedMin: requests.estimatedMin,
          estimatedMax: requests.estimatedMax,
          finalPrice: requests.finalPrice,
          status: requests.status,
          isRead: requests.isRead,
          createdAt: requests.createdAt,
        })
        .from(requests)
        .innerJoin(services, eq(requests.serviceId, services.id))
        .where(whereClause)
        .orderBy(orderClause)
        .limit(limit)
        .offset(offset),
      db
        .select({ total: count() })
        .from(requests)
        .where(whereClause),
    ]);

    const total = Number(countResult[0]?.total ?? 0);
    return apiResponse(rows, {
      req,
      headers: getCorsHeaders(req),
      meta: { page, limit, total, totalPages: Math.ceil(total / limit) },
    } as Parameters<typeof apiResponse>[1] & { meta: unknown });
  } catch (error: any) {
    console.error("GET /api/v1/admin/requests error:", error);
    return apiError(
      "SERVER_ERROR",
      error?.message || "Internal server error occurred while retrieving requests.",
      { status: 500, req }
    );
  }
}
