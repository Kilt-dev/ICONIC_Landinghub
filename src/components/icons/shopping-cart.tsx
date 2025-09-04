import type React from "react"
import { LucideShoppingCart } from "lucide-react"

export default function ShoppingCart({ className, ...props }: React.ComponentProps<typeof LucideShoppingCart>) {
  return <LucideShoppingCart className={className} {...props} />
}
