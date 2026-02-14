"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, Eye, Package, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Order {
  id: string;
  order_number: string;
  customer_email: string;
  total: number;
  status: string;
  payment_status: string;
  created_at: string;
  customer?: {
    name: string;
  };
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    processing: 0,
    shipped: 0,
  });

  useEffect(() => {
    fetchOrders();
  }, [page, search, status]);

  const fetchOrders = async () => {
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: "20",
      });
      if (search) params.append("search", search);
      if (status) params.append("status", status);

      const response = await fetch(`/api/admin/orders?${params}`);
      const data = await response.json();

      if (response.ok) {
        setOrders(data.orders);
        setTotalPages(data.pagination.totalPages);
        
        // Calculate stats
        const allOrders = data.orders;
        setStats({
          total: allOrders.length,
          pending: allOrders.filter((o: Order) => o.status === "pending").length,
          processing: allOrders.filter((o: Order) => o.status === "processing").length,
          shipped: allOrders.filter((o: Order) => o.status === "shipped").length,
        });
      }
    } catch (error) {
      console.error("[v0] Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500/20 text-yellow-400";
      case "processing":
        return "bg-blue-500/20 text-blue-400";
      case "shipped":
        return "bg-purple-500/20 text-purple-400";
      case "delivered":
        return "bg-green-500/20 text-green-400";
      case "cancelled":
        return "bg-red-500/20 text-red-400";
      default:
        return "bg-gray-500/20 text-gray-400";
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-serif tracking-wider">Orders</h1>
          <p className="text-white/60 text-sm mt-1">Manage customer orders and fulfillment</p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-4 mb-6">
          <div className="royal-panel p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/60 text-sm">Total Orders</p>
                <p className="text-2xl font-bold mt-1">{stats.total}</p>
              </div>
              <Package className="w-8 h-8 text-gold" />
            </div>
          </div>
          <div className="royal-panel p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/60 text-sm">Pending</p>
                <p className="text-2xl font-bold mt-1 text-yellow-400">{stats.pending}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-yellow-400" />
            </div>
          </div>
          <div className="royal-panel p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/60 text-sm">Processing</p>
                <p className="text-2xl font-bold mt-1 text-blue-400">{stats.processing}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-blue-400" />
            </div>
          </div>
          <div className="royal-panel p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/60 text-sm">Shipped</p>
                <p className="text-2xl font-bold mt-1 text-purple-400">{stats.shipped}</p>
              </div>
              <Package className="w-8 h-8 text-purple-400" />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="royal-panel p-4 mb-6">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
              <Input
                type="text"
                placeholder="Search orders..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 bg-white/5 border-white/10 text-white"
              />
            </div>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="px-4 py-2 bg-white/5 border border-white/10 rounded text-white"
            >
              <option value="">All Status</option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
            <Button
              variant="outline"
              onClick={() => {
                setSearch("");
                setStatus("");
              }}
              className="border-white/20 text-white"
            >
              Clear Filters
            </Button>
          </div>
        </div>

        {/* Orders Table */}
        <div className="royal-panel overflow-hidden">
          {loading ? (
            <div className="p-12 text-center text-white/60">Loading orders...</div>
          ) : orders.length === 0 ? (
            <div className="p-12 text-center">
              <p className="text-white/60 mb-4">No orders found</p>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b border-white/10">
                    <tr className="text-left text-sm text-white/60">
                      <th className="p-4">Order</th>
                      <th className="p-4">Customer</th>
                      <th className="p-4">Date</th>
                      <th className="p-4">Total</th>
                      <th className="p-4">Payment</th>
                      <th className="p-4">Status</th>
                      <th className="p-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order.id} className="border-b border-white/5 hover:bg-white/5">
                        <td className="p-4">
                          <div className="font-medium">{order.order_number}</div>
                        </td>
                        <td className="p-4">
                          <div>{order.customer?.name || "Guest"}</div>
                          <div className="text-sm text-white/60">{order.customer_email}</div>
                        </td>
                        <td className="p-4">{formatDate(order.created_at)}</td>
                        <td className="p-4 font-medium">{order.total} MAD</td>
                        <td className="p-4">
                          <span
                            className={`px-2 py-1 rounded text-xs ${
                              order.payment_status === "paid"
                                ? "bg-green-500/20 text-green-400"
                                : order.payment_status === "pending"
                                ? "bg-yellow-500/20 text-yellow-400"
                                : "bg-red-500/20 text-red-400"
                            }`}
                          >
                            {order.payment_status}
                          </span>
                        </td>
                        <td className="p-4">
                          <span className={`px-2 py-1 rounded text-xs ${getStatusColor(order.status)}`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="p-4">
                          <Link href={`/admin/orders/${order.id}`}>
                            <Button variant="ghost" size="sm" className="text-white/60 hover:text-white">
                              <Eye className="w-4 h-4" />
                            </Button>
                          </Link>
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
