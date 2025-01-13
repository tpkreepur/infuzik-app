export default function Contact() {
  return (
    <div className="min-h-screen">
      {/* Call to action */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-neutral-50 to-white dark:from-neutral-900 dark:to-neutral-800">
        <div className="container">
          <div className="animate-fade-up space-y-6 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white">
              Contact Us
            </h2>
            <p className="text-lg sm:text-xl text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto">
              Contact us with any questions or concerns you may have. We're here
              to help.
            </p>
          </div>
        </div>
      </section>

      {/* Cards featuring the three tiers of packages will go below */}
    </div>
  );
}
