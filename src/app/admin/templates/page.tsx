"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Plus, Edit, Trash2, Eye, MoreHorizontal, Filter, Download, Upload } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Mock data for templates management
const templates = [
  {
    id: 1,
    title: "SaaS Pro",
    category: "SaaS",
    price: 49,
    status: "published",
    sales: 45,
    revenue: 2205,
    created: "2024-01-01",
    updated: "2024-01-15",
    image: "/modern-saas-landing-page-with-blue-gradient.jpg",
    author: "Design Team",
  },
  {
    id: 2,
    title: "Agency Ace",
    category: "Agency",
    price: 39,
    status: "published",
    sales: 38,
    revenue: 1482,
    created: "2024-01-05",
    updated: "2024-01-18",
    image: "/creative-agency-landing-page-with-portfolio.jpg",
    author: "Design Team",
  },
  {
    id: 3,
    title: "E-Shop Elite",
    category: "E-commerce",
    price: 59,
    status: "published",
    sales: 32,
    revenue: 1888,
    created: "2024-01-08",
    updated: "2024-01-20",
    image: "/ecommerce-landing-page-with-product-showcase.jpg",
    author: "Design Team",
  },
  {
    id: 4,
    title: "Portfolio Pro",
    category: "Portfolio",
    price: 35,
    status: "draft",
    sales: 0,
    revenue: 0,
    created: "2024-01-20",
    updated: "2024-01-20",
    image: "/creative-portfolio-landing-page-with-gallery.jpg",
    author: "Design Team",
  },
]

export default function AdminTemplatesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [sortBy, setSortBy] = useState("updated")

  const filteredTemplates = templates
    .filter((template) => {
      const matchesSearch = template.title.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = statusFilter === "all" || template.status === statusFilter
      const matchesCategory = categoryFilter === "all" || template.category === categoryFilter
      return matchesSearch && matchesStatus && matchesCategory
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "title":
          return a.title.localeCompare(b.title)
        case "sales":
          return b.sales - a.sales
        case "revenue":
          return b.revenue - a.revenue
        case "created":
          return new Date(b.created).getTime() - new Date(a.created).getTime()
        case "updated":
        default:
          return new Date(b.updated).getTime() - new Date(a.updated).getTime()
      }
    })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-playfair-display font-bold text-3xl text-foreground mb-2">Template Management</h1>
          <p className="text-muted-foreground">Manage your landing page templates and track their performance.</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Template
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Templates</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{templates.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Published</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{templates.filter((t) => t.status === "published").length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{templates.reduce((sum, t) => sum + t.sales, 0)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${templates.reduce((sum, t) => sum + t.revenue, 0).toLocaleString()}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search templates..."
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
            <SelectItem value="published">Published</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="archived">Archived</SelectItem>
          </SelectContent>
        </Select>

        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="SaaS">SaaS</SelectItem>
            <SelectItem value="E-commerce">E-commerce</SelectItem>
            <SelectItem value="Agency">Agency</SelectItem>
            <SelectItem value="Portfolio">Portfolio</SelectItem>
          </SelectContent>
        </Select>

        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="updated">Last Updated</SelectItem>
            <SelectItem value="created">Date Created</SelectItem>
            <SelectItem value="title">Name A-Z</SelectItem>
            <SelectItem value="sales">Most Sales</SelectItem>
            <SelectItem value="revenue">Highest Revenue</SelectItem>
          </SelectContent>
        </Select>

        <Button variant="outline">
          <Filter className="h-4 w-4 mr-2" />
          More Filters
        </Button>
      </div>

      {/* Templates Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Templates ({filteredTemplates.length})</CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Upload className="h-4 w-4 mr-2" />
                Import
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredTemplates.map((template) => (
              <div key={template.id} className="flex items-center gap-4 p-4 border border-border rounded-lg">
                <img
                  src={template.image || "/placeholder.svg"}
                  alt={template.title}
                  className="w-16 h-16 object-cover rounded-lg"
                />

                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-medium">{template.title}</h3>
                    <Badge variant="secondary" className="text-xs">
                      {template.category}
                    </Badge>
                    <Badge variant={template.status === "published" ? "default" : "secondary"} className="text-xs">
                      {template.status}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>By {template.author}</span>
                    <span>Updated {new Date(template.updated).toLocaleDateString()}</span>
                    <span>{template.sales} sales</span>
                    <span>${template.revenue.toLocaleString()} revenue</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold">${template.price}</span>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Eye className="mr-2 h-4 w-4" />
                        Preview
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
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
