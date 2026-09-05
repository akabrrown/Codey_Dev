import { z } from "zod";

// ─── Enums matching DB schema ──────────────────────────────────────────────────

export const RequestStatusSchema = z.enum([
  "new",
  "reviewed",
  "quote_sent",
  "accepted",
  "declined",
  "in_progress",
  "completed",
]);

export const OptionTypeSchema = z.enum([
  "page",
  "feature",
  "integration",
  "timeline",
  "subtype",
]);

// ─── Public form submission ────────────────────────────────────────────────────

const GhanaPhone = z
  .string()
  .trim()
  .regex(/^(?:\+233|0)[235]\d{8}$/, "Enter a valid Ghana phone number (e.g. 024 000 0000)");

export const SubmitRequestSchema = z.object({
  serviceId: z.string().uuid("Invalid service selection"),
  selectedOptionIds: z
    .array(z.string().uuid())
    .min(1, "Select at least one option"),
  customerName: z
    .string()
    .trim()
    .min(2, "Full name must be at least 2 characters")
    .max(120, "Name is too long"),
  customerPhone: GhanaPhone,
  customerEmail: z
    .string()
    .trim()
    .email("Enter a valid email address")
    .max(254, "Email address is too long"),
  businessName: z.string().trim().max(120).optional(),
  notes: z.string().trim().max(2000, "Notes must be under 2,000 characters").optional(),
  termsAccepted: z.literal(true, {
    errorMap: () => ({ message: "You must accept the Terms & Conditions to proceed" }),
  }),
  customRequirements: z
    .array(
      z.object({
        name: z.string().trim().min(1).max(200),
        type: z.enum(["page", "feature", "integration"]),
      })
    )
    .max(20, "You can add up to 20 custom items")
    .optional()
    .default([]),
  // Cloudinary public IDs submitted after successful upload
  uploadedFileIds: z
    .array(
      z.object({
        cloudinaryPublicId: z.string().min(1),
        fileName: z.string().min(1).max(255),
        fileType: z.enum(["application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "image/jpeg", "image/png"]),
        fileSizeBytes: z.number().int().min(1).max(10 * 1024 * 1024), // 10MB
      })
    )
    .max(3, "You can upload up to 3 files")
    .optional()
    .default([]),
});

export type SubmitRequestInput = z.infer<typeof SubmitRequestSchema>;

// ─── Admin request update ──────────────────────────────────────────────────────

export const UpdateRequestSchema = z
  .object({
    status: RequestStatusSchema.optional(),
    finalPrice: z.number().positive().optional(),
    priceAdjustmentReason: z.string().trim().min(10).max(500).optional(),
    adminNotes: z.string().trim().max(3000).optional(),
    isRead: z.boolean().optional(),
  })
  .superRefine((data, ctx) => {
    // Require a reason whenever final price is being set
    if (data.finalPrice !== undefined && !data.priceAdjustmentReason) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["priceAdjustmentReason"],
        message: "A reason is required when adjusting the final price",
      });
    }
  });

export type UpdateRequestInput = z.infer<typeof UpdateRequestSchema>;

// ─── Admin pricing rules ───────────────────────────────────────────────────────

export const CreateServiceOptionSchema = z.object({
  serviceId: z.string().uuid(),
  label: z.string().trim().min(2).max(200),
  optionType: OptionTypeSchema,
  priceImpact: z.number().min(0),
  isMultiplier: z.boolean().default(false),
  multiplierValue: z.number().positive().optional(),
  helperText: z.string().trim().max(400).optional(),
  sortOrder: z.number().int().min(0).default(0),
});

export const UpdateServiceOptionSchema = CreateServiceOptionSchema.partial().extend({
  isActive: z.boolean().optional(),
});

export const UpdateServiceBasePriceSchema = z.object({
  basePriceMin: z.number().min(0, "Base minimum price cannot be negative"),
  basePriceMax: z.number().min(0, "Base maximum price cannot be negative"),
}).refine((data) => data.basePriceMax >= data.basePriceMin, {
  message: "Base maximum price must be greater than or equal to base minimum price",
  path: ["basePriceMax"],
});

export type CreateServiceOptionInput = z.infer<typeof CreateServiceOptionSchema>;
export type UpdateServiceOptionInput = z.infer<typeof UpdateServiceOptionSchema>;
export type UpdateServiceBasePriceInput = z.infer<typeof UpdateServiceBasePriceSchema>;

// ─── Pagination / filter query params ─────────────────────────────────────────

export const RequestListQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(25),
  status: RequestStatusSchema.optional(),
  serviceId: z.string().uuid().optional(),
  search: z.string().trim().max(100).optional(),
  sort: z.enum(["created_at", "estimated_max"]).default("created_at"),
  order: z.enum(["asc", "desc"]).default("desc"),
});

export type RequestListQuery = z.infer<typeof RequestListQuerySchema>;
