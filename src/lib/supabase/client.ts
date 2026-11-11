import { createClient, type SupabaseClient } from "@supabase/supabase-js";

function readSupabaseEnv(): { url: string; key: string } {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!url || !key) {
    throw new Error(
      "Faltan NEXT_PUBLIC_SUPABASE_URL o NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY.",
    );
  }

  return { url, key };
}

/** Cliente de Supabase. Crear uno por uso; no guardarlo en el módulo. */
export function createSupabaseClient(): SupabaseClient {
  const { url, key } = readSupabaseEnv();
  return createClient(url, key);
}

/** Cliente con la clave secret. Solo en el servidor; no uses el resultado en el navegador. */
export function createSupabaseAdmin(): SupabaseClient {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SECRET_KEY;
  if (!url || !key) {
    throw new Error("Falta SUPABASE_SECRET_KEY.");
  }
  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: {
      fetch: (input, init) => fetch(input, { ...init, cache: "no-store" }),
    },
  });
}
