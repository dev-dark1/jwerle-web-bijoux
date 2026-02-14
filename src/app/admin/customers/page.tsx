'use client'

import React, { useState, useEffect } from 'react'
import { Users, Search, Mail, Phone, MapPin, LogOut } from 'lucide-react'
import Link from 'next/link'

export default function AdminCustomers() {
  const [customers, setCustomers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        setLoading(true)
        const response = await fetch('/api/admin/customers')
        const data = await response.json()
        
        if (response.ok) {
          setCustomers(data.customers || [])
        }
      } catch (err) {
        console.error('[v0] Customers fetch error:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchCustomers()
  }, [])

  const filteredCustomers = customers.filter(customer =>
    customer.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-black-bg flex text-white font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-black-soft border-r border-white/5 hidden md:flex flex-col p-6 z-20">
        <div className="mb-10 px-2">
          <span className="font-serif text-xl font-bold text-gold tracking-widest">BIJOUX ADMIN</span>
        </div>
        
        <nav className="space-y-2 flex-1">
          <Link href="/admin/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-lg text-silver hover:bg-white/5 hover:text-white transition-all">
            <Users className="w-5 h-5" />
            <span className="font-medium">Dashboard</span>
          </Link>
          <Link href="/admin/products" className="flex items-center gap-3 px-4 py-3 rounded-lg text-silver hover:bg-white/5 hover:text-white transition-all">
            <Users className="w-5 h-5" />
            <span className="font-medium">Products</span>
          </Link>
          <Link href="/admin/orders" className="flex items-center gap-3 px-4 py-3 rounded-lg text-silver hover:bg-white/5 hover:text-white transition-all">
            <Users className="w-5 h-5" />
            <span className="font-medium">Orders</span>
          </Link>
          <Link href="/admin/customers" className="flex items-center gap-3 px-4 py-3 rounded-lg bg-gold/10 text-gold border border-gold/20">
            <Users className="w-5 h-5" />
            <span className="font-medium">Customers</span>
          </Link>
        </nav>

        <div className="pt-6 border-t border-white/5">
          <a href="/" className="flex items-center gap-3 text-silver/50 hover:text-white px-4 py-3 rounded-lg transition-colors">
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </a>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto relative">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-gold/5 rounded-full blur-[100px]" />
          <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] bg-silver/5 rounded-full blur-[100px]" />
        </div>

        <header className="flex justify-between items-center mb-8 relative z-10">
          <div>
            <h1 className="text-3xl font-serif text-white mb-1">Customers</h1>
            <p className="text-silver/50 text-sm">Manage customer relationships and data</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-gold/20 border border-gold flex items-center justify-center text-gold font-bold">
            A
          </div>
        </header>

        {/* Search Bar */}
        <div className="mb-8 relative z-10">
          <div className="relative">
            <Search className="absolute left-4 top-3.5 w-5 h-5 text-silver/50" />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-black-soft border border-white/10 rounded-lg text-white focus:ring-2 focus:ring-gold focus:border-transparent transition-all"
            />
          </div>
        </div>

        {/* Customers Table */}
        <div className="bg-black-soft border border-white/5 rounded-xl overflow-hidden relative z-10">
          {loading ? (
            <div className="p-12 text-center text-silver/50">Loading customers...</div>
          ) : filteredCustomers.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-white/5 bg-white/5">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-silver/70 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-silver/70 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-silver/70 uppercase tracking-wider">Phone</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-silver/70 uppercase tracking-wider">Location</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-silver/70 uppercase tracking-wider">Orders</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCustomers.map((customer, idx) => (
                    <tr key={idx} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4 text-white font-medium">{customer.name || 'Unknown'}</td>
                      <td className="px-6 py-4 text-silver/70 text-sm flex items-center gap-2">
                        <Mail className="w-4 h-4 text-gold/60" />
                        {customer.email}
                      </td>
                      <td className="px-6 py-4 text-silver/70 text-sm flex items-center gap-2">
                        <Phone className="w-4 h-4 text-gold/60" />
                        {customer.phone || '—'}
                      </td>
                      <td className="px-6 py-4 text-silver/70 text-sm flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-gold/60" />
                        {customer.city || 'Morocco'}
                      </td>
                      <td className="px-6 py-4 text-gold font-semibold">{customer.order_count || 0}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-12 text-center text-silver/50">
              {searchTerm ? 'No customers found matching your search' : 'No customers yet'}
            </div>
          )}
        </div>

        <div className="mt-4 text-sm text-silver/50 relative z-10">
          Showing {filteredCustomers.length} of {customers.length} customers
        </div>
      </main>
    </div>
  )
}
