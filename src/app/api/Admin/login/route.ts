// src/app/api/admin/login/route.ts
import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { comparePassword, generateOTP, hashOTP, simpleHash } from "@/lib/utils";
import { Resend } from "resend";
import jwt from "jsonwebtoken";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

function createJwt(payload: any) {
  return jwt.sign(payload, process.env.JWT_SECRET || "secret", { expiresIn: "8h" });
}

async function isBlocked(ip: string, email?: string) {
  const { data } = await supabaseAdmin
    .from("failed_attempts")
    .select("*")
    .or(`ip.eq.${ip},admin_email.eq.${email}`)
    .limit(1)
    .single();

  if (!data) return false;
  if (data.blocked_until && new Date(data.blocked_until) > new Date()) return true;
  return false;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = body;
    const ip = req.headers.get("x-forwarded-for") || "";
    const userAgent = req.headers.get("user-agent") || "";

    if (!email || !password)
      return NextResponse.json({ ok: false, message: "Missing fields" }, { status: 400 });

    if (await isBlocked(ip, email))
      return NextResponse.json({ ok: false, message: "Blocked temporarily" }, { status: 429 });

    // Fetch admin
    const { data: adminRow, error: admErr } = await supabaseAdmin
      .from("admins")
      .select("password_hash")
      .eq("email", email)
      .single();

    if (admErr || !adminRow) {
      await supabaseAdmin.from("failed_attempts").insert({ admin_email: email, ip });
      return NextResponse.json({ ok: false, message: "Invalid credentials" }, { status: 401 });
    }

    // Compare password FIXED
    const ok = await comparePassword(password, adminRow.password_hash);
    if (!ok) {
      await supabaseAdmin.from("failed_attempts").insert({ admin_email: email, ip });
      return NextResponse.json({ ok: false, message: "Invalid credentials" }, { status: 401 });
    }

    // Trusted device FIXED
    const ipHash = simpleHash(ip);
    const uaHash = simpleHash(userAgent);

    const { data: trusted } = await supabaseAdmin
      .from("trusted_devices")
      .select("*")
      .eq("admin_email", email)
      .eq("ip_hash", ipHash)
      .eq("ua_hash", uaHash)
      .single();

    // If trusted → login directly
    if (trusted && new Date(trusted.expires_at) > new Date()) {
      const token = createJwt({ email });
      return NextResponse.json({ ok: true, trusted: true, token });
    }

    // Generate OTP
    const otp = generateOTP();
    const otpHash = hashOTP(otp);

    await supabaseAdmin.from("admin_otps").insert({
      admin_email: email,
      otp_hash: otpHash,
      expires_at: new Date(Date.now() + 2 * 60 * 1000).toISOString()
    });

    // Send OTP via email
    if (resend) {
      const html = `
        <div style="font-family:Inter;background:#050506;padding:20px;color:#fff;">
          <h2 style="color:#D4AF37">BIJOUX IYL — Admin Login Code</h2>
          <p>Your OTP code:</p>
          <h1 style="font-size:32px;color:#FFD966">${otp}</h1>
          <p>Valid for 2 minutes only.</p>
        </div>
      `;
      await resend.emails.send({
        from: `BIJOUX IYL <no-reply@bijouxiyl.com>`,
        to: email,
        subject: "Your BIJOUX IYL Admin OTP",
        html
      });
    } else {
      console.log("OTP =", otp);
    }

    return NextResponse.json({ ok: true, otpSent: true });

  } catch (err) {
    console.error("Login API error:", err);
    return NextResponse.json({ ok: false, message: "Server error" }, { status: 500 });
  }
}
