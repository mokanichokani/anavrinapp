"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface PremiumLoaderProps {
  onLoadingComplete: () => void;
}

export function PremiumLoader({ onLoadingComplete }: PremiumLoaderProps) {
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);
  const [startTime] = useState(Date.now());

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          
          // Ensure minimum 2 seconds display time
          const elapsed = Date.now() - startTime;
          const minDisplayTime = 2000;
          const remainingTime = Math.max(0, minDisplayTime - elapsed);
          
          // Start fade out animation
          setTimeout(() => {
            setFadeOut(true);
            // Complete loading after fade animation
            setTimeout(() => {
              onLoadingComplete();
            }, 800);
          }, remainingTime + 500);
          return 100;
        }
        // Realistic loading progression with varying speeds
        const increment = Math.random() * 12 + 3;
        return Math.min(prev + increment, 100);
      });
    }, 200);

    return () => clearInterval(interval);
  }, [onLoadingComplete, startTime]);

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-100 transition-opacity duration-800 ${
        fadeOut ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-green-200 to-green-300 rounded-full opacity-30 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      {/* Main loader content */}
      <div className="relative z-10 text-center">
        {/* Logo container with premium animations */}
        <div className="relative mb-12">
          {/* Rotating border */}
          <div className="absolute inset-0 w-32 h-32 mx-auto rounded-full border-4 border-transparent bg-gradient-to-r from-green-400 via-green-500 to-green-600 animate-spin-slow opacity-20"></div>
          
          {/* Pulsing glow effect */}
          <div className="absolute inset-0 w-28 h-28 mx-auto mt-2 ml-2 rounded-full bg-gradient-to-r from-green-200 to-green-300 animate-pulse opacity-30 blur-md"></div>
          
          {/* Logo */}
          <div className="relative w-24 h-24 mx-auto mt-4 animate-gentle-bounce">
            <Image
              src="/Anavrin-Stays.png"
              alt="Anavrin Stays"
              fill
              className="object-contain drop-shadow-2xl"
              priority
            />
          </div>
        </div>

        {/* Brand name with typewriter effect */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2 animate-fade-in-up" style={{fontFamily: 'HelveticaNeueMedium, "Helvetica Neue", Helvetica, Arial, sans-serif'}}>
            Anavrin Stays
          </h1>
          <p className="text-lg text-gray-600 animate-fade-in-up-delay" style={{fontFamily: 'HelveticaNeue, "Helvetica Neue", Helvetica, Arial, sans-serif'}}>
            Curating luxury experiences
          </p>
        </div>

        {/* Premium progress bar */}
        <div className="w-80 mx-auto">
          <div className="relative h-1 bg-gray-200 rounded-full overflow-hidden">
            {/* Animated background gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-green-400 via-green-500 to-green-600 opacity-20 animate-shimmer"></div>
            
            {/* Progress fill */}
            <div 
              className="h-full bg-gradient-to-r from-green-400 via-green-500 to-green-600 rounded-full transition-all duration-300 ease-out relative overflow-hidden"
              style={{ width: `${progress}%` }}
            >
              {/* Glowing effect on progress bar */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-slide-right"></div>
            </div>
          </div>
          
          {/* Progress percentage */}
          <div className="mt-4 text-sm text-gray-500 font-medium">
            {Math.round(progress)}%
          </div>
        </div>

        {/* Loading text with dots animation */}
        <div className="mt-8 text-gray-600">
          <span className="animate-fade-in-up-delay-2">Preparing your journey</span>
          <span className="inline-block animate-bounce-dots">...</span>
        </div>
      </div>

      {/* Custom styles */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          25% { transform: translateY(-10px) translateX(5px); }
          50% { transform: translateY(-5px) translateX(-5px); }
          75% { transform: translateY(-15px) translateX(3px); }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes gentle-bounce {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        
        @keyframes fade-in-up {
          from { 
            opacity: 0; 
            transform: translateY(30px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0px); 
          }
        }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        @keyframes slide-right {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        @keyframes bounce-dots {
          0%, 80%, 100% { transform: scale(1); opacity: 0.5; }
          40% { transform: scale(1.2); opacity: 1; }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
        
        .animate-gentle-bounce {
          animation: gentle-bounce 3s ease-in-out infinite;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out forwards;
        }
        
        .animate-fade-in-up-delay {
          animation: fade-in-up 1s ease-out 0.3s forwards;
          opacity: 0;
        }
        
        .animate-fade-in-up-delay-2 {
          animation: fade-in-up 1s ease-out 0.6s forwards;
          opacity: 0;
        }
        
        .animate-shimmer {
          animation: shimmer 2s ease-in-out infinite;
        }
        
        .animate-slide-right {
          animation: slide-right 2s ease-in-out infinite;
        }
        
        .animate-bounce-dots {
          animation: bounce-dots 1.5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
