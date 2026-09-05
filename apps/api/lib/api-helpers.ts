import { createClient } from "@supabase/supabase-js";
import type { NextRequest } from "next/server";

export function createAdminSupabaseClient() {
  const url = process.env["NEXT_PUBLIC_SUPABASE_URL"] || "https://dyxvorhvxiakhspxvhaf.supabase.co";
  const key =
    process.env["SUPABASE_SERVICE_ROLE_KEY"] ||
    process.env["NEXT_PUBLIC_SUPABASE_ANON_KEY"];
  if (!url || !key) return null;
  try {
    return createClient(url, key, { auth: { persistSession: false } });
  } catch {
    return null;
  }
}

export async function getAuthenticatedUser(req: NextRequest) {
  const result = await getAuthenticatedUserWithReason(req);
  return result.user;
}

export async function getAuthenticatedUserWithReason(
  req: NextRequest
): Promise<{ user: any | null; reason: string | null }> {
  try {
    const authorization = req.headers.get("authorization");
    if (!authorization?.startsWith("Bearer ")) {
      return { user: null, reason: "No Bearer token in request headers" };
    }

    const token = authorization.slice(7).trim();
    if (!token) {
      return { user: null, reason: "Empty token after Bearer" };
    }

    const supabase = createAdminSupabaseClient();
    if (!supabase) {
      return { user: null, reason: "Supabase client initialization failed (missing URL or Key)" };
    }

    const { data, error } = await supabase.auth.getUser(token);
    if (error || !data?.user) {
      return {
        user: null,
        reason: `Supabase auth.getUser failed: ${error?.message || "User is null"} (status: ${error?.status || "unknown"})`,
      };
    }

    return { user: data.user, reason: null };
  } catch (err: any) {
    return { user: null, reason: `Exception in getAuthenticatedUser: ${err?.message}` };
  }
}

const DEFAULT_ALLOWED_ORIGINS = [
  "https://admincodeydev.vercel.app",
  "https://codeydev.vercel.app",
  "https://codeydev.com",
  "https://admin.codeydev.com",
  "http://localhost:3000",
  "http://localhost:3001",
  "http://127.0.0.1:3000",
  "http://127.0.0.1:3001",
];

export function isOriginAllowed(origin: string | null): boolean {
  if (!origin) return false;

  const configuredOrigins = [
    ...(process.env["PUBLIC_PORTAL_URL"] ? [process.env["PUBLIC_PORTAL_URL"]] : []),
    ...(process.env["ADMIN_PORTAL_URL"] ? [process.env["ADMIN_PORTAL_URL"]] : []),
    ...(process.env["ALLOWED_ORIGINS"] ? process.env["ALLOWED_ORIGINS"].split(",").map((s) => s.trim()) : []),
    ...DEFAULT_ALLOWED_ORIGINS,
  ];

  if (configuredOrigins.includes(origin)) return true;

  // Allow Vercel preview and deployment domains for this project
  if (/^https:\/\/(admincodeydev|codeydev)[a-zA-Z0-9-]*\.vercel\.app$/.test(origin)) {
    return true;
  }

  // Allow localhost during non-production
  if (process.env.NODE_ENV !== "production" && /^http:\/\/(localhost|127\.0\.0\.1):\d+$/.test(origin)) {
    return true;
  }

  return false;
}

export function getCorsHeaders(reqOrOrigin?: Request | Headers | string | null): Record<string, string> {
  let origin: string | null = null;
  if (typeof reqOrOrigin === "string") {
    origin = reqOrOrigin;
  } else if (reqOrOrigin && "headers" in reqOrOrigin && typeof reqOrOrigin.headers?.get === "function") {
    origin = reqOrOrigin.headers.get("origin");
  } else if (reqOrOrigin && typeof (reqOrOrigin as Headers)?.get === "function") {
    origin = (reqOrOrigin as Headers).get("origin");
  }

  const isAllowed = isOriginAllowed(origin);
  const allowOrigin = (isAllowed && origin) ? origin : "https://codeydev.vercel.app";

  return {
    "Access-Control-Allow-Origin": allowOrigin,
    "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With, Accept, Origin",
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
  const cors = options.req ? getCorsHeaders(options.req) : CORS_HEADERS;
  Object.entries(cors).forEach(([k, v]) => {
    if (!headers.has(k)) headers.set(k, v);
  });

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
  const cors = options.req ? getCorsHeaders(options.req) : CORS_HEADERS;
  Object.entries(cors).forEach(([k, v]) => {
    if (!headers.has(k)) headers.set(k, v);
  });

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

