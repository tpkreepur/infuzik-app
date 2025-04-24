'use client';

import Button from './Button';
import { siteInfo } from '@/lib/site-info';
import { FaTwitter, FaLinkedin } from 'react-icons/fa';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-white/80 dark:bg-charcoal/80 backdrop-blur-sm border-t border-platinum/10 dark:border-platinum/20 shadow-lg">
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
            {siteInfo.social.twitter && (
              <a
                href={siteInfo.social.twitter} // Use variable
                target="_blank"
                rel="noopener noreferrer"
                className="text-charcoal/60 dark:text-platinum/60 hover:text-gold transition-colors p-2"
                aria-label="Twitter" // Add aria-label
              >
                <FaTwitter className="h-6 w-6" />
              </a>
            )}
            {siteInfo.social.linkedin && (
              <a
                href={siteInfo.social.linkedin} // Use variable
                target="_blank"
                rel="noopener noreferrer"
                className="text-charcoal/60 dark:text-platinum/60 hover:text-gold transition-colors p-2"
                aria-label="LinkedIn" // Add aria-label
              >
                <FaLinkedin className="h-6 w-6" />
              </a>
            )}
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
