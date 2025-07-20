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
  Building2,
  MapPin,
  Star,
  Bed,
  Wifi,
  Car,
  Waves,
  Coffee,
  Dumbbell,
  MoreHorizontal
} from "lucide-react"

interface Hotel {
  id: string
  name: string
  location: string
  address: string
  rating: number
  reviews: number
  rooms: number
  availableRooms: number
  price: string
  status: "active" | "inactive" | "maintenance"
  type: "hotel" | "villa" | "resort" | "apartment"
  amenities: string[]
  image: string
  bookings: number
  revenue: string
  occupancyRate: number
}

const mockHotels: Hotel[] = [
  {
    id: "HTL001",
    name: "Ocean View Resort",
    location: "Miami, FL",
    address: "123 Ocean Drive, Miami Beach, FL 33139",
    rating: 4.8,
    reviews: 1247,
    rooms: 85,
    availableRooms: 12,
    price: "$450",
    status: "active",
    type: "resort",
    amenities: ["wifi", "pool", "parking", "gym", "restaurant"],
    image: "/villa1.jpg",
    bookings: 45,
    revenue: "$12,500",
    occupancyRate: 86
  },
  {
    id: "HTL002",
    name: "Villa Sunset",
    location: "Santorini, Greece",
    address: "Oia Village, Santorini 84702, Greece",
    rating: 4.9,
    reviews: 892,
    rooms: 12,
    availableRooms: 3,
    price: "$850",
    status: "active",
    type: "villa",
    amenities: ["wifi", "pool", "restaurant"],
    image: "/villa2.jpg",
    bookings: 38,
    revenue: "$15,200",
    occupancyRate: 75
  },
  {
    id: "HTL003",
    name: "Mountain Lodge",
    location: "Aspen, CO",
    address: "456 Mountain Road, Aspen, CO 81611",
    rating: 4.7,
    reviews: 634,
    rooms: 42,
    availableRooms: 8,
    price: "$320",
    status: "active",
    type: "hotel",
    amenities: ["wifi", "parking", "gym", "restaurant"],
    image: "/villa3.jpg",
    bookings: 32,
    revenue: "$8,900",
    occupancyRate: 81
  },
  {
    id: "HTL004",
    name: "Beach Paradise",
    location: "Bali, Indonesia",
    address: "Jl. Pantai Seminyak, Seminyak, Bali 80361",
    rating: 4.6,
    reviews: 1089,
    rooms: 68,
    availableRooms: 15,
    price: "$280",
    status: "active",
    type: "resort",
    amenities: ["wifi", "pool", "restaurant", "gym"],
    image: "/villa4.jpg",
    bookings: 28,
    revenue: "$11,300",
    occupancyRate: 78
  },
  {
    id: "HTL005",
    name: "City Center Hotel",
    location: "New York, NY",
    address: "789 Broadway, New York, NY 10003",
    rating: 4.4,
    reviews: 756,
    rooms: 120,
    availableRooms: 25,
    price: "$380",
    status: "maintenance",
    type: "hotel",
    amenities: ["wifi", "parking", "gym", "restaurant"],
    image: "/villa5.jpg",
    bookings: 18,
    revenue: "$6,200",
    occupancyRate: 79
  },
  {
    id: "HTL006",
    name: "Desert Oasis",
    location: "Dubai, UAE",
    address: "Palm Jumeirah, Dubai, UAE",
    rating: 4.9,
    reviews: 1523,
    rooms: 95,
    availableRooms: 7,
    price: "$650",
    status: "active",
    type: "resort",
    amenities: ["wifi", "pool", "parking", "gym", "restaurant"],
    image: "/villa1.jpg",
    bookings: 52,
    revenue: "$18,400",
    occupancyRate: 93
  }
]

const amenityIcons = {
  wifi: Wifi,
  pool: Waves,
  parking: Car,
  gym: Dumbbell,
  restaurant: Coffee
}

