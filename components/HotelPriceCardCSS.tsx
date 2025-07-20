import React from 'react';
import './HotelPriceCard.css';

interface HotelPriceCardProps {
  image: string;
  location: string;
  title: string;
  features?: string;
  price: string;
  alt?: string;
  onFavoriteClick?: () => void;
  isFavorite?: boolean;
}

const HotelPriceCard: React.FC<HotelPriceCardProps> = ({
  image,
  location,
  title,
  features,
  price,
  alt = "Hotel",
  onFavoriteClick,
  isFavorite = false
}) => {
  return (
    <div className="hotel-price-card">
      <div className="hotel-image-container">
        <img src={image} alt={alt} className="hotel-image" />
        <div className="image-overlay"></div>
        <div className="hotel-favorite" onClick={onFavoriteClick}>
          <svg 
            className={`heart-icon ${isFavorite ? 'favorited' : ''}`} 
            fill={isFavorite ? "currentColor" : "none"} 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </div>
      </div>
      <div className="hotel-content">
        <p className="hotel-location">{location}</p>
        <h3 className="hotel-title">{title}</h3>
        {features && (
          <div className="hotel-features">
            <span>{features}</span>
          </div>
        )}
        <div className="hotel-price">
          <span className="price">{price}</span>
        </div>
      </div>
    </div>
  );
};

export default HotelPriceCard;
