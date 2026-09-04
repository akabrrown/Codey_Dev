import { type NextRequest } from "next/server";
import { db } from "@codey/db";
import { requests, services, requestSelections } from "@codey/db";
import { eq, and, isNull } from "drizzle-orm";
import { getAuthenticatedUser, apiResponse, apiError, getCorsHeaders } from "../../../../../../../lib/api-helpers";
import { sendCustomerQuote } from "../../../../../../../lib/services/email";

type RouteContext = { params: Promise<{ id: string }> };

export const dynamic = "force-dynamic";

export async function OPTIONS(req: Request) {
  return new Response(null, { status: 204, headers: getCorsHeaders(req) });
}

export async function POST(req: NextRequest, context: RouteContext) {
  try {
    const user = await getAuthenticatedUser(req);
    if (!user) return apiError("UNAUTHORIZED", "Authentication required.", { status: 401, req });

    const { id } = await context.params;

    const [request] = await db
      .select()
      .from(requests)
      .where(and(eq(requests.id, id), isNull(requests.deletedAt)))
      .limit(1);

    if (!request) return apiError("NOT_FOUND", "Request not found.", { status: 404, req });

    if (!request.finalPrice) {
      return apiError(
        "PRECONDITION_FAILED",
        "Set a final price before sending the quote.",
        { status: 422, req }
      );
    }

    const [service] = await db
      .select()
      .from(services)
      .where(eq(services.id, request.serviceId))
      .limit(1);

    const selections = await db
      .select({
        labelAtTime: requestSelections.labelAtTime,
        priceImpactAtTime: requestSelections.priceImpactAtTime,
        isMultiplierAtTime: requestSelections.isMultiplierAtTime,
      })
      .from(requestSelections)
      .where(eq(requestSelections.requestId, id));

    const lineItems = selections.map((s) => ({
      label: s.labelAtTime,
      priceImpact: Number(s.priceImpactAtTime),
    }));

    await sendCustomerQuote({
      referenceNo: request.referenceNo,
      customerName: request.customerName,
      customerEmail: request.customerEmail,
      serviceName: service?.name ?? "Project",
      finalPrice: Number(request.finalPrice),
      lineItems,
    });

    // Update status to quote_sent
    await db
      .update(requests)
      .set({ status: "quote_sent" })
      .where(eq(requests.id, id));

    return apiResponse({ sent: true, to: request.customerEmail }, { req });
  } catch (error: any) {
    console.error("POST /api/v1/admin/requests/[id]/send-quote error:", error);
    return apiError("SERVER_ERROR", error?.message || "Failed to send customer quote.", { status: 500, req });
  }
}
