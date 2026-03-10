'use client';

import { useEffect, useState } from 'react';

/**
 * Hook to detect when user has scrolled past a threshold
 * @param threshold - Number of pixels to scroll before returning true
 * @returns boolean indicating if scrolled past threshold
 */
export function useScrollDetection(threshold = 20): boolean {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > threshold);
    };

    // Use passive listener for better scroll performance
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  return isScrolled;
}
