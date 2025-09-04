"use client"

import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/contexts/cart-context"
import Link from "next/link"

export function CartButton() {
  const { getItemCount } = useCart()
  const itemCount = getItemCount()

  return (
    <Button variant="outline" size="sm" asChild className="relative bg-transparent">
      <Link href="/cart">
        <ShoppingCart className="h-4 w-4" />
        {itemCount > 0 && (
          <Badge
            variant="destructive"
            className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
          >
            {itemCount}
          </Badge>
        )}
        <span className="sr-only">Shopping cart with {itemCount} items</span>
      </Link>
    </Button>
  )
}
