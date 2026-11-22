/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./index.html', './assets/js/**/*.js'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        display: ['Outfit', '"Plus Jakarta Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace']
      },
      keyframes: {
        drift: {
          '0%, 100%': { transform: 'translate3d(-2%, -1%, 0) scale(1)' },
          '50%': { transform: 'translate3d(2%, 2%, 0) scale(1.06)' }
        },
        'float-slow': {
          '0%, 100%': { transform: 'translate3d(0, 0, 0)' },
          '50%': { transform: 'translate3d(0, -10px, 0)' }
        },
        'glow-pulse': {
          '0%, 100%': { opacity: '0.35' },
          '50%': { opacity: '0.6' }
        }
      },
      animation: {
        drift: 'drift 18s ease-in-out infinite alternate',
        'float-slow': 'float-slow 7s ease-in-out infinite',
        'glow-pulse': 'glow-pulse 6s ease-in-out infinite'
      }
    }
  },
  plugins: []
};
