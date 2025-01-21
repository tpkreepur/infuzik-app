'use client';

import { useState, useEffect } from 'react';
import Button from './Button';

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Sample', href: '#sample' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.querySelector(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map((item) => item.href.substring(1));
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
  }, []);

  return (
    <nav className="fixed w-full bg-white/80 dark:bg-charcoal/80 backdrop-blur-sm z-50 border-b border-platinum/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={() => scrollToSection('#hero')}
            className="font-bold text-2xl text-charcoal dark:text-platinum"
          >
            Infuzik
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map(({ label, href }) => (
              <button
                key={href}
                onClick={() => scrollToSection(href)}
                className={`text-charcoal dark:text-platinum hover:text-primary transition-colors ${
                  activeSection === href.substring(1) ? 'text-gold' : ''
                }`}
              >
                {label}
              </button>
            ))}
            <Button
              variant="primary"
              size="sm"
              onClick={() => scrollToSection('#contact')}
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
          className={`md:hidden ${
            isMobileMenuOpen ? 'block' : 'hidden'
          } border-t border-platinum/10 mt-2`}
        >
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map(({ label, href }) => (
              <button
                key={href}
                onClick={() => {
                  scrollToSection(href);
                  setIsMobileMenuOpen(false);
                }}
                className={`block w-full text-left px-3 py-2 rounded-md ${
                  activeSection === href.substring(1)
                    ? 'bg-gold/10 text-gold'
                    : 'text-charcoal dark:text-platinum hover:bg-platinum/10'
                }`}
              >
                {label}
              </button>
            ))}
            <div className="px-3 py-2">
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  scrollToSection('#contact');
                  setIsMobileMenuOpen(false);
                }}
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
