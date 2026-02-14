import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { verifyAdminSession } from "@/lib/auth-utils";

export const dynamic = "force-dynamic";

// GET /api/admin/orders - List all orders with filtering
export async function GET(request: NextRequest) {
  try {
    const sessionResult = await verifyAdminSession(request);
    if (!sessionResult.success) {
      return NextResponse.json({ error: sessionResult.error }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const status = searchParams.get("status");
    const search = searchParams.get("search");

    const offset = (page - 1) * limit;

    // Build query - join with customers table
    let query = supabaseAdmin
      .from("orders")
      .select(`
        *,
        customer:customers(*)
      `, { count: "exact" })
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1);

    // Apply filters
    if (status) query = query.eq("status", status);
    if (search) {
      query = query.or(`order_number.ilike.%${search}%,customer_email.ilike.%${search}%`);
    }

    const { data, error, count } = await query;

    if (error) {
      console.error("[v0] Error fetching orders:", error);
      return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
    }

    return NextResponse.json({
      orders: data,
      pagination: {
        page,
        limit,
        total: count || 0,
        totalPages: Math.ceil((count || 0) / limit),
      },
    });
  } catch (error) {
    console.error("[v0] Orders GET error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
