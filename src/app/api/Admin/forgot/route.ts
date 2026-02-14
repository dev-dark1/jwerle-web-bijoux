import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { hashOTP } from "@/lib/utils";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM = process.env.RESEND_FROM || "BIJOUX IYL <no-reply@bijouxiyl.com>";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    if (!email) {
      return NextResponse.json({ ok: false, message: "Email required" }, { status: 400 });
    }

    // هل الإيميل فعلاً admin؟
    const { data: admin } = await supabaseAdmin
      .from("admins")
      .select("email")
      .eq("email", email)
      .single();

    if (!admin) {
      return NextResponse.json({ ok: false, message: "Email not found" }, { status: 404 });
    }

    // إنشاء OTP من 8 أرقام
    const otp = Math.floor(10000000 + Math.random() * 90000000).toString();
    const otp_hash = hashOTP(otp);

    const expires = new Date(Date.now() + 5 * 60 * 1000).toISOString();

    await supabaseAdmin.from("admin_reset_otps").insert({
      admin_email: email,
      otp_hash,
      expires_at: expires,
    });

    // إرسال إلى gmail
    await resend.emails.send({
      from: FROM,
      to: email,
      subject: "Your BIJOUX IYL Reset Code",
      html: `
        <p>Your reset code:</p>
        <h2 style="color:#D4AF37;font-size:30px">${otp}</h2>
        <p>Valid for 5 minutes.</p>
      `,
    });

    return NextResponse.json({ ok: true, message: "OTP sent" });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ ok: false, message: "Server error" }, { status: 500 });
  }
}
