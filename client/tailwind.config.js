/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sora: ['Sora', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        bg: {
          base: 'var(--bg-base)',
          surface: 'var(--bg-surface)',
          glass: 'var(--bg-glass)',
        },
        border: 'var(--border)',
        primary: {
          DEFAULT: 'var(--primary)',
          dark: '#4f46e5',
          glow: 'var(--primary-glow)',
        },
        accent: {
          DEFAULT: 'var(--accent)',
          glow: 'var(--accent-glow)',
        },
        success: 'var(--success)',
        safe: {
          DEFAULT: '#22c55e',
          dark: '#16a34a',
        },
        warning: {
          DEFAULT: 'var(--warning)',
          dark: '#d97706',
        },
        danger: {
          DEFAULT: 'var(--danger)',
          dark: '#dc2626',
        },
        critical: 'var(--critical)',
        text: {
          primary: 'var(--text-primary)',
          muted: 'var(--text-muted)',
        }
      }
    },
  },
  plugins: [],
}
