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
          glow: 'var(--primary-glow)',
        },
        accent: {
          DEFAULT: 'var(--accent)',
          glow: 'var(--accent-glow)',
        },
        success: 'var(--success)',
        warning: 'var(--warning)',
        danger: 'var(--danger)',
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