function getStatusColor(status: Hotel["status"]) {
  switch (status) {
    case "active":
      return "default"
    case "inactive":
      return "secondary"
    case "maintenance":
      return "destructive"
    default:
      return "secondary"
  }
}

function getTypeColor(type: Hotel["type"]) {
  switch (type) {
    case "resort":
      return "default"
    case "villa":
      return "secondary"
    case "hotel":
      return "outline"
    case "apartment":
      return "destructive"
    default:
      return "secondary"
  }
}

export default function HotelsPage() {
  const [searchTerm, setSearchTerm] = React.useState("")
  const [statusFilter, setStatusFilter] = React.useState("all")

  const filteredHotels = mockHotels.filter(hotel => {
    const matchesSearch = hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         hotel.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         hotel.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || hotel.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const totalProperties = mockHotels.length
  const activeProperties = mockHotels.filter(h => h.status === "active").length
  const totalRooms = mockHotels.reduce((sum, h) => sum + h.rooms, 0)
  const avgOccupancy = Math.round(mockHotels.reduce((sum, h) => sum + h.occupancyRate, 0) / mockHotels.length)

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Hotels Management</h1>
            <p className="text-muted-foreground">
              Manage properties, rooms, and hotel information
            </p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Property
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Properties</p>
                  <p className="text-2xl font-bold">{totalProperties}</p>
                </div>
                <Building2 className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Active Properties</p>
                  <p className="text-2xl font-bold text-green-600">{activeProperties}</p>
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
                  <p className="text-sm font-medium text-muted-foreground">Total Rooms</p>
                  <p className="text-2xl font-bold">{totalRooms}</p>
                </div>
                <Bed className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Avg. Occupancy</p>
                  <p className="text-2xl font-bold text-blue-600">{avgOccupancy}%</p>
                </div>
                <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-950/20 flex items-center justify-center">
                  <span className="text-blue-600 text-lg">%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Hotels Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Properties</CardTitle>
            <CardDescription>
              View and manage all hotel properties
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search properties by name, location, or hotel ID..."
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
                  <TableHead>Property ID</TableHead>
                  <TableHead>Property Info</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Rooms</TableHead>
                  <TableHead>Performance</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-[100px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredHotels.map((hotel) => (
                  <TableRow key={hotel.id} className="hover:bg-muted/50">
                    <TableCell className="font-medium">{hotel.id}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-12 rounded-lg overflow-hidden bg-muted">
                          <div className="h-full w-full bg-gradient-to-br from-blue-500 to-purple-600"></div>
                        </div>
                        <div>
                          <div className="font-medium">{hotel.name}</div>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            {hotel.amenities.slice(0, 3).map((amenity, idx) => {
                              const Icon = amenityIcons[amenity as keyof typeof amenityIcons]
                              return Icon ? <Icon key={idx} className="h-3 w-3" /> : null
                            })}
                            {hotel.amenities.length > 3 && (
                              <span className="text-xs">+{hotel.amenities.length - 3}</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="flex items-center gap-1 font-medium">
                          <MapPin className="h-3 w-3" />
                          {hotel.location}
                        </div>
                        <div className="text-sm text-muted-foreground truncate max-w-[200px]">
                          {hotel.address}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{hotel.rating}</span>
                        <span className="text-sm text-muted-foreground">
                          ({hotel.reviews})
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div className="font-medium">{hotel.rooms} total</div>
                        <div className="text-muted-foreground">
                          {hotel.availableRooms} available
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div className="font-medium">{hotel.bookings} bookings</div>
                        <div className="text-muted-foreground">{hotel.revenue} revenue</div>
                        <div className="text-xs text-blue-600">{hotel.occupancyRate}% occupied</div>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{hotel.price}/night</TableCell>
                    <TableCell>
                      <Badge variant={getTypeColor(hotel.type)} className="capitalize">
                        {hotel.type}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusColor(hotel.status)} className="capitalize">
                        {hotel.status}
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
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {filteredHotels.length === 0 && (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No properties found matching your criteria.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
