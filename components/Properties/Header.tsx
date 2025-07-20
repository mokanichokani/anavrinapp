"use client";

import { Filter, ChevronDown, Search } from 'lucide-react';
import { useState } from 'react';

interface HeaderProps {
  selectedLocation: string;
  setSelectedLocation: (location: string) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
  showFilters: boolean;
  setShowFilters: (show: boolean) => void;
  showSortDropdown: boolean;
  setShowSortDropdown: (show: boolean) => void;
  locations: string[];
}

export const Header = ({
  selectedLocation,
  setSelectedLocation,
  sortBy,
  setSortBy,
  showFilters,
  setShowFilters,
  showSortDropdown,
  setShowSortDropdown,
  locations
}: HeaderProps) => {
  return (
    <header className="bg-white mt-16 pt-4  shadow-sm border-b border-stone-200">
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
            
            <div className="flex gap-4">
              {/* Sort By Button */}
              <div className="relative">
                <button
                  onClick={() => setShowSortDropdown(!showSortDropdown)}
                  className="flex items-center gap-2 px-4 py-3 bg-white border border-stone-300 text-stone-700 rounded-lg hover:bg-stone-50 transition-colors"
                >
                  <span>Sort By</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
                
                {/* Sort Dropdown */}
                {showSortDropdown && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg border border-stone-200 z-10">
                    <div className="py-1">
                      <button
                        onClick={() => {
                          setSortBy('default');
                          setShowSortDropdown(false);
                        }}
                        className={`block w-full text-left px-4 py-2 text-sm ${sortBy === 'default' ? 'bg-stone-100 text-stone-900' : 'text-stone-700 hover:bg-stone-50'}`}
                      >
                        Default Order
                      </button>
                      <button
                        onClick={() => {
                          setSortBy('price-low');
                          setShowSortDropdown(false);
                        }}
                        className={`block w-full text-left px-4 py-2 text-sm ${sortBy === 'price-low' ? 'bg-stone-100 text-stone-900' : 'text-stone-700 hover:bg-stone-50'}`}
                      >
                        Price (Low to High)
                      </button>
                      <button
                        onClick={() => {
                          setSortBy('featured');
                          setShowSortDropdown(false);
                        }}
                        className={`block w-full text-left px-4 py-2 text-sm ${sortBy === 'featured' ? 'bg-stone-100 text-stone-900' : 'text-stone-700 hover:bg-stone-50'}`}
                      >
                        Featured First
                      </button>
                      <button
                        onClick={() => {
                          setSortBy('date-old');
                          setShowSortDropdown(false);
                        }}
                        className={`block w-full text-left px-4 py-2 text-sm ${sortBy === 'date-old' ? 'bg-stone-100 text-stone-900' : 'text-stone-700 hover:bg-stone-50'}`}
                      >
                        Date Old to New
                      </button>
                      <button
                        onClick={() => {
                          setSortBy('date-new');
                          setShowSortDropdown(false);
                        }}
                        className={`block w-full text-left px-4 py-2 text-sm ${sortBy === 'date-new' ? 'bg-stone-100 text-stone-900' : 'text-stone-700 hover:bg-stone-50'}`}
                      >
                        Date New to Old
                      </button>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Filters Button */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
              >
                <Filter className="w-4 h-4" />
                Filters
              </button>
            </div>
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
  );
};