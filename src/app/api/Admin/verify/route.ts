// src/app/api/admin/verify/route.ts
import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { hashOTP, simpleHash } from "@/lib/utils";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, otp, trustDevice = false, ip = req.headers.get("x-forwarded-for") || "", userAgent = "", fingerprint } = body;

    if (!email || !otp) {
      return NextResponse.json({ ok: false, message: "Missing fields" }, { status: 400 });
    }

    const otpHash = hashOTP(otp);
    const { data: rows } = await supabaseAdmin
      .from("admin_otps")
      .select("*")
      .eq("admin_email", email)
      .eq("otp_hash", otpHash)
      .limit(1)
      .single();

    if (!rows) {
      return NextResponse.json({ ok: false, message: "Invalid OTP" }, { status: 401 });
    }
    if (new Date(rows.expires_at) < new Date()) {
      return NextResponse.json({ ok: false, message: "OTP expired" }, { status: 401 });
    }

    // delete OTP
    await supabaseAdmin.from("admin_otps").delete().eq("id", rows.id);

    const token = jwt.sign({ email }, process.env.JWT_SECRET || "secret", { expiresIn: "8h" });

    if (trustDevice) {
      const ipHash = Buffer.from(ip || "").toString("base64");
      const uaHash = Buffer.from(userAgent || "").toString("base64");
      const fpHash = fingerprint ? simpleHash(fingerprint) : null;
      const expiresAt = new Date(Date.now() + 30 * 24 * 3600 * 1000).toISOString(); // 30 days

      await supabaseAdmin.from("trusted_devices").insert({
        admin_email: email,
        ip_hash: ipHash,
        ua_hash: uaHash,
        fingerprint_hash: fpHash,
        expires_at: expiresAt
      });
    }

    return NextResponse.json({ ok: true, token });
  } catch (err:any) {
    console.error("verify error", err);
    return NextResponse.json({ ok: false, message: "Server error" }, { status: 500 });
  }
}
