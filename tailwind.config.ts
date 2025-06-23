import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Premium Color Palette - Fixed
        'deep-blue': '#0444ac',
        'turquesa': '#04acd4',
        'coral-accent': '#ff6b6b',
        'violet-accent': '#8b5cf6',
        'emerald-accent': '#10b981',
        'accent-yellow': '#fbbf24',
        'slate-accent': '#475569',
        'vellum': '#e3e3e3', // Changed to requested color
        'navy-blue': '#1e293b',
        'pure-white': '#ffffff',
        'deep-black': '#0a0a0a',
        
        // Shadcn Colors
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      backdropBlur: {
        xs: '2px',
        '4xl': '72px',
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'gradient-shift': 'gradient-shift 6s ease-in-out infinite',
        'float': 'float 10s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 4s ease-in-out infinite alternate',
        'shimmer': 'shimmer 3s infinite',
        'loading-ring': 'loading-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite',
        'fade-in-up': 'fadeInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'fade-in-down': 'fadeInDown 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'scale-in': 'scaleIn 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'slide-in-left': 'slideInLeft 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'slide-in-right': 'slideInRight 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '25%': { transform: 'translateY(-25px) rotate(1deg)' },
          '50%': { transform: 'translateY(-50px) rotate(0deg)' },
          '75%': { transform: 'translateY(-25px) rotate(-1deg)' },
        },
        'pulse-glow': {
          '0%': { 
            boxShadow: '0 0 20px rgba(4, 68, 172, 0.3)',
            transform: 'scale(1)'
          },
          '100%': { 
            boxShadow: '0 0 40px rgba(4, 172, 212, 0.5), 0 0 60px rgba(4, 172, 212, 0.3)',
            transform: 'scale(1.02)'
          },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'loading-ring': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'fadeInUp': {
          from: {
            opacity: '0',
            transform: 'translateY(30px)',
          },
          to: {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        'fadeInDown': {
          from: {
            opacity: '0',
            transform: 'translateY(-30px)',
          },
          to: {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        'scaleIn': {
          from: {
            opacity: '0',
            transform: 'scale(0.9)',
          },
          to: {
            opacity: '1',
            transform: 'scale(1)',
          },
        },
        'slideInLeft': {
          from: {
            opacity: '0',
            transform: 'translateX(-50px)',
          },
          to: {
            opacity: '1',
            transform: 'translateX(0)',
          },
        },
        'slideInRight': {
          from: {
            opacity: '0',
            transform: 'translateX(50px)',
          },
          to: {
            opacity: '1',
            transform: 'translateX(0)',
          },
        },
      },
      boxShadow: {
        'glass': '0 12px 40px 0 rgba(4, 68, 172, 0.12)',
        'premium': '0 4px 16px rgba(4, 68, 172, 0.08)',
        'premium-lg': '0 8px 32px rgba(4, 68, 172, 0.12)',
        'premium-xl': '0 16px 48px rgba(4, 68, 172, 0.16)',
        'premium-2xl': '0 24px 64px rgba(4, 68, 172, 0.20)',
        'premium-3xl': '0 32px 80px rgba(4, 68, 172, 0.24)',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      maxWidth: {
        '8xl': '88rem',
        '9xl': '96rem',
      },
      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '0.75rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
        '7xl': ['4.5rem', { lineHeight: '1' }],
        '8xl': ['6rem', { lineHeight: '1' }],
        '9xl': ['8rem', { lineHeight: '1' }],
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};

export default config;