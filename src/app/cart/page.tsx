"use client"

import { useState } from "react"
import { useCart, addOnServices } from "@/contexts/cart-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { Trash2, Plus, ArrowRight, Star, Zap, Shield } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"
import ShoppingCart from "@/components/icons/shopping-cart" // Declare the ShoppingCart variable

export default function CartPage() {
  const { items, removeFromCart, addAddOn, removeAddOn, getTotalPrice } = useCart()
  const { user } = useAuth()
  const [selectedAddOns, setSelectedAddOns] = useState<{ [itemId: string]: string[] }>({})

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-24 h-24 mx-auto mb-6 bg-slate-100 rounded-full flex items-center justify-center">
              <ShoppingCart className="w-12 h-12 text-slate-400" />
            </div>
            <h1 className="text-3xl font-bold text-slate-900 mb-4">Your cart is empty</h1>
            <p className="text-slate-600 mb-8">Discover amazing landing page templates to get started</p>
            <Button asChild size="lg">
              <Link href="/templates">Browse Templates</Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  const handleAddOnToggle = (itemId: string, addOnId: string, checked: boolean) => {
    const addOn = addOnServices.find((a) => a.id === addOnId)
    if (!addOn) return

    if (checked) {
      addAddOn(itemId, addOn)
      setSelectedAddOns((prev) => ({
        ...prev,
        [itemId]: [...(prev[itemId] || []), addOnId],
      }))
    } else {
      removeAddOn(itemId, addOnId)
      setSelectedAddOns((prev) => ({
        ...prev,
        [itemId]: (prev[itemId] || []).filter((id) => id !== addOnId),
      }))
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "marketing":
        return <Zap className="w-4 h-4" />
      case "technical":
        return <Star className="w-4 h-4" />
      case "support":
        return <Shield className="w-4 h-4" />
      default:
        return <Plus className="w-4 h-4" />
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "marketing":
        return "bg-orange-100 text-orange-700"
      case "technical":
        return "bg-blue-100 text-blue-700"
      case "support":
        return "bg-green-100 text-green-700"
      default:
        return "bg-slate-100 text-slate-700"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Shopping Cart</h1>
            <p className="text-slate-600">Review your items and add recommended services</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              {items.map((item) => (
                <Card key={item.id} className="overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-slate-100">
                        <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-semibold text-slate-900">{item.name}</h3>
                            <Badge variant="secondary" className="mt-1">
                              {item.category}
                            </Badge>
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-bold text-slate-900">${item.price}</p>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeFromCart(item.id)}
                              className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>

                        {/* Add-on Services */}
                        <div className="mt-4">
                          <h4 className="font-medium text-slate-900 mb-3 flex items-center gap-2">
                            <Plus className="w-4 h-4" />
                            Recommended Services
                          </h4>
                          <div className="grid sm:grid-cols-2 gap-3">
                            {addOnServices.slice(0, 4).map((addOn) => {
                              const isSelected = item.addOns.some((a) => a.id === addOn.id)
                              return (
                                <div
                                  key={addOn.id}
                                  className={`p-3 rounded-lg border transition-colors ${
                                    isSelected
                                      ? "border-blue-200 bg-blue-50"
                                      : "border-slate-200 hover:border-slate-300"
                                  }`}
                                >
                                  <div className="flex items-start gap-3">
                                    <Checkbox
                                      checked={isSelected}
                                      onCheckedChange={(checked) =>
                                        handleAddOnToggle(item.id, addOn.id, checked as boolean)
                                      }
                                      className="mt-0.5"
                                    />
                                    <div className="flex-1 min-w-0">
                                      <div className="flex items-center gap-2 mb-1">
                                        <div className={`p-1 rounded ${getCategoryColor(addOn.category)}`}>
                                          {getCategoryIcon(addOn.category)}
                                        </div>
                                        <h5 className="font-medium text-sm text-slate-900 truncate">{addOn.name}</h5>
                                        {addOn.popular && (
                                          <Badge variant="destructive" className="text-xs">
                                            Popular
                                          </Badge>
                                        )}
                                      </div>
                                      <p className="text-xs text-slate-600 mb-2">{addOn.description}</p>
                                      <p className="font-semibold text-slate-900">${addOn.price}</p>
                                    </div>
                                  </div>
                                </div>
                              )
                            })}
                          </div>
                        </div>

                        {/* Selected Add-ons Summary */}
                        {item.addOns.length > 0 && (
                          <div className="mt-4 p-3 bg-green-50 rounded-lg">
                            <h5 className="font-medium text-green-900 mb-2">Selected Services:</h5>
                            <div className="space-y-1">
                              {item.addOns.map((addOn) => (
                                <div key={addOn.id} className="flex justify-between text-sm">
                                  <span className="text-green-700">{addOn.name}</span>
                                  <span className="font-medium text-green-900">${addOn.price}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-8">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {items.map((item) => {
                    const addOnTotal = item.addOns.reduce((sum, addOn) => sum + addOn.price, 0)
                    return (
                      <div key={item.id} className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-slate-600">{item.name}</span>
                          <span className="font-medium">${item.price}</span>
                        </div>
                        {item.addOns.map((addOn) => (
                          <div key={addOn.id} className="flex justify-between text-sm pl-4">
                            <span className="text-slate-500">+ {addOn.name}</span>
                            <span className="text-slate-600">${addOn.price}</span>
                          </div>
                        ))}
                      </div>
                    )
                  })}

                  <Separator />

                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>${getTotalPrice()}</span>
                  </div>

                  <div className="space-y-3 pt-4">
                    {user ? (
                      <Button asChild size="lg" className="w-full">
                        <Link href="/checkout">
                          Proceed to Checkout
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Link>
                      </Button>
                    ) : (
                      <div className="space-y-2">
                        <Button asChild size="lg" className="w-full">
                          <Link href="/auth/signin?redirect=/checkout">Sign In to Checkout</Link>
                        </Button>
                        <p className="text-xs text-slate-500 text-center">
                          New customer?{" "}
                          <Link href="/auth/signup" className="text-blue-600 hover:underline">
                            Create account
                          </Link>
                        </p>
                      </div>
                    )}

                    <Button variant="outline" size="lg" className="w-full bg-transparent" asChild>
                      <Link href="/templates">Continue Shopping</Link>
                    </Button>
                  </div>

                  <div className="pt-4 text-xs text-slate-500 space-y-1">
                    <p>✓ 30-day money-back guarantee</p>
                    <p>✓ Instant download after payment</p>
                    <p>✓ Free updates and support</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
