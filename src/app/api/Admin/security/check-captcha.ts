// src/app/api/Admin/security/check-captcha/route.ts
import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { simpleHash } from "@/lib/utils";

export async function POST(req: Request) {
  try {
    const { answer } = await req.json();
    const ip = req.headers.get("x-forwarded-for") || "";
    const ipHash = simpleHash(ip);

    if (!answer)
      return NextResponse.json({ ok: false, message: "Missing" }, { status: 400 });

    const hashed = simpleHash(answer.toLowerCase());

    const { data } = await supabaseAdmin
      .from("captchas")
      .select("*")
      .eq("ip_hash", ipHash)
      .order("created_at", { ascending: false })
      .limit(1)
      .single();

    if (!data) return NextResponse.json({ ok: false, message: "No captcha found" });
    if (new Date(data.expires_at) < new Date())
      return NextResponse.json({ ok: false, message: "Captcha expired" });

    if (data.captcha_hash !== hashed)
      return NextResponse.json({ ok: false, message: "Captcha wrong" });

    await supabaseAdmin.from("captchas").delete().eq("id", data.id);

    return NextResponse.json({ ok: true });

  } catch (e) {
    console.error(e);
    return NextResponse.json({ ok: false, message: "Server error" }, { status: 500 });
  }
}
