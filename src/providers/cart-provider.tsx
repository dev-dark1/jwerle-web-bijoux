"use client"

import React, { createContext, useContext, useState, useEffect } from "react"

export interface CartItem {
  id: string
  productId: number
  name: string
  price: number
  image: string
  quantity: number
  options: {
    size?: string
    metal?: "silver" | "gold" | "black"
    stone?: string
  }
}

interface CartContextType {
  items: CartItem[]
  addItem: (item: Omit<CartItem, "id">) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, delta: number) => void
  clearCart: () => void
  cartTotal: number
  itemCount: number
  isOpen: boolean
  toggleCart: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const saved = localStorage.getItem("yourelegance_cart")
    if (saved) setItems(JSON.parse(saved))
  }, [])

  useEffect(() => {
    if (mounted) localStorage.setItem("yourelegance_cart", JSON.stringify(items))
  }, [items, mounted])

  const addItem = (newItem: Omit<CartItem, "id">) => {
    const id = `${newItem.productId}-${JSON.stringify(newItem.options)}`
    setItems(prev => {
      const existing = prev.find(i => i.id === id)
      if (existing) {
        return prev.map(i => i.id === id ? { ...i, quantity: i.quantity + newItem.quantity } : i)
      }
      return [...prev, { ...newItem, id }]
    })
    setIsOpen(true)
  }

  const removeItem = (id: string) => {
    setItems(prev => prev.filter(i => i.id !== id))
  }

  const updateQuantity = (id: string, delta: number) => {
    setItems(prev => prev.map(i => {
      if (i.id === id) {
        const newQty = Math.max(1, i.quantity + delta)
        return { ...i, quantity: newQty }
      }
      return i
    }))
  }

  const clearCart = () => setItems([])

  const cartTotal = items.reduce((total, item) => total + (item.price * item.quantity), 0)
  const itemCount = items.reduce((total, item) => total + item.quantity, 0)
  const toggleCart = () => setIsOpen(!isOpen)

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, clearCart, cartTotal, itemCount, isOpen, toggleCart }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) throw new Error("useCart must be used within CartProvider")
  return context
}
