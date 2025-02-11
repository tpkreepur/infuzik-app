'use client';

import Card from '@/components/Card';

export default function Pricing() {
  return (
    <main className="flex flex-col items-center min-h-screen pt-16 px-4 sm:px-6 lg:px-8">
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
    </main>
  );
}
