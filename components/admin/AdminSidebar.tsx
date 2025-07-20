"use client"

import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Calendar,
  Users,
  Building2,
  CreditCard,
  Settings,
  ChevronDown,
  LogOut
} from "lucide-react"

const sidebarItems = [
  {
    title: "Dashboard",
    href: "/admin_dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Bookings",
    href: "/admin_dashboard/bookings",
    icon: Calendar,
  },
  {
    title: "Users",
    href: "/admin_dashboard/users",
    icon: Users,
  },
  {
    title: "Hotels",
    href: "/admin_dashboard/hotels",
    icon: Building2,
  },
  {
    title: "Payments",
    href: "/admin_dashboard/payments",
    icon: CreditCard,
  },
  {
    title: "Settings",
    href: "/admin_dashboard/settings",
    icon: Settings,
  },
]

interface AdminSidebarProps {
  className?: string
}

export function AdminSidebar({ className }: AdminSidebarProps) {
  const pathname = usePathname()

  return (
    <div className={cn("flex h-full w-64 flex-col bg-card border-r", className)}>
      {/* Logo */}
      <div className="flex h-16 items-center justify-center border-b px-6">
        <div className="flex items-center gap-2">
          <Building2 className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold">Anavrin Admin</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-4">
        {sidebarItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 hover:bg-accent hover:text-accent-foreground",
                isActive 
                  ? "bg-primary text-primary-foreground shadow-sm" 
                  : "text-muted-foreground"
              )}
            >
              <Icon className="h-5 w-5" />
              {item.title}
            </Link>
          )
        })}
      </nav>

      {/* User Profile Section */}
      <div className="border-t p-4">
        <div className="flex items-center gap-3 rounded-lg p-2 hover:bg-accent transition-colors cursor-pointer">
          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-sm font-medium text-primary">AD</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">Admin User</p>
            <p className="text-xs text-muted-foreground truncate">admin@anavrin.com</p>
          </div>
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </div>
        
        <button className="flex items-center gap-3 w-full mt-2 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors">
          <LogOut className="h-4 w-4" />
          Sign Out
        </button>
      </div>
    </div>
  )
}
