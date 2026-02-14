'use client'

import React from 'react'
import { MessageCircle } from 'lucide-react'
import { motion } from 'framer-motion'

interface WhatsAppButtonProps {
  phoneNumber?: string
  message?: string
  showLabel?: boolean
}

export function WhatsAppButton({ 
  phoneNumber = '+212661234567',
  message = 'Hello BIJOUX IYL! I\'d like to know more about your jewelry.',
  showLabel = true 
}: WhatsAppButtonProps) {
  const whatsappUrl = `https://wa.me/${phoneNumber.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-8 right-8 z-40 flex items-center gap-3 bg-gradient-to-r from-green-500 to-green-600 text-white px-5 py-4 rounded-full shadow-2xl hover:shadow-green-500/50 transition-all duration-300"
    >
      <MessageCircle className="w-6 h-6" />
      {showLabel && <span className="font-semibold text-sm">Chat with us</span>}
    </motion.a>
  )
}
