"use client"

import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { BarChart, Users, Package, Settings, LogOut, TrendingUp, DollarSign, MapPin, Eye, LucideIcon } from "lucide-react"
import Link from "next/link"
import { supabaseClient } from "@/lib/supabase"

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    ordersThisMonth: 0,
    ordersGrowth: 0,
    revenueThisMonth: 0,
    revenueGrowth: 0,
    totalProducts: 0,
    lowStockProducts: 0,
    pendingOrders: 0,
  })
  const [recentOrders, setRecentOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const response = await fetch('/api/admin/analytics')
        const data = await response.json()
        
        if (response.ok) {
          setStats(data.stats)
          setRecentOrders(data.recentOrders)
        }
      } catch (err) {
        console.error("[v0] Dashboard data fetch failed", err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  return (
    <div className="min-h-screen bg-black-bg flex text-white font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-black-soft border-r border-white/5 hidden md:flex flex-col p-6 z-20">
        <div className="mb-10 px-2">
          <span className="font-serif text-xl font-bold text-gold tracking-widest">BIJOUX ADMIN</span>
        </div>
        
        <nav className="space-y-2 flex-1">
          <Link href="/admin/dashboard"><NavItem icon={<BarChart />} label="Overview" active /></Link>
          <Link href="/admin/products"><NavItem icon={<Package />} label="Products" /></Link>
          <Link href="/admin/orders"><NavItem icon={<TrendingUp />} label="Orders" /></Link>
          <Link href="/admin/customers"><NavItem icon={<Users />} label="Customers" /></Link>
          <Link href="/admin/settings"><NavItem icon={<Settings />} label="Settings" /></Link>
        </nav>

        <div className="pt-6 border-t border-white/5">
          <Link href="/" className="flex items-center gap-3 text-silver/50 hover:text-white px-4 py-3 rounded-lg transition-colors">
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto relative">
        {/* 3D Background Effect */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
           <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-gold/5 rounded-full blur-[100px]" />
           <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] bg-silver/5 rounded-full blur-[100px]" />
        </div>

        <header className="flex justify-between items-center mb-8 relative z-10">
          <div>
            <h1 className="text-3xl font-serif text-white mb-1">Dashboard Overview</h1>
            <p className="text-silver/50 text-sm">Real-time data from Tiznit HQ</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-gold/20 border border-gold flex items-center justify-center text-gold font-bold">
              A
            </div>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8 relative z-10">
           <StatCard icon={<DollarSign />} label="Revenue This Month" value={`${stats.revenueThisMonth.toLocaleString()} MAD`} trend={`${stats.revenueGrowth > 0 ? '+' : ''}${stats.revenueGrowth}%`} color="gold" />
           <StatCard icon={<TrendingUp />} label="Orders This Month" value={stats.ordersThisMonth.toString()} trend={`${stats.ordersGrowth > 0 ? '+' : ''}${stats.ordersGrowth}%`} color="blue" />
           <StatCard icon={<Package />} label="Active Products" value={stats.totalProducts.toString()} trend={stats.lowStockProducts > 0 ? `${stats.lowStockProducts} low stock` : 'In Stock'} color="green" />
           <StatCard icon={<Users />} label="Pending Orders" value={stats.pendingOrders.toString()} trend="Needs Action" color="blue" />
        </div>

        <div className="grid grid-cols-1 gap-8 relative z-10">
          {/* Recent Orders */}
          <div className="bg-black-soft border border-white/5 rounded-xl p-6 hover:border-gold/20 transition-colors">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Package className="w-5 h-5 text-gold" /> Recent Orders
              </h3>
              <Link href="/admin/orders" className="text-sm text-gold hover:underline">
                View All
              </Link>
            </div>
            <div className="space-y-4">
              {recentOrders.length > 0 ? (
                recentOrders.map(order => (
                  <Link key={order.id} href={`/admin/orders/${order.id}`}>
                    <div className="flex items-center justify-between p-4 bg-black-bg/50 rounded-lg border border-white/5 group hover:border-gold/20 transition-all cursor-pointer">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-gradient-to-br from-white/10 to-transparent rounded-full flex items-center justify-center text-xs text-gold font-bold">
                          {order.order_number.slice(-4)}
                        </div>
                        <div>
                          <p className="text-white font-medium group-hover:text-gold transition-colors">{order.customer?.name || 'Guest'}</p>
                          <p className="text-xs text-silver/50">{order.customer_email} • {new Date(order.created_at).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-white font-bold">{order.total} MAD</span>
                        <span className={`text-xs px-2 py-1 rounded border ${
                          order.status === 'pending' ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' :
                          order.status === 'processing' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                          order.status === 'shipped' ? 'bg-purple-500/10 text-purple-400 border-purple-500/20' :
                          'bg-gold/10 text-gold border-gold/20'
                        }`}>
                          {order.status}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="text-center py-8 text-silver/50">
                  No recent orders
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

function NavItem({ icon, label, active = false }: { icon: React.ReactNode, label: string, active?: boolean }) {
  return (
    <div className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-all ${active ? 'bg-gold/10 text-gold border border-gold/20' : 'text-silver hover:bg-white/5 hover:text-white'}`}>
      <div className="w-5 h-5 flex items-center justify-center">{icon}</div>
      <span className="font-medium">{label}</span>
    </div>
  )
}

function StatCard({ icon, label, value, trend, color }: { icon: React.ReactNode, label: string, value: string, trend: string, color: string }) {
  const getColor = () => {
    if (color === 'gold') return 'text-gold'
    if (color === 'blue') return 'text-blue-400'
    return 'text-green-400'
  }

  return (
    <div className="bg-black-soft border border-white/5 p-6 rounded-xl hover:border-gold/30 transition-all hover:-translate-y-1 duration-300 shadow-lg">
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 bg-white/5 rounded-lg ${getColor()}`}>
          <div className="w-6 h-6 flex items-center justify-center">
            {icon}
          </div>
        </div>
        <span className={`text-xs font-bold bg-white/5 px-2 py-1 rounded-full ${getColor()}`}>{trend}</span>
      </div>
      <p className="text-silver/60 text-sm mb-1 uppercase tracking-wider">{label}</p>
      <h4 className="text-3xl font-serif text-white">{value}</h4>
    </div>
  )
}
