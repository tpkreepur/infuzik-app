'use client';

import { ButtonHTMLAttributes } from 'react';
import clsx from 'clsx';
import React from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export default function Button({
  children,
  variant = 'primary',
  className,
  isLoading = false,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={isLoading || disabled}
      className={clsx(
        'px-4 sm:px-8 py-3 sm:py-4 rounded-md font-semibold transition-all duration-300',
        'relative overflow-hidden',
        'active:scale-95 hover:scale-[1.02]',
        'disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100',
        {
          'bg-gradient-luxury shadow-premium hover:shadow-premium-hover':
            variant === 'primary',
          'border-2 border-gold hover:bg-gold/5 dark:hover:bg-gold/10':
            variant === 'secondary',
        },
        'uppercase tracking-wider text-sm',
        className
      )}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center justify-center">
          <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
          Loading...
        </span>
      ) : (
        children
      )}
    </button>
  );
}
