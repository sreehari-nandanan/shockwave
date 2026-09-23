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
        shockwave: {
          void: '#030508',
          bg: '#05080D',
          surface: '#080C12',
          panel: '#0B1118',
          card: '#0E1620',
          border: '#162232',
          borderLight: '#22354E',
          cyan: '#00F0FF',
          cyanGlow: '#00D2FF',
          blue: '#0A84FF',
          blueDark: '#0052CC',
          gold: '#FFE600',
          amber: '#FFB703',
          danger: '#FF3344',
          success: '#00E676',
          muted: '#8395A7',
        }
      },
      fontFamily: {
        orbitron: ['Orbitron', 'sans-serif'],
        rajdhani: ['Rajdhani', 'sans-serif'],
        mono: ['"Chivo Mono"', 'monospace'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'cyan-glow': '0 0 15px rgba(0, 240, 255, 0.35)',
        'cyan-glow-lg': '0 0 30px rgba(0, 240, 255, 0.45)',
        'gold-glow': '0 0 15px rgba(255, 230, 0, 0.35)',
        'danger-glow': '0 0 15px rgba(255, 51, 68, 0.35)',
        'panel-subtle': '0 4px 20px -2px rgba(0, 0, 0, 0.7)',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'signal-sweep': 'sweep 4s linear infinite',
        'scanline': 'scan 8s linear infinite',
      },
      keyframes: {
        sweep: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        scan: {
          '0%': { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '0 100%' },
        }
      }
    },
  },
  plugins: [],
}
