"use client";

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Menu, X, Home, User, Briefcase, Mail } from 'lucide-react';

export default function AnimatedNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('Home');
  const [underlineStyle, setUnderlineStyle] = useState({ width: 0, left: 0 });
  const navRef = useRef<HTMLDivElement>(null);

  const navItems = [
    { name: 'Home', icon: Home },
    { name: 'About', icon: User },
    { name: 'Services', icon: Briefcase },
    { name: 'Contact', icon: Mail }
  ];

  useEffect(() => {
    if (navRef.current) {
      const activeButton = navRef.current.querySelector(`[data-item="${activeItem}"]`);
      if (activeButton) {
        const rect = activeButton.getBoundingClientRect();
        const navRect = navRef.current.getBoundingClientRect();
        setUnderlineStyle({
          width: rect.width,
          left: rect.left - navRect.left
        });
      }
    }
  }, [activeItem]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <div className="cursor-pointer hover:opacity-80 transition-opacity duration-200">
              <Image
                src="/Anavrin.png"
                alt="Anavrin Stays"
                width={160}
                height={100}
                className="h-8 w-auto"
                priority
              />
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block relative" ref={navRef}>
            <div className="flex items-baseline space-x-4">
              {navItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <button
                    key={item.name}
                    data-item={item.name}
                    onClick={() => setActiveItem(item.name)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center space-x-2 transform hover:scale-105 ${
                      activeItem === item.name
                        ? 'bg-white/20 text-white shadow-md hover:backdrop-blur-sm border border-white/20'
                        : 'text-white/90 hover:bg-white/10 hover:text-white hover:backdrop-blur-sm'
                    }`}
                  >
                    <IconComponent size={18} />
                    <span>{item.name}</span>
                  </button>
                );
              })}
            </div>
            
            {/* Active indicator line */}
            <div 
              className="absolute bottom-0 h-1 bg-gradient-to-r from-white to-white transition-all duration-500 ease-out rounded-full"
              style={{
                width: `${underlineStyle.width}px`,
                left: `${underlineStyle.left}px`,
                transform: 'translateY(8px)'
              }}
            />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-lg text-white/90 hover:text-white hover:bg-white/10 transition-all duration-200 transform hover:scale-110  hover:backdrop-blur-sm"
            >
              <div className="relative w-6 h-6">
                <Menu 
                  className={`absolute inset-0 transform transition-all duration-300 ${
                    isOpen ? 'rotate-90 opacity-0' : 'rotate-0 opacity-100'
                  }`} 
                />
                <X 
                  className={`absolute inset-0 transform transition-all duration-300 ${
                    isOpen ? 'rotate-0 opacity-100' : '-rotate-90 opacity-0'
                  }`} 
                />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div className={`md:hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
        } overflow-hidden`}>
          <div className="px-2 pt-2 pb-3 space-y-1 bg-black/15 rounded-lg mt-2 border border-white/10">
            {navItems.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <button
                  key={item.name}
                  onClick={() => {
                    setActiveItem(item.name);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-4 py-3 rounded-lg text-base font-medium transition-all duration-300 flex items-center space-x-3 transform hover:translate-x-2 ${
                    activeItem === item.name
                      ? 'bg-white/20 text-white shadow-sm border border-white/20'
                      : 'text-white/90 hover:bg-white/10 hover:text-white hover:shadow-sm'
                  }`}
                  style={{
                    animationDelay: `${index * 50}ms`
                  }}
                >
                  <IconComponent size={20} />
                  <span>{item.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}