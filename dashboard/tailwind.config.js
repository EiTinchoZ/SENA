/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Fondos
        bg: {
          base:     '#04080F',
          surface:  '#080E1A',
          card:     '#0C1525',
          elevated: '#111D30',
          overlay:  '#162844',
        },
        // Bordes
        border: {
          subtle:  '#162035',
          DEFAULT: '#1E2E48',
          strong:  '#2A3F60',
          focus:   '#3B82F6',
        },
        // Primario (azul)
        primary: {
          DEFAULT: '#3B82F6',
          hover:   '#2563EB',
          light:   '#60A5FA',
          muted:   'rgba(59,130,246,0.12)',
        },
        // Acento (ámbar)
        accent: {
          DEFAULT: '#F59E0B',
          hover:   '#D97706',
          muted:   'rgba(245,158,11,0.12)',
        },
        // Señales
        signal: {
          danger:  '#EF4444',
          warning: '#F59E0B',
          safe:    '#10B981',
          info:    '#3B82F6',
          neutral: '#6B7280',
        },
        // Texto
        txt: {
          primary:   '#EFF6FF',
          secondary: '#7CB3E0',
          muted:     '#3D6080',
          inverse:   '#04080F',
        },
      },
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          'sans-serif',
        ],
        mono: [
          '"Cascadia Code"',
          '"Cascadia Mono"',
          'Consolas',
          '"Fira Code"',
          '"Courier New"',
          'monospace',
        ],
      },
      animation: {
        'pulse-slow':    'pulse 3s ease-in-out infinite',
        'spin-slow':     'spin 8s linear infinite',
        'spin-reverse':  'spin-reverse 12s linear infinite',
        'glow-pulse':    'glow-pulse 2.5s ease-in-out infinite',
        'float':         'float 4s ease-in-out infinite',
        'slide-in-up':   'slide-in-up 0.4s ease-out',
        'fade-in':       'fade-in 0.3s ease-out',
        'scale-in':      'scale-in 0.3s ease-out',
        'blink-cursor':  'blink-cursor 1s step-end infinite',
      },
      keyframes: {
        'spin-reverse': {
          from: { transform: 'rotate(0deg)' },
          to:   { transform: 'rotate(-360deg)' },
        },
        'glow-pulse': {
          '0%, 100%': { boxShadow: '0 0 16px rgba(59,130,246,0.15), 0 0 32px rgba(59,130,246,0.06)' },
          '50%':      { boxShadow: '0 0 24px rgba(59,130,246,0.30), 0 0 48px rgba(59,130,246,0.12)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-8px)' },
        },
        'slide-in-up': {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
        'scale-in': {
          from: { opacity: '0', transform: 'scale(0.95)' },
          to:   { opacity: '1', transform: 'scale(1)' },
        },
        'blink-cursor': {
          '0%, 100%': { opacity: '1' },
          '50%':      { opacity: '0' },
        },
      },
      boxShadow: {
        'card':     '0 1px 3px rgba(0,0,0,0.4), 0 1px 2px rgba(0,0,0,0.2)',
        'elevated': '0 10px 40px rgba(0,0,0,0.5), 0 4px 16px rgba(0,0,0,0.3)',
        'glow-blue': '0 0 20px rgba(59,130,246,0.15), 0 0 40px rgba(59,130,246,0.08)',
        'glow-amber': '0 0 20px rgba(245,158,11,0.15), 0 0 40px rgba(245,158,11,0.08)',
        'glow-red': '0 0 20px rgba(239,68,68,0.15)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-mesh':   'radial-gradient(at 40% 20%, rgba(59,130,246,0.10) 0, transparent 50%), radial-gradient(at 80% 0%, rgba(99,102,241,0.08) 0, transparent 50%), radial-gradient(at 0% 50%, rgba(16,185,129,0.04) 0, transparent 50%)',
      },
    },
  },
  plugins: [],
}
