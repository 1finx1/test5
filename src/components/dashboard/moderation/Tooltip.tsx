import React from 'react';
import { HelpCircle } from 'lucide-react';

interface TooltipProps {
  text: string;
}

export const Tooltip: React.FC<TooltipProps> = ({ text }) => (
  <div className="group relative">
    <HelpCircle className="w-4 h-4 text-gray-400 hover:text-secondary cursor-help" />
    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap max-w-xs text-center">
      {text}
    </div>
  </div>
);