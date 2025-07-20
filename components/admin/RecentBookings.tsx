"use client"

import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Eye, MoreHorizontal } from "lucide-react"

interface Booking {
  id: string
  guestName: string
  hotel: string
  checkIn: string
  checkOut: string
  status: "confirmed" | "pending" | "cancelled" | "completed"
  amount: string
  guests: number
}

const mockBookings: Booking[] = [
  {
    id: "BK001",
    guestName: "John Smith",
    hotel: "Ocean View Resort",
    checkIn: "2025-07-25",
    checkOut: "2025-07-28",
    status: "confirmed",
    amount: "$1,250",
    guests: 2
  },
  {
    id: "BK002",
    guestName: "Sarah Johnson",
    hotel: "Villa Sunset",
    checkIn: "2025-07-26",
    checkOut: "2025-07-30",
    status: "pending",
    amount: "$2,100",
    guests: 4
  },
  {
    id: "BK003",
    guestName: "Michael Brown",
    hotel: "Mountain Lodge",
    checkIn: "2025-07-22",
    checkOut: "2025-07-25",
    status: "completed",
    amount: "$950",
    guests: 2
  },
  {
    id: "BK004",
    guestName: "Emily Davis",
    hotel: "Beach Paradise",
    checkIn: "2025-07-28",
    checkOut: "2025-08-02",
    status: "confirmed",
    amount: "$1,800",
    guests: 3
  },
  {
    id: "BK005",
    guestName: "David Wilson",
    hotel: "City Center Hotel",
    checkIn: "2025-07-24",
    checkOut: "2025-07-26",
    status: "cancelled",
    amount: "$450",
    guests: 1
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

export function RecentBookings() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Recent Bookings</CardTitle>
        <Button variant="outline" size="sm">
          View All
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Booking ID</TableHead>
              <TableHead>Guest</TableHead>
              <TableHead>Hotel</TableHead>
              <TableHead>Dates</TableHead>
              <TableHead>Guests</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockBookings.map((booking) => (
              <TableRow key={booking.id} className="hover:bg-muted/50">
                <TableCell className="font-medium">{booking.id}</TableCell>
                <TableCell>
                  <div>
                    <div className="font-medium">{booking.guestName}</div>
                  </div>
                </TableCell>
                <TableCell>{booking.hotel}</TableCell>
                <TableCell>
                  <div className="text-sm">
                    <div>{formatDate(booking.checkIn)}</div>
                    <div className="text-muted-foreground">to {formatDate(booking.checkOut)}</div>
                  </div>
                </TableCell>
                <TableCell>{booking.guests}</TableCell>
                <TableCell className="font-medium">{booking.amount}</TableCell>
                <TableCell>
                  <Badge variant={getStatusColor(booking.status)} className="capitalize">
                    {booking.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
