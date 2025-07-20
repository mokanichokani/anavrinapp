"use client";

import { useEffect, useState } from 'react';

export function useLenis() {
  const [lenis, setLenis] = useState<any>(null);

  useEffect(() => {
    const lenisInstance = (window as any).lenis;
    setLenis(lenisInstance);
  }, []);

  const scrollTo = (target: string | number | HTMLElement, options?: any) => {
    if (lenis) {
      lenis.scrollTo(target, options);
    } else {
      // Fallback to native scroll
      if (typeof target === 'number') {
        window.scrollTo({
          top: target,
          behavior: 'smooth'
        });
      } else if (typeof target === 'string') {
        const element = document.querySelector(target);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      } else if (target instanceof HTMLElement) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return { lenis, scrollTo };
}
