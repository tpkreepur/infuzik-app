'use client';
import { motion } from 'framer-motion';
import FrostedCard from '@/components/FrostedCard';

const containerVariants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.2, // delay between each child
    },
  },
};

const cardVariants = {
  initial: { opacity: 1, y: 50 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function About() {
  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
      className="flex flex-col items-center justify-center min-h-screen p-6 space-y-6" // space-y-6 adds vertical spacing
    >
      <motion.div variants={cardVariants} className="w-full max-w-2xl">
        <FrostedCard>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 leading-tight text-left">
            Who we are
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl text-left mb-6 sm:mb-8 text-charcoal/80 dark:text-platinum/80">
            Infuzik was started by Binaural Beats enthusiasts with close to 10
            years experiencing the benefits of Binaural Beats. Over the years we
            have tried beats from several different providers. Not finding
            exactly what we wanted we decided to develop our own. Once we
            succeeded, we realized that others could benefit from our customized
            beats and thus Infuzik was born.
          </p>
        </FrostedCard>
      </motion.div>

      <motion.div variants={cardVariants} className="w-full max-w-2xl">
        <FrostedCard>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 leading-tight text-left">
            What we do
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl text-left mb-6 sm:mb-8 text-charcoal/80 dark:text-platinum/80">
            We offer Binaural Beats with customized settings that are intended
            to be used by themselves when no distractions are desired, also
            offering a service to combine beats with the music of your choice.
            This allows you to listen to what you want and experience the
            benefits of Binaural Beats at the same time. What you want to listen
            to doesn’t even have to be music. Some like to prepare for sleep
            listening to white noise, calming sounds or even ASMR. Combining
            that with Delta waves for sleep provides a powerful improvement to
            your sleep regimen. Combining Alpha waves with your favorite
            playlist can supercharge your workout. Guided meditation combined
            with Theta waves will get you in the zone and help you stay there.
            Waking up to Alpha waves while you get ready for work can be your
            digital cup of coffee.
          </p>
        </FrostedCard>
      </motion.div>

      <motion.div variants={cardVariants} className="w-full max-w-2xl">
        <FrostedCard>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 leading-tight text-left">
            What we offer
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl text-left mb-6 sm:mb-8 text-charcoal/80 dark:text-platinum/80">
            Our products We offer subscription-based access to customized
            Binaural Beats with unique settings that can be used beyond
            meditation and sleep settings (we offer meditation and sleep beats
            too). The focus categories of beats we offer are intended to be used
            during activities such as exercise and work. When combined with bone
            conduction headsets (that we also offer) experiencing the benefits
            of extra focus during work hours becomes convenient. Our beats for
            work do not have an ambient music overlay as is generally found from
            YouTube or App offerings from others. This removes distraction while
            still providing the focus benefits.
          </p>
        </FrostedCard>
      </motion.div>
    </motion.div>
  );
}
