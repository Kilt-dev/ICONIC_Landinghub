"use client"

import { Button } from "@/components/ui/button"
import { UserMenu } from "@/components/auth/user-menu"
import { Bell, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import Link from "next/link"

export function DashboardHeader() {
  return (
    <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="flex items-center justify-between h-16 px-6">
        <div className="flex items-center space-x-4">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">L</span>
            </div>
            <span className="font-playfair-display font-bold text-xl text-foreground">LandingHub</span>
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input placeholder="Search your templates..." className="pl-10 w-64" />
          </div>

          <Button variant="ghost" size="sm">
            <Bell className="h-4 w-4" />
          </Button>

          <UserMenu />
        </div>
      </div>
    </header>
  )
}
