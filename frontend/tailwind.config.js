/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        ethix: {
          red: '#E11D48',
          'red-hover': '#BE123C',
          'red-dark': '#9F1239',
          'red-light': '#FDA4AF',
          'red-subtle': '#FFF1F2',
          black: '#07090E',
          dark: '#0D111A',
          card: '#131A27',
          border: '#1F293D',
          muted: '#94A3B8',
          saffron: '#F59E0B',
          saffronLight: '#FEF3C7',
          emerald: '#10B981',
        },
      },
      fontFamily: {
        sans: [
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Oxygen',
          'Ubuntu',
          'Cantarell',
          'sans-serif',
        ],
      },
      boxShadow: {
        'ethix-glow': '0 0 25px -5px rgba(225, 29, 72, 0.25)',
        'ethix-card': '0 8px 30px -10px rgba(0, 0, 0, 0.5)',
      },
    },
  },
  plugins: [],
};
