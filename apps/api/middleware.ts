import { NextResponse, type NextRequest } from "next/server";

const ALLOWED_ORIGINS = [
  process.env["PUBLIC_PORTAL_URL"] || "http://localhost:3000",
  process.env["ADMIN_PORTAL_URL"] || "http://localhost:3001",
  "http://localhost:3000",
  "http://localhost:3001",
  "http://127.0.0.1:3000",
  "http://127.0.0.1:3001",
];

export function middleware(request: NextRequest) {
  const origin = request.headers.get("origin");

  const isAllowed = origin && (
    ALLOWED_ORIGINS.includes(origin) ||
    (process.env.NODE_ENV !== "production" && /^http:\/\/(localhost|127\.0\.0\.1):\d+$/.test(origin))
  );

  const allowOrigin = (isAllowed && origin) ? origin : (process.env["PUBLIC_PORTAL_URL"] || "http://localhost:3000");

  // Immediate response for CORS preflight OPTIONS requests
  if (request.method === "OPTIONS") {
    return new NextResponse(null, {
      status: 204,
      headers: {
        "Access-Control-Allow-Origin": allowOrigin,
        "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With, Accept",
        "Access-Control-Allow-Credentials": "true",
        "Access-Control-Max-Age": "86400",
        "Vary": "Origin",
      },
    });
  }

  // Pass through downstream response and apply CORS headers
  const response = NextResponse.next();
  if (isAllowed) {
    response.headers.set("Access-Control-Allow-Origin", allowOrigin);
    response.headers.set("Access-Control-Allow-Credentials", "true");
    response.headers.set("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
    response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With, Accept");
    response.headers.set("Vary", "Origin");
  }

  return response;
}

export const config = {
  matcher: "/api/:path*",
};
