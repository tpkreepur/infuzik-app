'use client';
import Button from '@/components/Button';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col items-center justify-center min-h-screen"
    >
      <div className="space-y-6 sm:space-y-8 text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 leading-tight">
          Elevate Your
          <br />
          Mental State
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl max-w-2xl text-center mb-6 sm:mb-8 premium-text text-charcoal/80 dark:text-platinum/80">
          Let Infuzik entrain your brain to the perfect frequency for focus,
          relaxation, or sleep.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 sm:space-x-4 items-center justify-center">
          <Button
            variant="primary"
            onClick={() => router.push('/sign-up')}
            aria-label="Begin your journey - Sign up now"
          >
            Get Started
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
