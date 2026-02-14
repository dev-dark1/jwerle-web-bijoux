// src/lib/supabase.ts

import { createClient } from "@supabase/supabase-js";

// Client (Front-end): للتعامل مع DB ب anon key
export const supabaseClient = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
);

// Admin (Back-end API routes): يستخدم service_role
export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.SUPABASE_SERVICE_ROLE_KEY || "",
  {
    auth: {
      persistSession: false
    }
  }
);
