"use client";

import { useState, useEffect, useRef } from "react";
import { TextAnimate } from "@/components/magicui/text-animate";
import { TextScroll } from "@/components/ui/text-scroll";
import { LayoutGridDemo } from "@/components/LayoutGridDemo";
import { MarqueeDemo } from "@/components/MarqueeDemo";
import { FAQSection } from "@/components/FAQSection";
import { TravelPackages } from "@/components/TravelPackages";
import { NewsletterSection } from "@/components/NewsletterSection";
import { Footer } from "@/components/Footer";
import { LoaderTwo } from "@/components/ui/loader";
import { useLenis } from "@/hooks/useLenis";
import "../homie.css";

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
  const [isLoading, setIsLoading] = useState(false);
  const { scrollTo } = useLenis();
  const [formData, setFormData] = useState({
    destination: '',
    checkin: '',
    checkout: '',
    adults: '',
    children: '0',
    rooms: '',
    roomtype: ''
  });

  // Check if this is the initial page load (not navigation)
  useEffect(() => {
    const hasVisited = sessionStorage.getItem('hasVisitedHome');
    if (!hasVisited) {
      setIsLoading(true);
      sessionStorage.setItem('hasVisitedHome', 'true');
    }
  }, []);
  
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

  // Loading timer
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000); // Show loader for 3 seconds

    return () => clearTimeout(timer);
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
      {/* Loader */}
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
          <LoaderTwo />
        </div>
      )}

      {/* Main Content - Hidden while loading */}
      <div className={`transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        {/* Video Background Hero Section */}
        <div className="relative h-screen overflow-hidden">
          {/* Video Background */}
          <div className="absolute bg-white inset-0 w-full h-full top-0 p-1 sm:p-2">
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
            <div className="absolute inset-0"></div>
          </div>

          {/* Location Indicator - Bottom Left - Responsive */}
          <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 lg:bottom-8 lg:left-8 z-20">
            <div className="location-indicator">
              <svg className="location-icon w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
              <span key={currentVideo} className="location-text text-sm sm:text-base lg:text-lg">
                {destinations[currentVideo]}
              </span>
            </div>
            <div key={`desc-${currentVideo}`} className="location-description text-xs sm:text-sm lg:text-base max-w-xs sm:max-w-sm lg:max-w-md">
              {descriptions[currentVideo]}
            </div>
          </div>

          {/* Main content area */}
          <div className="relative z-10 h-full p-2 sm:p-4 lg:p-5">
            {/* Main Heading - Centered - Responsive */}
            <div className="text-center pt-12 sm:pt-16 lg:pt-20 pb-6 sm:pb-8 lg:pb-12 px-4">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-2 sm:mb-3 lg:mb-4 text-white drop-shadow-lg leading-tight" style={{fontFamily: 'HelveticaNeueMedium, "Helvetica Neue", Helvetica, Arial, sans-serif'}}>
                Begin your dream journey with our
              </h1>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 lg:mb-8 text-white drop-shadow-lg leading-tight" style={{fontFamily: 'HelveticaNeueMedium, "Helvetica Neue", Helvetica, Arial, sans-serif'}}>
                expert guidance and support
              </h1>
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

          {/* Explore Now Button - Bottom Right - Responsive */}
          <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 lg:bottom-8 lg:right-8 z-20">
            <button
              onClick={() => {
                const newHotelsSection = document.querySelector('.new-hotels-section');
                if (newHotelsSection) {
                  const elementPosition = newHotelsSection.getBoundingClientRect().top + window.pageYOffset;
                  const offsetPosition = elementPosition - 200; // Scroll 200px above the section
                  
                  scrollTo(offsetPosition);
                }
              }}
              className="group flex items-center space-x-2 sm:space-x-3 px-4 sm:px-6 py-3 sm:py-4 rounded-full border-2 border-white/30 text-white hover:bg-white hover:text-gray-900 transition-all duration-300 transform hover:scale-105 backdrop-blur-sm text-sm sm:text-base"
            >
              <span className="font-medium">Explore now</span>
              <svg 
                className="w-4 h-4 sm:w-5 sm:h-5 transform group-hover:translate-y-1 transition-transform duration-300" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
              </svg>
            </button>
          </div>
        </div>

        <TextScroll
          className="dm-serif-text text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-7xl font-extrabold text-[#26965e] dark:text-white leading-tight sm:leading-normal md:leading-[3rem] lg:leading-[4rem] xl:leading-[5rem] py-4 sm:py-6 lg:py-8"
          text="Find Best Views |        Curating Stays With Best View | "
          default_velocity={1}
        />

        {/* About Us and Services Section */}
        <div className="relative z-10 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-end">

              {/* About Us Section */}
              <div className="about-section">
                <div className="section-header mb-4 sm:mb-6">
                  <span className="section-tag text-xs sm:text-sm">ABOUT US</span>
                </div>
                <TextAnimate animation="blurInUp" by="character" className="text-xl sm:text-2xl lg:text-3xl section-title mb-4 sm:mb-6">
                  We are a passionate team of travel enthusiasts dedicated to making your travel dreams come .
                </TextAnimate>
                <TextAnimate animation="slideLeft" by="character" className="section-description text-sm sm:text-base lg:text-lg">
                  Our mission is to provide you with the best travel experiences that create lasting memories and transform the way you see the world.
                </TextAnimate>
              </div>

              {/* Statistics Section */}
              <div className="stats-container flex justify-center">
                <div className="grid grid-cols-3 gap-2 sm:gap-4 overflow-hidden">
                  <div className="stat-item border-r border-gray-100 hover:bg-gray-50 transition-colors duration-300 p-2 sm:p-4 text-center">
                    <NumberTicker value={200} duration={2500} />
                    <div className="stat-label text-xs sm:text-sm lg:text-base">Happy Customers</div>
                  </div>
                  <div className="stat-item border-r border-gray-100 hover:bg-gray-50 transition-colors duration-300 p-2 sm:p-4 text-center">
                    <NumberTicker value={65} duration={2200} />
                    <div className="stat-label text-xs sm:text-sm lg:text-base">Top Hotels</div>
                  </div>
                  <div className="stat-item hover:bg-gray-50 transition-colors duration-300 p-2 sm:p-4 text-center">
                    <NumberTicker value={250} duration={2800} />
                    <div className="stat-label text-xs sm:text-sm lg:text-base">Experienced Guides</div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Villa Collection Section */}
       
<div className="relative z-10 bg-gray-50 py-8 sm:py-12 lg:py-16">
  <div className="container mx-auto px-4 sm:px-6 lg:px-8">
    
    {/* Mobile Layout - Vertical Stack */}
    <div className="block lg:hidden">
      {/* Content Section */}
      <div className="new-hotels-section mb-8">
        <div className="section-header mb-4 sm:mb-6">
          <span className="section-tag text-xs sm:text-sm">NEW HOTELS</span>
        </div>
        <TextAnimate animation="blurInUp" by="character" className="drop-title text-2xl sm:text-3xl lg:text-4xl xl:text-5xl mb-4 sm:mb-6">
          The Drop
        </TextAnimate>
        <div className="drop-description text-sm sm:text-base lg:text-lg mb-6 sm:mb-8">
          <TextAnimate animation="slideLeft" by="word">
            New to Stayys and new to your travel plans.
          </TextAnimate>
          <br />
          <TextAnimate animation="slideLeft" by="word">
            Explore the latest drop of handpicked hotels,
          </TextAnimate>
          <br />
          <TextAnimate animation="slideLeft" by="word">
            tried & tested by us.
          </TextAnimate>
        </div>
        <button className="all-hotels-btn text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-3 mb-6">
          ALL OUR HOTELS
        </button>
      </div>
      
      {/* Villa Cards - Horizontal Scrollable for Mobile - HIDDEN SCROLLBAR */}
      <div className="overflow-x-auto pb-4 scrollbar-hide" style={{scrollbarWidth: 'none', msOverflowStyle: 'none'}}>
        <style jsx>{`
          div::-webkit-scrollbar {
            display: none;
          }
        `}</style>
        <div className="flex gap-4 min-w-max">
          {[1, 2, 3, 4, 5].map((villa, index) => (
            <div key={villa} className="villa-card flex-shrink-0 w-64 sm:w-72">
              <div className="villa-image-container relative">
                <img src={`/villa${villa}.jpg`} alt={`Villa ${villa}`} className="villa-image w-full h-48 sm:h-56 object-cover rounded-t-lg" />
                <div className="image-overlay absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-t-lg"></div>
                <div className="villa-favorite absolute top-3 right-3 sm:top-4 sm:right-4">
                  <svg className="heart-icon w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                  </svg>
                </div>
              </div>
              <div className="villa-content p-3 sm:p-4">
                <p className="villa-location-new text-xs sm:text-sm text-gray-600 mb-1 sm:mb-2">
                  {index === 0 ? "LONAVALA, MAHARASHTRA" : "KARJAT, MAHARASHTRA"}
                </p>
                <h3 className="villa-title-new text-lg sm:text-xl font-bold mb-2 sm:mb-3">
                  {index === 0 ? "Mountain Villa" : "Valley Resort"}
                </h3>
                <div className="villa-features-new text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">
                  <span>{index === 0 ? "6 Bedrooms • 6 Baths • 32 Guests" : "4 Bedrooms • 5 Baths • 24 Guests"}</span>
                </div>
                <div className="villa-price-new">
                  <span className="price-new text-lg sm:text-xl font-bold">
                    FROM {index === 0 ? "₹1200" : "₹950"}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* Desktop Layout - Horizontal Scrollable Container */}
    <div className="hidden lg:block">
      <div className="villa-scroll-container">
        <div className="villa-cards-wrapper flex gap-4 sm:gap-6 lg:gap-8 overflow-x-auto pb-4 scrollbar-hide" style={{scrollbarWidth: 'none', msOverflowStyle: 'none'}}>
          <style jsx>{`
            .villa-cards-wrapper::-webkit-scrollbar {
              display: none;
            }
          `}</style>
          
          {/* Content Section as First Item */}
          <div className="new-hotels-section flex-shrink-0 w-72 sm:w-80 lg:w-96">
            <div className="section-header mb-4 sm:mb-6">
              <span className="section-tag text-xs sm:text-sm">NEW HOTELS</span>
            </div>
            <TextAnimate animation="blurInUp" by="character" className="drop-title text-2xl sm:text-3xl lg:text-4xl xl:text-5xl mb-4 sm:mb-6">
              The Drop
            </TextAnimate>
            <div className="drop-description text-sm sm:text-base lg:text-lg mb-6 sm:mb-8">
              <TextAnimate animation="slideLeft" by="word">
                New to Stayys and new to your travel plans.
              </TextAnimate>
              <br />
              <TextAnimate animation="slideLeft" by="word">
                Explore the latest drop of handpicked hotels,
              </TextAnimate>
              <br />
              <TextAnimate animation="slideLeft" by="word">
                Explore the latest drop of handpicked hotels,
              </TextAnimate>
              <br />
              <TextAnimate animation="slideLeft" by="word">
                tried & tested by us.
              </TextAnimate>
            </div>
            <button className="all-hotels-btn text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-3">
              ALL OUR HOTELS
            </button>
          </div>
              
          {/* Villa Cards - Responsive */}
          {[1, 2, 3, 4, 5].map((villa, index) => (
            <div key={villa} className="villa-card flex-shrink-0 w-64 sm:w-72 lg:w-80">
              <div className="villa-image-container relative">
                <img src={`/villa${villa}.jpg`} alt={`Villa ${villa}`} className="villa-image w-full h-48 sm:h-56 lg:h-64 object-cover rounded-t-lg" />
                <div className="image-overlay absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-t-lg"></div>
                <div className="villa-favorite absolute top-3 right-3 sm:top-4 sm:right-4">
                  <svg className="heart-icon w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                  </svg>
                </div>
              </div>
              <div className="villa-content p-3 sm:p-4 lg:p-6">
                <p className="villa-location-new text-xs sm:text-sm text-gray-600 mb-1 sm:mb-2">
                  {index === 0 ? "LONAVALA, MAHARASHTRA" : "KARJAT, MAHARASHTRA"}
                </p>
                <h3 className="villa-title-new text-lg sm:text-xl lg:text-2xl font-bold mb-2 sm:mb-3">
                  {index === 0 ? "Mountain Villa" : "Valley Resort"}
                </h3>
                <div className="villa-features-new text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">
                  <span>{index === 0 ? "6 Bedrooms • 6 Baths • 32 Guests" : "4 Bedrooms • 5 Baths • 24 Guests"}</span>
                </div>
                <div className="villa-price-new">
                  <span className="price-new text-lg sm:text-xl lg:text-2xl font-bold">
                    FROM {index === 0 ? "₹1200" : "₹950"}
                  </span>
                </div>
              </div>
            </div>
          ))}

        </div>
      </div>
    </div>

  </div>
</div>

        {/* Layout Grid Demo Section */}
        <LayoutGridDemo />

        {/* Customer Reviews Section */}
        <div className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
          <TextAnimate animation="slideUp" by="word" className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center">
            Customer Reviews  
          </TextAnimate>
          <MarqueeDemo />   
        </div>

        {/* FAQ Section */}
        <FAQSection />

        {/* Travel Packages Section */}
        <TravelPackages />

        {/* Newsletter Section */}
        <NewsletterSection />

      </div>
    </div>
  );
}