/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        charcoal: {
          DEFAULT: "#333333",
          dark: "#1F1F1F",
        },
        platinum: {
          DEFAULT: "#E5E4E2",
          dark: "#2A2A2A",
        },
        gold: {
          DEFAULT: "#D4AF37",
          light: "#E5C76C",
          dark: "#B69121",
        },
        ivory: {
          DEFAULT: "#FFFFF0",
          dark: "#1F1F1F",
        },
        obsidian: {
          DEFAULT: "#1B1B1E",
          light: "#F5F5F5",
        },
      },
      fontFamily: {
        display: ['var(--font-cormorant)', 'serif'],
        sans: ['var(--font-montserrat)', 'sans-serif'],
      },
      boxShadow: {
        'premium': '0 4px 20px rgba(212, 175, 55, 0.15)',
        'premium-hover': '0 8px 30px rgba(212, 175, 55, 0.25)',
      },
      backgroundImage: {
        'gradient-luxury': 'linear-gradient(135deg, #D4AF37 0%, #E5C76C 100%)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
};
