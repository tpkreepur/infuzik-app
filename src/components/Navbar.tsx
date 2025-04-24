'use client';

import React from 'react';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from 'next-themes';
import Image from 'next/image';
// import Link from 'next/link';
import { FaSun, FaMoon, FaBars, FaTimes } from 'react-icons/fa';
import { siteInfo } from '@/lib/site-info';
import clsx from 'clsx';

// Smooth scroll function
const smoothScrollTo = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    const offset = 70; // Adjust based on your fixed navbar height
    const bodyRect = document.body.getBoundingClientRect().top;
    const elementRect = element.getBoundingClientRect().top;
    const elementPosition = elementRect - bodyRect;
    const offsetPosition = elementPosition - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    });
  }
};

const NavBar: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [activeSection, setActiveSection] = useState('home'); // State to track active section

  useEffect(() => {
    setMounted(true);

    // Intersection Observer to track active section
    const sections = ['home', 'about', 'pricing', 'contact']; // IDs of your sections
    const observerOptions = {
      root: null, // relative to document viewport
      rootMargin: '-50% 0px -50% 0px', // Trigger when section is in the middle 50% of the viewport
      threshold: 0, // Trigger as soon as any part enters/leaves the margin
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    // Cleanup observer on component unmount
    return () => {
      sections.forEach((id) => {
        const element = document.getElementById(id);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, []); // Run only once on mount

  if (!mounted) return null;

  // Reusable NavLink component adapted for single-page
  const NavLink = ({
    sectionId, // Use sectionId instead of href
    children,
    onClick,
    className,
  }: {
    sectionId: string;
    children: React.ReactNode;
    onClick?: () => void;
    className?: string;
  }) => {
    const active = activeSection === sectionId;

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault(); // Prevent default anchor behavior
      smoothScrollTo(sectionId);
      if (onClick) {
        onClick(); // Call original onClick (e.g., for closing mobile menu)
      }
    };

    return (
      // Use an anchor tag for semantic correctness with hash links
      <a
        href={`#${sectionId}`} // Keep href for accessibility/SEO
        onClick={handleClick}
        className={clsx(
          'px-2 py-1 inline-block cursor-pointer', // Added cursor-pointer
          'text-charcoal dark:text-ivory',
          active ? 'text-gold' : 'hover:text-gold dark:hover:text-gold',
          className
        )}
      >
        {children}
        {active && (
          <span className="block h-1 bg-gold rounded-full mt-1"></span>
        )}
      </a>
    );
  };

  return (
    <>
      {/* Header remains largely the same */}
      <header className="fixed top-0 w-full backdrop-blur-sm bg-ivory/90 dark:bg-charcoal/90 border-b border-platinum/10 shadow-sm p-4 z-50">
        <nav className="container max-w-7xl mx-auto h-full flex justify-between items-center px-4 sm:px-6 lg:px-8">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-2">
            {/* Make logo scroll to top */}
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                smoothScrollTo('home');
              }}
              className="flex items-center space-x-2 cursor-pointer"
            >
              <Image
                src={siteInfo.brand.logo}
                alt={siteInfo.brand.name}
                width={40}
                height={40}
                className="object-contain"
              />
              <span className="font-semibold text-xl text-charcoal dark:text-platinum">
                {siteInfo.brand.name}
              </span>
            </a>
          </div>

          {/* Desktop Navigation - Use sectionId */}
          <div className="hidden md:flex items-center space-x-4">
            <NavLink sectionId="home">Home</NavLink>
            <NavLink sectionId="about">About</NavLink>
            <NavLink sectionId="pricing">Pricing</NavLink>
            <NavLink sectionId="contact">Contact</NavLink>
            {/* Theme toggle remains the same */}
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-lg hover:bg-platinum/20 dark:hover:bg-obsidian/20 transition-colors"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? (
                <FaSun className="text-gold text-xl" />
              ) : (
                <FaMoon className="text-charcoal dark:text-ivory text-xl" />
              )}
            </button>
          </div>

          {/* Mobile Menu Button remains the same */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-charcoal dark:text-ivory hover:text-gold transition-colors"
            aria-label="Toggle Mobile Menu"
          >
            {isMobileMenuOpen ? (
              <FaTimes className="w-6 h-6" />
            ) : (
              <FaBars className="w-6 h-6" />
            )}
          </button>
        </nav>
      </header>

      {/* Mobile Navigation Menu - Use sectionId */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-x-0 top-16 md:hidden bg-ivory/95 dark:bg-charcoal/95 backdrop-blur-sm border-b border-platinum/10 shadow-lg z-40"
          >
            <nav className="max-w-7xl mx-auto px-4 py-4">
              <div className="flex flex-col items-center space-y-4">
                <NavLink
                  sectionId="home"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full text-center"
                >
                  Home
                </NavLink>
                <NavLink
                  sectionId="about"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full text-center"
                >
                  About
                </NavLink>
                <NavLink
                  sectionId="pricing"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full text-center"
                >
                  Pricing
                </NavLink>
                <NavLink
                  sectionId="contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full text-center"
                >
                  Contact
                </NavLink>
                {/* Theme toggle remains the same */}
                <button
                  onClick={() => {
                    setTheme(theme === 'dark' ? 'light' : 'dark');
                    setIsMobileMenuOpen(false);
                  }}
                  className="p-2 rounded-lg hover:bg-platinum/20 dark:hover:bg-obsidian/20 transition-colors"
                  aria-label="Toggle Theme"
                >
                  {theme === 'dark' ? (
                    <FaSun className="text-gold text-xl" />
                  ) : (
                    <FaMoon className="text-charcoal dark:text-ivory text-xl" />
                  )}
                </button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default NavBar;
