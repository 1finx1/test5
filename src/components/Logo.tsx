import React from 'react';
import { cn } from '../lib/utils';

interface LogoProps {
  className?: string;
  size?: number;
}

export const Logo = ({ className, size = 32 }: LogoProps) => {
  return (
    <img 
      src="/images/Skool.com Bot Logo (2).png"
      width={size}
      height={size}
      alt="Logo"
      className={cn('', className)}
    />
  );
};

export default Logo;