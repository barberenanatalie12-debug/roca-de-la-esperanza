import { createClient } from "@supabase/supabase-js";

// These are the PUBLIC Supabase URL + anon key. They are safe to include here:
// Vite bakes them into the browser bundle for every visitor regardless, and
// Supabase designs the anon key to be public. Your data is protected by Row
// Level Security policies in Supabase, NOT by hiding these values.
//
// Env vars take precedence when they are set (e.g. a different project for
// local testing). When they are not set — such as a Cloudflare Worker build
// where VITE_ build-time vars are not wired up — the code falls back to these
// public defaults so the site still works instead of white-screening.
const FALLBACK_SUPABASE_URL = "https://jzgxtokewmodjcviwlxh.supabase.co";
const FALLBACK_SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp6Z3h0b2tld21vZGpjdml3bHhoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYxMDM1NTksImV4cCI6MjA5MTY3OTU1OX0.u6KbeuShxgbURE_8EXhBYoL8fhLpaedbJ_cw4GfRTaY";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || FALLBACK_SUPABASE_URL;
const supabaseAnonKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY || FALLBACK_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);