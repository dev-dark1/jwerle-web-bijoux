"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Package, User, CreditCard } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface OrderItem {
  id: string;
  product_name: string;
  quantity: number;
  price: number;
  total: number;
}

interface Order {
  id: string;
  order_number: string;
  customer_email: string;
  customer_name: string;
  customer_phone: string;
  shipping_address: any;
  billing_address: any;
  subtotal: number;
  shipping_cost: number;
  tax: number;
  total: number;
  status: string;
  payment_status: string;
  payment_method: string;
  tracking_number: string;
  notes: string;
  created_at: string;
  items: OrderItem[];
}

export default function OrderDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [order, setOrder] = useState<Order | null>(null);
  const [status, setStatus] = useState("");
  const [trackingNumber, setTrackingNumber] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    fetchOrder();
  }, [params.id]);

  const fetchOrder = async () => {
    try {
      const response = await fetch(`/api/admin/orders/${params.id}`);
      const data = await response.json();

      if (response.ok) {
        setOrder(data.order);
        setStatus(data.order.status);
        setTrackingNumber(data.order.tracking_number || "");
        setNotes(data.order.notes || "");
      }
    } catch (error) {
      console.error("[v0] Error fetching order:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    if (!order) return;
    setSaving(true);

    try {
      const response = await fetch(`/api/admin/orders/${params.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status,
          tracking_number: trackingNumber,
          notes,
        }),
      });

      if (response.ok) {
        alert("Order updated successfully");
        fetchOrder();
      } else {
        alert("Failed to update order");
      }
    } catch (error) {
      console.error("[v0] Error updating order:", error);
      alert("Error updating order");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div>Loading order...</div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div>Order not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/admin/orders">
            <Button variant="ghost" size="sm" className="text-white/60">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-serif tracking-wider">{order.order_number}</h1>
            <p className="text-white/60 text-sm mt-1">
              Placed on {new Date(order.created_at).toLocaleDateString()}
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Items */}
            <div className="royal-panel p-6">
              <h2 className="text-xl font-serif mb-4 text-gold flex items-center gap-2">
                <Package className="w-5 h-5" />
                Order Items
              </h2>
              <div className="space-y-3">
                {order.items?.map((item) => (
                  <div key={item.id} className="flex justify-between items-center p-3 bg-white/5 rounded">
                    <div>
                      <div className="font-medium">{item.product_name}</div>
                      <div className="text-sm text-white/60">Qty: {item.quantity}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">{item.total} MAD</div>
                      <div className="text-sm text-white/60">{item.price} MAD each</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="mt-6 pt-6 border-t border-white/10 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-white/60">Subtotal</span>
                  <span>{order.subtotal} MAD</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/60">Shipping</span>
                  <span>{order.shipping_cost} MAD</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/60">Tax</span>
                  <span>{order.tax} MAD</span>
                </div>
                <div className="flex justify-between text-lg font-bold pt-2 border-t border-white/10">
                  <span>Total</span>
                  <span>{order.total} MAD</span>
                </div>
              </div>
            </div>

            {/* Customer Info */}
            <div className="royal-panel p-6">
              <h2 className="text-xl font-serif mb-4 text-gold flex items-center gap-2">
                <User className="w-5 h-5" />
                Customer Information
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-white/80 mb-2">Contact</h3>
                  <p>{order.customer_name}</p>
                  <p className="text-sm text-white/60">{order.customer_email}</p>
                  <p className="text-sm text-white/60">{order.customer_phone}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-white/80 mb-2">Shipping Address</h3>
                  {order.shipping_address && (
                    <div className="text-sm text-white/80">
                      <p>{order.shipping_address.street}</p>
                      <p>
                        {order.shipping_address.city}, {order.shipping_address.postal_code}
                      </p>
                      <p>{order.shipping_address.country}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Payment Info */}
            <div className="royal-panel p-6">
              <h2 className="text-xl font-serif mb-4 text-gold flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                Payment Information
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <span className="text-sm text-white/60">Method:</span>
                  <p className="font-medium capitalize">{order.payment_method}</p>
                </div>
                <div>
                  <span className="text-sm text-white/60">Status:</span>
                  <p className="font-medium capitalize">{order.payment_status}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Order Status */}
            <div className="royal-panel p-6">
              <h2 className="text-xl font-serif mb-4 text-gold">Order Status</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-white/80 mb-2">Status</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded text-white"
                  >
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-white/80 mb-2">Tracking Number</label>
                  <Input
                    type="text"
                    value={trackingNumber}
                    onChange={(e) => setTrackingNumber(e.target.value)}
                    placeholder="Enter tracking number"
                    className="bg-white/5 border-white/10 text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm text-white/80 mb-2">Notes</label>
                  <Textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Add internal notes..."
                    rows={4}
                    className="bg-white/5 border-white/10 text-white"
                  />
                </div>

                <Button
                  onClick={handleUpdate}
                  disabled={saving}
                  className="w-full gold-outline-btn flex items-center justify-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  {saving ? "Saving..." : "Update Order"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
