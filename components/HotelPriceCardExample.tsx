import React, { useState } from 'react';
import HotelPriceCard from './HotelPriceCardCSS';

const HotelPriceCardExample: React.FC = () => {
  const [favorites, setFavorites] = useState<number[]>([]);

  const hotelData = [
    {
      id: 1,
      image: '/villa1.jpg',
      location: 'LONAVALA, MAHARASHTRA',
      title: 'Mountain Villa',
      features: '6 Bedrooms • 6 Baths • 32 Guests',
      price: 'FROM ₹1200'
    },
    {
      id: 2,
      image: '/villa2.jpg',
      location: 'KARJAT, MAHARASHTRA',
      title: 'Valley Resort',
      features: '4 Bedrooms • 5 Baths • 24 Guests',
      price: 'FROM ₹950'
    },
    {
      id: 3,
      image: '/villa3.jpg',
      location: 'GOA, INDIA',
      title: 'Beach House',
      features: '3 Bedrooms • 3 Baths • 18 Guests',
      price: 'FROM ₹1500'
    }
  ];

  const toggleFavorite = (hotelId: number) => {
    setFavorites(prev => 
      prev.includes(hotelId) 
        ? prev.filter(id => id !== hotelId)
        : [...prev, hotelId]
    );
  };

  return (
    <div style={{ 
      display: 'flex', 
      gap: '1.5rem', 
      padding: '2rem',
      overflowX: 'auto',
      backgroundColor: '#f8f9fa'
    }}>
      {hotelData.map(hotel => (
        <HotelPriceCard
          key={hotel.id}
          image={hotel.image}
          location={hotel.location}
          title={hotel.title}
          features={hotel.features}
          price={hotel.price}
          alt={hotel.title}
          isFavorite={favorites.includes(hotel.id)}
          onFavoriteClick={() => toggleFavorite(hotel.id)}
        />
      ))}
    </div>
  );
};

export default HotelPriceCardExample;
