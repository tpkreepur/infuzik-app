'use client';
import { Suspense } from 'react';
import AudioPlayer from '@/components/AudioPlayer';
import { ErrorBoundary } from '@/components/ErrorBoundary';

function LoadingFallback() {
  return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-accent"></div>
      <span className="sr-only">Loading audio player...</span>
    </div>
  );
}

export default function Sample() {
  return (
    <main className="flex flex-col items-center min-h-screen pt-16 px-4 sm:px-6 lg:px-8">
      <section
        id="hero"
        className="min-h-[calc(100vh-4rem)] flex items-center py-16 sm:py-24"
      >
        <div className="space-y-6 sm:space-y-8 text-center">
          <p className="text-lg sm:text-xl md:text-2xl max-w-2xl text-center mb-6 sm:mb-8 premium-text text-charcoal/80 dark:text-platinum/80">
            Experience our cognitive enhancement technology with this interactive demo.
          </p>
          <ErrorBoundary>
            <Suspense fallback={<LoadingFallback />}>
              <AudioPlayer defaultPreset="focus" />
            </Suspense>
          </ErrorBoundary>
        </div>
      </section>
    </main>
  );
}
