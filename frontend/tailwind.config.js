/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // High-impact colors inspired by the flyer
        ethioGreen: {
          DEFAULT: '#006a4e', // Primary deep green
          light: '#008f68',
          dark: '#004d38',
        },
        ethioBlack: {
          DEFAULT: '#0a0a0a', // True deep background black
          light: '#161616',   // For card backgrounds
        },
        ethioGray: {
          100: '#f5f5f5',
          400: '#a3a3a3',
          700: '#404040',
          800: '#262626',
        }
      },
      fontFamily: {
        // 'Oswald' is perfect for gym headlines (thick and condensed)
        // 'Inter' is great for readable body text
        display: ['Oswald', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        // Gradient overlay for hero sections
        'hero-gradient': 'linear-gradient(to top, rgba(10, 10, 10, 1), rgba(10, 10, 10, 0.4))',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      // For the "hollow" text effect seen in pro fitness sites
      boxShadow: {
        'glow': '0 0 20px rgba(0, 106, 78, 0.3)',
      }
    },
  },
  plugins: [],
}