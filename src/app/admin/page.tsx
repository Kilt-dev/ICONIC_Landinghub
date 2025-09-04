"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Package, ShoppingCart, Users, DollarSign, TrendingUp, TrendingDown, Eye, Download, Globe } from "lucide-react"
import Link from "next/link"

// Mock data for admin dashboard
const dashboardData = {
  stats: {
    totalTemplates: 24,
    totalOrders: 156,
    totalCustomers: 89,
    totalRevenue: 7840,
    monthlyGrowth: 12.5,
    activeDeployments: 45,
  },
  recentOrders: [
    {
      id: "ORD-001",
      customer: "John Smith",
      template: "SaaS Pro",
      amount: 49,
      status: "completed",
      date: "2024-01-20",
    },
    {
      id: "ORD-002",
      customer: "Sarah Johnson",
      template: "Agency Ace",
      amount: 39,
      status: "processing",
      date: "2024-01-20",
    },
    {
      id: "ORD-003",
      customer: "Mike Chen",
      template: "E-Shop Elite",
      amount: 59,
      status: "completed",
      date: "2024-01-19",
    },
  ],
  topTemplates: [
    {
      id: 1,
      title: "SaaS Pro",
      category: "SaaS",
      sales: 45,
      revenue: 2205,
      trend: "up",
    },
    {
      id: 2,
      title: "Agency Ace",
      category: "Agency",
      sales: 38,
      revenue: 1482,
      trend: "up",
    },
    {
      id: 3,
      title: "E-Shop Elite",
      category: "E-commerce",
      sales: 32,
      revenue: 1888,
      trend: "down",
    },
  ],
  recentActivity: [
    {
      id: 1,
      action: "New order received",
      details: "SaaS Pro purchased by John Smith",
      time: "5 minutes ago",
      type: "order",
    },
    {
      id: 2,
      action: "Template deployed",
      details: "Agency Ace deployed for Sarah Johnson",
      time: "1 hour ago",
      type: "deployment",
    },
    {
      id: 3,
      action: "New customer registered",
      details: "Mike Chen joined the platform",
      time: "2 hours ago",
      type: "user",
    },
    {
      id: 4,
      action: "Template updated",
      details: "Portfolio Pro v2.1 released",
      time: "4 hours ago",
      type: "template",
    },
  ],
}

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-playfair-display font-bold text-3xl text-foreground mb-2">Admin Dashboard</h1>
        <p className="text-muted-foreground">Overview of your platform performance and recent activity.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Templates</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardData.stats.totalTemplates}</div>
            <p className="text-xs text-muted-foreground">+2 from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardData.stats.totalOrders}</div>
            <p className="text-xs text-muted-foreground">+{dashboardData.stats.monthlyGrowth}% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardData.stats.totalCustomers}</div>
            <p className="text-xs text-muted-foreground">+8 from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${dashboardData.stats.totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+{dashboardData.stats.monthlyGrowth}% from last month</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Recent Orders</CardTitle>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/admin/orders">View All</Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {dashboardData.recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium">{order.id}</span>
                        <Badge variant={order.status === "completed" ? "default" : "secondary"}>{order.status}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {order.customer} • {order.template}
                      </p>
                      <p className="text-xs text-muted-foreground">{order.date}</p>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">${order.amount}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Top Templates */}
          <Card>
            <CardHeader>
              <CardTitle>Top Performing Templates</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {dashboardData.topTemplates.map((template) => (
                  <div key={template.id} className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium">{template.title}</span>
                        <Badge variant="secondary" className="text-xs">
                          {template.category}
                        </Badge>
                        {template.trend === "up" ? (
                          <TrendingUp className="h-3 w-3 text-green-500" />
                        ) : (
                          <TrendingDown className="h-3 w-3 text-red-500" />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{template.sales} sales</p>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">${template.revenue.toLocaleString()}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Quick Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Active Deployments</span>
                </div>
                <span className="font-bold">{dashboardData.stats.activeDeployments}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Eye className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Page Views Today</span>
                </div>
                <span className="font-bold">2,847</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Download className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Downloads Today</span>
                </div>
                <span className="font-bold">156</span>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {dashboardData.recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{activity.action}</p>
                      <p className="text-xs text-muted-foreground">{activity.details}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* System Health */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">System Health</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Server Load</span>
                  <span>23%</span>
                </div>
                <Progress value={23} />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Database</span>
                  <span>67%</span>
                </div>
                <Progress value={67} />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Storage</span>
                  <span>45%</span>
                </div>
                <Progress value={45} />
              </div>
              <div className="flex items-center gap-2 pt-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-xs text-muted-foreground">All systems operational</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
