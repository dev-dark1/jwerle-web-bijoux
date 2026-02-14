"use client"

import React, { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export function SplitSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  return (
    <section className="relative w-full min-h-[80vh] flex flex-col md:flex-row bg-black-bg overflow-hidden">
      {/* WOMEN SECTION */}
      <div className="group relative w-full md:w-1/2 h-[50vh] md:h-auto overflow-hidden border-r border-gold/10">
        <div className="absolute inset-0 bg-black-bg z-10 opacity-40 group-hover:opacity-20 transition-opacity duration-700" />
        
        {/* Background Image */}
        <div className="absolute inset-0 transition-transform duration-1000 group-hover:scale-110">
           <Image 
             src="https://placehold.co/1000x1500/111115/D4AF37?text=Luxury+Woman+Jewelry+Model" 
             alt="Women Collection"
             fill
             className="object-cover opacity-80"
           />
        </div>

        {/* Content */}
        <div className="relative z-20 h-full flex flex-col items-center justify-center text-center p-8">
           <h2 className="text-4xl md:text-5xl font-serif text-white mb-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
             For <span className="text-gold italic">Her</span>
           </h2>
           <p className="text-silver/70 max-w-xs mb-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
             Timeless elegance crafted for the modern queen.
           </p>
           <Link href="/products?category=women">
             <button className="flex items-center gap-2 px-8 py-3 bg-gold/10 border border-gold/30 text-gold rounded-full hover:bg-gold hover:text-black-bg transition-all duration-300">
               Shop Women <ArrowRight className="w-4 h-4" />
             </button>
           </Link>
        </div>
        
        {/* Glow Borders */}
        <div className="absolute inset-0 border-[1px] border-gold/0 group-hover:border-gold/30 transition-all duration-500 m-4 rounded-xl pointer-events-none" />
      </div>

      {/* MEN SECTION */}
      <div className="group relative w-full md:w-1/2 h-[50vh] md:h-auto overflow-hidden border-l border-gold/10">
        <div className="absolute inset-0 bg-black-bg z-10 opacity-40 group-hover:opacity-20 transition-opacity duration-700" />
        
        {/* Background Image */}
        <div className="absolute inset-0 transition-transform duration-1000 group-hover:scale-110">
           <Image 
             src="https://placehold.co/1000x1500/111115/C8C8C8?text=Luxury+Man+Jewelry+Model" 
             alt="Men Collection"
             fill
             className="object-cover opacity-80"
           />
        </div>

        {/* Content */}
        <div className="relative z-20 h-full flex flex-col items-center justify-center text-center p-8">
           <h2 className="text-4xl md:text-5xl font-serif text-white mb-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
             For <span className="text-silver italic">Him</span>
           </h2>
           <p className="text-silver/70 max-w-xs mb-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
             Bold statements of power and prestige.
           </p>
           <Link href="/products?category=men">
             <button className="flex items-center gap-2 px-8 py-3 bg-silver/10 border border-silver/30 text-silver rounded-full hover:bg-silver hover:text-black-bg transition-all duration-300">
               Shop Men <ArrowRight className="w-4 h-4" />
             </button>
           </Link>
        </div>
        
        {/* Glow Borders */}
        <div className="absolute inset-0 border-[1px] border-silver/0 group-hover:border-silver/30 transition-all duration-500 m-4 rounded-xl pointer-events-none" />
      </div>
    </section>
  )
}
