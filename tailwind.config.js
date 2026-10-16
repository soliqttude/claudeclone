/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        exodus: {
          bg: '#0F0F0F',
          'bg-secondary': '#161616',
          card: '#1A1A1A',
          'card-hover': '#222222',
          accent: '#F1941E',
          'accent-hover': '#E6851A',
          'accent-light': '#F9A940',
          text: '#FFFFFF',
          'text-secondary': '#B8B8B8',
          muted: '#8A8A8A',
          'muted-light': '#6B6B6B',
          success: '#00C096',
          'success-light': '#2DD4AC',
          error: '#FF5E5E',
          'error-light': '#FF7070',
          warning: '#FFA500',
          'warning-light': '#FFB833',
          border: '#2A2A2A',
          'border-light': '#323232',
          divider: '#1F1F1F'
        }
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Helvetica Neue', 'sans-serif']
      },
      fontSize: {
        'xs': ['12px', { lineHeight: '16px', letterSpacing: '0.3px' }],
        'sm': ['14px', { lineHeight: '20px', letterSpacing: '0.2px' }],
        'base': ['16px', { lineHeight: '24px', letterSpacing: '0px' }],
        'lg': ['18px', { lineHeight: '28px', letterSpacing: '0px' }],
        'xl': ['20px', { lineHeight: '28px', letterSpacing: '0px' }],
        '2xl': ['24px', { lineHeight: '32px', letterSpacing: '-0.5px' }],
        '3xl': ['32px', { lineHeight: '40px', letterSpacing: '-1px' }],
      },
      fontWeight: {
        thin: 100,
        extralight: 200,
        light: 300,
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
        extrabold: 800,
      },
      spacing: {
        'safe': 'max(1rem, env(safe-area-inset-bottom))',
        'safe-top': 'env(safe-area-inset-top)',
        'safe-left': 'env(safe-area-inset-left)',
        'safe-right': 'env(safe-area-inset-right)'
      },
      boxShadow: {
        'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.5)',
        'md': '0 4px 6px -1px rgba(0, 0, 0, 0.6)',
        'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.7)',
        'card': '0 2px 8px 0 rgba(0, 0, 0, 0.4)',
        'inner': 'inset 0 1px 3px rgba(0, 0, 0, 0.5)'
      },
      animation: {
        'pulse-subtle': 'pulse-subtle 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fade-in 0.2s ease-out',
        'slide-up': 'slide-up 0.3s ease-out',
        'scale-in': 'scale-in 0.2s ease-out',
        'shimmer': 'shimmer 2s infinite'
      },
      keyframes: {
        'pulse-subtle': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' }
        },
        'fade-in': {
          'from': { opacity: '0' },
          'to': { opacity: '1' }
        },
        'slide-up': {
          'from': { transform: 'translateY(8px)', opacity: '0' },
          'to': { transform: 'translateY(0)', opacity: '1' }
        },
        'scale-in': {
          'from': { transform: 'scale(0.95)', opacity: '0' },
          'to': { transform: 'scale(1)', opacity: '1' }
        },
        'shimmer': {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' }
        }
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'snappy': 'cubic-bezier(0.34, 1.56, 0.64, 1)'
      }
    }
  },
  plugins: []
}
