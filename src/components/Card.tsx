import { ReactNode } from 'react';
import clsx from 'clsx';

interface CardProps {
  children: ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary';
  hover?: boolean;
  accent?: boolean;
}

export default function Card({
  children,
  className,
  variant = 'primary',
  hover = true,
  accent = false,
}: CardProps) {
  return (
    <div className="relative">
      {accent && (
        <div className="absolute -inset-0.5 bg-gradient-luxury opacity-75 blur-sm rounded-lg" />
      )}
      <div
        className={clsx(
          'relative rounded-lg backdrop-blur-sm',
          'border border-platinum/20 dark:border-platinum/10',
          'p-6 sm:p-8',
          {
            'bg-white/90 dark:bg-charcoal-dark/90 shadow-premium':
              variant === 'primary',
            'bg-gradient-to-br from-white/50 to-white/30 dark:from-charcoal-dark/50 dark:to-charcoal-dark/30':
              variant === 'secondary',
            [`hover:shadow-premium-hover
              hover:border-gold/30
              dark:hover:border-gold/20
              transform
              hover:-translate-y-1
              hover:scale-[1.02]
              transition-all
              duration-300
              ease-out`]: hover,
          },
          className
        )}
      >
        <div className="relative z-10">{children}</div>
        {variant === 'primary' && (
          <div className="absolute inset-0 bg-gradient-to-br from-gold/5 to-transparent rounded-lg pointer-events-none" />
        )}
        <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-white/5 via-transparent to-black/5 dark:from-white/5 dark:via-transparent dark:to-white/5 pointer-events-none" />
      </div>
    </div>
  );
}
