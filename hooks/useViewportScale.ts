import { useState, useEffect } from 'react';

interface ViewportScaleOptions {
  minScale?: number;
  designHeight?: number;
  designWidth?: number;
}

export function useViewportScale({
  minScale = 0.6,
  designHeight = 800,
  designWidth = 500
}: ViewportScaleOptions = {}) {
  const [scale, setScale] = useState(1);

  // Function to calculate the scale based on viewport dimensions
  const calculateScale = () => {
    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;
    
    // Calculate scales based on both dimensions
    const heightScale = viewportHeight / designHeight;
    const widthScale = viewportWidth / designWidth;
    
    // Use the height scale to prioritize filling the entire screen height
    // But make sure we don't exceed the width
    const newScale = Math.min(heightScale, widthScale * 1.1);
    
    // Apply minimum scale constraint
    const finalScale = Math.max(minScale, newScale);
    
    setScale(finalScale);
  };

  useEffect(() => {
    // Calculate initial scale
    calculateScale();
    
    // Prevent scrolling
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    document.body.style.backgroundColor = 'white';
    
    // Update scale on window resize
    window.addEventListener('resize', calculateScale);
    
    return () => {
      window.removeEventListener('resize', calculateScale);
      // Cleanup
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, []);

  return { scale };
}
