"use client";

import { ReactNode, useEffect, useState } from "react";
import { useViewportScale } from "@/hooks/useViewportScale";

interface ScaleContainerProps {
  children: ReactNode;
  className?: string;
  minScale?: number;
  designHeight?: number;
  designWidth?: number;
}

export default function ScaleContainer({
  children,
  className = "",
  minScale = 0.6,
  designHeight = 800,
  designWidth = 500,
}: ScaleContainerProps) {
  const { scale } = useViewportScale({
    minScale,
    designHeight,
    designWidth,
  });

  return (
    <div
      className={`fixed inset-0 overflow-hidden flex items-center justify-center bg-white ${className}`}
    >
      <div
        style={{
          transform: `scale(1)`,
          transformOrigin: "center center",
          width: "100%",
          height: "100vh",
          transition: "transform 0.3s ease",
        }}
      >
        {children}
      </div>
    </div>
  );
}
