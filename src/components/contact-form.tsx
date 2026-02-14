"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { Send, CheckCircle, AlertCircle } from "lucide-react"

export function ContactForm() {
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle")
  const [captcha, setCaptcha] = useState(Math.floor(Math.random() * 9000) + 1000)
  const [captchaInput, setCaptchaInput] = useState("")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (parseInt(captchaInput) !== captcha) {
      alert("Invalid CAPTCHA")
      return
    }

    setLoading(true)
    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData)

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" }
      })
      
      if (res.ok) setStatus("success")
      else setStatus("error")
    } catch (err) {
      setStatus("error")
    } finally {
      setLoading(false)
    }
  }

  if (status === "success") {
    return (
      <div className="text-center py-12">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h3 className="text-2xl font-serif text-white mb-2">Message Sent</h3>
        <p className="text-silver">We will respond shortly.</p>
      </div>
    )
  }

  return (
    <motion.form 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      onSubmit={handleSubmit} 
      className="space-y-6 max-w-lg mx-auto"
    >
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-xs uppercase tracking-widest text-gold">Name</label>
          <input required name="name" type="text" className="w-full bg-black-bg border border-white/10 rounded-lg px-4 py-3 text-white focus:border-gold outline-none" />
        </div>
        <div className="space-y-2">
          <label className="text-xs uppercase tracking-widest text-gold">Phone</label>
          <input required name="phone" type="tel" className="w-full bg-black-bg border border-white/10 rounded-lg px-4 py-3 text-white focus:border-gold outline-none" />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-xs uppercase tracking-widest text-gold">Email</label>
        <input required name="email" type="email" className="w-full bg-black-bg border border-white/10 rounded-lg px-4 py-3 text-white focus:border-gold outline-none" />
      </div>

      <div className="space-y-2">
        <label className="text-xs uppercase tracking-widest text-gold">Subject</label>
        <input required name="subject" type="text" className="w-full bg-black-bg border border-white/10 rounded-lg px-4 py-3 text-white focus:border-gold outline-none" />
      </div>

      <div className="space-y-2">
        <label className="text-xs uppercase tracking-widest text-gold">Message</label>
        <textarea required name="message" rows={4} className="w-full bg-black-bg border border-white/10 rounded-lg px-4 py-3 text-white focus:border-gold outline-none" />
      </div>

      {/* Human Verification */}
      <div className="p-4 bg-white/5 rounded-lg flex items-center gap-4 border border-white/10">
        <div className="bg-black p-2 rounded text-gold font-mono text-xl tracking-widest select-none">
          {captcha}
        </div>
        <input 
          type="number" 
          placeholder="Enter code"
          value={captchaInput}
          onChange={(e) => setCaptchaInput(e.target.value)}
          className="flex-1 bg-transparent border-none text-white focus:ring-0 placeholder:text-silver/30"
          required
        />
      </div>

      <button 
        type="submit" 
        disabled={loading}
        className="w-full bg-gradient-gold text-black-bg font-bold py-4 rounded-lg hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
      >
        {loading ? "Sending..." : "Send Message"} <Send className="w-4 h-4" />
      </button>
    </motion.form>
  )
}
