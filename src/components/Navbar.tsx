'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import Button from './Button';

const navItems = [
  { label: 'About', href: '/about', isHash: false },
  { label: 'Pricing', href: '/pricing', isHash: false },
  { label: 'Contact', href: '/contact', isHash: false },
  // { label: 'Sample', href: '/sample', isHash: false },
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
        <div className="flex items-center h-16">
          {/* Logo and Title Group */}
          <div className="flex items-center gap-2">
            <Image src="/logo.png" alt="Infuzik Logo" width={48} height={48} />
            <Link
              href="/"
              className="font-bold text-2xl text-charcoal dark:text-platinum"
            >
              Infuzik
            </Link>
          </div>
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center ml-auto space-x-8">
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
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-charcoal dark:text-platinum hover:text-gold transition-colors"
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
                  d="M3.75 5.25h16.5M3.75 12h16.5m-16.5 6.75h16.5"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
