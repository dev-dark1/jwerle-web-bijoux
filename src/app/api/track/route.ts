import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  try {
    /* ===============================
       1) IP handling (Vercel-safe)
    =============================== */
    const forwardedFor = req.headers.get("x-forwarded-for");
    const ip =
      forwardedFor?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "0.0.0.0";

    /* ===============================
       2) Simple IP hash (safe)
    =============================== */
    const ipHash = crypto
      .createHash("sha256")
      .update(ip)
      .digest("hex");

    /* ===============================
       3) Mock geo (safe)
    =============================== */
    const cities = [
      "Casablanca",
      "Rabat",
      "Marrakech",
      "Tangier",
      "Agadir",
      "Fes",
      "Tiznit",
    ];

    const city = cities[Math.floor(Math.random() * cities.length)];

    /* ===============================
       4) Insert
    =============================== */
    const { error } = await supabaseAdmin
      .from("analytics_visitors")
      .insert({
        ip_hash: ipHash,
        city,
        country: "Morocco",
        created_at: new Date().toISOString(),
      });

    if (error) {
      console.error("TRACK INSERT ERROR:", error);
      return NextResponse.json(
        { success: false, reason: "db_error" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });

  } catch (err) {
    console.error("TRACK API ERROR:", err);
    return NextResponse.json(
      { success: false, reason: "server_error" },
      { status: 500 }
    );
  }
}
