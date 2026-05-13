const { fontFamily } = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', '"SF Pro Display"', '"SF Pro Text"', '"Helvetica Neue"', ...fontFamily.sans],
      },
      colors: {
        brand: {
          50: '#EEF2FF',
          100: '#E0E7FF',
          200: '#C7D2FE',
          300: '#A5B4FC',
          400: '#818CF8',
          500: '#5B7FFF',
          600: '#4F6FDB',
          700: '#435CBF',
          800: '#374AA3',
          900: '#2B3887',
        },
        accent: {
          peach: '#E9824D',
          rose: '#E88D9A',
          sage: '#5BA88F',
          sky: '#6BB5D4',
          lavender: '#9B8ED8',
        },
        text: {
          primary: '#1A1A2E',
          secondary: '#6B7280',
          tertiary: '#9CA3AF',
          muted: '#D1D5DB',
        },
        mood: {
          calm: '#818CF8',
          warm: '#E9824D',
          love: '#E88D9A',
          danger: '#EF7A8A',
          safe: '#5BA88F',
          cold: '#6BB5D4',
        },
      },
      boxShadow: {
        'card': '0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.04)',
        'card-hover': '0 2px 8px rgba(0,0,0,0.06), 0 8px 24px rgba(0,0,0,0.06)',
        'card-lg': '0 4px 12px rgba(0,0,0,0.04), 0 12px 32px rgba(0,0,0,0.06)',
        'nav': '0 -2px 20px rgba(0,0,0,0.06)',
        'button': '0 1px 2px rgba(0,0,0,0.04)',
        'profile': '0 8px 32px rgba(91,127,255,0.15)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-brand': 'linear-gradient(135deg, #5B7FFF 0%, #818CF8 100%)',
        'gradient-warm': 'linear-gradient(135deg, #E9824D 0%, #E88D9A 100%)',
        'gradient-sage': 'linear-gradient(135deg, #5BA88F 0%, #6BB5D4 100%)',
        'gradient-rose': 'linear-gradient(135deg, #E88D9A 0%, #9B8ED8 100%)',
        'gradient-lavender': 'linear-gradient(135deg, #9B8ED8 0%, #818CF8 100%)',
        'gradient-surface': 'linear-gradient(180deg, #F8F9FA 0%, #F0F1F3 100%)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out 2s infinite',
        'pulse-soft': 'pulseSoft 3s ease-in-out infinite',
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.5s ease-out forwards',
        'slide-down': 'slideDown 0.3s ease-out forwards',
        'scale-in': 'scaleIn 0.35s ease-out forwards',
        'typing-dot': 'typingDot 1.4s infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-16px)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        fadeIn: {
          from: { opacity: '0', transform: 'translateY(8px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          from: { opacity: '0', transform: 'translateY(-12px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          from: { opacity: '0', transform: 'scale(0.92)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
        typingDot: {
          '0%, 60%, 100%': { transform: 'translateY(0)', opacity: '0.4' },
          '30%': { transform: 'translateY(-6px)', opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      borderRadius: {
        '2xl': '16px',
        '3xl': '20px',
        '4xl': '24px',
      },
    },
  },
  plugins: [],
};
