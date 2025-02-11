import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        charcoal: {
          DEFAULT: "#232326",
          dark: "#232326",
        },
        platinum: {
          DEFAULT: "#E5E4E2",
          dark: "#2A2A2A",
        },
        gold: {
          DEFAULT: "#A4863D",
          light: "#E5C76C",
          dark: "#A4863D",
        },
        ivory: {
          DEFAULT: "#F8F7F2",
          dark: "#F8F7F2",
        },
        obsidian: {
          DEFAULT: "#1B1B1E",
          light: "#F5F5F5",
        },
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontSize: {
        "hero-title": "5rem",
      },
      boxShadow: {
        premium: "0 4px 20px DEFAULT",
        "premium-hover": "0 8px 30px rgba(212, 175, 55, 0.25)",
      },
      backgroundImage: {
        "gradient-luxury": "linear-gradient(135deg, #A4863D 0%, #A4863D 100%)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
