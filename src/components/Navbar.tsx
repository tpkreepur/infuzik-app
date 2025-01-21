'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Button from './Button';

const navItems = [
  { label: 'About', href: '/#about', isHash: true },
  { label: 'Pricing', href: '/#pricing', isHash: true },
  { label: 'Contact', href: '/#contact', isHash: true },
  { label: 'Sample', href: '/sample', isHash: false },
  // { label: 'Sign In', href: '/sign-in', isHash: false },
  // { label: 'Sign Up', href: '/sign-up', isHash: false },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const handleNavigation = (item: { href: string; isHash: boolean }) => {
    if (item.isHash) {
      // Only handle scroll if we're on the homepage
      if (pathname === '/') {
        const element = document.querySelector(item.href.substring(1));
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    // Only track scroll position on homepage
    if (pathname !== '/') {
      setActiveSection('');
      return;
    }

    const handleScroll = () => {
      const sections = navItems
        .filter((item) => item.isHash)
        .map((item) => item.href.substring(2));

      const current = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      setActiveSection(current || '');
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);

  return (
    <nav className="fixed w-full bg-white/80 dark:bg-charcoal/80 backdrop-blur-sm z-50 border-b border-platinum/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link
            href="/"
            className="font-bold text-2xl text-charcoal dark:text-platinum"
          >
            Infuzik
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) =>
              item.isHash ? (
                <button
                  key={item.href}
                  onClick={() => handleNavigation(item)}
                  className={`text-charcoal dark:text-platinum hover:text-primary transition-colors ${
                    activeSection === item.href.substring(2) ? 'text-gold' : ''
                  }`}
                >
                  {item.label}
                </button>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-charcoal dark:text-platinum hover:text-primary transition-colors ${
                    pathname === item.href ? 'text-gold' : ''
                  }`}
                >
                  {item.label}
                </Link>
              )
            )}
            <Button
              variant="primary"
              size="sm"
              onClick={() => (window.location.href = '/sign-up')}
            >
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-charcoal dark:text-platinum hover:text-gold transition-colors"
            aria-label="Toggle menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d={
                  isMobileMenuOpen
                    ? 'M6 18L18 6M6 6l12 12'
                    : 'M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5'
                }
              />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden menu-enter ${
            isMobileMenuOpen ? 'menu-enter-active' : ''
          } border-t border-platinum/10 mt-2`}
        >
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) =>
              item.isHash ? (
                <button
                  key={item.href}
                  onClick={() => handleNavigation(item)}
                  className={`block w-full text-left px-3 py-2 rounded-md ${
                    activeSection === item.href.substring(2)
                      ? 'bg-gold/10 text-gold'
                      : 'text-charcoal dark:text-platinum hover:bg-platinum/10'
                  }`}
                >
                  {item.label}
                </button>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block w-full text-left px-3 py-2 rounded-md ${
                    pathname === item.href
                      ? 'bg-gold/10 text-gold'
                      : 'text-charcoal dark:text-platinum hover:bg-platinum/10'
                  }`}
                >
                  {item.label}
                </Link>
              )
            )}
            <div className="px-3 py-2">
              <Button
                variant="primary"
                size="sm"
                onClick={() => (window.location.href = '/sign-up')}
                className="w-full"
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
