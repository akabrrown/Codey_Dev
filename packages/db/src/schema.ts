import {
  pgTable,
  uuid,
  text,
  numeric,
  boolean,
  integer,
  timestamp,
  pgEnum,
  uniqueIndex,
  index,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// ─── Enums ────────────────────────────────────────────────────────────────────

export const RequestStatus = pgEnum("request_status", [
  "new",
  "reviewed",
  "quote_sent",
  "accepted",
  "declined",
  "in_progress",
  "completed",
]);

export const OptionType = pgEnum("option_type", [
  "page",
  "feature",
  "integration",
  "timeline",
  "subtype",
]);

// ─── services ─────────────────────────────────────────────────────────────────

export const services = pgTable(
  "services",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    name: text("name").notNull(),
    slug: text("slug").notNull(),
    description: text("description"),
    basePriceMin: numeric("base_price_min", { precision: 12, scale: 2 }).notNull(),
    basePriceMax: numeric("base_price_max", { precision: 12, scale: 2 }).notNull(),
    isActive: boolean("is_active").notNull().default(true),
    sortOrder: integer("sort_order").notNull().default(0),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [uniqueIndex("idx_services_slug").on(t.slug)]
);

// ─── service_options ──────────────────────────────────────────────────────────

export const serviceOptions = pgTable(
  "service_options",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    serviceId: uuid("service_id")
      .notNull()
      .references(() => services.id, { onDelete: "cascade" }),
    label: text("label").notNull(),
    optionType: OptionType("option_type").notNull(),
    priceImpact: numeric("price_impact", { precision: 12, scale: 2 }).notNull().default("0"),
    isMultiplier: boolean("is_multiplier").notNull().default(false),
    multiplierValue: numeric("multiplier_value", { precision: 6, scale: 4 }),
    helperText: text("helper_text"),
    isActive: boolean("is_active").notNull().default(true),
    sortOrder: integer("sort_order").notNull().default(0),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [
    index("idx_service_options_service_id").on(t.serviceId),
    index("idx_service_options_type").on(t.optionType),
  ]
);

// ─── requests ─────────────────────────────────────────────────────────────────

export const requests = pgTable(
  "requests",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    referenceNo: text("reference_no").notNull(),
    serviceId: uuid("service_id")
      .notNull()
      .references(() => services.id),
    customerName: text("customer_name").notNull(),
    customerPhone: text("customer_phone").notNull(),
    customerEmail: text("customer_email").notNull(),
    businessName: text("business_name"),
    notes: text("notes"),
    estimatedMin: numeric("estimated_min", { precision: 12, scale: 2 }).notNull(),
    estimatedMax: numeric("estimated_max", { precision: 12, scale: 2 }).notNull(),
    finalPrice: numeric("final_price", { precision: 12, scale: 2 }),
    priceAdjustmentReason: text("price_adjustment_reason"),
    status: RequestStatus("status").notNull().default("new"),
    adminNotes: text("admin_notes"),
    termsAccepted: boolean("terms_accepted").notNull().default(false),
    isRead: boolean("is_read").notNull().default(false),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
    deletedAt: timestamp("deleted_at", { withTimezone: true }),
  },
  (t) => [
    uniqueIndex("idx_requests_reference_no").on(t.referenceNo),
    index("idx_requests_status").on(t.status),
    index("idx_requests_service_id").on(t.serviceId),
    index("idx_requests_created_at").on(t.createdAt),
    index("idx_requests_customer_email").on(t.customerEmail),
  ]
);

// ─── request_selections ───────────────────────────────────────────────────────

export const requestSelections = pgTable(
  "request_selections",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    requestId: uuid("request_id")
      .notNull()
      .references(() => requests.id, { onDelete: "cascade" }),
    serviceOptionId: uuid("service_option_id")
      .notNull()
      .references(() => serviceOptions.id),
    priceImpactAtTime: numeric("price_impact_at_time", { precision: 12, scale: 2 }).notNull(),
    isMultiplierAtTime: boolean("is_multiplier_at_time").notNull().default(false),
    multiplierValueAtTime: numeric("multiplier_value_at_time", { precision: 6, scale: 4 }),
    labelAtTime: text("label_at_time").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [
    index("idx_request_selections_request_id").on(t.requestId),
  ]
);

// ─── request_files ────────────────────────────────────────────────────────────

export const requestFiles = pgTable(
  "request_files",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    requestId: uuid("request_id")
      .notNull()
      .references(() => requests.id, { onDelete: "cascade" }),
    cloudinaryPublicId: text("cloudinary_public_id").notNull(),
    fileName: text("file_name").notNull(),
    fileType: text("file_type").notNull(),
    fileSizeBytes: integer("file_size_bytes").notNull(),
    uploadedAt: timestamp("uploaded_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [
    index("idx_request_files_request_id").on(t.requestId),
  ]
);

// ─── status_log ───────────────────────────────────────────────────────────────

export const statusLog = pgTable(
  "status_log",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    requestId: uuid("request_id")
      .notNull()
      .references(() => requests.id, { onDelete: "cascade" }),
    fromStatus: text("from_status"),
    toStatus: text("to_status").notNull(),
    changedAt: timestamp("changed_at", { withTimezone: true }).notNull().defaultNow(),
    note: text("note"),
  },
  (t) => [
    index("idx_status_log_request_id").on(t.requestId),
    index("idx_status_log_changed_at").on(t.changedAt),
  ]
);

// ─── Relations ────────────────────────────────────────────────────────────────

export const servicesRelations = relations(services, ({ many }) => ({
  options: many(serviceOptions),
  requests: many(requests),
}));

export const serviceOptionsRelations = relations(serviceOptions, ({ one, many }) => ({
  service: one(services, { fields: [serviceOptions.serviceId], references: [services.id] }),
  selections: many(requestSelections),
}));

export const requestsRelations = relations(requests, ({ one, many }) => ({
  service: one(services, { fields: [requests.serviceId], references: [services.id] }),
  selections: many(requestSelections),
  files: many(requestFiles),
  statusHistory: many(statusLog),
}));

export const requestSelectionsRelations = relations(requestSelections, ({ one }) => ({
  request: one(requests, { fields: [requestSelections.requestId], references: [requests.id] }),
  serviceOption: one(serviceOptions, { fields: [requestSelections.serviceOptionId], references: [serviceOptions.id] }),
}));

export const requestFilesRelations = relations(requestFiles, ({ one }) => ({
  request: one(requests, { fields: [requestFiles.requestId], references: [requests.id] }),
}));

export const statusLogRelations = relations(statusLog, ({ one }) => ({
  request: one(requests, { fields: [statusLog.requestId], references: [requests.id] }),
}));

// ─── Inferred Types ───────────────────────────────────────────────────────────

export type Service = typeof services.$inferSelect;
export type NewService = typeof services.$inferInsert;
export type ServiceOption = typeof serviceOptions.$inferSelect;
export type NewServiceOption = typeof serviceOptions.$inferInsert;
export type Request = typeof requests.$inferSelect;
export type NewRequest = typeof requests.$inferInsert;
export type RequestSelection = typeof requestSelections.$inferSelect;
export type NewRequestSelection = typeof requestSelections.$inferInsert;
export type RequestFile = typeof requestFiles.$inferSelect;
export type NewRequestFile = typeof requestFiles.$inferInsert;
export type StatusLog = typeof statusLog.$inferSelect;
export type NewStatusLog = typeof statusLog.$inferInsert;
export type RequestStatusValue = (typeof RequestStatus.enumValues)[number];
export type OptionTypeValue = (typeof OptionType.enumValues)[number];
