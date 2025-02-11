/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        charcoal: {
          DEFAULT: '#232326',
          dark: '#232326',
        },
        platinum: {
          DEFAULT: '#E5E4E2',
          dark: '#2A2A2A',
        },
        gold: {
          DEFAULT: '#A4863D',
          // light: '#E5C76C',
          dark: '#A4863D',
        },
        ivory: {
          DEFAULT: '#F8F7F2',
          dark: '#F8F7F2',
        },
        obsidian: {
          DEFAULT: '#1B1B1E',
          light: '#F5F5F5',
        },
      },
      fontFamily: {
        serif: ['var(--font-italiana)', 'serif'],
        sans: ['var(--font-roboto-condensed)', 'sans-serif'],
      },
      fontSize: {
        'hero-title': '5rem',
      },
      boxShadow: {
        gold: '0 4px 20px rgba(212, 175, 55, 0.25)', // or your preferred shadow value
        premium: '0 4px 20px rgba(0,0,0,0.1)',
        'premium-hover': '0 8px 30px rgba(212, 175, 55, 0.25)',
      },
      backgroundImage: {
        'gradient-luxury': 'linear-gradient(135deg, #A4863D 0%, #A4863D 100%)',
      },
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
};
