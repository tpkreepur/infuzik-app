'use client';
import { motion } from 'framer-motion';
import FrostedCard from '@/components/FrostedCard';
import { FaUsers, FaCog, FaGift, FaCheckCircle } from 'react-icons/fa';

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

export default function About() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-col items-center min-h-screen py-16 px-4 sm:px-6 lg:px-8 gap-12 md:gap-16"
    >
      {/* Section 1: Who We Are */}
      <motion.div variants={itemVariants} className="w-full max-w-3xl">
        <FrostedCard className="p-6 sm:p-8 md:p-10">
          <div className="flex items-center gap-4 mb-4 sm:mb-6">
            <FaUsers className="text-gold text-2xl sm:text-3xl flex-shrink-0" />
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-charcoal dark:text-platinum leading-tight">
              Who We Are
            </h2>
          </div>
          {/* Updated Content */}
          <h3 className="text-lg sm:text-xl font-medium text-gold mb-3">
            Infuzik: Where Sound Science Meets Your Rhythm
          </h3>
          <p className="text-base sm:text-lg leading-relaxed text-charcoal/80 dark:text-platinum/80">
            We’re not just another binaural beats company—we’re obsessive sound
            scientists turned innovators. After a decade of using generic beats
            that never <i>quite</i> fit our lives, we became our own lab rats.
            Frustrated by one-size-fits-all solutions, we engineered beats that
            adapt to <i>your</i> day—whether you’re crushing deadlines, chasing
            PRs at the gym, or finally getting that deep sleep you deserve. Now,
            we’re on a mission to turn <i>your</i> playlists into precision
            tools for living better.
          </p>
        </FrostedCard>
      </motion.div>

      {/* Section 2: What We Do */}
      <motion.div variants={itemVariants} className="w-full max-w-3xl">
        <FrostedCard className="p-6 sm:p-8 md:p-10">
          <div className="flex items-center gap-4 mb-4 sm:mb-6">
            <FaCog className="text-gold text-2xl sm:text-3xl flex-shrink-0" />
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-charcoal dark:text-platinum leading-tight">
              What We Do
            </h2>
          </div>
          {/* Updated Content */}
          <h3 className="text-lg sm:text-xl font-medium text-gold mb-3">
            Upgrade Every Moment with Sound
          </h3>
          <p className="text-base sm:text-lg leading-relaxed text-charcoal/80 dark:text-platinum/80 mb-4">
            Imagine: Your workout playlist supercharged with focus-enhancing
            Alpha waves. White noise for sleep, infused with sleep-optimizing
            Delta frequencies. A presentation soundtrack that sharpens your
            mental clarity—no distracting fluff.
          </p>
          <p className="text-base sm:text-lg leading-relaxed text-charcoal/80 dark:text-platinum/80 mb-4">
            We’ve reengineered binaural beats to{' '}
            <strong>work with your life</strong>, not against it:
          </p>
          <ul className="list-none space-y-2 text-base sm:text-lg text-charcoal/80 dark:text-platinum/80">
            <li className="flex items-start gap-2">
              <FaCheckCircle className="text-gold mt-1 flex-shrink-0" />
              <span>
                <strong>Custom Fusion Technology:</strong> Layer beats with
                <i> your</i> music, podcasts, or ASMR
              </span>
            </li>
            <li className="flex items-start gap-2">
              <FaCheckCircle className="text-gold mt-1 flex-shrink-0" />
              <span>
                <strong>Activity-Specific Frequencies:</strong> Scientifically
                tuned for work, fitness, sleep, and flow states
              </span>
            </li>
            <li className="flex items-start gap-2">
              <FaCheckCircle className="text-gold mt-1 flex-shrink-0" />
              <span>
                <strong>Zero Distractions:</strong> Unlike YouTube mixes, our
                focus beats are pure frequency fuel
              </span>
            </li>
          </ul>
        </FrostedCard>
      </motion.div>

      {/* Section 3: What We Offer */}
      <motion.div variants={itemVariants} className="w-full max-w-3xl">
        <FrostedCard className="p-6 sm:p-8 md:p-10">
          <div className="flex items-center gap-4 mb-4 sm:mb-6">
            <FaGift className="text-gold text-2xl sm:text-3xl flex-shrink-0" />
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-charcoal dark:text-platinum leading-tight">
              What We Offer
            </h2>
          </div>
          {/* Updated Content */}
          <h3 className="text-lg sm:text-xl font-medium text-gold mb-4">
            Your Personal Sound Lab
          </h3>
          {/* Table */}
          <div className="overflow-x-auto mb-6">
            {' '}
            {/* Added overflow for smaller screens */}
            <table className="w-full text-left border-collapse text-base sm:text-lg">
              <thead className="border-b border-platinum/30 dark:border-charcoal/30">
                <tr>
                  <th className="py-2 pr-2 font-semibold text-charcoal dark:text-platinum">
                    Core Features
                  </th>
                  <th className="py-2 pl-2 font-semibold text-charcoal dark:text-platinum">
                    Why It Matters
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-platinum/20 dark:divide-charcoal/20">
                <tr>
                  <td className="py-3 pr-2 text-charcoal/80 dark:text-platinum/80">
                    <strong>Customizable Beats+</strong>
                  </td>
                  <td className="py-3 pl-2 text-charcoal/80 dark:text-platinum/80">
                    Blend Delta/Alpha/Theta waves with <i>any</i> audio source
                    (Spotify, white noise, etc.)
                  </td>
                </tr>
                <tr>
                  <td className="py-3 pr-2 text-charcoal/80 dark:text-platinum/80">
                    <strong>Bone Conduction Bundles</strong>
                  </td>
                  <td className="py-3 pl-2 text-charcoal/80 dark:text-platinum/80">
                    Open-ear listening for safe workouts/commutes (curated
                    headsets + beat pairings)
                  </td>
                </tr>
                <tr>
                  <td className="py-3 pr-2 text-charcoal/80 dark:text-platinum/80">
                    <strong>Focus Mode Beats</strong>
                  </td>
                  <td className="py-3 pl-2 text-charcoal/80 dark:text-platinum/80">
                    Distraction-free productivity pulses (no ambient music
                    masking benefits)
                  </td>
                </tr>
                <tr>
                  <td className="py-3 pr-2 text-charcoal/80 dark:text-platinum/80">
                    <strong>Sleep Science Sessions</strong>
                  </td>
                  <td className="py-3 pl-2 text-charcoal/80 dark:text-platinum/80">
                    Wind down with your favorite nature sounds (coming soon!) +
                    clinically-tested Delta sequences
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Bullet Points */}
          <h4 className="text-md sm:text-lg font-semibold text-gold mb-3">
            More Than Subscriptions—We’re Your Sound Squad
          </h4>
          <ul className="list-none space-y-2 text-base sm:text-lg text-charcoal/80 dark:text-platinum/80">
            <li className="flex items-start gap-2">
              <FaCheckCircle className="text-gold mt-1 flex-shrink-0" />
              <span>
                10+ years of beat-curation expertise in every frequency
              </span>
            </li>
            <li className="flex items-start gap-2">
              <FaCheckCircle className="text-gold mt-1 flex-shrink-0" />
              <span>
                Hardware/software integration you won’t find on meditation apps
              </span>
            </li>
            <li className="flex items-start gap-2">
              <FaCheckCircle className="text-gold mt-1 flex-shrink-0" />
              <span>
                Updates shaped by neuroacoustic research (we geek out so you
                don’t have to)
              </span>
            </li>
          </ul>
        </FrostedCard>
      </motion.div>
    </motion.div>
  );
}
