import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { hashOTP } from "@/lib/utils";

export async function POST(req: Request) {
  try {
    const { email, otp } = await req.json();

    if (!email || !otp) {
      return NextResponse.json({ ok: false, error: "Missing data" }, { status: 400 });
    }

    const hashed = hashOTP(otp);

    const { data, error } = await supabaseAdmin
      .from("admin_otps")
      .select("*")
      .eq("email", email)
      .eq("otp_hash", hashed)
      .limit(1)
      .single();

    if (error || !data) {
      return NextResponse.json({ ok: false, error: "Invalid OTP" }, { status: 401 });
    }

    if (new Date(data.expires_at) < new Date()) {
      return NextResponse.json({ ok: false, error: "OTP expired" }, { status: 410 });
    }

    return NextResponse.json({ ok: true });

  } catch (err) {
    console.error(err);
    return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 });
  }
}
