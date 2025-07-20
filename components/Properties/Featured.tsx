"use client";

import { Heart, Star, MapPin, Users, Bed, Bath } from 'lucide-react';
import { TextAnimate } from '@/components/magicui/text-animate';
import { AnimatedShinyText } from '@/components/magicui/animated-shiny-text';

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

interface FeaturedProps {
  featuredProperties: Property[];
}

export const Featured = ({ featuredProperties }: FeaturedProps) => {
  return (
    <div className="relative z-10 bg-gray-50 pb-16 pt-4">
      <div className="container mx-auto px-8">
        {/* Horizontal Scrollable Container with Content and Cards */}
        <div className="villa-scroll-container">
          <div className="villa-cards-wrapper">
            {/* Content Section as First Item */}
            <div className="new-hotels-section">
              <div className="section-header mb-6">
                <TextAnimate 
                  animation="slideUp" 
                  by="word" 
                  className="section-tag text-emerald-800 text-sm font-medium tracking-wider uppercase"
                >
                  FEATURED PROPERTIES
                </TextAnimate>
              </div>
              
              <TextAnimate
                animation="slideUp"
                by="word"
                className="drop-title text-4xl font-bold text-stone-900 serif-font mb-4"
              >
                Our Top Picks
              </TextAnimate>
              
              <div className="drop-description text-lg text-stone-700">
                <TextAnimate animation="slideUp" by="word">
                  Hand-selected properties that offer exceptional quality,
                </TextAnimate>
                <TextAnimate animation="slideUp" by="word">
                  service, and unforgettable experiences.
                </TextAnimate>
                <TextAnimate animation="slideUp" by="word">
                  Curated by our travel experts.
                </TextAnimate>
              </div>
              
              <button className="all-hotels-btn mt-6">
                VIEW ALL PROPERTIES
              </button>
            </div>
            
            {/* Featured Properties Cards */}
            {featuredProperties.map(property => (
              <div key={property.id} className="villa-card">
                <div className="villa-image-container">
                  <img 
                    src={property.image} 
                    alt={property.name}
                    className="villa-image" 
                  />
                  <div className="image-overlay"></div>
                  {property.featured && (
                    <div className="absolute top-8 left-8 bg-yellow-600 text-white px-3 py-1 rounded-full text-sm font-medium z-10">
                      Featured
                    </div>
                  )}
                  <div className="villa-favorite">
                    <Heart className="heart-icon" />
                  </div>
                </div>
                
                <div className="villa-content">
                  <p className="villa-location-new">{property.location}</p>
                  <h3 className="villa-title-new">{property.name}</h3>
                  
                  <div className="flex items-center gap-1 mb-2">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium text-stone-900">{property.rating}</span>
                    <span className="text-stone-500">({property.reviews})</span>
                  </div>
                  
                  <div className="villa-features-new">
                    <span>{property.bedrooms} Bedrooms • {property.bathrooms} Baths • {property.guests} Guests</span>
                  </div>
                  
                  <div className="villa-price-new">
                    <span className="price-new">FROM ₹{property.price.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .villa-scroll-container {
          overflow-x: auto;
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        
        .villa-scroll-container::-webkit-scrollbar {
          display: none;
        }
        
        .villa-cards-wrapper {
          display: flex;
          gap: 1.7rem;
          padding: 0;
          min-width: max-content;
          align-items: center;
        }
        
        .new-hotels-section {
          min-width: 450px;
          padding-right: 40px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        
        .section-header {
          display: flex;
          align-items: center;
        }
        
        .drop-title {
          font-size: 42px;
          font-weight: 700;
          margin-bottom: 16px;
          color: #1c1917;
          font-family: 'DM Serif Text', serif;
        }
        
        .drop-description {
          font-size: 18px;
          line-height: 1.6;
          color: #44403c;
          margin-bottom: 24px;
        }
        
       .all-hotels-btn {
          background-color: #065f46;
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 6px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          width: fit-content;
          font-family: 'HelveticaNeueRoman', "Helvetica Neue", Helvetica, Arial, sans-serif;
        }
        .all-hotels-btn:hover {
          background-color: #064e3b;
        }
        .villa-card {
          background: white;
          border-radius: 0;
          overflow: hidden;
          box-shadow: none;
          transition: all 0.3s ease;
          width: 300px;
          flex-shrink: 0;
          border: none;
        }
        
        .villa-image-container {
          position: relative;
          height: 350px;
          overflow: hidden;
        }
        
        .villa-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }
        
        .villa-card:hover .villa-image {
          transform: scale(1.02);
        }
        
        .image-overlay {
          position: absolute;
          top: 20px;
          left: 20px;
          right: 20px;
          bottom: 20px;
          border: 2px solid rgba(255, 255, 255, 0.8);
          pointer-events: none;
          z-index: 2;
        }
        
        .villa-favorite {
          position: absolute;
          top: 30px;
          right: 30px;
          width: 40px;
          height: 40px;
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(10px);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          z-index: 3;
        }
        
        .villa-favorite:hover {
          background: rgba(255, 255, 255, 1);
          transform: scale(1.1);
        }
        
        .heart-icon {
          width: 20px;
          height: 20px;
          color: #6B7280;
          transition: all 0.3s ease;
        }
        
        .villa-favorite:hover .heart-icon {
          color: #EF4444;
          fill: #EF4444;
        }
        
        .villa-content {
          padding: 1.5rem 0.7rem;
          background: transparent;
        }
        
        .villa-location-new {
          font-size: 0.75rem;
          color: #9CA3AF;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          margin-bottom: 0.5rem;
          font-family: 'HelveticaNeueRoman', "Helvetica Neue", Helvetica, Arial, sans-serif;
        }
        
        .villa-title-new {
          font-size: 1.4rem;
          font-weight: 400;
          color: #1F2937;
          margin-bottom: 1rem;
          line-height: 1.2;
          font-family: 'DM Serif Text', serif;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        
        .villa-features-new {
          font-size: 0.875rem;
          color: #6B7280;
          margin-bottom: 1rem;
          font-family: 'HelveticaNeueRoman', "Helvetica Neue", Helvetica, Arial, sans-serif;
        }
        
        .villa-price-new {
          display: flex;
          align-items: baseline;
        }
        
        .price-new {
          font-size: 1rem;
          font-weight: 500;
          color: #6B7280;
          font-family: 'HelveticaNeueRoman', "Helvetica Neue", Helvetica, Arial, sans-serif;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        
        @media (max-width: 768px) {
          .new-hotels-section {
            min-width: 300px;
            padding-right: 20px;
          }
          
          .drop-title {
            font-size: 2rem;
          }
          
          .drop-description {
            font-size: 1rem;
          }
          
          .villa-card {
            width: 260px;
          }
          
          .villa-image-container {
            height: 350px;
          }
          
          .villa-content {
            padding: 1rem 0;
          }
          
          .villa-title-new {
            font-size: 1.25rem;
          }
        }
      `}</style>
    </div>
  );
};