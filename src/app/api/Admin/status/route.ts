import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import jwt from "jsonwebtoken";

export async function GET(req: Request) {
try {
const token = req.headers.get("authorization")?.replace("Bearer ", "");

if (!token) {
  return NextResponse.json({ authenticated: false });
}

const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);

// Fetch admin
const { data: admin } = await supabaseAdmin
  .from("admins")
  .select("*")
  .eq("id", decoded.id)
  .single();

if (!admin) {
  return NextResponse.json({ authenticated: false });
}

// Fetch failed attempts
const { data: attempt } = await supabaseAdmin
  .from("failed_attempts")
  .select("*")
  .eq("email", admin.email)
  .single();

let blocked_until = null;
let remaining_attempts = 3;

if (attempt) {
  blocked_until = attempt.block_until;
  remaining_attempts = 3 - attempt.attempts;
}

return NextResponse.json({
  authenticated: true,
  admin_email: admin.email,
  blocked_until,
  remaining_attempts,
});

} catch (e) {
return NextResponse.json({ authenticated: false });
}
}
