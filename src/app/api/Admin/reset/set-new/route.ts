import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { hashPassword } from "@/lib/utils";

export async function POST(req: Request) {
  try {
    const { email, newPassword } = await req.json();

    if (!email || !newPassword) {
      return NextResponse.json({ ok: false, error: "Missing fields" }, { status: 400 });
    }

    const newHash = hashPassword(newPassword);

    const { error } = await supabaseAdmin
      .from("admins")
      .update({ password_hash: newHash })
      .eq("email", email);

    if (error) {
      return NextResponse.json({ ok: false, error: "Update failed" }, { status: 500 });
    }

    return NextResponse.json({ ok: true, message: "Password updated" });

  } catch (err) {
    console.error(err);
    return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 });
  }
}
