'use client'

import React, { useState } from 'react'
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Eye, 
  Edit2, 
  Save, 
  LogOut, 
  Bell, 
  BedDouble, 
  Home, 
  Settings,
  Clock,
  Star
} from 'lucide-react'

export default function UserProfile() {
  const [isEditing, setIsEditing] = useState(false)
  const [preferences, setPreferences] = useState({
    roomType: 'Deluxe',
    bedPreference: 'King Size',
    notifications: {
      email: true,
      sms: false,
      push: true
    }
  })

  const [userInfo, setUserInfo] = useState({
    name: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    phone: '+1 (555) 123-4567',
    profileImage: '/villa1.jpg'
  })

  const upcomingBookings = [
    {
      id: 1,
      hotelName: 'Anavrin Villa Resort',
      location: 'Santorini, Greece',
      checkIn: '2025-08-15',
      checkOut: '2025-08-22',
      roomType: 'Ocean View Suite',
      image: '/villa2.jpg'
    },
    {
      id: 2,
      hotelName: 'Mountain Retreat Lodge',
      location: 'Aspen, Colorado',
      checkIn: '2025-09-10',
      checkOut: '2025-09-15',
      roomType: 'Premium Cabin',
      image: '/villa3.jpg'
    }
  ]

  const bookingHistory = [
    {
      id: 1,
      hotelName: 'Coastal Paradise Resort',
      location: 'Maldives',
      dates: 'Jul 1-8, 2025',
      rating: 5,
      image: '/villa4.jpg'
    },
    {
      id: 2,
      hotelName: 'Urban Luxury Hotel',
      location: 'Tokyo, Japan',
      dates: 'Jun 15-20, 2025',
      rating: 4,
      image: '/villa5.jpg'
    },
    {
      id: 3,
      hotelName: 'Desert Oasis Spa',
      location: 'Dubai, UAE',
      dates: 'May 3-10, 2025',
      rating: 5,
      image: '/villa1.jpg'
    }
  ]

  const handleSavePreferences = () => {
    setIsEditing(false)
    // Here you would typically save to a backend
    console.log('Preferences saved:', preferences)
  }

  return (
    <div className="min-h-screen mt-16 bg-gradient-to-br from-background via-muted/20 to-accent/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">My Profile</h1>
          <p className="text-muted-foreground">Manage your account and booking preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Section */}
          <div className="lg:col-span-1">
            <div className="bg-card rounded-2xl shadow-lg border border-border p-6 mb-6">
              <div className="text-center">
                <div className="relative inline-block mb-4">
                  <img
                    src={userInfo.profileImage}
                    alt="Profile"
                    className="w-24 h-24 rounded-full object-cover border-4 border-primary/20"
                  />
                  <button className="absolute bottom-0 right-0 bg-primary text-primary-foreground p-2 rounded-full shadow-md hover:bg-primary/90 transition-colors">
                    <Edit2 size={14} />
                  </button>
                </div>
                <h2 className="text-xl font-bold text-card-foreground mb-1">{userInfo.name}</h2>
                <p className="text-muted-foreground mb-4">Premium Member</p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                  <Mail size={18} className="text-primary" />
                  <span className="text-sm text-card-foreground">{userInfo.email}</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                  <Phone size={18} className="text-primary" />
                  <span className="text-sm text-card-foreground">{userInfo.phone}</span>
                </div>
              </div>

              <button className="w-full mt-6 bg-destructive text-destructive-foreground py-3 px-4 rounded-lg font-medium hover:bg-destructive/90 transition-colors flex items-center justify-center gap-2">
                <LogOut size={18} />
                Logout
              </button>
            </div>

            {/* Preferences Section */}
            <div className="bg-card rounded-2xl shadow-lg border border-border p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-card-foreground flex items-center gap-2">
                  <Settings size={20} />
                  Preferences
                </h3>
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="text-primary hover:text-primary/80 transition-colors"
                  >
                    <Edit2 size={18} />
                  </button>
                ) : (
                  <button
                    onClick={handleSavePreferences}
                    className="bg-primary text-primary-foreground px-3 py-1 rounded-md text-sm hover:bg-primary/90 transition-colors flex items-center gap-1"
                  >
                    <Save size={14} />
                    Save
                  </button>
                )}
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-card-foreground mb-2 flex items-center gap-2">
                    <Home size={16} />
                    Room Type
                  </label>
                  {isEditing ? (
                    <select
                      value={preferences.roomType}
                      onChange={(e) => setPreferences({...preferences, roomType: e.target.value})}
                      className="w-full p-2 border border-border rounded-lg bg-background text-foreground"
                    >
                      <option value="Standard">Standard</option>
                      <option value="Deluxe">Deluxe</option>
                      <option value="Suite">Suite</option>
                      <option value="Premium">Premium</option>
                    </select>
                  ) : (
                    <p className="text-muted-foreground">{preferences.roomType}</p>
                  )}
                </div>

                <div>
                  <label className="text-sm font-medium text-card-foreground mb-2 flex items-center gap-2">
                    <BedDouble size={16} />
                    Bed Preference
                  </label>
                  {isEditing ? (
                    <select
                      value={preferences.bedPreference}
                      onChange={(e) => setPreferences({...preferences, bedPreference: e.target.value})}
                      className="w-full p-2 border border-border rounded-lg bg-background text-foreground"
                    >
                      <option value="Single">Single</option>
                      <option value="Double">Double</option>
                      <option value="Queen Size">Queen Size</option>
                      <option value="King Size">King Size</option>
                    </select>
                  ) : (
                    <p className="text-muted-foreground">{preferences.bedPreference}</p>
                  )}
                </div>

                <div>
                  <label className="text-sm font-medium text-card-foreground mb-2 flex items-center gap-2">
                    <Bell size={16} />
                    Notifications
                  </label>
                  <div className="space-y-2">
                    {Object.entries(preferences.notifications).map(([key, value]) => (
                      <label key={key} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={value}
                          disabled={!isEditing}
                          onChange={(e) => setPreferences({
                            ...preferences,
                            notifications: {
                              ...preferences.notifications,
                              [key]: e.target.checked
                            }
                          })}
                          className="rounded border-border text-primary focus:ring-primary"
                        />
                        <span className="text-sm text-muted-foreground capitalize">{key}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Upcoming Bookings */}
            <div className="bg-card rounded-2xl shadow-lg border border-border p-6">
              <h3 className="text-xl font-semibold text-card-foreground mb-6 flex items-center gap-2">
                <Calendar size={22} />
                Upcoming Bookings
              </h3>
              
              <div className="space-y-4">
                {upcomingBookings.map((booking) => (
                  <div key={booking.id} className="bg-accent/30 rounded-xl p-4 border border-border/50 hover:shadow-md transition-shadow">
                    <div className="flex flex-col sm:flex-row gap-4">
                      <img
                        src={booking.image}
                        alt={booking.hotelName}
                        className="w-full sm:w-24 h-20 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold text-card-foreground mb-1">{booking.hotelName}</h4>
                        <div className="flex items-center gap-1 text-muted-foreground text-sm mb-2">
                          <MapPin size={14} />
                          {booking.location}
                        </div>
                        <div className="flex items-center gap-1 text-muted-foreground text-sm mb-2">
                          <Calendar size={14} />
                          {booking.checkIn} to {booking.checkOut}
                        </div>
                        <p className="text-sm text-muted-foreground">{booking.roomType}</p>
                      </div>
                      <button className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2 h-fit">
                        <Eye size={16} />
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Booking History */}
            <div className="bg-card rounded-2xl shadow-lg border border-border p-6">
              <h3 className="text-xl font-semibold text-card-foreground mb-6 flex items-center gap-2">
                <Clock size={22} />
                Booking History
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {bookingHistory.map((booking) => (
                  <div key={booking.id} className="bg-muted/30 rounded-xl p-4 border border-border/50 hover:shadow-md transition-shadow">
                    <img
                      src={booking.image}
                      alt={booking.hotelName}
                      className="w-full h-32 object-cover rounded-lg mb-3"
                    />
                    <h4 className="font-semibold text-card-foreground mb-1">{booking.hotelName}</h4>
                    <div className="flex items-center gap-1 text-muted-foreground text-sm mb-2">
                      <MapPin size={14} />
                      {booking.location}
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground text-sm mb-2">
                      <Calendar size={14} />
                      {booking.dates}
                    </div>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={14}
                          className={i < booking.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}
                        />
                      ))}
                      <span className="text-sm text-muted-foreground ml-1">({booking.rating}/5)</span>
                    </div>
                  </div>
                ))}
              </div>
              
              <button className="w-full mt-6 border border-border text-muted-foreground py-3 px-4 rounded-lg hover:bg-muted/50 transition-colors">
                View All History
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}