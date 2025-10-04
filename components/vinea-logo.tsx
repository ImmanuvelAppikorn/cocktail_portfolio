import React from 'react';
import Image from 'next/image';

interface VineaLogoProps {
  size?: number;
  className?: string;
}

export const VineaLogo: React.FC<VineaLogoProps> = ({ size = 36, className = "" }) => {
  return (
    <Image
      src="/logo/logo.svg"
      alt="Vinea Logo"
      width={size}
      height={size}
      className={className}
    />
  );
};
