"use client"

import React from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Search,
  Bell,
  ChevronDown,
  Menu,
  Settings,
  User,
  LogOut,
  Moon,
  Sun
} from "lucide-react"

interface AdminTopBarProps {
  onMenuClick?: () => void
  className?: string
}

export function AdminTopBar({ onMenuClick, className }: AdminTopBarProps) {
  const [showNotifications, setShowNotifications] = React.useState(false)
  const [showProfile, setShowProfile] = React.useState(false)

  return (
    <header className="flex h-16 items-center justify-between border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-6">
      {/* Left Section */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={onMenuClick}
          className="lg:hidden"
        >
          <Menu className="h-5 w-5" />
        </Button>
        
        <div className="relative w-72">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search bookings, users, hotels..."
            className="pl-10"
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <div className="relative">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative"
          >
            <Bell className="h-5 w-5" />
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs"
            >
              3
            </Badge>
          </Button>
          
          {showNotifications && (
            <div className="absolute right-0 top-12 w-80 bg-popover border rounded-lg shadow-lg p-4 z-50">
              <h3 className="font-semibold mb-3">Notifications</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-2 hover:bg-accent rounded-md">
                  <div className="h-2 w-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="text-sm font-medium">New booking received</p>
                    <p className="text-xs text-muted-foreground">John Doe booked Villa Sunset for 3 nights</p>
                    <p className="text-xs text-muted-foreground mt-1">2 minutes ago</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-2 hover:bg-accent rounded-md">
                  <div className="h-2 w-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="text-sm font-medium">Payment confirmed</p>
                    <p className="text-xs text-muted-foreground">$1,250 payment processed successfully</p>
                    <p className="text-xs text-muted-foreground mt-1">1 hour ago</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-2 hover:bg-accent rounded-md">
                  <div className="h-2 w-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="text-sm font-medium">Review submitted</p>
                    <p className="text-xs text-muted-foreground">New 5-star review for Ocean View Resort</p>
                    <p className="text-xs text-muted-foreground mt-1">3 hours ago</p>
                  </div>
                </div>
              </div>
              <Button variant="ghost" size="sm" className="w-full mt-3">
                View all notifications
              </Button>
            </div>
          )}
        </div>

        {/* Theme Toggle */}
        <Button variant="ghost" size="icon">
          <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </Button>

        {/* Profile Dropdown */}
        <div className="relative">
          <Button
            variant="ghost"
            onClick={() => setShowProfile(!showProfile)}
            className="flex items-center gap-2 px-3"
          >
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-sm font-medium text-primary">AD</span>
            </div>
            <div className="hidden md:block text-left">
              <p className="text-sm font-medium">Admin User</p>
              <p className="text-xs text-muted-foreground">Administrator</p>
            </div>
            <ChevronDown className="h-4 w-4" />
          </Button>
          
          {showProfile && (
            <div className="absolute right-0 top-12 w-56 bg-popover border rounded-lg shadow-lg p-2 z-50">
              <div className="px-3 py-2 border-b">
                <p className="text-sm font-medium">Admin User</p>
                <p className="text-xs text-muted-foreground">admin@anavrin.com</p>
              </div>
              
              <div className="py-2">
                <Button variant="ghost" size="sm" className="w-full justify-start">
                  <User className="h-4 w-4 mr-2" />
                  Profile
                </Button>
                <Button variant="ghost" size="sm" className="w-full justify-start">
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Button>
              </div>
              
              <div className="border-t pt-2">
                <Button variant="ghost" size="sm" className="w-full justify-start text-destructive hover:text-destructive">
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
