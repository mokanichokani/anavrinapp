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
            <h1 className="text-4xl md:text-6xl font-bold mb-8 text-white drop-shadow-lg" style={{fontFamily: 'HelveticaNeueMedium, "Helvetica Neue", Helvetica, Arial, sans-serif'}}>
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

        {/* Explore Now Button - Bottom Right */}
        <div className="absolute bottom-8 right-8 z-20">
          <button
            onClick={() => {
              const newHotelsSection = document.querySelector('.new-hotels-section');
              if (newHotelsSection) {
                const elementPosition = newHotelsSection.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = elementPosition - 200; // Scroll 200px above the section
                
                scrollTo(offsetPosition);
              }
            }}
            className="group flex items-center space-x-3 px-6 py-4 rounded-full border-2 border-white/30 text-white hover:bg-white hover:text-gray-900 transition-all duration-300 transform hover:scale-105 backdrop-blur-sm"
          >
            <span className="font-medium">Explore now</span>
            <svg 
              className="w-5 h-5 transform group-hover:translate-y-1 transition-transform duration-300" 
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
      className="dm-serif-text text-center text-4xl font-extrabold text-[#26965e] dark:text-white md:text-7xl md:leading-[5rem]"
      text="Find Best Views |        Curating Stays With Best View | "
      default_velocity={1}
    />


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
                        <TextAnimate animation="blurInUp" by="character" className="drop-title">
                            The Drop
                        </TextAnimate>
                        <div className="drop-description">
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
                          {/* Villa 3 */}
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
                          {/* Villa 4 */}
                        
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



                              {/* Villa 5 */}         
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

    {/* Layout Grid Demo Section */}
    <LayoutGridDemo />
    {/* Marquee Demo Section */}
    {/* <div className="relative z-10 bg-white py-16">
      <div className="container mx-auto px-8"> */}
        <TextAnimate animation="slideUp" by="word" className="text-3xl font-bold mb-8 text-center">
          Customer Reviews  
        </TextAnimate>
        <MarqueeDemo />   
    {/* </div>
    </div>
    </div> */}

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