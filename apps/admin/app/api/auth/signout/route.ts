import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "../../../../lib/supabase-server";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient();
    await supabase.auth.signOut();
  } catch (err) {
    console.error("Server signout error:", err);
  }

  const response = NextResponse.json({ success: true, message: "Logged out successfully" });

  // Explicitly clear any Supabase session cookies
  const cookies = req.cookies.getAll();
  for (const cookie of cookies) {
    if (cookie.name.includes("sb-") || cookie.name.includes("auth-token") || cookie.name.includes("supabase")) {
      response.cookies.delete(cookie.name);
    }
  }

  return response;
}
