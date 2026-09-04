import { type NextRequest } from "next/server";
import { db } from "@codey/db";
import { requests, requestSelections, requestFiles, serviceOptions, services, statusLog } from "@codey/db";
import { SubmitRequestSchema } from "@codey/validators";
import { calculateEstimate } from "@codey/engine";
import { eq, inArray } from "drizzle-orm";
import { submissionRateLimiter } from "../../../../lib/rate-limit";
import { generateReferenceNo } from "../../../../lib/reference";
import { sendAdminNewRequestNotification, sendCustomerConfirmation } from "../../../../lib/services/email";
import { apiResponse, apiError, getCorsHeaders } from "../../../../lib/api-helpers";

// Accepted MIME types — validated server-side, client validation is UX only
const ACCEPTED_MIME_TYPES = new Set([
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "image/jpeg",
  "image/png",
]);

export async function OPTIONS(req: Request) {
  return new Response(null, { status: 204, headers: getCorsHeaders(req) });
}

export async function GET(req: NextRequest) {
  return apiResponse({ message: "Quote submission endpoint. POST to submit a request." });
}

export async function POST(req: NextRequest) {
  const requestId = crypto.randomUUID();

  // ── Rate limit check ────────────────────────────────────────────────────────
  const rateLimitDecision = await submissionRateLimiter.protect(req, { requested: 1 });
  if (rateLimitDecision.isDenied()) {
    return apiError("RATE_LIMITED", "Too many requests. Please try again later.", {
      status: 429,
      requestId,
    });
  }

  // ── Parse and validate ──────────────────────────────────────────────────────
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return apiError("INVALID_JSON", "Request body must be valid JSON.", { status: 400, requestId });
  }

  const parsed = SubmitRequestSchema.safeParse(body);
  if (!parsed.success) {
    const firstError = parsed.error.errors[0];
    return apiError("VALIDATION_ERROR", firstError?.message ?? "Validation failed", {
      status: 400,
      field: firstError?.path.join("."),
      requestId,
    });
  }

  const input = parsed.data;

  // ── Validate file MIME types ─────────────────────────────────────────────────
  for (const file of input.uploadedFileIds) {
    if (!ACCEPTED_MIME_TYPES.has(file.fileType)) {
      return apiError("INVALID_FILE_TYPE", `File type '${file.fileType}' is not accepted.`, {
        status: 400,
        requestId,
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
    return apiError("NOT_FOUND", "Service not found or unavailable.", { status: 404, requestId });
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

  // ── Persist to database ───────────────────────────────────────────────────
  await db.transaction(async (tx) => {
    const [newRequest] = await tx
      .insert(requests)
      .values({
        referenceNo,
        serviceId: input.serviceId,
        customerName: input.customerName,
        customerPhone: input.customerPhone,
        customerEmail: input.customerEmail,
        businessName: input.businessName,
        notes: input.notes,
        estimatedMin: String(estimate.min),
        estimatedMax: String(estimate.max),
        termsAccepted: input.termsAccepted,
        status: "new",
      })
      .returning({ id: requests.id });

    if (!newRequest) throw new Error("Failed to create request");

    // Snapshot selected options with their price at time of submission
    if (selectedOptions.length > 0) {
      await tx.insert(requestSelections).values(
        selectedOptions.map((o) => ({
          requestId: newRequest.id,
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
          requestId: newRequest.id,
          cloudinaryPublicId: f.cloudinaryPublicId,
          fileName: f.fileName,
          fileType: f.fileType,
          fileSizeBytes: f.fileSizeBytes,
        }))
      );
    }

    // Write initial status_log entry
    await tx.insert(statusLog).values({
      requestId: newRequest.id,
      fromStatus: null,
      toStatus: "new",
      note: "Request submitted via public portal",
    });

    // Send notifications (outside transaction — email failure should not roll back the request)
    await Promise.allSettled([
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
    ]);

    return newRequest;
  });

  return apiResponse(
    {
      referenceNo,
      estimatedMin: estimate.min,
      estimatedMax: estimate.max,
    },
    { status: 201, requestId }
  );
}
