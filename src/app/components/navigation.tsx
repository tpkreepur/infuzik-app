"use client";
import { useState } from "react";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full bg-white/80 backdrop-blur-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <a href="/" className="text-2xl font-bold text-gray-800">
            Infuzik
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a
              href="/about"
              className="text-gray-600 hover:text-gray-900 transition"
            >
              About
            </a>
            <a
              href="/pricing"
              className="text-gray-600 hover:text-gray-900 transition"
            >
              Pricing
            </a>
            <a
              href="/contact"
              className="text-gray-600 hover:text-gray-900 transition"
            >
              Contact
            </a>
            <div className="flex items-center space-x-4 pl-8 border-l border-gray-200">
              <a
                href="/login"
                className="text-gray-600 hover:text-gray-900 transition"
              >
                Login
              </a>
              <a
                href="/signup"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Sign Up
              </a>
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            aria-expanded={isOpen}
            aria-label="Toggle navigation menu"
          >
            <svg
              className="h-6 w-6"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 24 24"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } fixed top-16 left-0 right-0 bottom-0 bg-white z-40 transition-transform duration-300 ease-in-out md:hidden`}
      >
        <div className="pt-2 pb-3 space-y-1 px-4">
          <a
            href="/about"
            className="block px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md"
          >
            About
          </a>
          <a
            href="/pricing"
            className="block px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md"
          >
            Pricing
          </a>
          <a
            href="/contact"
            className="block px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md"
          >
            Contact
          </a>
          <div className="pt-4 border-t border-gray-200">
            <a
              href="/login"
              className="block px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md"
            >
              Login
            </a>
            <a
              href="/signup"
              className="block px-3 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-md mt-2"
            >
              Sign Up
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
