"use client";

import { useState, useEffect } from "react";
import { Shield, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AuditLog {
  id: string;
  admin_id: string;
  action: string;
  resource_type: string;
  resource_id: string;
  details: any;
  ip_address: string;
  created_at: string;
  admin?: {
    email: string;
    role: string;
  };
}

export default function AuditLogsPage() {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [action, setAction] = useState("");
  const [resourceType, setResourceType] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchLogs();
  }, [page, action, resourceType]);

  const fetchLogs = async () => {
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: "50",
      });
      if (action) params.append("action", action);
      if (resourceType) params.append("resource_type", resourceType);

      const response = await fetch(`/api/admin/audit-logs?${params}`);
      const data = await response.json();

      if (response.ok) {
        setLogs(data.logs);
        setTotalPages(data.pagination.totalPages);
      }
    } catch (error) {
      console.error("[v0] Error fetching audit logs:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getActionColor = (action: string) => {
    if (action.includes("create")) return "text-green-400";
    if (action.includes("update")) return "text-blue-400";
    if (action.includes("delete")) return "text-red-400";
    return "text-white/60";
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-serif tracking-wider flex items-center gap-3">
            <Shield className="w-8 h-8 text-gold" />
            Audit Logs
          </h1>
          <p className="text-white/60 text-sm mt-1">Complete activity history and security audit trail</p>
        </div>

        {/* Filters */}
        <div className="royal-panel p-4 mb-6">
          <div className="grid md:grid-cols-3 gap-4">
            <select
              value={action}
              onChange={(e) => setAction(e.target.value)}
              className="px-4 py-2 bg-white/5 border border-white/10 rounded text-white"
            >
              <option value="">All Actions</option>
              <option value="product.create">Product Create</option>
              <option value="product.update">Product Update</option>
              <option value="product.delete">Product Delete</option>
              <option value="order.update">Order Update</option>
              <option value="admin.login">Admin Login</option>
              <option value="admin.logout">Admin Logout</option>
            </select>
            <select
              value={resourceType}
              onChange={(e) => setResourceType(e.target.value)}
              className="px-4 py-2 bg-white/5 border border-white/10 rounded text-white"
            >
              <option value="">All Resources</option>
              <option value="product">Product</option>
              <option value="order">Order</option>
              <option value="customer">Customer</option>
              <option value="admin">Admin</option>
            </select>
            <Button
              variant="outline"
              onClick={() => {
                setAction("");
                setResourceType("");
              }}
              className="border-white/20 text-white flex items-center gap-2"
            >
              <Filter className="w-4 h-4" />
              Clear Filters
            </Button>
          </div>
        </div>

        {/* Audit Logs Table */}
        <div className="royal-panel overflow-hidden">
          {loading ? (
            <div className="p-12 text-center text-white/60">Loading audit logs...</div>
          ) : logs.length === 0 ? (
            <div className="p-12 text-center">
              <p className="text-white/60">No audit logs found</p>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b border-white/10">
                    <tr className="text-left text-sm text-white/60">
                      <th className="p-4">Timestamp</th>
                      <th className="p-4">Admin</th>
                      <th className="p-4">Action</th>
                      <th className="p-4">Resource</th>
                      <th className="p-4">IP Address</th>
                      <th className="p-4">Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    {logs.map((log) => (
                      <tr key={log.id} className="border-b border-white/5 hover:bg-white/5">
                        <td className="p-4 text-sm">{formatDate(log.created_at)}</td>
                        <td className="p-4">
                          <div>{log.admin?.email || "System"}</div>
                          <div className="text-xs text-white/60 capitalize">{log.admin?.role}</div>
                        </td>
                        <td className="p-4">
                          <span className={`font-medium ${getActionColor(log.action)}`}>
                            {log.action}
                          </span>
                        </td>
                        <td className="p-4">
                          <div className="text-sm">{log.resource_type}</div>
                          {log.resource_id && (
                            <div className="text-xs text-white/60 font-mono">{log.resource_id.slice(0, 8)}...</div>
                          )}
                        </td>
                        <td className="p-4 text-sm font-mono">{log.ip_address || "N/A"}</td>
                        <td className="p-4 text-xs text-white/60">
                          {log.details && (
                            <details className="cursor-pointer">
                              <summary className="hover:text-gold">View</summary>
                              <pre className="mt-2 p-2 bg-white/5 rounded text-xs overflow-auto max-w-xs">
                                {JSON.stringify(log.details, null, 2)}
                              </pre>
                            </details>
                          )}
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
