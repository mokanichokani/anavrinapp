"use client"

import React from "react"
import { AdminLayout } from "@/components/admin/AdminLayout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { 
  Search, 
  Filter, 
  Download, 
  Eye, 
  Edit, 
  Trash2, 
  Plus,
  Users,
  Mail,
  Phone,
  Calendar,
  Shield,
  UserCheck
} from "lucide-react"

interface User {
  id: string
  name: string
  email: string
  phone: string
  joinDate: string
  lastLogin: string
  status: "active" | "inactive" | "suspended"
  role: "guest" | "premium" | "admin"
  bookings: number
  totalSpent: string
  location: string
  verified: boolean
}

const mockUsers: User[] = [
  {
    id: "USR001",
    name: "John Smith",
    email: "john.smith@email.com",
    phone: "+1 (555) 123-4567",
    joinDate: "2024-03-15",
    lastLogin: "2025-07-21",
    status: "active",
    role: "premium",
    bookings: 12,
    totalSpent: "$4,250",
    location: "New York, NY",
    verified: true
  },
  {
    id: "USR002",
    name: "Sarah Johnson",
    email: "sarah.j@email.com",
    phone: "+1 (555) 987-6543",
    joinDate: "2024-01-08",
    lastLogin: "2025-07-20",
    status: "active",
    role: "guest",
    bookings: 3,
    totalSpent: "$1,150",
    location: "Los Angeles, CA",
    verified: true
  },
  {
    id: "USR003",
    name: "Michael Brown",
    email: "m.brown@email.com",
    phone: "+1 (555) 456-7890",
    joinDate: "2023-11-22",
    lastLogin: "2025-07-19",
    status: "active",
    role: "premium",
    bookings: 24,
    totalSpent: "$8,950",
    location: "Chicago, IL",
    verified: true
  },
  {
    id: "USR004",
    name: "Emily Davis",
    email: "emily.davis@email.com",
    phone: "+1 (555) 234-5678",
    joinDate: "2024-05-10",
    lastLogin: "2025-07-15",
    status: "inactive",
    role: "guest",
    bookings: 5,
    totalSpent: "$2,100",
    location: "Miami, FL",
    verified: false
  },
  {
    id: "USR005",
    name: "David Wilson",
    email: "d.wilson@email.com",
    phone: "+1 (555) 345-6789",
    joinDate: "2024-07-02",
    lastLogin: "2025-07-18",
    status: "suspended",
    role: "guest",
    bookings: 1,
    totalSpent: "$450",
    location: "Seattle, WA",
    verified: true
  },
  {
    id: "USR006",
    name: "Lisa Anderson",
    email: "lisa.a@email.com",
    phone: "+1 (555) 567-8901",
    joinDate: "2023-09-14",
    lastLogin: "2025-07-21",
    status: "active",
    role: "admin",
    bookings: 0,
    totalSpent: "$0",
    location: "Austin, TX",
    verified: true
  }
]

function getStatusColor(status: User["status"]) {
  switch (status) {
    case "active":
      return "default"
    case "inactive":
      return "secondary"
    case "suspended":
      return "destructive"
    default:
      return "secondary"
  }
}

function getRoleColor(role: User["role"]) {
  switch (role) {
    case "admin":
      return "destructive"
    case "premium":
      return "default"
    case "guest":
      return "outline"
    default:
      return "secondary"
  }
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  })
}

export default function UsersPage() {
  const [searchTerm, setSearchTerm] = React.useState("")
  const [statusFilter, setStatusFilter] = React.useState("all")

  const filteredUsers = mockUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || user.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const totalUsers = mockUsers.length
  const activeUsers = mockUsers.filter(u => u.status === "active").length
  const premiumUsers = mockUsers.filter(u => u.role === "premium").length
  const verifiedUsers = mockUsers.filter(u => u.verified).length

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Users Management</h1>
            <p className="text-muted-foreground">
              Manage user accounts and customer information
            </p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add User
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Users</p>
                  <p className="text-2xl font-bold">{totalUsers.toLocaleString()}</p>
                </div>
                <Users className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Active Users</p>
                  <p className="text-2xl font-bold text-green-600">{activeUsers}</p>
                </div>
                <UserCheck className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Premium Users</p>
                  <p className="text-2xl font-bold text-purple-600">{premiumUsers}</p>
                </div>
                <Shield className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Verified</p>
                  <p className="text-2xl font-bold text-blue-600">{verifiedUsers}</p>
                </div>
                <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-950/20 flex items-center justify-center">
                  <span className="text-blue-600 text-lg">✓</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Users Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Users</CardTitle>
            <CardDescription>
              View and manage all registered users
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search users by name, email, or user ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
              </div>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User ID</TableHead>
                  <TableHead>User Info</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Joined</TableHead>
                  <TableHead>Last Login</TableHead>
                  <TableHead>Activity</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-[100px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id} className="hover:bg-muted/50">
                    <TableCell className="font-medium">{user.id}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-sm font-medium text-primary">
                            {user.name.split(" ").map(n => n[0]).join("")}
                          </span>
                        </div>
                        <div>
                          <div className="font-medium flex items-center gap-2">
                            {user.name}
                            {user.verified && (
                              <div className="h-4 w-4 rounded-full bg-blue-100 dark:bg-blue-950/20 flex items-center justify-center">
                                <span className="text-blue-600 text-xs">✓</span>
                              </div>
                            )}
                          </div>
                          <div className="text-sm text-muted-foreground">{user.location}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center text-sm">
                          <Mail className="h-3 w-3 mr-2 text-muted-foreground" />
                          {user.email}
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Phone className="h-3 w-3 mr-2" />
                          {user.phone}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center text-sm">
                        <Calendar className="h-3 w-3 mr-2 text-muted-foreground" />
                        {formatDate(user.joinDate)}
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">
                      {formatDate(user.lastLogin)}
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div className="font-medium">{user.bookings} bookings</div>
                        <div className="text-muted-foreground">{user.totalSpent} spent</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getRoleColor(user.role)} className="capitalize">
                        {user.role}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusColor(user.status)} className="capitalize">
                        {user.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {filteredUsers.length === 0 && (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No users found matching your criteria.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
