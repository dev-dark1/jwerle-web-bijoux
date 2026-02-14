import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { verifyAdminSession } from "@/lib/auth-utils";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const sessionResult = await verifyAdminSession(request);
    if (!sessionResult.success) {
      return NextResponse.json({ error: sessionResult.error }, { status: 401 });
    }

    // Get date ranges
    const today = new Date();
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const startOfLastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
    const endOfLastMonth = new Date(today.getFullYear(), today.getMonth(), 0);

    // Total orders this month
    const { count: ordersThisMonth } = await supabaseAdmin
      .from("orders")
      .select("*", { count: "exact", head: true })
      .gte("created_at", startOfMonth.toISOString());

    // Total orders last month
    const { count: ordersLastMonth } = await supabaseAdmin
      .from("orders")
      .select("*", { count: "exact", head: true })
      .gte("created_at", startOfLastMonth.toISOString())
      .lte("created_at", endOfLastMonth.toISOString());

    // Revenue this month
    const { data: revenueDataThisMonth } = await supabaseAdmin
      .from("orders")
      .select("total")
      .eq("payment_status", "paid")
      .gte("created_at", startOfMonth.toISOString());

    const revenueThisMonth = revenueDataThisMonth?.reduce((sum, order) => sum + order.total, 0) || 0;

    // Revenue last month
    const { data: revenueDataLastMonth } = await supabaseAdmin
      .from("orders")
      .select("total")
      .eq("payment_status", "paid")
      .gte("created_at", startOfLastMonth.toISOString())
      .lte("created_at", endOfLastMonth.toISOString());

    const revenueLastMonth = revenueDataLastMonth?.reduce((sum, order) => sum + order.total, 0) || 0;

    // Total products
    const { count: totalProducts } = await supabaseAdmin
      .from("products")
      .select("*", { count: "exact", head: true })
      .eq("status", "active");

    // Low stock products
    const { count: lowStockProducts } = await supabaseAdmin
      .from("products")
      .select("*", { count: "exact", head: true })
      .lte("inventory_quantity", 5);

    // Pending orders
    const { count: pendingOrders } = await supabaseAdmin
      .from("orders")
      .select("*", { count: "exact", head: true })
      .in("status", ["pending", "processing"]);

    // Recent orders
    const { data: recentOrders } = await supabaseAdmin
      .from("orders")
      .select(`
        id,
        order_number,
        customer_email,
        total,
        status,
        created_at,
        customer:customers(name)
      `)
      .order("created_at", { ascending: false })
      .limit(5);

    // Best selling products
    const { data: bestSelling } = await supabaseAdmin
      .from("order_items")
      .select("product_name, quantity")
      .order("quantity", { ascending: false })
      .limit(5);

    // Calculate growth percentages
    const ordersGrowth = ordersLastMonth > 0 
      ? ((ordersThisMonth! - ordersLastMonth) / ordersLastMonth) * 100 
      : 0;
    
    const revenueGrowth = revenueLastMonth > 0 
      ? ((revenueThisMonth - revenueLastMonth) / revenueLastMonth) * 100 
      : 0;

    return NextResponse.json({
      stats: {
        ordersThisMonth: ordersThisMonth || 0,
        ordersGrowth: Math.round(ordersGrowth),
        revenueThisMonth: Math.round(revenueThisMonth),
        revenueGrowth: Math.round(revenueGrowth),
        totalProducts: totalProducts || 0,
        lowStockProducts: lowStockProducts || 0,
        pendingOrders: pendingOrders || 0,
      },
      recentOrders: recentOrders || [],
      bestSelling: bestSelling || [],
    });
  } catch (error) {
    console.error("[v0] Analytics error:", error);
    return NextResponse.json({ error: "Failed to fetch analytics" }, { status: 500 });
  }
}
