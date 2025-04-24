import LandingHero from '@/components/LandingHero';
import AboutContent from '@/components/sections/AboutContent'; // Adjust path if needed
import PricingContent from '@/components/sections/PricingContent'; // Adjust path if needed
import ContactContent from '@/components/sections/ContactContent'; // Adjust path if needed

export default function Home() {
  return (
    // No need for extra motion container here unless desired
    <>
      {/* Hero Section */}
      <section id="home">
        <LandingHero />
      </section>

      {/* About Section */}
      {/* Add padding top/bottom for spacing between sections */}
      <section
        id="about"
        className="py-16 md:py-24 bg-platinum dark:bg-platinum-dark"
      >
        <AboutContent />
      </section>

      {/* Pricing Section */}
      <section
        id="pricing"
        className="py-16 md:py-24 bg-ivory dark:bg-charcoal"
      >
        {' '}
        {/* Example different bg */}
        <PricingContent />
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="py-16 md:py-24 bg-platinum dark:bg-platinum-dark"
      >
        <ContactContent />
      </section>
    </>
  );
}
