import React from 'react';
import { cn } from '../../lib/utils';
import { COMPANY_NAME } from '../../assets/images/misr-phosphate-logo';

interface LogoProps {
  className?: string;
  showText?: boolean;
  language?: 'en' | 'ar';
}

export function Logo({ className = '', showText = false, language = 'en' }: LogoProps) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <img 
        src="/images/misr-phosphate-logo.png"
        alt={COMPANY_NAME[language]}
        className="h-10 w-auto"
      />
      {showText && (
        <span className={cn(
          'text-xl font-semibold text-primary-600',
          language === 'ar' && 'font-arabic'
        )}>
          {COMPANY_NAME[language]}
        </span>
      )}
    </div>
  );
}