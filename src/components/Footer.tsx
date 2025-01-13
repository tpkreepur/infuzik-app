'use client';

import Button from './Button';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-white/80 dark:bg-charcoal/80 backdrop-blur-sm border-t border-platinum/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {/* Back to Top Button - Centered */}
          <div className="flex justify-center order-1 md:order-2">
            <Button
              variant="secondary"
              onClick={scrollToTop}
              className="!px-6 !py-2 flex items-center gap-2 group"
            >
              <span>Back to Top</span>
            </Button>
          </div>

          {/* Social Links - Right Aligned */}
          <div className="flex justify-center md:justify-end space-x-6 order-3">
            <a
              href="https://twitter.com/infuzik"
              target="_blank"
              rel="noopener noreferrer"
              className="text-charcoal/60 dark:text-platinum/60 hover:text-gold transition-colors p-2"
            >
              <svg
                className="h-6 w-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </a>
            <a
              href="https://linkedin.com/company/infuzik"
              target="_blank"
              rel="noopener noreferrer"
              className="text-charcoal/60 dark:text-platinum/60 hover:text-gold transition-colors p-2"
            >
              <svg
                className="h-6 w-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
          </div>

          {/* Copyright Section */}
          <div className="text-center md:text-left order-2 md:order-1">
            <span className="text-sm text-charcoal/60 dark:text-platinum/60">
              © {new Date().getFullYear()} Infuzik.
              <br className="md:hidden" /> All rights reserved.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
