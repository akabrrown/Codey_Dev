import { createClient as createBrowserClient } from "./supabase-browser";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3002";

export async function fetchWithAuth(path: string, options: RequestInit = {}) {
  const supabase = createBrowserClient();
  let session = (await supabase.auth.getSession()).data.session;

  if (!session?.access_token) {
    const refreshed = await supabase.auth.refreshSession();
    session = refreshed.data.session;
  }

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
