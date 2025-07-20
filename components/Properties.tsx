import React, { useState } from 'react';
import { Heart, Star, MapPin, Users, Bed, Bath, Filter, ChevronDown, Search } from 'lucide-react';

const PropertiesPage = () => {
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [sortBy, setSortBy] = useState('rating');
  const [showFilters, setShowFilters] = useState(false);

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
      image: "/api/placeholder/400/300",
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
      image: "/api/placeholder/400/300",
      featured: false,
      amenities: ["WiFi", "Kitchen", "Garden"]
    }
  ];

  const locations = ['all', 'Karjat', 'Khopoli', 'Karbala', 'Lonavala', 'Mahabaleshwar'];
  
  const exploreData = [
    { title: "Monsoon Getaways", image: "/api/placeholder/300/200", count: "25 Properties" },
    { title: "Adventure Stays", image: "/api/placeholder/300/200", count: "18 Properties" },
    { title: "Luxury Villas", image: "/api/placeholder/300/200", count: "12 Properties" },
    { title: "Pet Friendly", image: "/api/placeholder/300/200", count: "32 Properties" }
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
      {/* Custom Fonts */}
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Text:ital@0;1&family=Notable&display=swap');
        .serif-font { font-family: 'DM Serif Text', serif; }
        .notable-font { font-family: 'Notable', sans-serif; }
      `}</style>

      {/* Header */}
      <header className="bg-white shadow-sm border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-stone-900 serif-font">
                Discover Your Perfect Stay
              </h1>
              <p className="text-stone-600 mt-2">Find the best properties in Maharashtra's most beautiful locations</p>
            </div>
            
            {/* Search & Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400 w-4 h-4" />
                <input 
                  type="text" 
                  placeholder="Search properties..."
                  className="pl-10 pr-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-yellow-600 focus:border-yellow-600 w-full sm:w-64"
                />
              </div>
              
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
              >
                <Filter className="w-4 h-4" />
                Filters
              </button>
            </div>
          </div>

          {/* Filter Bar */}
          {showFilters && (
            <div className="mt-6 p-4 bg-stone-100 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">Location</label>
                  <select 
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="w-full p-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-yellow-600"
                  >
                    {locations.map(location => (
                      <option key={location} value={location}>
                        {location === 'all' ? 'All Locations' : location}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">Sort By</label>
                  <select 
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full p-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-yellow-600"
                  >
                    <option value="rating">Highest Rated</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">Price Range</label>
                  <select className="w-full p-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-yellow-600">
                    <option>All Prices</option>
                    <option>Under ₹10,000</option>
                    <option>₹10,000 - ₹20,000</option>
                    <option>Above ₹20,000</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Featured Properties Section */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-stone-900 serif-font">Featured Properties</h2>
            <button className="text-emerald-700 hover:text-emerald-800 font-medium">View All</button>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {featuredProperties.map(property => (
              <div key={property.id} className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow overflow-hidden">
                <div className="relative">
                  <img 
                    src={property.image} 
                    alt={property.name}
                    className="w-full h-64 object-cover"
                  />
                  <button className="absolute top-4 right-4 p-2 bg-white/80 rounded-full hover:bg-white transition-colors">
                    <Heart className="w-5 h-5 text-stone-600" />
                  </button>
                  <div className="absolute top-4 left-4 bg-yellow-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Featured
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-stone-900 mb-1">{property.name}</h3>
                      <p className="text-stone-600 flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {property.location}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 mb-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium text-stone-900">{property.rating}</span>
                        <span className="text-stone-500">({property.reviews})</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 mb-4 text-stone-600">
                    <div className="flex items-center gap-1">
                      <Bed className="w-4 h-4" />
                      <span>{property.bedrooms} beds</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Bath className="w-4 h-4" />
                      <span>{property.bathrooms} baths</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>{property.guests} guests</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-bold text-stone-900">₹{property.price.toLocaleString()}</span>
                      <span className="text-stone-600">/night</span>
                    </div>
                    <button className="bg-emerald-700 text-white px-6 py-2 rounded-lg hover:bg-emerald-800 transition-colors font-medium">
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* All Properties Section */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-stone-900 serif-font">
              All Properties ({sortedProperties.length})
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedProperties.map(property => (
              <div key={property.id} className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow overflow-hidden">
                <div className="relative">
                  <img 
                    src={property.image} 
                    alt={property.name}
                    className="w-full h-48 object-cover"
                  />
                  <button className="absolute top-3 right-3 p-2 bg-white/80 rounded-full hover:bg-white transition-colors">
                    <Heart className="w-4 h-4 text-stone-600" />
                  </button>
                  {property.featured && (
                    <div className="absolute top-3 left-3 bg-yellow-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                      Featured
                    </div>
                  )}
                </div>
                
                <div className="p-5">
                  <div className="mb-3">
                    <h3 className="text-lg font-bold text-stone-900 mb-1">{property.name}</h3>
                    <p className="text-stone-600 text-sm flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {property.location}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-3 mb-3 text-sm text-stone-600">
                    <div className="flex items-center gap-1">
                      <Bed className="w-3 h-3" />
                      <span>{property.bedrooms}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Bath className="w-3 h-3" />
                      <span>{property.bathrooms}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      <span>{property.guests}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium text-stone-900">{property.rating}</span>
                      <span className="text-stone-500 text-sm">({property.reviews})</span>
                    </div>
                    <div className="text-right">
                      <span className="text-lg font-bold text-stone-900">₹{property.price.toLocaleString()}</span>
                      <span className="text-stone-600 text-sm">/night</span>
                    </div>
                  </div>
                  
                  <button className="w-full bg-emerald-700 text-white py-2 rounded-lg hover:bg-emerald-800 transition-colors font-medium">
                    Book Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Explore Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-stone-900 serif-font mb-6">Explore More</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {exploreData.map((item, index) => (
              <div key={index} className="relative bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow cursor-pointer group">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="font-bold text-lg">{item.title}</h3>
                  <p className="text-sm opacity-90">{item.count}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Latest Reviews Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-stone-900 serif-font mb-6">Latest Reviews</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {reviews.map((review, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="font-bold text-stone-900">{review.name}</h4>
                    <p className="text-stone-600 text-sm">{review.property}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
                <p className="text-stone-700 mb-3">"{review.comment}"</p>
                <p className="text-stone-500 text-sm">{review.date}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default PropertiesPage;