import { createBrowserClient } from "@supabase/ssr";

let browserClient: ReturnType<typeof createBrowserClient> | null = null;

export function createClient() {
  if (browserClient) return browserClient;
  const supabaseUrl = process.env["NEXT_PUBLIC_SUPABASE_URL"] || "https://dyxvorhvxiakhspxvhaf.supabase.co";
  const supabaseAnonKey = process.env["NEXT_PUBLIC_SUPABASE_ANON_KEY"] || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR5eHZvcmh2eGlha2hzcHh2aGFmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg1MDY4MDIsImV4cCI6MjEwNDA4MjgwMn0.o4GAy1m7fJyNlpeaJr_PaVobdgbBGD7YfHlJcAQWQYI";
  browserClient = createBrowserClient(supabaseUrl, supabaseAnonKey);
  return browserClient;
}
