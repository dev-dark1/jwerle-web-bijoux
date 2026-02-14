import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { verifyAdminSession } from "@/lib/auth-utils";
import { hasPermission } from "@/lib/rbac";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const sessionResult = await verifyAdminSession(request);
    if (!sessionResult.success) {
      return NextResponse.json({ error: sessionResult.error }, { status: 401 });
    }

    // Check permission
    if (!hasPermission(sessionResult.admin, "audit_logs.read")) {
      return NextResponse.json({ error: "Insufficient permissions" }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "50");
    const action = searchParams.get("action");
    const resource_type = searchParams.get("resource_type");

    const offset = (page - 1) * limit;

    // Build query - join with admins table
    let query = supabaseAdmin
      .from("audit_logs")
      .select(`
        *,
        admin:admins(email, role)
      `, { count: "exact" })
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1);

    // Apply filters
    if (action) query = query.eq("action", action);
    if (resource_type) query = query.eq("resource_type", resource_type);

    const { data, error, count } = await query;

    if (error) {
      console.error("[v0] Error fetching audit logs:", error);
      return NextResponse.json({ error: "Failed to fetch audit logs" }, { status: 500 });
    }

    return NextResponse.json({
      logs: data,
      pagination: {
        page,
        limit,
        total: count || 0,
        totalPages: Math.ceil((count || 0) / limit),
      },
    });
  } catch (error) {
    console.error("[v0] Audit logs GET error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
