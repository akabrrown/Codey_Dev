import { NextResponse, type NextRequest } from "next/server";

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

function isOriginAllowed(origin: string | null): boolean {
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

export function middleware(request: NextRequest) {
  const origin = request.headers.get("origin");
  const isAllowed = isOriginAllowed(origin);
  const allowOrigin = (isAllowed && origin) ? origin : "https://codeydev.vercel.app";

  // Immediate response for CORS preflight OPTIONS requests
  if (request.method === "OPTIONS") {
    return new NextResponse(null, {
      status: 204,
      headers: {
        "Access-Control-Allow-Origin": allowOrigin,
        "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With, Accept, Origin",
        "Access-Control-Allow-Credentials": "true",
        "Access-Control-Max-Age": "86400",
        "Vary": "Origin",
      },
    });
  }

  // Pass through downstream response and apply CORS headers
  const response = NextResponse.next();
  if (isAllowed && origin) {
    response.headers.set("Access-Control-Allow-Origin", origin);
    response.headers.set("Access-Control-Allow-Credentials", "true");
    response.headers.set("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
    response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With, Accept, Origin");
    response.headers.set("Vary", "Origin");
  }

  return response;
}

export const config = {
  matcher: "/api/:path*",
};
