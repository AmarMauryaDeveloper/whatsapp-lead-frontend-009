export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: 'rgb(var(--color-bg-primary) / <alpha-value>)',
        secondary: 'rgb(var(--color-bg-secondary) / <alpha-value>)',
        elevated: 'rgb(var(--color-bg-elevated) / <alpha-value>)',
        muted: 'rgb(var(--color-bg-muted) / <alpha-value>)',
        hover: 'rgb(var(--color-bg-hover) / <alpha-value>)',
        inverse: 'rgb(var(--color-bg-inverse) / <alpha-value>)',
        overlay: 'rgb(var(--color-overlay) / <alpha-value>)',
        'text-primary': 'rgb(var(--color-text-primary) / <alpha-value>)',
        'text-secondary': 'rgb(var(--color-text-secondary) / <alpha-value>)',
        'text-muted': 'rgb(var(--color-text-muted) / <alpha-value>)',
        'text-inverse': 'rgb(var(--color-text-inverse) / <alpha-value>)',
        'text-on-accent': 'rgb(255 255 255 / <alpha-value>)',
        'border-theme': 'rgb(var(--color-border) / <alpha-value>)',
        'border-strong': 'rgb(var(--color-border-strong) / <alpha-value>)',
        ring: 'rgb(var(--color-ring) / <alpha-value>)',
        chart: {
          primary: 'rgb(var(--color-chart-primary) / <alpha-value>)',
          secondary: 'rgb(var(--color-chart-secondary) / <alpha-value>)',
          muted: 'rgb(var(--color-chart-muted) / <alpha-value>)',
        },
        brand: {
          50: '#ecfdf5',
          100: '#ccfbf1',
          500: '#14b8a6',
          600: '#0d9488',
          700: '#0f766e'
        }
      },
      boxShadow: {
        theme: 'var(--shadow-theme)',
        glow: 'var(--shadow-glow)',
      },
      backgroundImage: {
        'app-gradient': 'var(--gradient-app)',
        'card-gradient': 'var(--gradient-card)',
      }
    }
  },
  plugins: [],
};
