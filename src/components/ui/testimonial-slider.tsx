"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { Star, Quote } from "lucide-react"

const TESTIMONIALS = [
  {
    id: 1,
    name: "للى خديجة",
    role: "زبونة وفية",
    image: "https://placehold.co/200x200/111/D4AF37?text=LK",
    text: "الخدمة واعرة بزاف، والخاتم جا كيحمق. تبارك الله على الصنعة د تيزنيت. غادي نرجع نشري من عندكم أكيد."
  },
  {
    id: 2,
    name: "عمر العلمي",
    role: "مشترٍ موثق",
    image: "https://placehold.co/200x200/111/C8C8C8?text=OA",
    text: "شريت خاتم للمدام عجبها بزاف. تعامل راقي والتوصيل كان سريع للدار البيضاء. الجودة ديال الفضة ممتازة."
  },
  {
    id: 3,
    name: "سارة الفاسي",
    role: "مؤثرة موضة",
    image: "https://placehold.co/200x200/111/FFD65A?text=SF",
    text: "أحسن بلاصة شريت منها الفضة والذهب. الجودة عالية والتصميمات عصرية كتجمع بين الأصالة والمعاصرة."
  }
]

export function TestimonialSlider() {
  const [index, setIndex] = useState(0)

  const next = () => setIndex((prev) => (prev + 1) % TESTIMONIALS.length)
  const prev = () => setIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)

  return (
    <div className="relative w-full max-w-4xl mx-auto h-[500px] flex items-center justify-center perspective-1000">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, rotateY: -90, x: 200 }}
          animate={{ opacity: 1, rotateY: 0, x: 0 }}
          exit={{ opacity: 0, rotateY: 90, x: -200 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="relative bg-black-soft/80 backdrop-blur-xl border border-gold/30 p-12 rounded-2xl shadow-[0_0_50px_rgba(212,175,55,0.2)] text-center max-w-2xl"
        >
          <Quote className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 text-gold fill-gold bg-black-bg p-2 rounded-full border border-gold" />
          
         <p
  className="
    text-xl md:text-2xl font-serif italic mb-8 mt-4 leading-relaxed
    text-[#e4cc7f]
    dark:text-white
  "
>
  "{TESTIMONIALS[index].text}"
</p>


          <div className="flex justify-center gap-1 mb-6">
            {[1,2,3,4,5].map(s => <Star key={s} className="w-5 h-5 text-gold fill-gold" />)}
          </div>

          <div className="flex flex-col items-center">
             <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-gold mb-3">
               <Image src={TESTIMONIALS[index].image} alt={TESTIMONIALS[index].name} width={64} height={64} className="object-cover" />
             </div>
             <h4 className="text-lg font-bold text-neon-silver">{TESTIMONIALS[index].name}</h4>
             <span className="text-xs text-gold uppercase tracking-widest">{TESTIMONIALS[index].role}</span>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="absolute bottom-0 flex gap-4">
        <button onClick={prev} className="px-6 py-2 border border-white/10 rounded-full hover:bg-gold hover:text-black-bg transition-colors">Prev</button>
        <button onClick={next} className="px-6 py-2 border border-white/10 rounded-full hover:bg-gold hover:text-black-bg transition-colors">Next</button>
      </div>
    </div>
  )
}
