import React from 'react';
import Image from 'next/image';
import { TextAnimate } from '@/components/magicui/text-animate';
import { Footer } from '@/components/Footer';

function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Main Content */}
      <div className="container mx-auto px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center min-h-[80vh]">
          
          {/* Left Side - Content */}
          <div className="space-y-8">
            <div>
              <TextAnimate 
                animation="slideUp" 
                by="word" 
                once
                className="text-5xl md:text-6xl font-bold text-gray-900 mb-8" 
                style={{fontFamily: 'HelveticaNeueMedium, "Helvetica Neue", Helvetica, Arial, sans-serif'}}
              >
                Our Story
              </TextAnimate>
              
              <TextAnimate 
                animation="blurInUp" 
                by="character" 
                once
                className="text-xl text-gray-700 leading-relaxed mb-8 font-medium" 
                style={{fontFamily: 'HelveticaNeueRoman, "Helvetica Neue", Helvetica, Arial, sans-serif'}}
              >
               Anavrin Stays was founded in 2020 and is dedicated to providing the best stay and unique experience facilities to our customers through our booking portal (both online and offline). Starting as a small team, we have been able to grow our network and are now proud booking
              </TextAnimate>
              
              <TextAnimate 
                animation="slideLeft" 
                by="word" 
                once
                className="text-lg text-gray-600 leading-relaxed" 
                style={{fontFamily: 'HelveticaNeueRoman, "Helvetica Neue", Helvetica, Arial, sans-serif'}}
              >
                Partners with over 100 properties in and around Maharashtra and Goa. We look forward to continuing this growth and creating the best customer experience possible.
              </TextAnimate>
            </div>
          </div>

          {/* Right Side - Image */}
          <div className="relative">
            <div className="relative w-full h-[600px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/about.jpg"
                alt="About Anavrin Stays"
                fill
                className="object-cover"
              />
            </div>
          </div>

        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default AboutPage;