"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, ExternalLink, Download, Settings, Eye, Calendar, Globe, MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Link from "next/link"

// Mock data for purchased templates
const purchasedTemplates = [
  {
    id: 1,
    title: "SaaS Pro",
    category: "SaaS",
    purchaseDate: "2024-01-15",
    deployUrl: "https://my-saas-pro.vercel.app",
    customDomain: "myapp.com",
    status: "deployed",
    views: 456,
    price: 49,
    image: "/modern-saas-landing-page-with-blue-gradient.jpg",
    lastUpdated: "2024-01-20",
  },
  {
    id: 2,
    title: "Agency Ace",
    category: "Agency",
    purchaseDate: "2024-01-10",
    deployUrl: "https://my-agency-ace.vercel.app",
    customDomain: null,
    status: "deployed",
    views: 321,
    price: 39,
    image: "/creative-agency-landing-page-with-portfolio.jpg",
    lastUpdated: "2024-01-18",
  },
  {
    id: 3,
    title: "E-Shop Elite",
    category: "E-commerce",
    purchaseDate: "2024-01-08",
    deployUrl: null,
    customDomain: null,
    status: "pending",
    views: 0,
    price: 59,
    image: "/ecommerce-landing-page-with-product-showcase.jpg",
    lastUpdated: "2024-01-08",
  },
]

export default function MyTemplatesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [sortBy, setSortBy] = useState("recent")

  const filteredTemplates = purchasedTemplates
    .filter((template) => {
      const matchesSearch =
        template.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        template.category.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = statusFilter === "all" || template.status === statusFilter
      return matchesSearch && matchesStatus
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.title.localeCompare(b.title)
        case "category":
          return a.category.localeCompare(b.category)
        case "views":
          return b.views - a.views
        case "recent":
        default:
          return new Date(b.purchaseDate).getTime() - new Date(a.purchaseDate).getTime()
      }
    })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-playfair-display font-bold text-3xl text-foreground mb-2">My Templates</h1>
        <p className="text-muted-foreground">Manage and deploy your purchased landing page templates.</p>
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
            <SelectItem value="deployed">Deployed</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
          </SelectContent>
        </Select>

        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="recent">Most Recent</SelectItem>
            <SelectItem value="name">Name A-Z</SelectItem>
            <SelectItem value="category">Category</SelectItem>
            <SelectItem value="views">Most Views</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((template) => (
          <Card key={template.id} className="group hover:shadow-lg transition-shadow">
            <CardHeader className="p-0">
              <div className="relative overflow-hidden rounded-t-lg">
                <img
                  src={template.image || "/placeholder.svg"}
                  alt={template.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-3 left-3 flex gap-2">
                  <Badge className="bg-primary text-primary-foreground">{template.category}</Badge>
                  <Badge variant={template.status === "deployed" ? "default" : "secondary"}>{template.status}</Badge>
                </div>
                <div className="absolute top-3 right-3">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="secondary" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Settings className="mr-2 h-4 w-4" />
                        Configure
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Eye className="mr-2 h-4 w-4" />
                        Preview
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-6">
              <div className="mb-4">
                <h3 className="font-semibold text-lg mb-1">{template.title}</h3>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {new Date(template.purchaseDate).toLocaleDateString()}
                  </span>
                  <span className="flex items-center gap-1">
                    <Eye className="h-3 w-3" />
                    {template.views} views
                  </span>
                </div>
              </div>

              {template.deployUrl && (
                <div className="mb-4 p-3 bg-muted rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <Globe className="h-4 w-4 text-green-500" />
                    <span className="text-sm font-medium">Live URL</span>
                  </div>
                  <p className="text-sm text-muted-foreground truncate">
                    {template.customDomain || template.deployUrl}
                  </p>
                </div>
              )}

              <div className="flex gap-2">
                {template.deployUrl ? (
                  <Button variant="outline" size="sm" className="flex-1 bg-transparent" asChild>
                    <Link href={template.deployUrl} target="_blank">
                      <ExternalLink className="h-4 w-4 mr-1" />
                      Visit Site
                    </Link>
                  </Button>
                ) : (
                  <Button variant="outline" size="sm" className="flex-1 bg-transparent" disabled>
                    Deploying...
                  </Button>
                )}
                <Button variant="ghost" size="sm">
                  <Settings className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredTemplates.length === 0 && (
        <div className="text-center py-12">
          <div className="text-muted-foreground mb-4">
            <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-semibold mb-2">No templates found</h3>
            <p>Try adjusting your search or filters</p>
          </div>
          <Button
            variant="outline"
            onClick={() => {
              setSearchTerm("")
              setStatusFilter("all")
            }}
          >
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  )
}
