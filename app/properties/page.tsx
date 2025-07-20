
"use client";

import React, { useState } from 'react';
import { Header } from '@/components/Properties/Header';
import { Featured } from '@/components/Properties/Featured';
import { AllProperties } from '@/components/Properties/AllProperties';
import { Explore } from '@/components/Properties/Explore';
import { Reviews } from '@/components/Properties/Reviews';

const Properties = () => {
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [sortBy, setSortBy] = useState('default');
  const [showFilters, setShowFilters] = useState(false);
  const [showSortDropdown, setShowSortDropdown] = useState(false);

  // Sample data
  const properties = [
    {
      id: 1,
      name: "Waterfront By Anavrin Stays",
      location: "Karjat, Raigad, Maharashtra",
      price: 12500,
      rating: 4.8,
      reviews: 156,
      bedrooms: 3,
      bathrooms: 3,
      guests: 10,
      type: "Villa With Views",
      image: "/villa1.jpg",
      featured: true,
      amenities: ["Pool", "Garden", "WiFi", "Kitchen"]
    },
    {
      id: 2,
      name: "Hill View Resort",
      location: "Khopoli, Maharashtra",
      price: 8900,
      rating: 4.6,
      reviews: 89,
      bedrooms: 2,
      bathrooms: 2,
      guests: 6,
      type: "Mountain Resort",
      image: "/villa2.jpg",
      featured: true,
      amenities: ["Spa", "Restaurant", "WiFi"]
    },
    {
      id: 3,
      name: "Forest Retreat",
      location: "Karbala, Maharashtra",
      price: 15200,
      rating: 4.9,
      reviews: 203,
      bedrooms: 4,
      bathrooms: 3,
      guests: 12,
      type: "Luxury Villa",
      image: "/villa3.jpg",
      featured: false,
      amenities: ["Pool", "Garden", "Kitchen", "Parking"]
    },
    {
      id: 4,
      name: "Riverside Cottage",
      location: "Karjat, Raigad, Maharashtra",
      price: 6700,
      rating: 4.4,
      reviews: 67,
      bedrooms: 2,
      bathrooms: 1,
      guests: 4,
      type: "Cozy Cottage",
      image: "/villa4.jpg",
      featured: true,
      amenities: ["WiFi", "Kitchen", "Garden"]
    }
  ];

  const locations = ['all', 'Karjat', 'Khopoli', 'Karbala', 'Lonavala', 'Mahabaleshwar'];
  
  const exploreData = [
    { title: "Monsoon Getaways", image: "/villa5.jpg", count: "25 Properties" },
    { title: "Adventure Stays", image: "/villa1.jpg", count: "18 Properties" },
    { title: "Luxury Villas", image: "/villa2.jpg", count: "12 Properties" },
    { title: "Pet Friendly", image: "/villa3.jpg", count: "32 Properties" }
  ];

  const reviews = [
    {
      name: "Priya Sharma",
      rating: 5,
      comment: "Absolutely stunning property with amazing views. The staff was incredibly helpful.",
      property: "Waterfront By Anavrin Stays",
      date: "2 days ago"
    },
    {
      name: "Rahul Mehta",
      rating: 4,
      comment: "Great location and clean rooms. Perfect for a weekend getaway.",
      property: "Hill View Resort",
      date: "1 week ago"
    }
  ];
  const filteredProperties = properties.filter(property => {
    if (selectedLocation === 'all') return true;
    return property.location.includes(selectedLocation);
  });

  const sortedProperties = [...filteredProperties].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      default:
        return 0;
    }
  });

  const featuredProperties = properties.filter(property => property.featured);

  return (
    <div className="min-h-screen bg-stone-50" style={{ fontFamily: 'Helvetica, sans-serif' }}>
      <Header
        selectedLocation={selectedLocation}
        setSelectedLocation={setSelectedLocation}
        sortBy={sortBy}
        setSortBy={setSortBy}
        showFilters={showFilters}
        setShowFilters={setShowFilters}
        showSortDropdown={showSortDropdown}
        setShowSortDropdown={setShowSortDropdown}
        locations={locations}
      />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <Featured featuredProperties={featuredProperties} />
        <AllProperties sortedProperties={sortedProperties} />
        <Explore exploreData={exploreData} />
        <Reviews reviews={reviews} />
      </div>
    </div>
  );
};

export default Properties;