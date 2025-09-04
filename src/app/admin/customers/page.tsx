"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Eye, Mail, MoreHorizontal, Filter, Users, UserPlus, DollarSign, ShoppingBag } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Mock data for customers
const customers = [
  {
    id: 1,
    name: "John Smith",
    email: "john@example.com",
    avatar: "/placeholder.svg?height=40&width=40&text=JS",
    role: "customer",
    joinDate: "2024-01-15",
    lastActive: "2024-01-20",
    totalSpent: 147,
    totalOrders: 3,
    templates: ["SaaS Pro", "Agency Ace", "E-Shop Elite"],
    status: "active",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah@example.com",
    avatar: "/placeholder.svg?height=40&width=40&text=SJ",
    role: "customer",
    joinDate: "2024-01-10",
    lastActive: "2024-01-19",
    totalSpent: 78,
    totalOrders: 2,
    templates: ["Portfolio Pro", "Agency Ace"],
    status: "active",
  },
  {
    id: 3,
    name: "Mike Chen",
    email: "mike@example.com",
    avatar: "/placeholder.svg?height=40&width=40&text=MC",
    role: "customer",
    joinDate: "2024-01-08",
    lastActive: "2024-01-18",
    totalSpent: 59,
    totalOrders: 1,
    templates: ["E-Shop Elite"],
    status: "active",
  },
  {
    id: 4,
    name: "Emma Wilson",
    email: "emma@example.com",
    avatar: "/placeholder.svg?height=40&width=40&text=EW",
    role: "customer",
    joinDate: "2024-01-05",
    lastActive: "2024-01-12",
    totalSpent: 0,
    totalOrders: 0,
    templates: [],
    status: "inactive",
  },
]

export default function AdminCustomersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [sortBy, setSortBy] = useState("recent")

  const filteredCustomers = customers
    .filter((customer) => {
      const matchesSearch =
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = statusFilter === "all" || customer.status === statusFilter
      return matchesSearch && matchesStatus
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name)
        case "spent":
          return b.totalSpent - a.totalSpent
        case "orders":
          return b.totalOrders - a.totalOrders
        case "recent":
        default:
          return new Date(b.joinDate).getTime() - new Date(a.joinDate).getTime()
      }
    })

  const totalCustomers = customers.length
  const activeCustomers = customers.filter((c) => c.status === "active").length
  const totalRevenue = customers.reduce((sum, c) => sum + c.totalSpent, 0)
  const avgOrderValue = totalRevenue / customers.reduce((sum, c) => sum + c.totalOrders, 0) || 0

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-playfair-display font-bold text-3xl text-foreground mb-2">Customer Management</h1>
        <p className="text-muted-foreground">Manage your customers and track their activity.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCustomers}</div>
            <p className="text-xs text-muted-foreground">+8 from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Customers</CardTitle>
            <UserPlus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeCustomers}</div>
            <p className="text-xs text-muted-foreground">
              {Math.round((activeCustomers / totalCustomers) * 100)}% active rate
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalRevenue}</div>
            <p className="text-xs text-muted-foreground">From all customers</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Order Value</CardTitle>
            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${Math.round(avgOrderValue)}</div>
            <p className="text-xs text-muted-foreground">Per customer</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search customers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>

        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="recent">Most Recent</SelectItem>
            <SelectItem value="name">Name A-Z</SelectItem>
            <SelectItem value="spent">Highest Spent</SelectItem>
            <SelectItem value="orders">Most Orders</SelectItem>
          </SelectContent>
        </Select>

        <Button variant="outline">
          <Filter className="h-4 w-4 mr-2" />
          More Filters
        </Button>
      </div>

      {/* Customers Table */}
      <Card>
        <CardHeader>
          <CardTitle>Customers ({filteredCustomers.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredCustomers.map((customer) => (
              <div key={customer.id} className="flex items-center gap-4 p-4 border border-border rounded-lg">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={customer.avatar || "/placeholder.svg"} />
                  <AvatarFallback>
                    {customer.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium">{customer.name}</span>
                    <Badge variant={customer.status === "active" ? "default" : "secondary"}>{customer.status}</Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                    <span>{customer.email}</span>
                    <span>Joined {new Date(customer.joinDate).toLocaleDateString()}</span>
                    <span>Last active {new Date(customer.lastActive).toLocaleDateString()}</span>
                  </div>
                  {customer.templates.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {customer.templates.slice(0, 3).map((template) => (
                        <Badge key={template} variant="outline" className="text-xs">
                          {template}
                        </Badge>
                      ))}
                      {customer.templates.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{customer.templates.length - 3} more
                        </Badge>
                      )}
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="font-bold">${customer.totalSpent}</div>
                    <div className="text-xs text-muted-foreground">{customer.totalOrders} orders</div>
                  </div>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Eye className="mr-2 h-4 w-4" />
                        View Profile
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Mail className="mr-2 h-4 w-4" />
                        Send Email
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <ShoppingBag className="mr-2 h-4 w-4" />
                        View Orders
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
