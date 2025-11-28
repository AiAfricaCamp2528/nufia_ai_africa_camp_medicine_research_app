import { createClient } from '@supabase/supabase-js';
import type { Database } from './database.types';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const SUPABASE_SERVICE_ROLE = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL) {
  throw new Error('Missing env: NEXT_PUBLIC_SUPABASE_URL');
}

if (!SUPABASE_ANON_KEY) {
  // client key may be absent in some server-only contexts; but warn early
  console.warn('Missing env: NEXT_PUBLIC_SUPABASE_ANON_KEY');
}

export const clientSupabase = createClient<Database>(
  SUPABASE_URL,
  SUPABASE_ANON_KEY ?? '',
  { auth: { persistSession: true } }
);

if (!SUPABASE_SERVICE_ROLE) {
  console.warn('Missing env: SUPABASE_SERVICE_ROLE_KEY (service role)');
}

// serverSupabase uses the service role key and should only be used in server code
export const serverSupabase = createClient<Database>(
  SUPABASE_URL,
  SUPABASE_SERVICE_ROLE ?? '',
  { auth: { persistSession: false } }
);

export type SupabaseClientServer = typeof serverSupabase;
export type SupabaseClientBrowser = typeof clientSupabase;
