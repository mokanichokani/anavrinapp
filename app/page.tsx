"use client";

import { useState, useEffect, useRef } from "react";
import { TextAnimate } from "@/components/magicui/text-animate";

// Number Counter Component
function NumberTicker({ value, duration = 2000 }: { value: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number | null = null;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * value));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [isVisible, value, duration]);

  return (
    <div ref={elementRef} className="stat-number">
      {count}+
    </div>
  );
}

export default function Home() {
  const [currentVideo, setCurrentVideo] = useState(0);
  const [formData, setFormData] = useState({
    destination: '',
    checkin: '',
    checkout: '',
    adults: '',
    children: '0',
    rooms: '',
    roomtype: ''
  });
  
  const videos = ["/video1.mov", "/video2.mp4"];
  const destinations = ["Lonavala, India", "Karjat, India"];
  const descriptions = [
    <>Book your <em>travel</em> and transportation service with us and enjoy a <em>hassle-free</em> and <em>memorable</em> journey</>,
    <>Discover <em>serene</em> landscapes and peaceful retreats in the heart of Maharashtra's <em>beautiful</em> hill station</>
  ];

  useEffect(() => {
    const interval = setInterval(() => {  
      setCurrentVideo((prev) => (prev + 1) % videos.length);
    }, 10000); // Switch videos every 10 seconds

    return () => clearInterval(interval);
  }, []);

  // Set minimum date to today
  const today = new Date().toISOString().split('T')[0];

  const handleInputChange = (e:any) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Handle checkin date change
    if (name === 'checkin' && formData.checkout) {
      const checkinDate = new Date(value);
      const checkoutDate = new Date(formData.checkout);
      if (checkoutDate <= checkinDate) {
        setFormData(prev => ({
          ...prev,
          checkout: ''
        }));
      }
    }
  };

  const handleSubmit = (e:any) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.destination || !formData.checkin || !formData.checkout || !formData.adults || !formData.rooms) {
      alert('Please fill in all required fields.');
      return;
    }
    
    // Validate dates
    if (new Date(formData.checkout) <= new Date(formData.checkin)) {
      alert('Check-out date must be after check-in date.');
      return;
    }
    
    // Show success message
    alert(`Booking search completed!\n\nDestination: ${formData.destination}\nCheck-in: ${formData.checkin}\nCheck-out: ${formData.checkout}\nGuests: ${formData.adults} adults, ${formData.children} children\nRooms: ${formData.rooms}\nRoom Type: ${formData.roomtype || 'Any'}`);
  };

  const getMinCheckoutDate = () => {
    if (!formData.checkin) return today;
    const checkinDate = new Date(formData.checkin);
    checkinDate.setDate(checkinDate.getDate() + 1);
    return checkinDate.toISOString().split('T')[0];
  };

  return (
    <div className="relative w-full">
      {/* Video Background Hero Section */}
      <div className="relative h-screen overflow-hidden">
        {/* Video Background */}
        <div className="absolute bg-white inset-0 w-full h-full top-0 p-2">
          <div className="video-container">
            {videos.map((video, index) => (
              <video
                key={video}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                  index === currentVideo ? "opacity-100" : "opacity-0"
                }`}
                autoPlay
                muted
                loop
                playsInline
              >
                <source src={video} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ))}
          </div>
          
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 "></div>
        </div>

        {/* Location Indicator - Bottom Left */}
        <div className="absolute bottom-8 left-8 z-20">
          <div className="location-indicator">
            <svg className="location-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
            </svg>
            <span key={currentVideo} className="location-text">
              {destinations[currentVideo]}
            </span>
          </div>
          <div key={`desc-${currentVideo}`} className="location-description">
            {descriptions[currentVideo]}
          </div>
        </div>

        {/* Main content area */}
        <div className="relative z-10 h-full p-5">
          {/* Main Heading - Centered */}
          <div className="text-center pt-20 pb-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white drop-shadow-lg" style={{fontFamily: 'HelveticaNeueMedium, "Helvetica Neue", Helvetica, Arial, sans-serif'}}>
              Begin your dream journey with our
            </h1>
            <h2 className="text-4xl md:text-6xl font-bold mb-8 text-white drop-shadow-lg" style={{fontFamily: 'HelveticaNeueMedium, "Helvetica Neue", Helvetica, Arial, sans-serif'}}>
              expert guidance and support
            </h2>
          </div>

          {/* Booking Form Container - Centered */}
          <div className="flex justify-center">
            <div className="booking-container-transparent">
              <div className="form-container-transparent">
                <div onSubmit={handleSubmit}>
                  <div className="form-grid-transparent">
                    <div className="form-group">
                      <div className="form-control-transparent">
                        <input 
                          type="text" 
                          id="destination" 
                          name="destination"
                          className="transparent-input" 
                          placeholder="Search destination" 
                          value={formData.destination}
                          onChange={handleInputChange}
                          required 
                        />
                        <svg className="dropdown-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
                        </svg>
                      </div>
                    </div>

                    <div className="form-group">
                      <div className="form-control-transparent">
                        <input 
                          type="date" 
                          id="checkin" 
                          name="checkin"
                          className="transparent-input" 
                          min={today}
                          value={formData.checkin}
                          onChange={handleInputChange}
                          placeholder="Date destination"
                          required 
                        />
                        <svg className="dropdown-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
                        </svg>
                      </div>
                    </div>

                    <div className="form-group">
                      <div className="form-control-transparent">
                        <select 
                          id="triptype" 
                          name="triptype"
                          className="transparent-input"
                          value="leisure"
                          onChange={handleInputChange}
                        >
                          <option value="leisure">Trip type</option>
                          <option value="business">Business</option>
                          <option value="adventure">Adventure</option>
                          <option value="family">Family</option>
                        </select>
                        <svg className="dropdown-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
                        </svg>
                      </div>
                    </div>

                    <button type="button" onClick={handleSubmit} className="explore-btn">
                      Explore
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* About Us and Services Section */}
    <div className="relative  z-10  bg-white ">
        <div className=" container mx-auto   px-8 py-16">
            <div className="grid grid-cols-1  lg:grid-cols-2 gap-16 items-end">

                {/* About Us Section */}
                <div className="about-section">
                    <div className="section-header mb-6">
                        <span className="section-tag">ABOUT US</span>
                    </div>
                    <TextAnimate animation="blurInUp" by="character"  className=" text-3xl  section-title">
                        We are a passionate team of travel enthusiasts dedicated to making your travel dreams come .
                    </TextAnimate>
                    <TextAnimate animation="slideLeft" by="character"  className="section-description">
                        Our mission is to provide you with the best travel experiences that create lasting memories and transform the way you see the world.
                    </TextAnimate>
                </div>

                {/* Statistics Section */}
                <div className="stats-container ">
                    <div className="grid grid-cols-3 gap-4  overflow-hidden">
                        <div className="stat-item border-r border-gray-100 hover:bg-gray-50 transition-colors duration-300">
                            <NumberTicker value={200} duration={2500} />
                            <div className="stat-label">Happy Customers</div>
                        </div>
                        <div className="stat-item border-r border-gray-100 hover:bg-gray-50 transition-colors duration-300">
                            <NumberTicker value={65} duration={2200} />
                            <div className="stat-label">Top Hotels</div>
                        </div>
                        <div className="stat-item hover:bg-gray-50 transition-colors duration-300">
                            <NumberTicker value={250} duration={2800} />
                            <div className="stat-label">Experienced Guides</div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>

    {/* Villa Collection Section */}
    <div className="relative z-10 bg-gray-50 py-16">
        <div className="container mx-auto px-8">
            {/* Horizontal Scrollable Container with Content and Cards */}
            <div className="villa-scroll-container">
                <div className="villa-cards-wrapper">
                    
                    {/* Content Section as First Item */}
                    <div className="new-hotels-section">
                        <div className="section-header mb-6">
                            <span className="section-tag">NEW HOTELS</span>
                        </div>
                        <h2 className="drop-title">
                            The Drop
                        </h2>
                        <p className="drop-description">
                            New to Stayys and new to your travel plans.<br />
                            Explore the latest drop of handpicked hotels,<br />
                            tried & tested by us.
                        </p>
                        <button className="all-hotels-btn">
                            ALL OUR HOTELS
                        </button>
                    </div>
                        
                        {/* Villa 1 */}
                        <div className="villa-card">
                            <div className="villa-image-container">
                                <img src="/villa1.jpg" alt="Luxury Mountain Villa" className="villa-image" />
                                <div className="image-overlay"></div>
                                <div className="villa-favorite">
                                    <svg className="heart-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                                    </svg>
                                </div>
                            </div>
                            <div className="villa-content">
                                <p className="villa-location-new">LONAVALA, MAHARASHTRA</p>
                                <h3 className="villa-title-new">Mountain Villa</h3>
                                <div className="villa-features-new">
                                    <span>6 Bedrooms • 6 Baths • 32 Guests</span>
                                </div>
                                <div className="villa-price-new">
                                    <span className="price-new">FROM ₹1200</span>
                                </div>
                            </div>
                        </div>

                        {/* Villa 2 */}
                        <div className="villa-card">
                            <div className="villa-image-container">
                                <img src="/villa2.jpg" alt="Serene Valley Resort" className="villa-image" />
                                <div className="image-overlay"></div>
                                <div className="villa-favorite">
                                    <svg className="heart-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                                    </svg>
                                </div>
                            </div>
                            <div className="villa-content">
                                <p className="villa-location-new">KARJAT, MAHARASHTRA</p>
                                <h3 className="villa-title-new">Valley Resort</h3>
                                <div className="villa-features-new">
                                    <span>4 Bedrooms • 5 Baths • 24 Guests</span>
                                </div>
                                <div className="villa-price-new">
                                    <span className="price-new">FROM ₹950</span>
                                </div>
                            </div>
                        </div>

                          <div className="villa-card">
                            <div className="villa-image-container">
                                <img src="/villa3.jpg" alt="Serene Valley Resort" className="villa-image" />
                                <div className="image-overlay"></div>
                                <div className="villa-favorite">
                                    <svg className="heart-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                                    </svg>
                                </div>
                            </div>
                            <div className="villa-content">
                                <p className="villa-location-new">KARJAT, MAHARASHTRA</p>
                                <h3 className="villa-title-new">Valley Resort</h3>
                                <div className="villa-features-new">
                                    <span>4 Bedrooms • 5 Baths • 24 Guests</span>
                                </div>
                                <div className="villa-price-new">
                                    <span className="price-new">FROM ₹950</span>
                                </div>
                            </div>
                        </div>                       
                        
                        
                         <div className="villa-card">
                            <div className="villa-image-container">
                                <img src="/villa4.jpg" alt="Serene Valley Resort" className="villa-image" />
                                <div className="image-overlay"></div>
                                <div className="villa-favorite">
                                    <svg className="heart-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                                    </svg>
                                </div>
                            </div>
                            <div className="villa-content">
                                <p className="villa-location-new">KARJAT, MAHARASHTRA</p>
                                <h3 className="villa-title-new">Valley Resort</h3>
                                <div className="villa-features-new">
                                    <span>4 Bedrooms • 5 Baths • 24 Guests</span>
                                </div>
                                <div className="villa-price-new">
                                    <span className="price-new">FROM ₹950</span>
                                </div>
                            </div>
                        </div>           

                        
                                     
                        <div className="villa-card">
                            <div className="villa-image-container">
                                <img src="/villa5.jpg" alt="Serene Valley Resort" className="villa-image" />
                                <div className="image-overlay"></div>
                                <div className="villa-favorite">
                                    <svg className="heart-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                                    </svg>
                                </div>
                            </div>
                            <div className="villa-content">
                                <p className="villa-location-new">KARJAT, MAHARASHTRA</p>
                                <h3 className="villa-title-new">Valley Resort</h3>
                                <div className="villa-features-new">
                                    <span>4 Bedrooms • 5 Baths • 24 Guests</span>
                                </div>
                                <div className="villa-price-new">
                                    <span className="price-new">FROM ₹950</span>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
        </div>
    </div>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Text:ital@0;1&family=Notable&display=swap');
        
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
        
        * {
          font-family: 'HelveticaNeueRoman', "Helvetica Neue", Helvetica, Arial, sans-serif;
        }
        
        .video-container {
          position: relative;
          width: 100%;
          height: 100%;
          border-radius: 20px;
          overflow: hidden;
          border: none;
          box-shadow: none;
        }

        .location-indicator {
          display: flex;
          align-items: center;
          gap: 8px;

          padding: 12px 16px;
          border-radius: 50px;
          border: 2px solid rgba(255, 255, 255 , 1);
          animation: slideInFromLeft 0.8s ease-out;
        }

        .location-icon {
          width: 18px;
          height: 18px;
          color: white;
          flex-shrink: 0;
        }

        .location-text {
          color: white;
          font-size: 0.9rem;
          font-weight: 500;
          font-family: 'HelveticaNeueMedium', "Helvetica Neue", Helvetica, Arial, sans-serif;
          white-space: nowrap;
          animation: fadeInSlide 1s ease-out;
        }

        .location-description {
          color: white;
          font-size: 1.5rem;
          font-weight: 400;
          font-family: 'HelveticaNeueRoman', "Helvetica Neue", Helvetica, Arial, sans-serif;
          margin-top: 12px;
          max-width: 450px;
          line-height: 1.5;
          animation: fadeInSlideUp 1.2s ease-out;
        }

        .location-description em {
          font-family: 'HelveticaNeueMedium', "Helvetica Neue", Helvetica, Arial, sans-serif;
          font-style: italic;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.95);
          text-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
        }

        @keyframes slideInFromLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeInSlide {
          0% {
            opacity: 0;
            transform: translateY(10px);
          }
          50% {
            opacity: 0.5;
            transform: translateY(5px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInSlideUp {
          0% {
            opacity: 0;
            transform: translateY(15px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .booking-container-transparent {
          background: rgba(0, 0, 0, 0.1);
          border-radius: 12px;
          padding: 0;
          width: 100%;
          max-width: 600px;
          border: 2px solid rgba(255, 255, 255, 1);
        }

        .form-container-transparent {
          padding: 0;
        }

        .form-grid-transparent {
          display: flex;
          align-items: center;
          gap: 0;
          border-radius: 12px;
          overflow: hidden;
        }

        .form-group {
          flex: 1;
          position: relative;
        }

        .form-control-transparent {
          position: relative;
          display: flex;
          align-items: center;
        }

        .transparent-input {
          width: 100%;
          padding: 20px 45px 20px 20px;
          border: none;
          background: transparent;
          color: white;
          font-size: 1rem;
          font-family: 'HelveticaNeueRoman', "Helvetica Neue", Helvetica, Arial, sans-serif;
          border-right: 1px solid rgba(255, 255, 255, 0.2);
          outline: none;
        }

        .transparent-input:last-child {
          border-right: none;
        }

        .transparent-input::placeholder {
          color: rgba(255, 255, 255, 0.8);
          font-family: 'HelveticaNeueRoman', "Helvetica Neue", Helvetica, Arial, sans-serif;
        }

        .transparent-input:focus {
          background: rgba(255, 255, 255, 0.1);
        }

        .dropdown-icon {
          position: absolute;
          right: 15px;
          width: 16px;
          height: 16px;
          color: rgba(255, 255, 255, 0.7);
          pointer-events: none;
        }

        .explore-btn {
          background: white;
          color: #333;
          border: none;
          padding: 20px 40px;
          font-size: 1rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
          font-family: 'HelveticaNeueMedium', "Helvetica Neue", Helvetica, Arial, sans-serif;
          border-radius: 0 12px 12px 0;
          min-width: 120px;
        }

        .explore-btn:hover {
          background: rgba(255, 255, 255, 0.9);
          transform: translateY(-2px);
        }

        select.transparent-input {
          appearance: none;
          -webkit-appearance: none;
          -moz-appearance: none;
          cursor: pointer;
        }

        input[type="date"].transparent-input::-webkit-calendar-picker-indicator {
          filter: invert(1);
          opacity: 0.7;
          cursor: pointer;
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        /* About Us and Services Sections */
        .container {
          max-width: 1200px;
        }
        
        .section-header {
          margin-bottom: 1.5rem;
        }
        
        .section-tag {
          color: #3B82F6;
          font-size: 0.875rem;
          font-weight: 600;
          font-family: 'HelveticaNeueMedium', "Helvetica Neue", Helvetica, Arial, sans-serif;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }
        
        .section-title {
          font-size: 2.25rem;
          font-weight: 600;
          color: #1F2937;
          line-height: 1.2;
          margin-bottom: 1.5rem;
          font-family: 'HelveticaNeueLight', "Helvetica Neue", Helvetica, Arial, sans-serif;
        }
        
        .section-description {
          font-size: 1.125rem;
          color: #6B7280;
          line-height: 1.6;
          font-family: 'HelveticaNeueRoman', "Helvetica Neue", Helvetica, Arial, sans-serif;
        }
        
        .service-description {
          font-size: 1rem;
          color: #6B7280;
          line-height: 1.6;
          margin-bottom: 2.5rem;
          font-family: 'HelveticaNeueRoman', "Helvetica Neue", Helvetica, Arial, sans-serif;
        }
        
        /* Statistics */
        .stats-container {
          display: flex;
          gap: 2rem;
          flex-wrap: wrap;
        }
        
        .stat-item {
          text-align: center;
        }
        
        .stat-number {
          font-size: 3rem;
          font-weight: 700;
          color: #1F2937;
          font-family: 'HelveticaNeueMedium', "Helvetica Neue", Helvetica, Arial, sans-serif;
          margin-bottom: 0.5rem;
        }
        
        .stat-label {
          font-size: 0.875rem;
          color: #6B7280;
          font-family: 'HelveticaNeueRoman', "Helvetica Neue", Helvetica, Arial, sans-serif;
        }
        
        /* Service Features */
        .service-features {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        
        .feature-item {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
        }
        
        .feature-icon {
          font-size: 1.5rem;
          width: 2.5rem;
          height: 2.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #F3F4F6;
          border-radius: 0.5rem;
          flex-shrink: 0;
        }
        
        .feature-content h4 {
          font-size: 1.125rem;
          font-weight: 600;
          color: #1F2937;
          margin-bottom: 0.25rem;
          font-family: 'HelveticaNeueMedium', "Helvetica Neue", Helvetica, Arial, sans-serif;
        }
        
        .feature-content p {
          font-size: 0.875rem;
          color: #6B7280;
          line-height: 1.5;
          font-family: 'HelveticaNeueRoman', "Helvetica Neue", Helvetica, Arial, sans-serif;
        }

        /* Villa Collection Section - New Style */
        .new-hotels-section {
          min-width: 400px;
          flex-shrink: 0;
          padding-right: 2rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          height: auto;
        }

        .drop-title {
          font-size: 4rem;
          font-weight: 400;
          color: #2D3748;
          line-height: 1.1;
          margin-bottom: 2rem;
          font-family: 'DM Serif Text', serif;
          font-style: italic;
        }

        .drop-description {
          font-size: 1.125rem;
          color: #4A5568;
          line-height: 1.7;
          margin-bottom: 3rem;
          font-family: 'HelveticaNeueRoman', "Helvetica Neue", Helvetica, Arial, sans-serif;
        }

        .all-hotels-btn {
          background: transparent;
          border: 2px solid #4A5568;
          color: #4A5568;
          padding: 12px 32px;
          font-size: 0.875rem;
          font-weight: 600;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.3s ease;
          font-family: 'HelveticaNeueMedium', "Helvetica Neue", Helvetica, Arial, sans-serif;
          align-self: flex-start;
        }

        .all-hotels-btn:hover {
          background: #4A5568;
          color: white;
        }

        .villa-scroll-container {
          overflow-x: auto;
          overflow-y: hidden;
          padding: 0;
          margin: 0;
          scrollbar-width: none;
          -ms-overflow-style: none;
        }

        .villa-scroll-container::-webkit-scrollbar {
          display: none;
        }

        .villa-cards-wrapper {
          display: flex;
          gap: 1.5rem;
          padding: 0;
          min-width: max-content;
          align-items: center;
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

        .villa-favorite:hover .heart-icon {
          color: #EF4444;
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
          display: none;
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
          .form-grid-transparent {
            flex-direction: column;
          }

          .transparent-input {
            border-right: none;
            border-bottom: 1px solid rgba(255, 255, 255, 0.2);
          }

          .transparent-input:last-child {
            border-bottom: none;
          }

          .explore-btn {
            border-radius: 0 0 12px 12px;
            width: 100%;
          }

          .booking-container-transparent {
            margin: 0 20px;
          }
          
          .section-title {
            font-size: 1.75rem;
          }
          
          .stats-container {
            justify-content: center;
            gap: 1.5rem;
          }
          
          .stat-number {
            font-size: 2.25rem;
          }
          
          .drop-title {
            font-size: 2.5rem;
          }
          
          .drop-description {
            font-size: 1rem;
            margin-bottom: 2rem;
          }
          
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
    </div>
  );
}