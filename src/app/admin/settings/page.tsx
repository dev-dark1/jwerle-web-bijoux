'use client'

import React, { useState } from 'react'
import { BarChart, Settings, LogOut, Save } from 'lucide-react'
import Link from 'next/link'

export default function AdminSettings() {
  const [whatsappNumber, setWhatsappNumber] = useState('+212661234567')
  const [instagramUsername, setInstagramUsername] = useState('bijoux_iyl')
  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSave = async () => {
    setSaving(true)
    try {
      // Save to localStorage for now
      localStorage.setItem('whatsapp_number', whatsappNumber)
      localStorage.setItem('instagram_username', instagramUsername)
      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    } catch (err) {
      console.error('[v0] Settings save error:', err)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="min-h-screen bg-black-bg flex text-white font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-black-soft border-r border-white/5 hidden md:flex flex-col p-6 z-20">
        <div className="mb-10 px-2">
          <span className="font-serif text-xl font-bold text-gold tracking-widest">BIJOUX ADMIN</span>
        </div>
        
        <nav className="space-y-2 flex-1">
          <Link href="/admin/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-lg text-silver hover:bg-white/5 hover:text-white transition-all">
            <BarChart className="w-5 h-5" />
            <span className="font-medium">Dashboard</span>
          </Link>
          <Link href="/admin/products" className="flex items-center gap-3 px-4 py-3 rounded-lg text-silver hover:bg-white/5 hover:text-white transition-all">
            <BarChart className="w-5 h-5" />
            <span className="font-medium">Products</span>
          </Link>
          <Link href="/admin/orders" className="flex items-center gap-3 px-4 py-3 rounded-lg text-silver hover:bg-white/5 hover:text-white transition-all">
            <BarChart className="w-5 h-5" />
            <span className="font-medium">Orders</span>
          </Link>
          <Link href="/admin/settings" className="flex items-center gap-3 px-4 py-3 rounded-lg bg-gold/10 text-gold border border-gold/20">
            <Settings className="w-5 h-5" />
            <span className="font-medium">Settings</span>
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
            <h1 className="text-3xl font-serif text-white mb-1">Settings</h1>
            <p className="text-silver/50 text-sm">Configure your BIJOUX IYL integrations</p>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-10">
          {/* WhatsApp Settings */}
          <div className="bg-black-soft border border-white/5 rounded-xl p-8 hover:border-gold/20 transition-colors">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Settings className="w-6 h-6 text-gold" />
              WhatsApp Integration
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-white mb-2">Business Phone Number</label>
                <input
                  type="tel"
                  value={whatsappNumber}
                  onChange={(e) => setWhatsappNumber(e.target.value)}
                  className="w-full px-4 py-3 bg-black-bg border border-white/10 rounded-lg text-white focus:ring-2 focus:ring-gold focus:border-transparent transition-all"
                  placeholder="+212661234567"
                />
                <p className="text-xs text-silver/50 mt-2">Format: +[country code][phone number]</p>
              </div>

              <div className="p-4 bg-gold/10 border border-gold/20 rounded-lg">
                <p className="text-sm text-gold">✓ WhatsApp button is automatically displayed on homepage</p>
              </div>
            </div>
          </div>

          {/* Instagram Settings */}
          <div className="bg-black-soft border border-white/5 rounded-xl p-8 hover:border-gold/20 transition-colors">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Settings className="w-6 h-6 text-gold" />
              Instagram Integration
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-white mb-2">Instagram Username</label>
                <input
                  type="text"
                  value={instagramUsername}
                  onChange={(e) => setInstagramUsername(e.target.value)}
                  className="w-full px-4 py-3 bg-black-bg border border-white/10 rounded-lg text-white focus:ring-2 focus:ring-gold focus:border-transparent transition-all"
                  placeholder="bijoux_iyl"
                />
                <p className="text-xs text-silver/50 mt-2">Without @ symbol</p>
              </div>

              <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                <p className="text-sm text-yellow-400">Note: Add INSTAGRAM_ACCESS_TOKEN and INSTAGRAM_USER_ID to environment variables for live feed</p>
              </div>
            </div>
          </div>

          {/* Google Sheets */}
          <div className="bg-black-soft border border-white/5 rounded-xl p-8 hover:border-gold/20 transition-colors">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Settings className="w-6 h-6 text-gold" />
              Google Sheets Sync
            </h2>
            
            <div className="space-y-4">
              <p className="text-silver/70">Sync product and order data to Google Sheets for reporting.</p>
              
              <button className="w-full px-4 py-3 bg-gradient-gold text-black font-semibold rounded-lg hover:shadow-lg hover:shadow-gold/50 transition-all">
                Connect Google Sheets
              </button>

              <p className="text-xs text-silver/50">Learn more about <a href="#" className="text-gold hover:underline">Google Sheets integration</a></p>
            </div>
          </div>

          {/* Database Backup */}
          <div className="bg-black-soft border border-white/5 rounded-xl p-8 hover:border-gold/20 transition-colors">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Settings className="w-6 h-6 text-gold" />
              Database & Backups
            </h2>
            
            <div className="space-y-4">
              <p className="text-silver/70">Manage database backups and data exports.</p>
              
              <button className="w-full px-4 py-3 bg-white/10 text-white font-semibold rounded-lg hover:bg-white/20 transition-all">
                Export Data
              </button>

              <p className="text-xs text-silver/50">Last backup: Today at 14:32</p>
            </div>
          </div>
        </div>

        {/* Save Section */}
        <div className="mt-8 relative z-10">
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-8 py-4 bg-gradient-gold text-black font-bold rounded-lg flex items-center gap-2 hover:shadow-lg hover:shadow-gold/50 transition-all disabled:opacity-50"
          >
            <Save className="w-5 h-5" />
            {saving ? 'Saving...' : 'Save Settings'}
          </button>

          {success && (
            <div className="mt-4 p-4 bg-green-500/10 border border-green-500/20 text-green-400 rounded-lg">
              Settings saved successfully!
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
