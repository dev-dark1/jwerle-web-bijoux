"use client"

import React from "react"
import { cn } from "@/lib/utils"

interface GlowingCardProps extends React.HTMLAttributes<HTMLDivElement> {
  glowColor?: string
}

export function GlowingCard({ className, children, glowColor = "rgba(212,175,55,0.5)", ...props }: GlowingCardProps) {
  return (
    <div className="group relative" {...props}>
      {/* Glow Effect */}
      <div 
        className="absolute -inset-0.5 bg-gradient-to-r from-gold/50 to-gold-light/50 rounded-xl opacity-0 group-hover:opacity-100 blur transition duration-500 group-hover:duration-200"
        style={{
           background: `linear-gradient(to right, ${glowColor}, transparent)`
        }}
      />
      <div className={cn("relative bg-black-soft border border-white/10 rounded-xl p-4 h-full", className)}>
        {children}
      </div>
    </div>
  )
}
