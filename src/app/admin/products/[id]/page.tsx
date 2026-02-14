"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Trash2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface ProductFormData {
  name: string;
  slug: string;
  description: string;
  price: string;
  compare_at_price: string;
  cost: string;
  category: string;
  tags: string[];
  images: string[];
  inventory_quantity: string;
  sku: string;
  status: string;
  seo_title: string;
  seo_description: string;
}

export default function ProductEditPage() {
  const router = useRouter();
  const pathname = typeof window !== 'undefined' ? window.location.pathname : '';
  const id = pathname.split('/').pop() || '';
  const isNew = id === "new";
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState<ProductFormData>({
    name: "",
    slug: "",
    description: "",
    price: "",
    compare_at_price: "",
    cost: "",
    category: "rings",
    tags: [],
    images: [],
    inventory_quantity: "0",
    sku: "",
    status: "draft",
    seo_title: "",
    seo_description: "",
  });

  useEffect(() => {
    if (!isNew) {
      fetchProduct();
    }
  }, [id]);

  const fetchProduct = async () => {
    try {
      const response = await fetch(`/api/admin/products/${id}`);
      const data = await response.json();

      if (response.ok) {
        setFormData({
          ...data.product,
          price: data.product.price.toString(),
          compare_at_price: data.product.compare_at_price?.toString() || "",
          cost: data.product.cost?.toString() || "",
          inventory_quantity: data.product.inventory_quantity.toString(),
        });
      }
    } catch (error) {
      console.error("[v0] Error fetching product:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const payload = {
        ...formData,
        price: parseFloat(formData.price),
        compare_at_price: formData.compare_at_price ? parseFloat(formData.compare_at_price) : null,
        cost: formData.cost ? parseFloat(formData.cost) : null,
        inventory_quantity: parseInt(formData.inventory_quantity),
      };

      const url = isNew ? "/api/admin/products" : `/api/admin/products/${params.id}`;
      const method = isNew ? "POST" : "PATCH";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        router.push("/admin/products");
      } else {
        const data = await response.json();
        alert(data.error || "Failed to save product");
      }
    } catch (error) {
      console.error("[v0] Error saving product:", error);
      alert("Error saving product");
    } finally {
      setSaving(false);
    }
  };

  const generateSlug = () => {
    const slug = formData.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
    setFormData({ ...formData, slug });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/admin/products">
            <Button variant="ghost" size="sm" className="text-white/60">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-serif tracking-wider">
              {isNew ? "New Product" : "Edit Product"}
            </h1>
            <p className="text-white/60 text-sm mt-1">
              {isNew ? "Add a new product to your catalog" : "Update product details"}
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
          <div className="royal-panel p-6">
            <h2 className="text-xl font-serif mb-4 text-gold">Basic Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-white/80 mb-2">Product Name *</label>
                <Input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  onBlur={generateSlug}
                  required
                  className="bg-white/5 border-white/10 text-white"
                />
              </div>
              <div>
                <label className="block text-sm text-white/80 mb-2">Slug *</label>
                <Input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  required
                  className="bg-white/5 border-white/10 text-white"
                />
              </div>
              <div>
                <label className="block text-sm text-white/80 mb-2">Description</label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                  className="bg-white/5 border-white/10 text-white"
                />
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div className="royal-panel p-6">
            <h2 className="text-xl font-serif mb-4 text-gold">Pricing</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm text-white/80 mb-2">Price (MAD) *</label>
                <Input
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  required
                  className="bg-white/5 border-white/10 text-white"
                />
              </div>
              <div>
                <label className="block text-sm text-white/80 mb-2">Compare At Price (MAD)</label>
                <Input
                  type="number"
                  step="0.01"
                  value={formData.compare_at_price}
                  onChange={(e) => setFormData({ ...formData, compare_at_price: e.target.value })}
                  className="bg-white/5 border-white/10 text-white"
                />
              </div>
              <div>
                <label className="block text-sm text-white/80 mb-2">Cost (MAD)</label>
                <Input
                  type="number"
                  step="0.01"
                  value={formData.cost}
                  onChange={(e) => setFormData({ ...formData, cost: e.target.value })}
                  className="bg-white/5 border-white/10 text-white"
                />
              </div>
            </div>
          </div>

          {/* Organization */}
          <div className="royal-panel p-6">
            <h2 className="text-xl font-serif mb-4 text-gold">Organization</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-white/80 mb-2">Category *</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  required
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded text-white"
                >
                  <option value="rings">Rings</option>
                  <option value="necklaces">Necklaces</option>
                  <option value="bracelets">Bracelets</option>
                  <option value="earrings">Earrings</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-white/80 mb-2">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded text-white"
                >
                  <option value="draft">Draft</option>
                  <option value="active">Active</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
            </div>
          </div>

          {/* Inventory */}
          <div className="royal-panel p-6">
            <h2 className="text-xl font-serif mb-4 text-gold">Inventory</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-white/80 mb-2">SKU</label>
                <Input
                  type="text"
                  value={formData.sku}
                  onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                  className="bg-white/5 border-white/10 text-white"
                />
              </div>
              <div>
                <label className="block text-sm text-white/80 mb-2">Quantity</label>
                <Input
                  type="number"
                  value={formData.inventory_quantity}
                  onChange={(e) => setFormData({ ...formData, inventory_quantity: e.target.value })}
                  className="bg-white/5 border-white/10 text-white"
                />
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-between">
            <Link href="/admin/products">
              <Button type="button" variant="outline" className="border-white/20 text-white">
                Cancel
              </Button>
            </Link>
            <Button type="submit" disabled={saving} className="gold-outline-btn flex items-center gap-2">
              <Save className="w-4 h-4" />
              {saving ? "Saving..." : "Save Product"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
