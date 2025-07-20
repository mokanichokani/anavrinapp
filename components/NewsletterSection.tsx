"use client";

import React, { useState } from "react";
import { TextAnimate } from "@/components/magicui/text-animate";

export function NewsletterSection() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      alert(`Thank you for subscribing with email: ${email}`);
      setEmail("");
    }
  };

  return (
    <div className="relative z-10 bg-white py-16">
      <div className="container mx-auto px-8">
        {/* Newsletter Container with Border */}
        <div className="relative w-full h-96 overflow-hidden rounded-3xl border-none shadow-none">
          {/* Background Image */}
          <div 
            className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: 'url(/villa5.jpg)' }}
          />
          
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-black/40" />
          
          {/* Content */}
          <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-8">
            <TextAnimate animation="blurInUp" by="word" className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight max-w-4xl">
              Don't wait any longer! Start your adventure and explore new experiences today
            </TextAnimate>
            
            {/* Email Subscription Form */}
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 w-full max-w-lg">
              <div className="flex-1 relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Drop your email address here..."
                  className="w-full px-6 py-4 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white placeholder-white/80 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50 transition-all duration-300"
                  required
                />
              </div>
              <button
                type="submit"
                className="px-8 py-4 bg-white text-gray-900 rounded-full font-medium hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white/50 whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
