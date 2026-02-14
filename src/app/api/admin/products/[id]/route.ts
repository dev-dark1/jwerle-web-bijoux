import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { verifyAdminSession } from "@/lib/auth-utils";

export const dynamic = "force-dynamic";

// GET /api/admin/products/[id] - Get single product
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

    const { data: product, error } = await supabaseAdmin
      .from("products")
      .select("*")
      .eq("id", id)
      .single();

    if (error || !product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ product });
  } catch (error) {
    console.error("[v0] Product GET error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// PATCH /api/admin/products/[id] - Update product
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

    // If slug is being updated, check for duplicates
    if (body.slug) {
      const { data: existing } = await supabaseAdmin
        .from("products")
        .select("id")
        .eq("slug", body.slug)
        .neq("id", id)
        .single();

      if (existing) {
        return NextResponse.json(
          { error: "Product with this slug already exists" },
          { status: 409 }
        );
      }
    }

    // Update product
    const { data: product, error } = await supabaseAdmin
      .from("products")
      .update({
        ...body,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("[v0] Error updating product:", error);
      return NextResponse.json({ error: "Failed to update product" }, { status: 500 });
    }

    // Log audit
    await supabaseAdmin.from("audit_logs").insert({
      admin_id: sessionResult.admin.id,
      action: "product.update",
      resource_type: "product",
      resource_id: params.id,
      details: { changes: body },
      ip_address: request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip"),
    });

    return NextResponse.json({ product });
  } catch (error) {
    console.error("[v0] Product PATCH error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// DELETE /api/admin/products/[id] - Delete product
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const sessionResult = await verifyAdminSession(request);
    if (!sessionResult.success) {
      return NextResponse.json({ error: sessionResult.error }, { status: 401 });
    }

    // Get product name for audit log
    const { data: product } = await supabaseAdmin
      .from("products")
      .select("name")
      .eq("id", params.id)
      .single();

    // Delete product
    const { error } = await supabaseAdmin
      .from("products")
      .delete()
      .eq("id", params.id);

    if (error) {
      console.error("[v0] Error deleting product:", error);
      return NextResponse.json({ error: "Failed to delete product" }, { status: 500 });
    }

    // Log audit
    await supabaseAdmin.from("audit_logs").insert({
      admin_id: sessionResult.admin.id,
      action: "product.delete",
      resource_type: "product",
      resource_id: params.id,
      details: { product_name: product?.name },
      ip_address: request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip"),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[v0] Product DELETE error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
