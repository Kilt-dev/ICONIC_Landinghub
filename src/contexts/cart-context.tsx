"use client"

import type React from "react"
import { createContext, useContext, useState } from "react"

export interface AddOnService {
  id: string
  name: string
  description: string
  price: number
  category: "marketing" | "technical" | "support"
  popular?: boolean
}

export interface CartItem {
  id: string
  name: string
  price: number
  image: string
  category: string
  addOns: AddOnService[]
}

export interface CartContextType {
  items: CartItem[]
  addToCart: (item: Omit<CartItem, "addOns">) => void
  removeFromCart: (id: string) => void
  addAddOn: (itemId: string, addOn: AddOnService) => void
  removeAddOn: (itemId: string, addOnId: string) => void
  clearCart: () => void
  getTotalPrice: () => number
  getItemCount: () => number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}

export const addOnServices: AddOnService[] = [
  {
    id: "email-marketing",
    name: "Email Marketing Setup",
    description: "Complete email marketing automation with templates and sequences",
    price: 299,
    category: "marketing",
    popular: true,
  },
  {
    id: "social-marketing",
    name: "Social Media Marketing",
    description: "Social media strategy and content calendar for 3 months",
    price: 499,
    category: "marketing",
    popular: true,
  },
  {
    id: "seo-optimization",
    name: "SEO Optimization",
    description: "Complete SEO audit and optimization for better rankings",
    price: 399,
    category: "technical",
  },
  {
    id: "analytics-setup",
    name: "Analytics & Tracking",
    description: "Google Analytics, Facebook Pixel, and conversion tracking setup",
    price: 199,
    category: "technical",
  },
  {
    id: "custom-domain",
    name: "Custom Domain Setup",
    description: "Professional domain setup with SSL certificate",
    price: 99,
    category: "technical",
  },
  {
    id: "maintenance",
    name: "6-Month Maintenance",
    description: "Regular updates, security patches, and technical support",
    price: 599,
    category: "support",
  },
  {
    id: "copywriting",
    name: "Professional Copywriting",
    description: "Custom copy written by marketing experts for your industry",
    price: 799,
    category: "marketing",
  },
  {
    id: "speed-optimization",
    name: "Speed Optimization",
    description: "Performance optimization for faster loading times",
    price: 249,
    category: "technical",
  },
]

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  const addToCart = (item: Omit<CartItem, "addOns">) => {
    setItems((prev) => {
      const existingItem = prev.find((i) => i.id === item.id)
      if (existingItem) {
        return prev
      }
      return [...prev, { ...item, addOns: [] }]
    })
  }

  const removeFromCart = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id))
  }

  const addAddOn = (itemId: string, addOn: AddOnService) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === itemId) {
          const hasAddOn = item.addOns.some((a) => a.id === addOn.id)
          if (!hasAddOn) {
            return { ...item, addOns: [...item.addOns, addOn] }
          }
        }
        return item
      }),
    )
  }

  const removeAddOn = (itemId: string, addOnId: string) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === itemId) {
          return { ...item, addOns: item.addOns.filter((a) => a.id !== addOnId) }
        }
        return item
      }),
    )
  }

  const clearCart = () => {
    setItems([])
  }

  const getTotalPrice = () => {
    return items.reduce((total, item) => {
      const addOnTotal = item.addOns.reduce((sum, addOn) => sum + addOn.price, 0)
      return total + item.price + addOnTotal
    }, 0)
  }

  const getItemCount = () => {
    return items.length
  }

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        addAddOn,
        removeAddOn,
        clearCart,
        getTotalPrice,
        getItemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
