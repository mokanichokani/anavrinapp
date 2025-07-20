"use client"

import React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { SimpleLineChart, SimpleBarChart } from "@/components/ui/chart"
import { TrendingUp, TrendingDown, Calendar, DollarSign } from "lucide-react"

// Mock data for charts
const bookingTrendsData = [
  { name: "Jan", value: 120 },
  { name: "Feb", value: 150 },
  { name: "Mar", value: 180 },
  { name: "Apr", value: 220 },
  { name: "May", value: 190 },
  { name: "Jun", value: 250 },
  { name: "Jul", value: 280 },
]

const revenueData = [
  { name: "Week 1", value: 45000 },
  { name: "Week 2", value: 52000 },
  { name: "Week 3", value: 48000 },
  { name: "Week 4", value: 61000 },
  { name: "Week 5", value: 55000 },
]

export function DashboardCharts() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {/* Booking Trends Chart */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Booking Trends
            </CardTitle>
            <CardDescription>
              Monthly booking volume over the last 7 months
            </CardDescription>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <TrendingUp className="h-4 w-4 text-green-500" />
            <span className="text-green-500 font-medium">+12.5%</span>
          </div>
        </CardHeader>
        <CardContent>
          <SimpleLineChart data={bookingTrendsData} height={250} />
          <div className="flex items-center justify-between mt-4 text-sm text-muted-foreground">
            <span>Jan 2025</span>
            <span>Jul 2025</span>
          </div>
        </CardContent>
      </Card>

      {/* Revenue Chart */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Weekly Revenue
            </CardTitle>
            <CardDescription>
              Revenue breakdown for the current month
            </CardDescription>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <TrendingUp className="h-4 w-4 text-green-500" />
            <span className="text-green-500 font-medium">+8.2%</span>
          </div>
        </CardHeader>
        <CardContent>
          <SimpleBarChart data={revenueData} height={250} />
          <div className="grid grid-cols-5 gap-2 mt-4 text-xs text-muted-foreground">
            <span>Week 1</span>
            <span>Week 2</span>
            <span>Week 3</span>
            <span>Week 4</span>
            <span>Week 5</span>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats Cards */}
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Quick Insights</CardTitle>
          <CardDescription>
            Key performance indicators at a glance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="text-center p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">85%</div>
              <div className="text-sm text-muted-foreground">Customer Satisfaction</div>
              <div className="flex items-center justify-center gap-1 text-xs text-green-600 mt-1">
                <TrendingUp className="h-3 w-3" />
                +3%
              </div>
            </div>
            
            <div className="text-center p-4 bg-green-50 dark:bg-green-950/20 rounded-lg">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">42</div>
              <div className="text-sm text-muted-foreground">Active Properties</div>
              <div className="flex items-center justify-center gap-1 text-xs text-green-600 mt-1">
                <TrendingUp className="h-3 w-3" />
                +2
              </div>
            </div>
            
            <div className="text-center p-4 bg-orange-50 dark:bg-orange-950/20 rounded-lg">
              <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">2.3</div>
              <div className="text-sm text-muted-foreground">Avg. Stay (days)</div>
              <div className="flex items-center justify-center gap-1 text-xs text-orange-600 mt-1">
                <TrendingDown className="h-3 w-3" />
                -0.1
              </div>
            </div>
            
            <div className="text-center p-4 bg-purple-50 dark:bg-purple-950/20 rounded-lg">
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">$487</div>
              <div className="text-sm text-muted-foreground">Avg. Booking Value</div>
              <div className="flex items-center justify-center gap-1 text-xs text-green-600 mt-1">
                <TrendingUp className="h-3 w-3" />
                +$23
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
