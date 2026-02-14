import { supabaseClient } from "@/lib/supabase";

export async function recordFailedAttempt(email: string) {
  const { data } = await supabaseClient
    .from("failed_attempts")
    .select("*")
    .eq("email", email)
    .single();

  if (!data) {
    await supabaseClient.from("failed_attempts").insert({
      email,
      attempts: 1,
      block_until: null,
    });
    return 1;
  }

  const newAttempts = data.attempts + 1;

  let block_until = data.block_until;

  if (newAttempts >= 3) {
    block_until = new Date(Date.now() + 300_000).toISOString(); // 5 min
  }

  await supabaseClient
    .from("failed_attempts")
    .update({
      attempts: newAttempts,
      block_until,
    })
    .eq("email", email);

  return newAttempts;
}