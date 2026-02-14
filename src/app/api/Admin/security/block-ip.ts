import { supabaseClient } from "@/lib/supabase";

export async function blockIp(ip: string) {
  const blockUntil = new Date(Date.now() + 20 * 60 * 1000).toISOString();

  await supabaseClient.from("unrestricted").insert({
    ip,
    blocked_until: blockUntil,
  });

  return blockUntil;
}