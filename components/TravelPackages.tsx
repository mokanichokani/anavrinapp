"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { TextAnimate } from "@/components/magicui/text-animate";

const packages = [
  {
    id: 1,
    title: "All-Inclusive Packages",
    description: "These include everything from flights to accommodation, meals, and activities.",
    duration: "5 day, 4 night",
    image: "/villa1.jpg",
    category: "All-Inclusive"
  },
  {
    id: 2,
    title: "Cultural Packages",
    description: "Focus on cultural experiences such as heritage tours, and local performances.",
    duration: "5 day, 4 night",
    image: "/villa2.jpg",
    category: "Cultural"
  },
  {
    id: 3,
    title: "Adventure Packages",
    description: "Tailored for thrill-seekers, offering activities like hiking, diving, or extreme sports.",
    duration: "5 day, 4 night",
    image: "/villa3.jpg",
    category: "Adventure"
  }
];

const PackageCard = ({ 
  package: pkg, 
  isHovered, 
  onHover, 
  onLeave 
}: { 
  package: typeof packages[0], 
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
      style={{ backgroundImage: `url(${pkg.image})` }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40 transition-opacity duration-300" />
      
      {/* Duration badge */}
      <div className="absolute top-6 left-6 z-10">
        <span className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium border border-white/30">
          {pkg.duration}
        </span>
      </div>

      {/* Content */}
      <div className="absolute inset-0 p-6 flex flex-col justify-end text-white z-10">
        <div className={cn(
          "transition-all duration-500 ease-out",
          isHovered ? "transform translate-y-0 opacity-100" : "transform translate-y-4"
        )}>
          <h3 className="text-2xl font-bold mb-3 leading-tight">
            {pkg.title}
          </h3>
          <p className={cn(
            "text-white/90 text-sm leading-relaxed mb-4 transition-all duration-500",
            isHovered ? "opacity-100 max-h-20" : "opacity-0 max-h-0 overflow-hidden"
          )}>
            {pkg.description}
          </p>
          
          {/* Choose package button - only visible on hover */}
          <div className={cn(
            "transition-all duration-500 ease-out",
            isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}>
            <button className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-6 py-3 rounded-full font-medium transition-all duration-300 border border-white/30 hover:border-white/50 transform hover:scale-105">
              Choose package
            </button>
          </div>
        </div>
      </div>

      {/* Gradient overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
    </div>
  );
};

export function TravelPackages() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <div className="relative z-10 bg-white py-16">
      <div className="container mx-auto px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="mb-6">
            <span className="text-blue-500 text-sm font-medium tracking-wider uppercase">
              //OUR PACKAGE
            </span>
          </div>
          <TextAnimate animation="slideUp" by="word" className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight max-w-4xl mx-auto">
            Discover our exceptional selection of travel packages and destinations
          </TextAnimate>
        </div>

        {/* Package Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {packages.map((pkg) => (
            <PackageCard
              key={pkg.id}
              package={pkg}
              isHovered={hoveredCard === pkg.id}
              onHover={() => setHoveredCard(pkg.id)}
              onLeave={() => setHoveredCard(null)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
