import React from 'react';

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
    <>
      <div className="villa-card">
        <div className="villa-image-container">
          <img src={image} alt={alt} className="villa-image" />
          <div className="image-overlay"></div>
          <div className="villa-favorite" onClick={onFavoriteClick}>
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
        <div className="villa-content">
          <p className="villa-location-new">{location}</p>
          <h3 className="villa-title-new">{title}</h3>
          {features && (
            <div className="villa-features-new">
              <span>{features}</span>
            </div>
          )}
          <div className="villa-price-new">
            <span className="price-new">{price}</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Text:ital@0;1&display=swap');
        
        @font-face {
          font-family: 'HelveticaNeueLight';
          src: url('/helvetica-neue-5/HelveticaNeueLight.otf') format('opentype');
          font-weight: 300;
          font-style: normal;
        }
        
        @font-face {
          font-family: 'HelveticaNeueRoman';
          src: url('/helvetica-neue-5/HelveticaNeueRoman.otf') format('opentype');
          font-weight: 400;
          font-style: normal;
        }
        
        @font-face {
          font-family: 'HelveticaNeueMedium';
          src: url('/helvetica-neue-5/HelveticaNeueMedium.otf') format('opentype');
          font-weight: 500;
          font-style: normal;
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
          cursor: pointer;
        }

        .villa-card:hover {
          transform: none;
          box-shadow: none;
        }

        .villa-image-container {
          position: relative;
          height: 400px;
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

        .heart-icon.favorited {
          color: #EF4444;
          fill: #EF4444;
        }

        .villa-favorite:hover .heart-icon {
          color: #EF4444;
        }

        .villa-favorite:hover .heart-icon:not(.favorited) {
          fill: #EF4444;
        }

        .villa-content {
          padding: 1.5rem 0;
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
          font-size: 1.5rem;
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
          margin-bottom: 1rem;
        }

        .villa-features-new span {
          font-size: 0.875rem;
          color: #6B7280;
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
          .villa-card {
            width: 260px;
          }
          
          .villa-content {
            padding: 1.25rem;
          }
          
          .villa-title-new {
            font-size: 1.25rem;
          }
        }
      `}</style>
    </>
  );
};

export default HotelPriceCard;
