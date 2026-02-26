/** Tailwind base theme config (global) */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'deep-blue': '#1A2A80',
        'royal-purple': '#3B38A0',
        'soft-blue': '#7A85C1',
        'lavender': '#B2B0E8',
        primary: '#1A2A80',
        secondary: '#7A85C1',
      },
      fontFamily: {
        inter: ["Inter", 'sans-serif'],
      },
      boxShadow: {
        card: '0 10px 25px -5px rgba(59, 56, 160, 0.2), 0 8px 10px -6px rgba(59, 56, 160, 0.15)',
        'soft-shadow': '0 4px 6px -1px rgba(59, 56, 160, 0.1), 0 2px 4px -1px rgba(59, 56, 160, 0.06)',
      },
      borderRadius: {
        xl: '0.75rem',
        '2xl': '1rem',
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(to right, #1A2A80, #3B38A0)',
        'gradient-hover': 'linear-gradient(to right, #7A85C1, #B2B0E8)',
      },
    },
  },
  plugins: [],
};


