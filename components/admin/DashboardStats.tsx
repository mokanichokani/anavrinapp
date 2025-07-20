"use client"

import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  Calendar,
  DollarSign,
  Users,
  TrendingUp,
  ArrowUpIcon,
  ArrowDownIcon
} from "lucide-react"

interface StatCardProps {
  title: string
  value: string
  change: string
  changeType: "increase" | "decrease"
  icon: React.ElementType
  description?: string
}

function StatCard({ title, value, change, changeType, icon: Icon, description }: StatCardProps) {
  return (
    <Card className="relative overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <div className="flex items-center space-x-1 text-xs text-muted-foreground">
          {changeType === "increase" ? (
            <ArrowUpIcon className="h-4 w-4 text-green-500" />
          ) : (
            <ArrowDownIcon className="h-4 w-4 text-red-500" />
          )}
          <span className={changeType === "increase" ? "text-green-500" : "text-red-500"}>
            {change}
          </span>
          <span>from last month</span>
        </div>
        {description && (
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        )}
      </CardContent>
    </Card>
  )
}

export function DashboardStats() {
  const stats = [
    {
      title: "Total Bookings",
      value: "2,847",
      change: "+12.5%",
      changeType: "increase" as const,
      icon: Calendar,
      description: "Active and completed bookings"
    },
    {
      title: "Total Revenue",
      value: "$284,750",
      change: "+8.2%",
      changeType: "increase" as const,
      icon: DollarSign,
      description: "Revenue this month"
    },
    {
      title: "Active Users",
      value: "12,489",
      change: "+4.1%",
      changeType: "increase" as const,
      icon: Users,
      description: "Registered users"
    },
    {
      title: "Occupancy Rate",
      value: "78.4%",
      change: "-2.3%",
      changeType: "decrease" as const,
      icon: TrendingUp,
      description: "Average across all properties"
    }
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  )
}
