import { type NextRequest } from "next/server";
import { db } from "@codey/db";
import {
  requests, services, requestSelections, serviceOptions, requestFiles, statusLog,
} from "@codey/db";
import { UpdateRequestSchema } from "@codey/validators";
import { eq, and, isNull, desc } from "drizzle-orm";
import { getAuthenticatedUser, apiResponse, apiError, getCorsHeaders } from "../../../../../../lib/api-helpers";

type RouteContext = { params: Promise<{ id: string }> };

export const dynamic = "force-dynamic";

export async function OPTIONS(req: Request) {
  return new Response(null, { status: 204, headers: getCorsHeaders(req) });
}

export async function GET(req: NextRequest, context: RouteContext) {
  const user = await getAuthenticatedUser(req);
  if (!user) return apiError("UNAUTHORIZED", "Authentication required.", { status: 401 });

  const { id } = await context.params;

  const [request] = await db
    .select()
    .from(requests)
    .where(and(eq(requests.id, id), isNull(requests.deletedAt)))
    .limit(1);

  if (!request) return apiError("NOT_FOUND", "Request not found.", { status: 404 });

  // Mark as read on first open
  if (!request.isRead) {
    await db.update(requests).set({ isRead: true }).where(eq(requests.id, id));
  }

  const [service, selections, files, history] = await Promise.all([
    db.select().from(services).where(eq(services.id, request.serviceId)).limit(1),
    db
      .select({
        id: requestSelections.id,
        labelAtTime: requestSelections.labelAtTime,
        priceImpactAtTime: requestSelections.priceImpactAtTime,
        isMultiplierAtTime: requestSelections.isMultiplierAtTime,
        multiplierValueAtTime: requestSelections.multiplierValueAtTime,
        optionType: serviceOptions.optionType,
      })
      .from(requestSelections)
      .innerJoin(serviceOptions, eq(requestSelections.serviceOptionId, serviceOptions.id))
      .where(eq(requestSelections.requestId, id)),
    db.select().from(requestFiles).where(eq(requestFiles.requestId, id)),
    db
      .select()
      .from(statusLog)
      .where(eq(statusLog.requestId, id))
      .orderBy(desc(statusLog.changedAt)),
  ]);

  return apiResponse({
    ...request,
    service: service[0],
    selections,
    files,
    statusHistory: history,
  });
}

export async function PATCH(req: NextRequest, context: RouteContext) {
  const user = await getAuthenticatedUser(req);
  if (!user) return apiError("UNAUTHORIZED", "Authentication required.", { status: 401 });

  const { id } = await context.params;

  const [existing] = await db
    .select()
    .from(requests)
    .where(and(eq(requests.id, id), isNull(requests.deletedAt)))
    .limit(1);

  if (!existing) return apiError("NOT_FOUND", "Request not found.", { status: 404 });

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return apiError("INVALID_JSON", "Request body must be valid JSON.", { status: 400 });
  }

  const parsed = UpdateRequestSchema.safeParse(body);
  if (!parsed.success) {
    const firstError = parsed.error.errors[0];
    return apiError("VALIDATION_ERROR", firstError?.message ?? "Validation failed", {
      status: 400,
      field: firstError?.path.join("."),
    });
  }

  const input = parsed.data;
  const statusChanged = input.status && input.status !== existing.status;

  await db.transaction(async (tx) => {
    await tx
      .update(requests)
      .set({
        ...(input.status !== undefined && { status: input.status }),
        ...(input.finalPrice !== undefined && { finalPrice: String(input.finalPrice) }),
        ...(input.priceAdjustmentReason !== undefined && {
          priceAdjustmentReason: input.priceAdjustmentReason,
        }),
        ...(input.adminNotes !== undefined && { adminNotes: input.adminNotes }),
        ...(input.isRead !== undefined && { isRead: input.isRead }),
      })
      .where(eq(requests.id, id));

    if (statusChanged && input.status) {
      await tx.insert(statusLog).values({
        requestId: id,
        fromStatus: existing.status,
        toStatus: input.status,
      });
    }
  });

  return apiResponse({ id, updated: true });
}
