import { createClient } from "@supabase/supabase-js";
import type { NextRequest } from "next/server";

export function createAdminSupabaseClient() {
  const url = process.env["NEXT_PUBLIC_SUPABASE_URL"];
  const key = process.env["SUPABASE_SERVICE_ROLE_KEY"];
  if (!url || !key) throw new Error("Supabase env vars missing");
  return createClient(url, key, { auth: { persistSession: false } });
}

/**
 * Verifies the Supabase Auth session from the Authorization header.
 * Returns the authenticated user or null if invalid/missing.
 */
export async function getAuthenticatedUser(req: NextRequest) {
  const authorization = req.headers.get("authorization");
  if (!authorization?.startsWith("Bearer ")) return null;

  const token = authorization.slice(7);
  const supabase = createAdminSupabaseClient();
  const { data, error } = await supabase.auth.getUser(token);
  if (error || !data.user) return null;
  return data.user;
}

const DEFAULT_ALLOWED_ORIGINS = [
  "http://localhost:3000",
  "http://localhost:3001",
  "http://127.0.0.1:3000",
  "http://127.0.0.1:3001",
];

export function getCorsHeaders(reqOrOrigin?: Request | Headers | string | null): Record<string, string> {
  let origin: string | null = null;
  if (typeof reqOrOrigin === "string") {
    origin = reqOrOrigin;
  } else if (reqOrOrigin && "headers" in reqOrOrigin && typeof reqOrOrigin.headers?.get === "function") {
    origin = reqOrOrigin.headers.get("origin");
  } else if (reqOrOrigin && typeof (reqOrOrigin as Headers)?.get === "function") {
    origin = (reqOrOrigin as Headers).get("origin");
  }

  const configuredOrigins = [
    ...(process.env["PUBLIC_PORTAL_URL"] ? [process.env["PUBLIC_PORTAL_URL"]] : []),
    ...(process.env["ADMIN_PORTAL_URL"] ? [process.env["ADMIN_PORTAL_URL"]] : []),
    ...(process.env["ALLOWED_ORIGINS"] ? process.env["ALLOWED_ORIGINS"].split(",").map((s) => s.trim()) : []),
    ...DEFAULT_ALLOWED_ORIGINS,
  ];

  const isAllowed = origin && (
    configuredOrigins.includes(origin) ||
    (process.env.NODE_ENV !== "production" && /^http:\/\/(localhost|127\.0\.0\.1):\d+$/.test(origin))
  );

  const allowOrigin = (isAllowed && origin) ? origin : (process.env["PUBLIC_PORTAL_URL"] ?? "http://localhost:3000");

  return {
    "Access-Control-Allow-Origin": allowOrigin,
    "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With, Accept",
    "Access-Control-Allow-Credentials": "true",
    "Vary": "Origin",
  };
}

export const CORS_HEADERS = getCorsHeaders();

/**
 * Standard response envelope — every API response follows this shape.
 */
export function apiResponse<T>(
  data: T,
  options: { status?: number; requestId?: string; headers?: HeadersInit; meta?: unknown; req?: Request } = {}
) {
  const headers = new Headers(options.headers);
  if (options.req) {
    const cors = getCorsHeaders(options.req);
    Object.entries(cors).forEach(([k, v]) => headers.set(k, v));
  }
  return Response.json(
    {
      success: true,
      data,
      requestId: options.requestId ?? crypto.randomUUID(),
      ...(options.meta ? { meta: options.meta } : {}),
    },
    {
      status: options.status ?? 200,
      headers,
    }
  );
}

export function apiError(
  code: string,
  message: string,
  options: { status?: number; field?: string; requestId?: string; headers?: HeadersInit; req?: Request } = {}
) {
  const headers = new Headers(options.headers);
  if (options.req) {
    const cors = getCorsHeaders(options.req);
    Object.entries(cors).forEach(([k, v]) => headers.set(k, v));
  }
  return Response.json(
    {
      success: false,
      error: { code, message, field: options.field },
      requestId: options.requestId ?? crypto.randomUUID(),
    },
    {
      status: options.status ?? 400,
      headers,
    }
  );
}

