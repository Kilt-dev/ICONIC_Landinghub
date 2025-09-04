"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Download, ExternalLink, Calendar, DollarSign, Receipt } from "lucide-react"
import Link from "next/link"

// Mock purchase history data
const purchaseHistory = [
  {
    id: "PUR-001",
    date: "2024-01-15",
    template: {
      id: 1,
      title: "SaaS Pro",
      category: "SaaS",
      image: "/modern-saas-landing-page-with-blue-gradient.jpg",
    },
    amount: 49,
    status: "completed",
    paymentMethod: "Credit Card",
    invoiceUrl: "#",
  },
  {
    id: "PUR-002",
    date: "2024-01-10",
    template: {
      id: 2,
      title: "Agency Ace",
      category: "Agency",
      image: "/creative-agency-landing-page-with-portfolio.jpg",
    },
    amount: 39,
    status: "completed",
    paymentMethod: "PayPal",
    invoiceUrl: "#",
  },
  {
    id: "PUR-003",
    date: "2024-01-08",
    template: {
      id: 3,
      title: "E-Shop Elite",
      category: "E-commerce",
      image: "/ecommerce-landing-page-with-product-showcase.jpg",
    },
    amount: 59,
    status: "completed",
    paymentMethod: "Credit Card",
    invoiceUrl: "#",
  },
]

export default function PurchaseHistoryPage() {
  const totalSpent = purchaseHistory.reduce((sum, purchase) => sum + purchase.amount, 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-playfair-display font-bold text-3xl text-foreground mb-2">Purchase History</h1>
        <p className="text-muted-foreground">View all your template purchases and download invoices.</p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Purchases</CardTitle>
            <Receipt className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{purchaseHistory.length}</div>
            <p className="text-xs text-muted-foreground">Templates purchased</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalSpent}</div>
            <p className="text-xs text-muted-foreground">Lifetime spending</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Order</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${Math.round(totalSpent / purchaseHistory.length)}</div>
            <p className="text-xs text-muted-foreground">Per purchase</p>
          </CardContent>
        </Card>
      </div>

      {/* Purchase History */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Purchases</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {purchaseHistory.map((purchase) => (
              <div key={purchase.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div className="flex items-center gap-4">
                  <img
                    src={purchase.template.image || "/placeholder.svg"}
                    alt={purchase.template.title}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div>
                    <h3 className="font-medium mb-1">{purchase.template.title}</h3>
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="secondary" className="text-xs">
                        {purchase.template.category}
                      </Badge>
                      <Badge variant={purchase.status === "completed" ? "default" : "secondary"} className="text-xs">
                        {purchase.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(purchase.date).toLocaleDateString()}
                      </span>
                      <span>Order #{purchase.id}</span>
                      <span>{purchase.paymentMethod}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-lg font-bold">${purchase.amount}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={purchase.invoiceUrl}>
                        <Download className="h-4 w-4 mr-1" />
                        Invoice
                      </Link>
                    </Button>
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/templates/${purchase.template.id}`}>
                        <ExternalLink className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
