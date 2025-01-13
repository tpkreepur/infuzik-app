'use client';

import { ButtonHTMLAttributes } from 'react';
import clsx from 'clsx';
import React from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
}

export default function Button({ 
  children, 
  variant = 'primary', 
  className,
  ...props 
}: ButtonProps) {
  return (
    <button
      className={clsx(
        'px-4 sm:px-8 py-3 sm:py-4 rounded-md font-semibold transition-all duration-300',
        {
          'bg-gradient-luxury shadow-premium hover:shadow-premium-hover': variant === 'primary',
          'border-2 border-gold hover:bg-gold/5 dark:hover:bg-gold/10': variant === 'secondary',
        },
        'uppercase tracking-wider text-sm',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
