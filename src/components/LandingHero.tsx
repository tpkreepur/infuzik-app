'use client';
import Button from '@/components/Button';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

// Animation variants for staggering children
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // Stagger the animation of children
      delayChildren: 0.1, // Small delay before children start animating
    },
  },
};

// Animation variants for individual items
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

export default function LandingHero() {
  const router = useRouter();

  return (
    <div className="relative flex items-center justify-center min-h-screen overflow-hidden px-4 py-16 pt-32 sm:pt-40 md:pt-48">
      {/* Background Image (Moved & Enhanced) */}
      <div
        aria-hidden="true"
        // Position it, ensure it's behind content, adjust opacity/blend mode
        className="absolute inset-0 -z-10 pointer-events-none"
      >
        <div className="absolute inset-0 bg-[url('/static/images/theta.svg')] bg-no-repeat bg-center bg-contain opacity-10 dark:opacity-[0.1] mix-blend-multiply dark:mix-blend-screen" />
        {/* Optional: Add a subtle color overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-platinum/30 via-transparent to-platinum dark:from-platinum-dark/30 dark:via-transparent dark:to-platinum-dark" />
      </div>

      {/* Background Gradient Elements (Subtle) */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 -top-40 -z-20 transform-gpu overflow-hidden blur-3xl sm:-top-80" // Changed z-index
      >
        <div
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-gold/20 to-charcoal/20 dark:from-gold/30 dark:to-platinum/10 opacity-30 dark:opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
        />
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-[calc(100%-60rem)] -z-20 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-65rem)]" // Changed z-index
      >
        <div
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
          className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-gold/20 to-platinum/20 dark:from-gold/30 dark:to-charcoal/10 opacity-20 dark:opacity-10 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
        />
      </div>

      {/* Content Container with Stagger Animation */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="z-10 flex flex-col items-center text-center max-w-4xl"
      >
        {/* Animated Heading - Use Serif Font */}
        <motion.h1
          variants={itemVariants}
          // Use font-serif defined in globals.css/tailwind.config.ts
          className="font-serif text-4xl font-bold tracking-tight text-charcoal dark:text-platinum sm:text-6xl lg:text-7xl leading-tight mb-6"
        >
          Your Sounds,
          <br />
          {/* Use theme's gold color for gradient */}
          <span className="bg-gradient-to-r from-gold via-amber-400 to-gold bg-clip-text text-transparent">
            Supercharged
          </span>
        </motion.h1>

        {/* Animated Paragraph - Use Sans Font */}
        <motion.p
          variants={itemVariants}
          // Ensure sans-serif font is applied (should be default from body)
          className="mt-4 text-lg leading-8 text-charcoal/80 dark:text-platinum/80 sm:text-xl md:text-2xl max-w-2xl mb-10"
        >
          Customizable binaural beats that fuse with your music—engineered for
          focus, fitness, and deep sleep.
        </motion.p>

        {/* Animated Button */}
        <motion.div variants={itemVariants}>
          <Button
            variant="primary"
            size="lg"
            onClick={() => router.push('/pricing')}
            aria-label="Begin your journey - Sign up now"
            // Use gold shadow defined in tailwind.config.ts on hover
            className="shadow-lg hover:shadow-gold transition-shadow duration-300"
          >
            Get Started Now
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}
