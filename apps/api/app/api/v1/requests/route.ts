import { type NextRequest } from "next/server";
import { db } from "@codey/db";
import { requests, requestSelections, requestFiles, serviceOptions, services, statusLog } from "@codey/db";
import { SubmitRequestSchema } from "@codey/validators";
import { calculateEstimate } from "@codey/engine";
import { eq, inArray } from "drizzle-orm";
import { submissionRateLimiter } from "../../../../lib/rate-limit";
import { generateReferenceNo } from "../../../../lib/reference";
import { sendAdminNewRequestNotification, sendCustomerConfirmation } from "../../../../lib/services/email";
import { sendOneSignalAdminNotification } from "../../../../lib/services/onesignal";
import { apiResponse, apiError, getCorsHeaders } from "../../../../lib/api-helpers";

// Accepted MIME types — validated server-side, client validation is UX only
const ACCEPTED_MIME_TYPES = new Set([
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "image/jpeg",
  "image/png",
]);

export const dynamic = "force-dynamic";

export async function OPTIONS(req: Request) {
  return new Response(null, { status: 204, headers: getCorsHeaders(req) });
}

export async function GET(req: NextRequest) {
  return apiResponse({ message: "Quote submission endpoint. POST to submit a request." });
}

export async function POST(req: NextRequest) {
  const requestId = crypto.randomUUID();

  try {
    // ── Rate limit check ────────────────────────────────────────────────────────
    const rateLimitDecision = await submissionRateLimiter.protect(req, { requested: 1 });
    if (rateLimitDecision.isDenied()) {
      return apiError("RATE_LIMITED", "Too many requests. Please try again later.", {
        status: 429,
        requestId,
        req,
      });
    }

    // ── Parse and validate ──────────────────────────────────────────────────────
    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return apiError("INVALID_JSON", "Request body must be valid JSON.", { status: 400, requestId, req });
    }

    const parsed = SubmitRequestSchema.safeParse(body);
    if (!parsed.success) {
      const firstError = parsed.error.errors[0];
      return apiError("VALIDATION_ERROR", firstError?.message ?? "Validation failed", {
        status: 400,
        field: firstError?.path.join("."),
        requestId,
        req,
      });
    }

    const input = parsed.data;

    // ── Validate file MIME types ─────────────────────────────────────────────────
    for (const file of input.uploadedFileIds) {
      if (!ACCEPTED_MIME_TYPES.has(file.fileType)) {
        return apiError("INVALID_FILE_TYPE", `File type '${file.fileType}' is not accepted.`, {
          status: 400,
          requestId,
          req,
        });
      }
    }

    // ── Load service and options from DB ─────────────────────────────────────────
    const [service] = await db
      .select()
      .from(services)
      .where(eq(services.id, input.serviceId))
      .limit(1);

    if (!service || !service.isActive) {
      return apiError("NOT_FOUND", "Service not found or unavailable.", { status: 404, requestId, req });
    }

    const selectedOptions = await db
      .select()
      .from(serviceOptions)
      .where(
        inArray(serviceOptions.id, input.selectedOptionIds)
      );

    // Verify all submitted option IDs belong to the submitted service
    const invalidOption = selectedOptions.find((o) => o.serviceId !== input.serviceId);
    if (invalidOption) {
      return apiError("VALIDATION_ERROR", "One or more selected options do not belong to this service.", {
        status: 400,
        requestId,
        req,
      });
    }

    // ── Server-side price calculation (authoritative) ─────────────────────────
    const pricingOptions = selectedOptions.map((o) => ({
      priceImpact: Number(o.priceImpact),
      isMultiplier: o.isMultiplier,
      multiplierValue: o.multiplierValue ? Number(o.multiplierValue) : undefined,
    }));

    const estimate = calculateEstimate(
      Number(service.basePriceMin),
      Number(service.basePriceMax),
      pricingOptions
    );

    // ── Generate reference number ─────────────────────────────────────────────
    const referenceNo = generateReferenceNo();

    // Format notes with any custom client requirements
    let combinedNotes = input.notes || "";
    if (input.customRequirements && input.customRequirements.length > 0) {
      const customSummary = input.customRequirements
        .map((item) => `• [Custom ${item.type.toUpperCase()}] ${item.name}`)
        .join("\n");
      combinedNotes = combinedNotes
        ? `${combinedNotes}\n\n--- Custom Client Requests ---\n${customSummary}`
        : `--- Custom Client Requests ---\n${customSummary}`;
    }

    // ── Persist to database ───────────────────────────────────────────────────
    const newRequest = await db.transaction(async (tx) => {
      const [inserted] = await tx
        .insert(requests)
        .values({
          referenceNo,
          serviceId: input.serviceId,
          customerName: input.customerName,
          customerPhone: input.customerPhone,
          customerEmail: input.customerEmail,
          businessName: input.businessName,
          notes: combinedNotes || null,
          estimatedMin: String(estimate.min),
          estimatedMax: String(estimate.max),
          termsAccepted: input.termsAccepted,
          status: "new",
        })
        .returning({ id: requests.id });

      if (!inserted) throw new Error("Failed to create request record");

      // Snapshot selected options with their price at time of submission
      if (selectedOptions.length > 0) {
        await tx.insert(requestSelections).values(
          selectedOptions.map((o) => ({
            requestId: inserted.id,
            serviceOptionId: o.id,
            priceImpactAtTime: o.priceImpact,
            isMultiplierAtTime: o.isMultiplier,
            multiplierValueAtTime: o.multiplierValue,
            labelAtTime: o.label,
          }))
        );
      }

      // Record uploaded files
      if (input.uploadedFileIds.length > 0) {
        await tx.insert(requestFiles).values(
          input.uploadedFileIds.map((f) => ({
            requestId: inserted.id,
            cloudinaryPublicId: f.cloudinaryPublicId,
            fileName: f.fileName,
            fileType: f.fileType,
            fileSizeBytes: f.fileSizeBytes,
          }))
        );
      }

      // Write initial status_log entry
      await tx.insert(statusLog).values({
        requestId: inserted.id,
        fromStatus: null,
        toStatus: "new",
        note: "Request submitted via public portal",
      });

      return inserted;
    });

    // ── Asynchronous Multi-Channel Notifications (outside DB transaction) ───────
    const notificationResults = await Promise.allSettled([
      sendAdminNewRequestNotification({
        referenceNo,
        serviceName: service.name,
        customerName: input.customerName,
        customerEmail: input.customerEmail,
        customerPhone: input.customerPhone,
        estimatedMin: estimate.min,
        estimatedMax: estimate.max,
      }),
      sendCustomerConfirmation({
        referenceNo,
        customerName: input.customerName,
        customerEmail: input.customerEmail,
        serviceName: service.name,
        estimatedMin: estimate.min,
        estimatedMax: estimate.max,
      }),
      sendOneSignalAdminNotification({
        title: `🚀 New Project: ${service.name}`,
        message: `${input.customerName} submitted inquiry ${referenceNo} (Est: GH₵ ${estimate.min.toLocaleString()} – ${estimate.max.toLocaleString()})`,
        url: `/admin/requests/${newRequest.id}`,
        data: {
          requestId: newRequest.id,
          referenceNo,
          serviceName: service.name,
        },
      }),
    ]);

    notificationResults.forEach((res, idx) => {
      const label = idx === 0 ? "Admin Email Notification" : idx === 1 ? "Customer Email Confirmation" : "OneSignal Push";
      if (res.status === "rejected") {
        console.error(`[NOTIFICATION ERROR] ${label} rejected:`, res.reason);
      } else if (res.value && (res.value as any).error) {
        console.error(`[NOTIFICATION ERROR] ${label} returned error:`, (res.value as any).error);
      } else {
        console.log(`[NOTIFICATION SUCCESS] ${label} dispatched successfully.`);
      }
    });

    return apiResponse(
      {
        referenceNo,
        estimatedMin: estimate.min,
        estimatedMax: estimate.max,
      },
      { status: 201, requestId, req }
    );
  } catch (error: any) {
    console.error("POST /api/v1/requests error:", error);
    return apiError("SERVER_ERROR", error?.message || "Failed to process quote request.", {
      status: 500,
      requestId,
      req,
    });
  }
}
