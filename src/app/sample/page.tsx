import AudioPlayer from '@/components/AudioPlayer';

export default function Sample() {
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
          <AudioPlayer />
        </div>
      </section>
    </main>
  );
}
