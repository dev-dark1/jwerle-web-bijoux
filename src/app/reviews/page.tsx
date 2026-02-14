"use client"

import React from "react"
import { motion } from "framer-motion"
import { TestimonialSlider } from "@/components/ui/testimonial-slider"
import { TestimonialBackground } from "@/components/ui/testimonial-background"
import { useSettings } from "@/providers/settings-provider"

export default function ReviewsPage() {
  const { t } = useSettings()

  return (
    <div className="bg-black-bg min-h-screen relative overflow-hidden flex flex-col items-center justify-center">
      <TestimonialBackground />
      
      <div className="container mx-auto px-4 relative z-10 py-20">
        <div className="text-center mb-16">
           <motion.h1 
             initial={{ opacity: 0, scale: 0.9 }}
             animate={{ opacity: 1, scale: 1 }}
             className="text-5xl md:text-7xl font-serif text-white mb-6"
           >
             {t("reviews.title")}
           </motion.h1>
           <p className="text-silver/60 text-lg max-w-xl mx-auto">
             Voices of our cherished collectors from across the globe.
           </p>
        </div>

        <TestimonialSlider />
      </div>
    </div>
  )
}
