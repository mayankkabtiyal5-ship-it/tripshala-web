import { createClient, SupabaseClient } from "@supabase/supabase-js";

// Server-only Supabase client — used to persist form leads as a backup to
// the WhatsApp handoff, so a submission is never lost even if the visitor
// never hits "send" in WhatsApp.
//
// SETUP (see DEPLOYMENT.md "Configure Supabase"):
// 1. Create a project at supabase.com, run the SQL in supabase/schema.sql.
// 2. In Vercel: Settings -> Environment Variables, add:
//    - SUPABASE_URL           (Project Settings -> API -> Project URL)
//    - SUPABASE_SERVICE_ROLE_KEY  (Project Settings -> API -> service_role key)
// 3. Redeploy.
//
// Deliberately NOT using NEXT_PUBLIC_ vars: this client only ever runs on
// the server (inside the /api/leads route), and the service role key must
// never reach the browser bundle. Until both env vars are set, this
// no-ops instead of crashing the build or breaking the booking flow.

let cachedClient: SupabaseClient | null | undefined;

export function getSupabaseServerClient(): SupabaseClient | null {
  if (cachedClient !== undefined) return cachedClient;

  const url = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    cachedClient = null;
    return cachedClient;
  }

  cachedClient = createClient(url, serviceRoleKey, {
    auth: { persistSession: false },
  });
  return cachedClient;
}
