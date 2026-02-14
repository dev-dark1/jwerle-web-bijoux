"use client"

import React from "react"
import { GoldShaderBackground } from "@/components/ui/gold-shader-background"
import { ContactForm } from "@/components/contact-form"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-black-bg relative py-24">
      <GoldShaderBackground />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-serif text-white mb-4">Contact Us</h1>
          <p className="text-silver/60">We are here to assist you with your luxury experience.</p>
        </div>

        <ContactForm />
      </div>
    </div>
  )
}
