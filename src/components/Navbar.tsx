'use client';

import React from 'react';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from 'next-themes';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { FaSun, FaMoon, FaBars, FaTimes } from 'react-icons/fa';
import { siteInfo } from '@/lib/site-info';
import clsx from 'clsx';

const NavBar: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const NavLink = ({
    href,
    children,
    onClick,
    className,
  }: {
    href: string;
    children: React.ReactNode;
    onClick?: () => void;
    className?: string;
  }) => {
    const active = pathname === href;
    return (
      <Link href={href} onClick={onClick}>
        <span
          className={clsx(
            'px-2 py-1 inline-block',
            'text-charcoal dark:text-ivory',
            active ? 'text-gold' : 'hover:text-gold dark:hover:text-gold',
            className
          )}
        >
          {children}
          {active && (
            <span className="block h-1 bg-gold rounded-full mt-1"></span>
          )}
        </span>
      </Link>
    );
  };

  return (
    <>
      <header className="fixed top-0 w-full backdrop-blur-sm bg-ivory/90 dark:bg-charcoal/90 border-b border-platinum/10 shadow-sm p-4 z-50">
        <nav className="container max-w-7xl mx-auto h-full flex justify-between items-center px-4 sm:px-6 lg:px-8">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-2">
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
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/about">About</NavLink>
            <NavLink href="/pricing">Pricing</NavLink>
            <NavLink href="/contact">Contact</NavLink>
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

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-charcoal dark:text-ivory hover:text-gold transition-colors"
            aria-label="Toggle Mobile Menu"
          >
            {isMobileMenuOpen ? (
              <FaTimes className="w-6 h-6" /> // Use FaTimes icon
            ) : (
              <FaBars className="w-6 h-6" /> // Use FaBars icon
            )}
          </button>
        </nav>
      </header>

      {/* Mobile Navigation Menu */}
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
                  href="/"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full text-center"
                >
                  Home
                </NavLink>
                <NavLink
                  href="/about"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full text-center"
                >
                  About
                </NavLink>
                <NavLink
                  href="/pricing"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full text-center"
                >
                  Pricing
                </NavLink>
                <NavLink
                  href="/contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full text-center"
                >
                  Contact
                </NavLink>
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
