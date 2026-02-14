// src/app/api/admin/check-trust/route.ts
import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function POST(req: Request) {
  const body = await req.json();
  const { email } = body;
  const ip = (req.headers.get("x-forwarded-for") || "unknown").split(",")[0].trim();
  const ua = req.headers.get("user-agent") || "";

  const ipHash = Buffer.from(ip).toString("base64");
  const uaHash = require('crypto').createHash('sha256').update(ua || "").digest('hex');

  const { data: trusted } = await supabaseAdmin
    .from("trusted_devices")
    .select("*")
    .eq("admin_email", email)
    .eq("ip_hash", ipHash)
    .limit(1)
    .maybeSingle();

  if (trusted && new Date(trusted.expires_at) > new Date()) {
    return NextResponse.json({ ok: true, trusted: true });
  }
  return NextResponse.json({ ok: true, trusted: false });
}