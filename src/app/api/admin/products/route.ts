import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { verifyAdminSession } from "@/lib/auth-utils";

export const dynamic = "force-dynamic";

// GET /api/admin/products - List all products with filtering and pagination
export async function GET(request: NextRequest) {
  try {
    const sessionResult = await verifyAdminSession(request);
    if (!sessionResult.success) {
      return NextResponse.json({ error: sessionResult.error }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const category = searchParams.get("category");
    const search = searchParams.get("search");
    const status = searchParams.get("status");

    const offset = (page - 1) * limit;

    // Build query
    let query = supabaseAdmin
      .from("products")
      .select("*", { count: "exact" })
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1);

    // Apply filters
    if (category) query = query.eq("category", category);
    if (status) query = query.eq("status", status);
    if (search) {
      query = query.or(`name.ilike.%${search}%,description.ilike.%${search}%`);
    }

    const { data, error, count } = await query;

    if (error) {
      console.error("[v0] Error fetching products:", error);
      return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
    }

    return NextResponse.json({
      products: data,
      pagination: {
        page,
        limit,
        total: count || 0,
        totalPages: Math.ceil((count || 0) / limit),
      },
    });
  } catch (error) {
    console.error("[v0] Products GET error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// POST /api/admin/products - Create new product
export async function POST(request: NextRequest) {
  try {
    const sessionResult = await verifyAdminSession(request);
    if (!sessionResult.success) {
      return NextResponse.json({ error: sessionResult.error }, { status: 401 });
    }

    const body = await request.json();
    const {
      name,
      slug,
      description,
      price,
      compare_at_price,
      cost,
      category,
      tags,
      images,
      variants,
      inventory_quantity,
      sku,
      status,
      seo_title,
      seo_description,
    } = body;

    // Validation
    if (!name || !slug || !price || !category) {
      return NextResponse.json(
        { error: "Missing required fields: name, slug, price, category" },
        { status: 400 }
      );
    }

    // Check for duplicate slug
    const { data: existing } = await supabaseAdmin
      .from("products")
      .select("id")
      .eq("slug", slug)
      .single();

    if (existing) {
      return NextResponse.json({ error: "Product with this slug already exists" }, { status: 409 });
    }

    // Create product
    const { data: product, error } = await supabaseAdmin
      .from("products")
      .insert({
        name,
        slug,
        description,
        price,
        compare_at_price,
        cost,
        category,
        tags: tags || [],
        images: images || [],
        variants: variants || [],
        inventory_quantity: inventory_quantity || 0,
        sku,
        status: status || "draft",
        seo_title,
        seo_description,
      })
      .select()
      .single();

    if (error) {
      console.error("[v0] Error creating product:", error);
      return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
    }

    // Log audit
    await supabaseAdmin.from("audit_logs").insert({
      admin_id: sessionResult.admin.id,
      action: "product.create",
      resource_type: "product",
      resource_id: product.id,
      details: { product_name: name },
      ip_address: request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip"),
    });

    return NextResponse.json({ product }, { status: 201 });
  } catch (error) {
    console.error("[v0] Products POST error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
