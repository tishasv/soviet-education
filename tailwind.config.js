/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cream: '#f5f0e8',
        'cream-dark': '#ede8de',
        navy: '#1a2744',
        'navy-light': '#1e3260',
        red: {
          soviet: '#8b1a1a',
          dark: '#6a1414',
          light: '#a02020',
        },
        gold: {
          DEFAULT: '#c8a240',
          light: '#d4b460',
          dark: '#a88030',
        },
        parchment: '#fffdf7',
        ink: '#2a1f14',
        muted: '#6b5d4f',
        border: '#d4c4a0',
      },
      fontFamily: {
        serif: ['"PT Serif"', 'Georgia', 'serif'],
        sans: ['"PT Sans"', 'system-ui', 'sans-serif'],
        mono: ['"PT Mono"', 'monospace'],
      },
      backgroundImage: {
        'grain': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E\")",
      },
    },
  },
  plugins: [],
}
