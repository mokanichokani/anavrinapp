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
  Calendar,
  Users,
  MapPin
} from "lucide-react"

interface Booking {
  id: string
  guestName: string
  email: string
  hotel: string
  location: string
  checkIn: string
  checkOut: string
  guests: number
  rooms: number
  status: "confirmed" | "pending" | "cancelled" | "completed" | "no-show"
  amount: string
  paymentStatus: "paid" | "pending" | "failed" | "refunded"
  bookedDate: string
}

const mockBookings: Booking[] = [
  {
    id: "BK001",
    guestName: "John Smith",
    email: "john.smith@email.com",
    hotel: "Ocean View Resort",
    location: "Miami, FL",
    checkIn: "2025-07-25",
    checkOut: "2025-07-28",
    guests: 2,
    rooms: 1,
    status: "confirmed",
    amount: "$1,250",
    paymentStatus: "paid",
    bookedDate: "2025-07-20"
  },
  {
    id: "BK002",
    guestName: "Sarah Johnson",
    email: "sarah.j@email.com",
    hotel: "Villa Sunset",
    location: "Santorini, Greece",
    checkIn: "2025-07-26",
    checkOut: "2025-07-30",
    guests: 4,
    rooms: 2,
    status: "pending",
    amount: "$2,100",
    paymentStatus: "pending",
    bookedDate: "2025-07-21"
  },
  {
    id: "BK003",
    guestName: "Michael Brown",
    email: "m.brown@email.com",
    hotel: "Mountain Lodge",
    location: "Aspen, CO",
    checkIn: "2025-07-22",
    checkOut: "2025-07-25",
    guests: 2,
    rooms: 1,
    status: "completed",
    amount: "$950",
    paymentStatus: "paid",
    bookedDate: "2025-07-18"
  },
  {
    id: "BK004",
    guestName: "Emily Davis",
    email: "emily.davis@email.com",
    hotel: "Beach Paradise",
    location: "Bali, Indonesia",
    checkIn: "2025-07-28",
    checkOut: "2025-08-02",
    guests: 3,
    rooms: 2,
    status: "confirmed",
    amount: "$1,800",
    paymentStatus: "paid",
    bookedDate: "2025-07-19"
  },
  {
    id: "BK005",
    guestName: "David Wilson",
    email: "d.wilson@email.com",
    hotel: "City Center Hotel",
    location: "New York, NY",
    checkIn: "2025-07-24",
    checkOut: "2025-07-26",
    guests: 1,
    rooms: 1,
    status: "cancelled",
    amount: "$450",
    paymentStatus: "refunded",
    bookedDate: "2025-07-22"
  },
  {
    id: "BK006",
    guestName: "Lisa Anderson",
    email: "lisa.a@email.com",
    hotel: "Desert Oasis",
    location: "Dubai, UAE",
    checkIn: "2025-07-30",
    checkOut: "2025-08-05",
    guests: 2,
    rooms: 1,
    status: "confirmed",
    amount: "$2,250",
    paymentStatus: "paid",
    bookedDate: "2025-07-23"
  }
]

function getStatusColor(status: Booking["status"]) {
  switch (status) {
    case "confirmed":
      return "default"
    case "pending":
      return "secondary"
    case "cancelled":
      return "destructive"
    case "completed":
      return "outline"
    case "no-show":
      return "destructive"
    default:
      return "secondary"
  }
}

function getPaymentStatusColor(status: Booking["paymentStatus"]) {
  switch (status) {
    case "paid":
      return "default"
    case "pending":
      return "secondary"
    case "failed":
      return "destructive"
    case "refunded":
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

export default function BookingsPage() {
  const [searchTerm, setSearchTerm] = React.useState("")
  const [statusFilter, setStatusFilter] = React.useState("all")

  const filteredBookings = mockBookings.filter(booking => {
    const matchesSearch = booking.guestName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.hotel.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || booking.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Bookings Management</h1>
            <p className="text-muted-foreground">
              Manage all hotel bookings and reservations
            </p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Booking
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Bookings</p>
                  <p className="text-2xl font-bold">2,847</p>
                </div>
                <Calendar className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Confirmed</p>
                  <p className="text-2xl font-bold text-green-600">2,156</p>
                </div>
                <div className="h-8 w-8 rounded-full bg-green-100 dark:bg-green-950/20 flex items-center justify-center">
                  <span className="text-green-600 text-lg">✓</span>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Pending</p>
                  <p className="text-2xl font-bold text-orange-600">145</p>
                </div>
                <div className="h-8 w-8 rounded-full bg-orange-100 dark:bg-orange-950/20 flex items-center justify-center">
                  <span className="text-orange-600 text-lg">⏳</span>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Revenue</p>
                  <p className="text-2xl font-bold">$284,750</p>
                </div>
                <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-950/20 flex items-center justify-center">
                  <span className="text-blue-600 text-lg">$</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card>
          <CardHeader>
            <CardTitle>All Bookings</CardTitle>
            <CardDescription>
              View and manage all hotel bookings
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search bookings by guest name, hotel, or booking ID..."
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
                  <TableHead>Booking ID</TableHead>
                  <TableHead>Guest</TableHead>
                  <TableHead>Hotel & Location</TableHead>
                  <TableHead>Dates</TableHead>
                  <TableHead>Details</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Payment</TableHead>
                  <TableHead className="w-[100px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBookings.map((booking) => (
                  <TableRow key={booking.id} className="hover:bg-muted/50">
                    <TableCell className="font-medium">{booking.id}</TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{booking.guestName}</div>
                        <div className="text-sm text-muted-foreground">{booking.email}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{booking.hotel}</div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <MapPin className="h-3 w-3 mr-1" />
                          {booking.location}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>{formatDate(booking.checkIn)}</div>
                        <div className="text-muted-foreground">to {formatDate(booking.checkOut)}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          {booking.guests} guests
                        </div>
                        <div className="text-muted-foreground">{booking.rooms} room(s)</div>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{booking.amount}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusColor(booking.status)} className="capitalize">
                        {booking.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getPaymentStatusColor(booking.paymentStatus)} className="capitalize">
                        {booking.paymentStatus}
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

            {filteredBookings.length === 0 && (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No bookings found matching your criteria.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
