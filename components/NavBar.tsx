// components/NavBar.tsx
"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { FaSun, FaMoon } from "react-icons/fa";
import { siteInfo } from "@/lib/site-info";
import React from "react";

const NavBar: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Helper component for a nav link with active styling
  const NavLink = ({
    href,
    children,
  }: {
    href: string;
    children: React.ReactNode;
  }) => {
    const active = pathname === href;
    return (
      <Link href={href}>
        <span
          className={`
            px-2 py-1 inline-block 
            text-charcoal dark:text-ivory 
            ${active ? "text-gold" : "hover:text-gold dark:hover:text-gold"}
          `}
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
    <header className="fixed top-0 w-full backdrop-blur-md bg-platinum/30 dark:bg-charcoal shadow-sm p-4 z-50">
      <nav className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Image
            src={siteInfo.brand.logo}
            alt={siteInfo.brand.name}
            width={32}
            height={32}
            className="object-contain"
          />
          <span className="font-semibold text-xl text-charcoal dark:text-ivory">
            {siteInfo.brand.name}
          </span>
        </div>
        <div className="flex items-center space-x-4">
          <NavLink href="/">Home</NavLink>
          <NavLink href="/about">About</NavLink>
          <NavLink href="/contact">Contact</NavLink>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="ml-4 p-2 rounded hover:bg-platinum/40 dark:hover:bg-obsidian transition"
            aria-label="Toggle Theme"
          >
            {theme === "dark" ? (
              <FaSun className="text-gold text-xl" />
            ) : (
              <FaMoon className="text-charcoal dark:text-ivory text-xl" />
            )}
          </button>
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
