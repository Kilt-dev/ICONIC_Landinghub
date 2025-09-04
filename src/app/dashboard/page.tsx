"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ShoppingBag, DollarSign, TrendingUp, ExternalLink, Eye, Download, Calendar } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"

// Mock data for customer dashboard
const dashboardData = {
  stats: {
    totalTemplates: 3,
    totalSpent: 143,
    activeDeployments: 2,
    monthlyViews: 1247,
  },
  recentTemplates: [
    {
      id: 1,
      title: "SaaS Pro",
      category: "SaaS",
      purchaseDate: "2024-01-15",
      deployUrl: "https://my-saas-pro.vercel.app",
      status: "deployed",
      views: 456,
    },
    {
      id: 2,
      title: "Agency Ace",
      category: "Agency",
      purchaseDate: "2024-01-10",
      deployUrl: "https://my-agency-ace.vercel.app",
      status: "deployed",
      views: 321,
    },
    {
      id: 3,
      title: "E-Shop Elite",
      category: "E-commerce",
      purchaseDate: "2024-01-08",
      deployUrl: null,
      status: "pending",
      views: 0,
    },
  ],
  recentActivity: [
    {
      id: 1,
      action: "Template deployed",
      template: "SaaS Pro",
      date: "2 hours ago",
    },
    {
      id: 2,
      action: "Template purchased",
      template: "E-Shop Elite",
      date: "1 day ago",
    },
    {
      id: 3,
      action: "Template customized",
      template: "Agency Ace",
      date: "3 days ago",
    },
  ],
}

export default function DashboardPage() {
  const { user } = useAuth()

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div>
        <h1 className="font-playfair-display font-bold text-3xl text-foreground mb-2">
          Welcome back, {user?.name?.split(" ")[0]}!
        </h1>
        <p className="text-muted-foreground">Here's an overview of your templates and recent activity.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Templates</CardTitle>
            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardData.stats.totalTemplates}</div>
            <p className="text-xs text-muted-foreground">+1 from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${dashboardData.stats.totalSpent}</div>
            <p className="text-xs text-muted-foreground">+$59 from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Deployments</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardData.stats.activeDeployments}</div>
            <p className="text-xs text-muted-foreground">2 templates live</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Views</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardData.stats.monthlyViews.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Templates */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>My Templates</CardTitle>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/dashboard/templates">View All</Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {dashboardData.recentTemplates.map((template) => (
                  <div
                    key={template.id}
                    className="flex items-center justify-between p-4 border border-border rounded-lg"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium">{template.title}</h3>
                        <Badge variant="secondary" className="text-xs">
                          {template.category}
                        </Badge>
                        <Badge variant={template.status === "deployed" ? "default" : "secondary"} className="text-xs">
                          {template.status}
                        </Badge>
                      </div>
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
                    <div className="flex items-center gap-2">
                      {template.deployUrl ? (
                        <Button variant="outline" size="sm" asChild>
                          <Link href={template.deployUrl} target="_blank">
                            <ExternalLink className="h-4 w-4 mr-1" />
                            Visit
                          </Link>
                        </Button>
                      ) : (
                        <Button variant="outline" size="sm" disabled>
                          Deploying...
                        </Button>
                      )}
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {dashboardData.recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{activity.action}</p>
                      <p className="text-sm text-muted-foreground">{activity.template}</p>
                      <p className="text-xs text-muted-foreground">{activity.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Usage Progress */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-sm">Monthly Usage</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Templates</span>
                    <span>3/10</span>
                  </div>
                  <Progress value={30} />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Deployments</span>
                    <span>2/5</span>
                  </div>
                  <Progress value={40} />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Storage</span>
                    <span>1.2GB/5GB</span>
                  </div>
                  <Progress value={24} />
                </div>
              </div>
              <Button variant="outline" size="sm" className="w-full mt-4 bg-transparent">
                Upgrade Plan
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
