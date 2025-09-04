"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { LayoutDashboard, ShoppingBag, CreditCard, Settings, ExternalLink, Heart, Download } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const sidebarItems = [
  {
    title: "Overview",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "My Templates",
    href: "/dashboard/templates",
    icon: ShoppingBag,
    badge: "3",
  },
  {
    title: "Purchase History",
    href: "/dashboard/purchases",
    icon: CreditCard,
  },
  {
    title: "Favorites",
    href: "/dashboard/favorites",
    icon: Heart,
  },
  {
    title: "Downloads",
    href: "/dashboard/downloads",
    icon: Download,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
]

export function DashboardSidebar() {
  const pathname = usePathname()

  return (
    <div className="w-64 border-r border-border bg-card/50 min-h-[calc(100vh-4rem)]">
      <div className="p-6">
        <h2 className="font-semibold text-foreground mb-4">Dashboard</h2>

        <nav className="space-y-2">
          {sidebarItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Button
                key={item.href}
                variant={isActive ? "default" : "ghost"}
                className={cn("w-full justify-start", isActive && "bg-primary text-primary-foreground")}
                asChild
              >
                <Link href={item.href}>
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.title}
                  {item.badge && (
                    <Badge variant="secondary" className="ml-auto">
                      {item.badge}
                    </Badge>
                  )}
                </Link>
              </Button>
            )
          })}
        </nav>

        <div className="mt-8 p-4 bg-muted rounded-lg">
          <h3 className="font-medium text-sm mb-2">Quick Actions</h3>
          <div className="space-y-2">
            <Button variant="outline" size="sm" className="w-full justify-start bg-transparent" asChild>
              <Link href="/templates">
                <ExternalLink className="mr-2 h-4 w-4" />
                Browse Templates
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
