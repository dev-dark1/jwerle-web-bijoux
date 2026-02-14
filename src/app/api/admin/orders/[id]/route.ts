import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { verifyAdminSession } from "@/lib/auth-utils";

export const dynamic = "force-dynamic";

// GET /api/admin/orders/[id] - Get single order with full details
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const sessionResult = await verifyAdminSession(request);
    if (!sessionResult.success) {
      return NextResponse.json({ error: sessionResult.error }, { status: 401 });
    }

    const { data: order, error } = await supabaseAdmin
      .from("orders")
      .select(`
        *,
        customer:customers(*),
        items:order_items(*)
      `)
      .eq("id", id)
      .single();

    if (error || !order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    return NextResponse.json({ order });
  } catch (error) {
    console.error("[v0] Order GET error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// PATCH /api/admin/orders/[id] - Update order (mainly status)
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const sessionResult = await verifyAdminSession(request);
    if (!sessionResult.success) {
      return NextResponse.json({ error: sessionResult.error }, { status: 401 });
    }

    const body = await request.json();
    const { status, tracking_number, notes } = body;

    // Update order
    const { data: order, error } = await supabaseAdmin
      .from("orders")
      .update({
        ...(status && { status }),
        ...(tracking_number && { tracking_number }),
        ...(notes && { notes }),
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("[v0] Error updating order:", error);
      return NextResponse.json({ error: "Failed to update order" }, { status: 500 });
    }

    // Log audit
    await supabaseAdmin.from("audit_logs").insert({
      admin_id: sessionResult.admin.id,
      action: "order.update",
      resource_type: "order",
      resource_id: id,
      details: { changes: body },
      ip_address: request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip"),
    });

    return NextResponse.json({ order });
  } catch (error) {
    console.error("[v0] Order PATCH error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
