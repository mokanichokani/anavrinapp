"use client";

import { useState } from 'react';
import { Heart, Star, MapPin, Users, Bed, Bath } from 'lucide-react';
import { cn } from "@/lib/utils";

interface Property {
  id: number;
  name: string;
  location: string;
  price: number;
  rating: number;
  reviews: number;
  bedrooms: number;
  bathrooms: number;
  guests: number;
  type: string;
  image: string;
  featured: boolean;
  amenities: string[];
}

interface AllPropertiesProps {
  sortedProperties: Property[];
}

const PropertyCard = ({ 
  property, 
  isHovered, 
  onHover, 
  onLeave 
}: { 
  property: Property, 
  isHovered: boolean, 
  onHover: () => void, 
  onLeave: () => void 
}) => {
  return (
    <div
      className={cn(
        "relative rounded-3xl overflow-hidden cursor-pointer transition-all duration-500 ease-out transform",
        "bg-cover bg-center bg-no-repeat h-96",
        isHovered ? "scale-105 shadow-2xl z-10" : "scale-100 shadow-lg hover:shadow-xl"
      )}
      style={{ backgroundImage: `url(${property.image})` }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40 transition-opacity duration-300" />
      
      {/* Featured badge */}
      {property.featured && (
        <div className="absolute top-6 left-6 z-10">
          <span className="bg-yellow-600 text-white px-4 py-2 rounded-full text-sm font-medium">
            Featured
          </span>
        </div>
      )}
      
      {/* Favorite button */}
      <button className="absolute top-6 right-6 z-10 p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors">
        <Heart className="w-4 h-4 text-white" />
      </button>

      {/* Content */}
      <div className="absolute inset-0 p-6 flex flex-col justify-end text-white z-10">
        <div className={cn(
          "transition-all duration-500 ease-out",
          isHovered ? "transform translate-y-0 opacity-100" : "transform translate-y-4"
        )}>
          <h3 className="text-2xl font-bold mb-2 leading-tight">
            {property.name}
          </h3>
          
          <div className="flex items-center gap-1 mb-3 text-sm">
            <MapPin className="w-4 h-4" />
            <span>{property.location}</span>
          </div>
          
          <div className={cn(
            "text-white/90 text-sm leading-relaxed mb-4 transition-all duration-500",
            isHovered ? "opacity-100 max-h-20" : "opacity-0 max-h-0 overflow-hidden"
          )}>
            <div className="flex items-center gap-3 mb-2">
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
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span>{property.rating}</span>
                <span>({property.reviews} reviews)</span>
              </div>
            </div>
          </div>
          
          {/* Price and Book Now button - only visible on hover */}
          <div className={cn(
            "transition-all duration-500 ease-out",
            isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}>
            <div className="flex items-center justify-between mb-4">
              <span className="text-2xl font-bold">₹{property.price.toLocaleString()}</span>
              <span className="text-sm">/night</span>
            </div>
            <button className="w-full bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-6 py-3 rounded-full font-medium transition-all duration-300 border border-white/30 hover:border-white/50 transform hover:scale-105">
              Book Now
            </button>
          </div>
        </div>
      </div>

      {/* Gradient overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
    </div>
  );
};

export const AllProperties = ({ sortedProperties }: AllPropertiesProps) => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-stone-900 serif-font">
          All Properties ({sortedProperties.length})
        </h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {sortedProperties.map(property => (
          <PropertyCard
            key={property.id}
            property={property}
            isHovered={hoveredCard === property.id}
            onHover={() => setHoveredCard(property.id)}
            onLeave={() => setHoveredCard(null)}
          />
        ))}
      </div>
    </section>
  );
};