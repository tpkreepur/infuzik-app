import Button from '@/components/Button';
import Card from '@/components/Card';

export default function Home() {
  return (
    <main className="flex flex-col items-center min-h-screen pt-16 px-4 sm:px-6 lg:px-8">
      <section
        id="hero"
        className="min-h-[calc(100vh-4rem)] flex items-center py-16 sm:py-24"
      >
        <div className="space-y-6 sm:space-y-8 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 leading-tight">
            Elevate Your
            <br />
            Mental Performance
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl max-w-2xl text-center mb-6 sm:mb-8 premium-text text-charcoal/80 dark:text-platinum/80">
            Exclusive cognitive enhancement solutions for distinguished leaders
            and executives.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 sm:space-x-4 items-center justify-center">
            <Button variant="primary">Begin Your Journey</Button>
            <Button variant="secondary">Learn More</Button>
          </div>
        </div>
      </section>

      <section
        id="about"
        className="min-h-screen w-full flex items-center py-16 sm:py-24"
      >
        {/* TODO: about section content */}
      </section>

      <section id="pricing" className="min-h-screen flex items-center">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 w-full max-w-7xl mx-auto">
          <Card>
            <h3 className="text-2xl font-bold mb-4">Gold Package</h3>
            <p className="premium-text">
              Experience cognitive enhancement with our cutting-edge solutions.
            </p>
          </Card>
          <Card>
            <h3 className="text-2xl font-bold mb-4">Platinum Package</h3>
            <p className="premium-text">
              Dedicated assistance tailored to your executive lifestyle.
            </p>
          </Card>
        </div>
      </section>
      <section id="contact" className="min-h-screen flex items-center">
        {/* TODO: contact section content */}
      </section>
    </main>
  );
}
