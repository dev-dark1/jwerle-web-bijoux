"use client"

import React from "react"
import { cn } from "@/lib/utils"

export function WhatsAppButton({ className }: { className?: string }) {
  return (
    <a
      href="https://wa.me/212680739497"
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-black-bg",
        className
      )}
    >
      <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#D4AF37_0%,#111115_50%,#D4AF37_100%)]" />
      <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-black-bg px-8 py-1 text-sm font-medium text-gold backdrop-blur-3xl transition-all hover:bg-black-soft hover:text-white uppercase tracking-wider">
        Shop via WhatsApp
      </span>
    </a>
  )
}
