"use client"

import React, { useRef, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

export function TestimonialBackground() {
  return (
    <div className="absolute inset-0 -z-10 bg-black-bg overflow-hidden">
      {/* 3D Perspective Plane */}
      <motion.div 
        initial={{ rotateX: 60, scale: 1.5 }}
        animate={{ rotateX: 60, scale: 1.5 }}
        className="absolute w-[200%] h-[200%] -left-[50%] -top-[50%] opacity-20"
        style={{
          background: "radial-gradient(circle, transparent 20%, #0B0B0F 80%), linear-gradient(#D4AF37 1px, transparent 1px), linear-gradient(90deg, #D4AF37 1px, transparent 1px)",
          backgroundSize: "100px 100px",
          transformStyle: "preserve-3d",
          animation: "moveGrid 20s linear infinite"
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black-bg via-transparent to-black-bg" />
    </div>
  )
}
