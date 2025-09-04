"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  BarChart3,
  Settings,
  Globe,
  FileText,
  AlertCircle,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const sidebarItems = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Templates",
    href: "/admin/templates",
    icon: Package,
    badge: "24",
  },
  {
    title: "Orders",
    href: "/admin/orders",
    icon: ShoppingCart,
    badge: "12",
  },
  {
    title: "Customers",
    href: "/admin/customers",
    icon: Users,
  },
  {
    title: "Deployments",
    href: "/admin/deployments",
    icon: Globe,
    badge: "3",
  },
  {
    title: "Analytics",
    href: "/admin/analytics",
    icon: BarChart3,
  },
  {
    title: "Reports",
    href: "/admin/reports",
    icon: FileText,
  },
  {
    title: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <div className="w-64 border-r border-border bg-card/50 min-h-[calc(100vh-4rem)]">
      <div className="p-6">
        <h2 className="font-semibold text-foreground mb-4">Admin Panel</h2>

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
          <div className="flex items-center gap-2 mb-2">
            <AlertCircle className="h-4 w-4 text-orange-500" />
            <h3 className="font-medium text-sm">System Status</h3>
          </div>
          <p className="text-xs text-muted-foreground mb-3">All systems operational</p>
          <div className="space-y-1 text-xs">
            <div className="flex justify-between">
              <span>API</span>
              <span className="text-green-500">●</span>
            </div>
            <div className="flex justify-between">
              <span>Database</span>
              <span className="text-green-500">●</span>
            </div>
            <div className="flex justify-between">
              <span>Deployments</span>
              <span className="text-green-500">●</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
