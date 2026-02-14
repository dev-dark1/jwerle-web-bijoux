// src/app/api/Admin/captcha/route.ts
import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { simpleHash } from "@/lib/utils";

// generate simple captcha: numbers + letters
function generateSimpleCaptcha(length = 6) {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }
  return result;
}

export async function GET(req: Request) {
  try {
    const ip = req.headers.get("x-forwarded-for") || "unknown";
    const ipHash = simpleHash(ip);

    const code = generateSimpleCaptcha();
    const hashed = simpleHash(code.toLowerCase());
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000).toISOString();

    const { error } = await supabaseAdmin
      .from("captchas")
      .insert({ ip_hash: ipHash, captcha_hash: hashed, expires_at: expiresAt });

    if (error) throw error;

    return NextResponse.json({
      ok: true,
      code  // ← عطينا الكابتشا مباشرة
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { ok: false, message: "Captcha generation failed" },
      { status: 500 }
    );
  }
}
