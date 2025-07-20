"use client"

import React, { useState } from "react"
import { AdminSidebar } from "./AdminSidebar"
import { AdminTopBar } from "./AdminTopBar"
import { cn } from "@/lib/utils"

interface AdminLayoutProps {
  children: React.ReactNode
  className?: string
}

export function AdminLayout({ children, className }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="min-h-screen bg-background">
      <div className="flex h-screen">
        {/* Sidebar */}
        <div className={cn(
          "transition-all duration-300 ease-in-out",
          sidebarOpen ? "w-64" : "w-0",
          "lg:w-64 lg:block",
          sidebarOpen ? "block" : "hidden"
        )}>
          <AdminSidebar />
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Top Bar */}
          <AdminTopBar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
          
          {/* Content Area */}
          <main className={cn("flex-1 overflow-y-auto p-6", className)}>
            {children}
          </main>
        </div>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  )
}
