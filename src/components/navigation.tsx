"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Lock scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const navItems = ["About", "Pricing", "Contact"];

  const NavLink = ({
    href,
    children,
  }: {
    href: string;
    children: React.ReactNode;
  }) => {
    const isActive = pathname === href;
    return (
      <Link
        href={href}
        className={`${
          isActive
            ? "text-primary-600 dark:text-primary-400"
            : "text-neutral-600 hover:text-primary-600 dark:text-neutral-300 dark:hover:text-primary-400"
        } animated`}
      >
        {children}
      </Link>
    );
  };

  return (
    <nav className="fixed w-full bg-white/80 dark:bg-neutral-900/80 backdrop-blur-sm z-50 border-b border-neutral-200 dark:border-neutral-800">
      <div className="container h-16">
        <div className="flex justify-between items-center h-full">
          <a
            href="/"
            className="text-2xl font-bold text-primary-600 dark:text-primary-400 animated"
          >
            Infuzik
          </a>

          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <NavLink key={item} href={`/${item.toLowerCase()}`}>
                {item}
              </NavLink>
            ))}
            <div className="flex items-center space-x-4 pl-8 border-l border-neutral-200 dark:border-neutral-700">
              <Link
                href="/login"
                className="text-neutral-600 hover:text-primary-600 dark:text-neutral-300 dark:hover:text-primary-400 animated"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="bg-primary-600 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600 text-white px-4 py-2 rounded-lg animated"
              >
                Sign Up
              </Link>
            </div>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-md text-neutral-600 hover:text-primary-600 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:text-primary-400 dark:hover:bg-neutral-800 animated"
            aria-expanded={isOpen}
            aria-label="Toggle navigation menu"
            aria-controls="mobile-menu"
          >
            <span className="sr-only">Toggle menu</span>
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
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

      <div
        id="mobile-menu"
        className={`${
          isOpen ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"
        } fixed top-16 left-0 right-0 bottom-0 bg-white dark:bg-neutral-900 z-40 transition-all duration-300 ease-in-out md:hidden`}
        role="dialog"
        aria-modal="true"
      >
        <div className="flex flex-col p-4 space-y-4">
          {navItems.map((item) => (
            <NavLink key={item} href={`/${item.toLowerCase()}`}>
              {item}
            </NavLink>
          ))}
          <div className="pt-4 mt-4 border-t border-neutral-200 dark:border-neutral-700">
            <div className="flex flex-col space-y-4">
              <Link
                href="/login"
                className="text-neutral-600 hover:text-primary-600 dark:text-neutral-300 dark:hover:text-primary-400 animated"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="bg-primary-600 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600 text-white px-4 py-2 rounded-lg text-center animated"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
