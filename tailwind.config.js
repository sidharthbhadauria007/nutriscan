/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        cobalt: {
          950: '#060a14',
          900: '#0a0f1d',
          850: '#0d1527',
          800: '#0f172a',
          700: '#1e293b',
          600: '#334155',
        },
        terracotta: {
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
        },
        emerald: {
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
        },
        danger: {
          400: '#f87171',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
          900: '#7f1d1d',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', '"Cormorant Garamond"', 'Georgia', 'serif'],
        editorial: ['"Cormorant Garamond"', '"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        'glass-sm': '0 4px 20px -2px rgba(0, 0, 0, 0.45), 0 0 0 1px rgba(255, 255, 255, 0.1)',
        'glass-md': '0 8px 32px 0 rgba(0, 0, 0, 0.55), 0 0 0 1px rgba(255, 255, 255, 0.12)',
        'glass-lg': '0 20px 50px -10px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(255, 255, 255, 0.15)',
        'glass-3d': '0 30px 60px -12px rgba(0, 0, 0, 0.8), 0 18px 36px -18px rgba(0, 0, 0, 0.9), 0 0 0 1px rgba(255, 255, 255, 0.15), inset 0 1px 0 0 rgba(255, 255, 255, 0.2)',
        'emerald-glow': '0 0 35px -5px rgba(5, 150, 105, 0.45)',
        'terracotta-glow': '0 0 35px -5px rgba(234, 88, 12, 0.45)',
        'crimson-glow': '0 0 45px -5px rgba(220, 38, 38, 0.65)',
        'neon-laser': '0 0 20px 4px rgba(16, 185, 129, 0.75), inset 0 0 10px rgba(52, 211, 153, 0.8)',
      },
      keyframes: {
        laserSweep: {
          '0%': { transform: 'translateY(-10%)', opacity: '0.9' },
          '50%': { transform: 'translateY(110%)', opacity: '1' },
          '100%': { transform: 'translateY(-10%)', opacity: '0.9' },
        },
        pulseSlow: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
        },
        floatOrb: {
          '0%, 100%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -40px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.95)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      },
      animation: {
        'laser-sweep': 'laserSweep 2.5s ease-in-out infinite',
        'pulse-slow': 'pulseSlow 6s ease-in-out infinite',
        'float-orb-1': 'floatOrb 14s ease-in-out infinite',
        'float-orb-2': 'floatOrb 18s ease-in-out infinite reverse',
        'shimmer': 'shimmer 2.5s infinite linear',
      }
    },
  },
  plugins: [],
}
