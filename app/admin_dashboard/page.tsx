"use client"

import React from "react"
import { AdminLayout } from "@/components/admin/AdminLayout"
import { DashboardStats } from "@/components/admin/DashboardStats"
import { RecentBookings } from "@/components/admin/RecentBookings"
import { DashboardCharts } from "@/components/admin/DashboardCharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Users, 
  Building2, 
  Calendar, 
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock,
  Star
} from "lucide-react"

function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
        <CardDescription>
          Common administrative tasks
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-3">
        <Button className="justify-start" variant="outline">
          <Calendar className="mr-2 h-4 w-4" />
          View Today's Check-ins
        </Button>
        <Button className="justify-start" variant="outline">
          <Users className="mr-2 h-4 w-4" />
          Manage User Accounts
        </Button>
        <Button className="justify-start" variant="outline">
          <Building2 className="mr-2 h-4 w-4" />
          Add New Property
        </Button>
        <Button className="justify-start" variant="outline">
          <TrendingUp className="mr-2 h-4 w-4" />
          Generate Reports
        </Button>
      </CardContent>
    </Card>
  )
}

function SystemAlerts() {
  const alerts = [
    {
      type: "warning",
      title: "Server Maintenance",
      message: "Scheduled maintenance in 2 hours",
      time: "2 hours",
      icon: Clock
    },
    {
      type: "success",
      title: "Backup Completed",
      message: "Daily backup completed successfully",
      time: "30 minutes ago",
      icon: CheckCircle
    },
    {
      type: "error",
      title: "Payment Failed",
      message: "3 payment failures require attention",
      time: "1 hour ago",
      icon: AlertCircle
    }
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>System Alerts</CardTitle>
        <CardDescription>
          Important notifications and system status
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {alerts.map((alert, index) => {
            const Icon = alert.icon
            return (
              <div key={index} className="flex items-start gap-3 p-3 rounded-lg border">
                <Icon className={`h-5 w-5 mt-0.5 ${
                  alert.type === "warning" ? "text-orange-500" :
                  alert.type === "success" ? "text-green-500" :
                  "text-red-500"
                }`} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium">{alert.title}</p>
                    <Badge variant={
                      alert.type === "warning" ? "secondary" :
                      alert.type === "success" ? "default" :
                      "destructive"
                    } className="text-xs">
                      {alert.type}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{alert.message}</p>
                  <p className="text-xs text-muted-foreground mt-1">{alert.time}</p>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

function TopProperties() {
  const properties = [
    { name: "Ocean View Resort", bookings: 45, rating: 4.8, revenue: "$12,500" },
    { name: "Villa Sunset", bookings: 38, rating: 4.9, revenue: "$15,200" },
    { name: "Mountain Lodge", bookings: 32, rating: 4.7, revenue: "$8,900" },
    { name: "Beach Paradise", bookings: 28, rating: 4.6, revenue: "$11,300" }
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Performing Properties</CardTitle>
        <CardDescription>
          Best performing properties this month
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {properties.map((property, index) => (
            <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
              <div>
                <p className="font-medium">{property.name}</p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>{property.bookings} bookings</span>
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span>{property.rating}</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium">{property.revenue}</p>
                <p className="text-sm text-muted-foreground">revenue</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default function AdminDashboard() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here's what's happening with your properties today.
          </p>
        </div>

        {/* Stats Cards */}
        <DashboardStats />

        {/* Charts */}
        <DashboardCharts />

        {/* Secondary Content */}
        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2">
            <RecentBookings />
          </div>
          <div className="space-y-6">
            <QuickActions />
            <SystemAlerts />
          </div>
        </div>

        {/* Additional Content */}
        <div className="grid gap-6 md:grid-cols-2">
          <TopProperties />
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>
                Latest administrative actions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
                  <span>New booking created for Ocean View Resort</span>
                  <span className="text-muted-foreground ml-auto">2 min ago</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                  <span>User profile updated: Sarah Johnson</span>
                  <span className="text-muted-foreground ml-auto">5 min ago</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="h-2 w-2 bg-orange-500 rounded-full"></div>
                  <span>Property listing modified: Villa Sunset</span>
                  <span className="text-muted-foreground ml-auto">12 min ago</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="h-2 w-2 bg-purple-500 rounded-full"></div>
                  <span>Payment processed: $1,250.00</span>
                  <span className="text-muted-foreground ml-auto">18 min ago</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  )
}
