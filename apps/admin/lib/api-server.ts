import { createClient as createServerClient } from "./supabase-server";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3002";

export async function fetchServerWithAuth(path: string, options: RequestInit = {}) {
  const supabase = await createServerClient();
  const { data: { session } } = await supabase.auth.getSession();
  const token = session?.access_token;

  const headers = new Headers(options.headers || {});
  headers.set("Content-Type", "application/json");
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  return fetch(`${API_URL}${path}`, {
    ...options,
    headers,
  });
}
