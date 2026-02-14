'use client'

import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, ShoppingBag } from 'lucide-react'
import { motion } from 'framer-motion'

interface ReelItem {
  id: string
  image: string
  title: string
  price: string
  productId?: string
}

interface InfiniteReelCarouselProps {
  items?: ReelItem[]
  autoPlay?: boolean
  autoPlayInterval?: number
}

export function InfiniteReelCarousel({ 
  items,
  autoPlay = true,
  autoPlayInterval = 4000 
}: InfiniteReelCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null)

  // Default items if none provided
  const defaultItems: ReelItem[] = [
    {
      id: '1',
      image: '/images/hero-couple.webp',
      title: 'Diamond Hearts Collection',
      price: '2,500 MAD',
      productId: 'diamond-hearts'
    },
    {
      id: '2',
      image: '/images/hero-hand.webp',
      title: 'Ruby Pendant Luxury',
      price: '1,800 MAD',
      productId: 'ruby-pendant'
    },
    {
      id: '3',
      image: '/images/hero-couple.webp',
      title: 'Golden Chain Series',
      price: '3,200 MAD',
      productId: 'golden-chain'
    },
    {
      id: '4',
      image: '/images/hero-hand.webp',
      title: 'Emerald Dreams',
      price: '2,100 MAD',
      productId: 'emerald-dreams'
    }
  ]

  const displayItems = items || defaultItems
  const extendedItems = [...displayItems, ...displayItems] // Create infinite loop effect

  useEffect(() => {
    if (!autoPlay || isPaused) return

    autoPlayRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % displayItems.length)
    }, autoPlayInterval)

    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current)
    }
  }, [autoPlay, isPaused, autoPlayInterval, displayItems.length])

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + displayItems.length) % displayItems.length)
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % displayItems.length)
  }

  return (
    <section className="w-full py-12 md:py-20 bg-black relative overflow-hidden">
      <div 
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(212, 175, 55, 0.1) 0%, transparent 50%)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-serif text-white mb-4">
            Shop Our Latest Collection
          </h2>
          <p className="text-silver/70 text-lg">
            Swipe through our exclusive jewelry designs
          </p>
        </div>

        {/* Carousel Container */}
        <div 
          className="relative group"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Items */}
          <div className="overflow-hidden rounded-2xl border border-gold/20">
            <motion.div
              className="flex gap-6"
              animate={{ x: `calc(-${currentIndex * 100}%)` }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              {extendedItems.map((item, index) => (
                <motion.div
                  key={`${item.id}-${Math.floor(index / displayItems.length)}`}
                  className="flex-shrink-0 w-full md:w-1/2 lg:w-1/3"
                  whileHover={{ y: -10 }}
                >
                  <div className="relative group/item h-[400px] md:h-[500px] overflow-hidden rounded-xl bg-black-soft border border-white/10 hover:border-gold/30 transition-colors">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover group-hover/item:scale-110 transition-transform duration-500"
                      priority={index < 3}
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover/item:opacity-100 transition-opacity duration-300" />

                    {/* Content */}
                    <div className="absolute inset-0 flex flex-col justify-end p-6 text-white transform translate-y-8 group-hover/item:translate-y-0 transition-transform duration-300">
                      <h3 className="text-2xl font-serif mb-2">{item.title}</h3>
                      <p className="text-gold font-bold mb-4 text-xl">{item.price}</p>
                      
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full px-4 py-3 bg-gradient-gold text-black font-semibold rounded-lg flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-gold/50 transition-all"
                      >
                        <ShoppingBag className="w-5 h-5" />
                        Shop This Reel
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Navigation Buttons */}
          <motion.button
            whileHover={{ scale: 1.1, x: -4 }}
            whileTap={{ scale: 0.95 }}
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-gold/90 hover:bg-gold text-black flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            aria-label="Previous reel"
          >
            <ChevronLeft className="w-6 h-6" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1, x: 4 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-gold/90 hover:bg-gold text-black flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            aria-label="Next reel"
          >
            <ChevronRight className="w-6 h-6" />
          </motion.button>

          {/* Indicators */}
          <div className="flex gap-2 justify-center mt-6">
            {displayItems.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'w-8 bg-gold'
                    : 'w-2 bg-white/30 hover:bg-white/50'
                }`}
                aria-label={`Go to reel ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="p-6 bg-white/5 rounded-lg border border-white/10">
            <p className="text-gold font-semibold mb-2">Free Delivery</p>
            <p className="text-silver/70 text-sm">Order over 500 MAD in Morocco</p>
          </div>
          <div className="p-6 bg-white/5 rounded-lg border border-white/10">
            <p className="text-gold font-semibold mb-2">Secure Payment</p>
            <p className="text-silver/70 text-sm">Encrypted transactions guaranteed</p>
          </div>
          <div className="p-6 bg-white/5 rounded-lg border border-white/10">
            <p className="text-gold font-semibold mb-2">Lifetime Warranty</p>
            <p className="text-silver/70 text-sm">Crafted to last forever</p>
          </div>
        </div>
      </div>
    </section>
  )
}
