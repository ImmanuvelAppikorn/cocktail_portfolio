"use client";

import { useState, useEffect } from 'react';
import { useViewportScale } from '@/hooks/useViewportScale';

export default function ScaleDebug() {
  const { scale, isScaled } = useViewportScale();
  const [viewport, setViewport] = useState({ width: 0, height: 0 });
  
  useEffect(() => {
    const updateViewport = () => {
      setViewport({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };
    
    updateViewport();
    window.addEventListener('resize', updateViewport);
    
    return () => window.removeEventListener('resize', updateViewport);
  }, []);
  
  // Only show in development
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }
  
  return (
    <div className="fixed bottom-2 left-2 bg-black/70 text-white text-xs p-2 rounded-md z-50">
      <div>Scale: {scale.toFixed(2)}</div>
      <div>Viewport: {viewport.width}x{viewport.height}</div>
    </div>
  );
}
