"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Star, ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"

const REVIEWS = [
  {
    id: 1,
    name: "Amina El Idrissi",
    role: "Verified Buyer",
    text: "The craftsmanship is absolutely stunning. I felt like royalty wearing the gold cuff. The packaging was also incredibly luxurious.",
    image: "https://placehold.co/100x100/111/D4AF37?text=AE",
    stars: 5
  },
  {
    id: 2,
    name: "Karim Benali",
    role: "Verified Buyer",
    text: "Bought a ring for my wife's anniversary. She was speechless. The attention to detail is unmatched in Morocco.",
    image: "https://placehold.co/100x100/111/C8C8C8?text=KB",
    stars: 5
  },
  {
    id: 3,
    name: "Sarah Kabbaj",
    role: "Influencer",
    text: "Bijoux IYL defines modern luxury. I'm obsessed with the silver collection. Fast delivery to Casablanca too!",
    image: "https://placehold.co/100x100/111/FFD65A?text=SK",
    stars: 5
  }
]

export function ReviewsSection() {
  const [current, setCurrent] = useState(0)

  const next = () => setCurrent((prev) => (prev + 1) % REVIEWS.length)
  const prev = () => setCurrent((prev) => (prev - 1 + REVIEWS.length) % REVIEWS.length)

  useEffect(() => {
    const timer = setInterval(next, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="py-24 bg-black-bg relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(212,175,55,0.1),transparent_50%)]" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center text-center mb-16">
           <h2 className="text-4xl md:text-5xl font-serif text-white mb-4">Client Stories</h2>
           <div className="w-24 h-1 bg-gradient-to-r from-transparent via-gold to-transparent" />
        </div>

        <div className="max-w-4xl mx-auto relative h-[400px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 100, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -100, scale: 0.9 }}
              transition={{ duration: 0.5, type: "spring" }}
              className="absolute w-full max-w-2xl"
            >
              <div className="bg-black-soft border border-gold/20 p-8 md:p-12 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.5)] flex flex-col items-center text-center relative">
                
                {/* Quote Icon */}
                <div className="absolute -top-6 bg-black-bg border border-gold text-gold text-4xl font-serif w-12 h-12 flex items-center justify-center rounded-full">
                  "
                </div>

                <p className="text-xl md:text-2xl font-serif text-[#e4cc7f] dark:text-white italic mb-8 leading-relaxed">
                  {REVIEWS[current].text}
                </p>

                <div className="flex gap-1 mb-6">
                  {[...Array(REVIEWS[current].stars)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-gold text-gold" />
                  ))}
                </div>

                <div className="flex items-center gap-4">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden border border-gold">
                    <Image src={REVIEWS[current].image} alt={REVIEWS[current].name} fill className="object-cover" />
                  </div>
                  <div className="text-left">
                    <h4 className="text-white font-bold">{REVIEWS[current].name}</h4>
                    <span className="text-xs text-gold-light uppercase tracking-wide">{REVIEWS[current].role}</span>
                  </div>
                </div>

              </div>
            </motion.div>
          </AnimatePresence>
          
          {/* Navigation */}
          <button 
            onClick={prev}
            className="absolute left-0 md:-left-12 p-2 bg-black-soft border border-white/10 rounded-full hover:border-gold hover:text-gold transition-all"
          >
            <ChevronLeft />
          </button>
          <button 
            onClick={next}
            className="absolute right-0 md:-right-12 p-2 bg-black-soft border border-white/10 rounded-full hover:border-gold hover:text-gold transition-all"
          >
            <ChevronRight />
          </button>
        </div>
      </div>
    </section>
  )
}
