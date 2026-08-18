import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(url && anonKey);

if (!isSupabaseConfigured) {
  // Expected until a Supabase project is created and its keys are set in
  // .env.local (see .env.example) — the storefront itself doesn't need
  // Supabase yet, only the future image-upload flow does.
  console.warn('[supabase] VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY not set — image uploads are disabled.');
}

export const supabase = isSupabaseConfigured ? createClient(url, anonKey) : null;
