"use client"

import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { BarChart, Users, Package, Settings, LogOut, TrendingUp, DollarSign, MapPin, Eye, LucideIcon } from "lucide-react"
import Link from "next/link"
import { supabaseClient } from "@/lib/supabase"

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    visitors: 1240,
    orders: 85,
    revenue: 145200
  })
  const [topCities, setTopCities] = useState<{city: string, count: number}[]>([
    { city: "Casablanca", count: 450 },
    { city: "Rabat", count: 320 },
    { city: "Marrakech", count: 210 },
    { city: "Tiznit", count: 150 },
    { city: "Agadir", count: 110 }
  ])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        // Safely attempt to fetch visits
        const { count: visitCount, error: countError } = await supabaseClient.from('analytics_visitors').select('*', { count: 'exact', head: true })
        
        if (!countError && visitCount !== null) {
             setStats(prev => ({ ...prev, visitors: visitCount }))
        }

        // Safely attempt to fetch cities
        const { data: visits, error: visitsError } = await supabaseClient.from('analytics_visitors').select('city').limit(100)
        
        if (!visitsError && visits && visits.length > 0) {
          const cityMap = new Map()
          visits.forEach(v => {
            if(v.city) cityMap.set(v.city, (cityMap.get(v.city) || 0) + 1)
          })
          
          if (cityMap.size > 0) {
             const cities = Array.from(cityMap.entries())
               .map(([city, count]) => ({ city, count: Number(count) }))
               .sort((a, b) => b.count - a.count)
               .slice(0, 5)
             setTopCities(cities)
          }
        }
      } catch (err) {
        console.warn("Dashboard data fetch failed, using fallback data", err)
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
          <NavItem icon={<BarChart />} label="Overview" active />
          <NavItem icon={<Package />} label="Products" />
          <NavItem icon={<Users />} label="Customers" />
          <NavItem icon={<Settings />} label="Settings" />
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 relative z-10">
           <StatCard icon={<DollarSign />} label="Total Revenue" value="145,200 DH" trend="+12%" color="gold" />
           <StatCard icon={<Eye />} label="Site Visits" value={stats.visitors.toLocaleString()} trend="+5%" color="blue" />
           <StatCard icon={<TrendingUp />} label="Active Orders" value="85" trend="+8%" color="green" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-10">
          {/* Visitor Map / Cities */}
          <div className="bg-black-soft border border-white/5 rounded-xl p-6 hover:border-gold/20 transition-colors">
            <div className="flex justify-between items-center mb-6">
               <h3 className="text-lg font-bold text-white flex items-center gap-2">
                 <MapPin className="w-5 h-5 text-gold" /> Top Locations
               </h3>
               <span className="text-xs text-silver/50">Last 30 Days</span>
            </div>
            <div className="space-y-4">
               {topCities.map((city, i) => (
                 <div key={i} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                    <span className="text-silver">{city.city}</span>
                    <div className="flex items-center gap-3">
                      <div className="w-32 h-2 bg-black-bg rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-gold" 
                          style={{ width: `${(city.count / (topCities[0]?.count || 1)) * 100}%` }} 
                        />
                      </div>
                      <span className="text-white font-mono text-sm">{city.count}</span>
                    </div>
                 </div>
               ))}
            </div>
          </div>

          {/* Recent Orders Placeholder */}
          <div className="bg-black-soft border border-white/5 rounded-xl p-6 hover:border-gold/20 transition-colors">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Package className="w-5 h-5 text-gold" /> Recent Activity
            </h3>
            <div className="space-y-4">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="flex items-center justify-between p-4 bg-black-bg/50 rounded-lg border border-white/5 group hover:border-gold/20 transition-all">
                  <div className="flex items-center gap-4">
                     <div className="w-10 h-10 bg-gradient-to-br from-white/10 to-transparent rounded-full flex items-center justify-center text-xs text-gold font-bold">
                        #{1000 + i}
                     </div>
                     <div>
                       <p className="text-white font-medium group-hover:text-gold transition-colors">New Order</p>
                       <p className="text-xs text-silver/50">Casablanca • 2 mins ago</p>
                     </div>
                  </div>
                  <span className="text-xs bg-gold/10 text-gold px-2 py-1 rounded border border-gold/20">Pending</span>
                </div>
              ))}
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
