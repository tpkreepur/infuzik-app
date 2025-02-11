// components/FrostedCard.tsx
import { ReactNode } from 'react';
import clsx from 'clsx';

interface FrostedCardProps {
  children: ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary';
  hover?: boolean;
  accent?: boolean;
}

export default function FrostedCard({
  children,
  className,
  variant = 'primary',
  hover = false,
  accent = false,
}: FrostedCardProps) {
  return (
    <div className="relative">
      {accent && (
        <div className="absolute inset-0 bg-current backdrop-blur-md rounded-lg" />
      )}
      <div
        className={clsx(
          'bg-platinum/30 dark:bg-charcoal/30 backdrop-blur-md rounded-lg p-6 shadow-premium transition-all duration-300',
          {
            'bg-platinum/40 dark:bg-charcoal/40': variant === 'secondary',
            'hover:bg-platinum/50 dark:hover:bg-charcoal/50': hover,
          },
          className
        )}
      >
        {children}
      </div>
    </div>
  );
}
