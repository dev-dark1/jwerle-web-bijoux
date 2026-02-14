import { supabaseClient } from "@/lib/supabase";

export async function registerTrustedDevice(admin_id: number, device: string) {
  await supabaseClient.from("trusted_devices").insert({
    admin_id,
    device_info: device,
    created_at: new Date().toISOString(),
  });
}