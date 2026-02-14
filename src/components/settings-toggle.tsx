"use client"

import React, { useState } from "react"
import { useSettings } from "@/providers/settings-provider"
import { useTheme } from "next-themes"
import { Sun, Moon, Globe, DollarSign, ChevronDown } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export function SettingsToggle() {
  const { language, setLanguage, currency, setCurrency } = useSettings()
  const { theme, setTheme } = useTheme()
  const [isOpen, setIsOpen] = useState(false)

  const toggleOpen = () => setIsOpen(!isOpen)

  return (
    <div className="relative z-50">
      <button 
        onClick={toggleOpen}
        className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 hover:border-gold/50 transition-colors"
      >
        <Globe className="w-4 h-4 text-silver" />
        <span className="text-xs font-medium text-silver">{language} | {currency}</span>
        <ChevronDown className={`w-3 h-3 text-silver transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute top-full right-0 mt-2 w-48 bg-black-soft border border-white/10 rounded-xl shadow-2xl p-4 flex flex-col gap-4"
          >
            {/* Theme Toggle */}
            <div className="flex justify-between items-center pb-3 border-b border-white/5">
              <span className="text-xs text-silver/60">Theme</span>
              <div className="flex bg-black-bg rounded-full p-1 border border-white/5">
                <button 
                  onClick={() => setTheme("light")} 
                  className={`p-1.5 rounded-full transition-all ${theme === 'light' ? 'bg-white text-black' : 'text-silver'}`}
                >
                  <Sun className="w-3 h-3" />
                </button>
                <button 
                  onClick={() => setTheme("dark")}
                  className={`p-1.5 rounded-full transition-all ${theme === 'dark' ? 'bg-gold text-black' : 'text-silver'}`}
                >
                  <Moon className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Language */}
            <div>
              <span className="text-xs text-silver/60 mb-2 block">Language</span>
              <div className="grid grid-cols-3 gap-1">
                {(["EN", "FR", "AR"] as const).map(lang => (
                  <button
                    key={lang}
                    onClick={() => setLanguage(lang)}
                    className={`text-xs py-1 rounded transition-colors ${language === lang ? 'bg-gold/20 text-gold border border-gold/30' : 'hover:bg-white/5 text-silver'}`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </div>

            {/* Currency */}
            <div>
              <span className="text-xs text-silver/60 mb-2 block">Currency</span>
              <div className="grid grid-cols-3 gap-1">
                {(["MAD", "USD", "EUR"] as const).map(curr => (
                  <button
                    key={curr}
                    onClick={() => setCurrency(curr)}
                    className={`text-xs py-1 rounded transition-colors ${currency === curr ? 'bg-gold/20 text-gold border border-gold/30' : 'hover:bg-white/5 text-silver'}`}
                  >
                    {curr}
                  </button>
                ))}
              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
