/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      colors: {
        // Holographic palette
        holo: {
          bg: '#04060e',
          panel: '#0a1024',
          accent: '#22d3ee',
          glow: '#67e8f9',
        },
        // Workspace palette
        wood: { 50: '#f5e6d0', 500: '#a47148', 900: '#3a2412' },
        // Constellation palette
        nebula: { 100: '#c084fc', 500: '#7c3aed', 900: '#1e1b4b' },
        // Dashboard palette
        terminal: {
          bg: '#0c0f17',
          panel: '#161b27',
          accent: '#fde047',
          green: '#22c55e',
          red: '#ef4444',
        },
      },
      animation: {
        'pulse-soft': 'pulse 4s cubic-bezier(0.4,0,0.6,1) infinite',
        'scan-line': 'scan 6s linear infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
    },
  },
  plugins: [],
};
