import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { hashOTP, hashPassword } from "@/lib/utils";

export async function POST(req: Request) {
  try {
    const { email, otp, newPassword } = await req.json();

    if (!email || !otp || !newPassword) {
      return NextResponse.json(
        { ok: false, message: "Missing fields" },
        { status: 400 }
      );
    }

    const otp_hash = hashOTP(otp);

    const { data: row } = await supabaseAdmin
      .from("admin_reset_otps")
      .select("*")
      .eq("admin_email", email)
      .eq("otp_hash", otp_hash)
      .single();

    if (!row) {
      return NextResponse.json(
        { ok: false, message: "Invalid OTP" },
        { status: 400 }
      );
    }

    if (new Date(row.expires_at) < new Date()) {
      return NextResponse.json(
        { ok: false, message: "OTP expired" },
        { status: 400 }
      );
    }

    const new_hash = await hashPassword(newPassword);

    await supabaseAdmin
      .from("admins")
      .update({ password_hash: new_hash })
      .eq("email", email);

    return NextResponse.json({ ok: true, message: "Password updated" });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ ok: false, message: "Server error" }, { status: 500 });
  }
}
