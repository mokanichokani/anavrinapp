"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface ChartProps extends React.HTMLAttributes<HTMLDivElement> {
  data?: any[]
  type?: "line" | "bar" | "area"
}

const Chart = React.forwardRef<HTMLDivElement, ChartProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("w-full h-full", className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)
Chart.displayName = "Chart"

// Simple chart components for demo purposes
const ChartContainer = ({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("w-full", className)} {...props}>
    {children}
  </div>
)

const ChartTooltip = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-popover text-popover-foreground border rounded-md shadow-md p-2 text-sm">
    {children}
  </div>
)

// Mock chart data visualization (simplified for demo)
const SimpleLineChart = ({ data, height = 200 }: { data: any[], height?: number }) => {
  return (
    <div className="w-full" style={{ height }}>
      <svg width="100%" height="100%" viewBox="0 0 400 200" className="overflow-visible">
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
          </linearGradient>
        </defs>
        
        {/* Grid lines */}
        {[0, 1, 2, 3, 4].map(i => (
          <line
            key={i}
            x1="0"
            y1={i * 40}
            x2="400"
            y2={i * 40}
            stroke="hsl(var(--border))"
            strokeWidth="1"
            opacity="0.3"
          />
        ))}
        
        {/* Sample line */}
        <path
          d="M 0 150 Q 100 100 200 120 T 400 80"
          stroke="hsl(var(--primary))"
          strokeWidth="2"
          fill="none"
        />
        
        {/* Area under curve */}
        <path
          d="M 0 150 Q 100 100 200 120 T 400 80 L 400 200 L 0 200 Z"
          fill="url(#gradient)"
        />
        
        {/* Data points */}
        {[0, 100, 200, 300, 400].map((x, i) => (
          <circle
            key={i}
            cx={x}
            cy={[150, 100, 120, 90, 80][i]}
            r="4"
            fill="hsl(var(--primary))"
            stroke="hsl(var(--background))"
            strokeWidth="2"
          />
        ))}
      </svg>
    </div>
  )
}

const SimpleBarChart = ({ data, height = 200 }: { data: any[], height?: number }) => {
  return (
    <div className="w-full" style={{ height }}>
      <svg width="100%" height="100%" viewBox="0 0 400 200">
        {/* Grid lines */}
        {[0, 1, 2, 3, 4].map(i => (
          <line
            key={i}
            x1="0"
            y1={i * 40}
            x2="400"
            y2={i * 40}
            stroke="hsl(var(--border))"
            strokeWidth="1"
            opacity="0.3"
          />
        ))}
        
        {/* Bars */}
        {[60, 120, 80, 140, 100].map((height, i) => (
          <rect
            key={i}
            x={i * 80 + 20}
            y={200 - height}
            width="40"
            height={height}
            fill="hsl(var(--primary))"
            rx="4"
          />
        ))}
      </svg>
    </div>
  )
}

export { Chart, ChartContainer, ChartTooltip, SimpleLineChart, SimpleBarChart }
