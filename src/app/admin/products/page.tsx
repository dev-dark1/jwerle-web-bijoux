"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Plus, Search, Filter, Edit, Trash2, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  category: string;
  status: string;
  inventory_quantity: number;
  images: string[];
  created_at: string;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchProducts();
  }, [page, search, category, status]);

  const fetchProducts = async () => {
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: "20",
      });
      if (search) params.append("search", search);
      if (category) params.append("category", category);
      if (status) params.append("status", status);

      const response = await fetch(`/api/admin/products?${params}`);
      const data = await response.json();

      if (response.ok) {
        setProducts(data.products);
        setTotalPages(data.pagination.totalPages);
      }
    } catch (error) {
      console.error("[v0] Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete "${name}"?`)) return;

    try {
      const response = await fetch(`/api/admin/products/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchProducts();
      } else {
        alert("Failed to delete product");
      }
    } catch (error) {
      console.error("[v0] Error deleting product:", error);
      alert("Error deleting product");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-serif tracking-wider">Products</h1>
            <p className="text-white/60 text-sm mt-1">Manage your jewelry catalog</p>
          </div>
          <Link href="/admin/products/new">
            <Button className="gold-outline-btn flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Add Product
            </Button>
          </Link>
        </div>

        {/* Filters */}
        <div className="royal-panel p-4 mb-6">
          <div className="grid md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
              <Input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 bg-white/5 border-white/10 text-white"
              />
            </div>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="px-4 py-2 bg-white/5 border border-white/10 rounded text-white"
            >
              <option value="">All Categories</option>
              <option value="rings">Rings</option>
              <option value="necklaces">Necklaces</option>
              <option value="bracelets">Bracelets</option>
              <option value="earrings">Earrings</option>
            </select>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="px-4 py-2 bg-white/5 border border-white/10 rounded text-white"
            >
              <option value="">All Status</option>
              <option value="active">Active</option>
              <option value="draft">Draft</option>
              <option value="archived">Archived</option>
            </select>
            <Button
              variant="outline"
              onClick={() => {
                setSearch("");
                setCategory("");
                setStatus("");
              }}
              className="border-white/20 text-white"
            >
              Clear Filters
            </Button>
          </div>
        </div>

        {/* Products Table */}
        <div className="royal-panel overflow-hidden">
          {loading ? (
            <div className="p-12 text-center text-white/60">Loading products...</div>
          ) : products.length === 0 ? (
            <div className="p-12 text-center">
              <p className="text-white/60 mb-4">No products found</p>
              <Link href="/admin/products/new">
                <Button className="gold-outline-btn">Create Your First Product</Button>
              </Link>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b border-white/10">
                    <tr className="text-left text-sm text-white/60">
                      <th className="p-4">Product</th>
                      <th className="p-4">Category</th>
                      <th className="p-4">Price</th>
                      <th className="p-4">Inventory</th>
                      <th className="p-4">Status</th>
                      <th className="p-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => (
                      <tr key={product.id} className="border-b border-white/5 hover:bg-white/5">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            {product.images[0] && (
                              <img
                                src={product.images[0]}
                                alt={product.name}
                                className="w-12 h-12 object-cover rounded"
                              />
                            )}
                            <div>
                              <div className="font-medium">{product.name}</div>
                              <div className="text-sm text-white/60">{product.slug}</div>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 capitalize">{product.category}</td>
                        <td className="p-4">{product.price} MAD</td>
                        <td className="p-4">{product.inventory_quantity}</td>
                        <td className="p-4">
                          <span
                            className={`px-2 py-1 rounded text-xs ${
                              product.status === "active"
                                ? "bg-green-500/20 text-green-400"
                                : product.status === "draft"
                                ? "bg-yellow-500/20 text-yellow-400"
                                : "bg-gray-500/20 text-gray-400"
                            }`}
                          >
                            {product.status}
                          </span>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <Link href={`/products/${product.slug}`} target="_blank">
                              <Button variant="ghost" size="sm" className="text-white/60 hover:text-white">
                                <Eye className="w-4 h-4" />
                              </Button>
                            </Link>
                            <Link href={`/admin/products/${product.id}`}>
                              <Button variant="ghost" size="sm" className="text-white/60 hover:text-white">
                                <Edit className="w-4 h-4" />
                              </Button>
                            </Link>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDelete(product.id, product.name)}
                              className="text-red-400/60 hover:text-red-400"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="p-4 flex justify-center gap-2 border-t border-white/10">
                  <Button
                    variant="outline"
                    onClick={() => setPage(page - 1)}
                    disabled={page === 1}
                    className="border-white/20 text-white"
                  >
                    Previous
                  </Button>
                  <span className="px-4 py-2 text-white/60">
                    Page {page} of {totalPages}
                  </span>
                  <Button
                    variant="outline"
                    onClick={() => setPage(page + 1)}
                    disabled={page === totalPages}
                    className="border-white/20 text-white"
                  >
                    Next
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
