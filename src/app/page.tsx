export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-neutral-50 to-white dark:from-neutral-900 dark:to-neutral-800">
        <div className="container">
          <div className="animate-fade-up space-y-6 text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-neutral-900 dark:text-white">
              Entrain your mind with Infuzik
            </h1>
            <p className="text-lg sm:text-xl text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto">
              Discover the power of binaural beats and isochronic tones to
              improve focus, relaxation, and sleep.
            </p>
            <button className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-lg animated">
              Get Started
            </button>
          </div>
        </div>
      </section>

      {/* Features and Contact sections with similar updates */}
    </div>
  );
}
