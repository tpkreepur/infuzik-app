export default function Pricing() {
  return (
    <div className="min-h-screen">
      {/* Card Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-neutral-50 to-white dark:from-neutral-900 dark:to-neutral-800">
        <div className="container">
          <div className="animate-fade-up space-y-6 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white">
              Pricing
            </h2>
            <p className="text-lg sm:text-xl text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto">
              The pricing for Infuzik is simple and affordable. Choose the plan
              that works best for you.
            </p>
          </div>
        </div>
      </section>

      {/* Cards featuring the three tiers of packages will go below */}
    </div>
  );
}
