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
          50: '#f0edff',
          100: '#d4ccff',
          200: '#b4a8ff',
          300: '#9484ff',
          400: '#7c5cfc',
          500: '#6c4cf0',
          600: '#5a3dd6',
          700: '#4a31b8',
          800: '#3b269b',
          900: '#2d1c7d',
        },
        accent: {
          amber: '#F59E0B',
          rose: '#F43F5E',
          emerald: '#10B981',
          cyan: '#06B6D4',
          violet: '#8B5CF6',
        },
        surface: {
          DEFAULT: '#111113',
          alt: '#1A1A1E',
          card: '#1E1E24',
          elevated: '#26262D',
          border: '#2C2C35',
          'border-light': '#3A3A45',
        },
        glass: {
          light: 'rgba(30,30,36,0.7)',
          medium: 'rgba(30,30,36,0.5)',
          heavy: 'rgba(30,30,36,0.3)',
          white: 'rgba(255,255,255,0.06)',
        },
        text: {
          primary: '#F0F0F4',
          secondary: '#A0A0AB',
          tertiary: '#6B6B78',
          dim: '#3D3D46',
        },
        mood: {
          calm: '#818CF8',
          warm: '#FB923C',
          love: '#F472B6',
          danger: '#FB7185',
          safe: '#34D399',
          cold: '#60A5FA',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-brand': 'linear-gradient(135deg, #7C5CFC 0%, #5A3DD6 50%, #4A31B8 100%)',
        'gradient-accent': 'linear-gradient(135deg, #F59E0B 0%, #F43F5E 100%)',
        'gradient-warm': 'linear-gradient(135deg, #F59E0B 0%, #F43F5E 100%)',
        'gradient-calm': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'gradient-sunset': 'linear-gradient(135deg, #F43F5E 0%, #F59E0B 100%)',
        'gradient-ocean': 'linear-gradient(135deg, #06B6D4 0%, #6366F1 100%)',
        'gradient-surface': 'linear-gradient(180deg, #111113 0%, #1A1A1E 100%)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out 2s infinite',
        'pulse-soft': 'pulseSoft 3s ease-in-out infinite',
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
        'slide-down': 'slideDown 0.4s ease-out forwards',
        'scale-in': 'scaleIn 0.4s ease-out forwards',
        'typing-dot': 'typingDot 1.4s infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'heartbeat': 'heartbeat 1.5s ease-in-out infinite',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        },
        fadeIn: {
          from: { opacity: '0', transform: 'translateY(10px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(30px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          from: { opacity: '0', transform: 'translateY(-20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          from: { opacity: '0', transform: 'scale(0.9)' },
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
        heartbeat: {
          '0%, 100%': { transform: 'scale(1)' },
          '15%': { transform: 'scale(1.15)' },
          '30%': { transform: 'scale(1)' },
          '45%': { transform: 'scale(1.08)' },
          '60%': { transform: 'scale(1)' },
        },
        glowPulse: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.7', transform: 'scale(1.05)' },
        },
      },
      backdropBlur: {
        xs: '2px',
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
