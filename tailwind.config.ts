import type { Config } from 'tailwindcss'
import animate from 'tailwindcss-animate'

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    cursor: {},
    extend: {
      screens: {
        mb: '320px',
      },
      dropShadow: {
        '3xlb': [
          '3px 0px 0px rgba(32, 60, 87, 1)',
          '-3px 0px 0px rgba(32, 60, 87, 1)',
          '0px -3px 0px rgba(32, 60, 87, 1)',
          '0px 3px 0px rgba(32, 60, 87, 1)',
        ],
        '4xlb': [
          '5px 0px 0px rgba(32, 60, 87, 1)',
          '-5px 0px 0px rgba(32, 60, 87, 1)',
          '0px -5px 0px rgba(32, 60, 87, 1)',
          '0px 5px 0px rgba(32, 60, 87, 1)',
        ],
        '5xlb': [
          '8px 0px 0px rgba(32, 60, 87, 1)',
          '-8px 0px 0px rgba(32, 60, 87, 1)',
          '0px -8px 0px rgba(32, 60, 87, 1)',
          '0px 8px 0px rgba(32, 60, 87, 1)',
        ],
        '3xlo': [
          '3px 0px 0px rgba(170, 93, 54, 1)',
          '-3px 0px 0px rgba(170, 93, 54, 1)',
          '0px -3px 0px rgba(170, 93, 54, 1)',
          '0px 3px 0px rgba(170, 93, 54, 1)',
        ],
        '4xlo': [
          '5px 0px 0px rgba(170, 93, 54, 1)',
          '-5px 0px 0px rgba(170, 93, 54, 1)',
          '0px -5px 0px rgba(170, 93, 54, 1)',
          '0px 5px 0px rgba(170, 93, 54, 1)',
        ],
        '5xlo': [
          '8px 0px 0px rgba(170, 93, 54, 1)',
          '-8px 0px 0px rgba(170, 93, 54, 1)',
          '0px -8px 0px rgba(170, 93, 54, 1)',
          '0px 8px 0px rgba(170, 93, 54, 1)',
        ],
      },
      colors: {
        oren: {
          '1': '#FFECD6',
          '2': '#FFD4A3',
          '3': '#FFAA5E',
          '4': '#D08159',
          '600': '#AA5D36',
        },
        'dark-blue': '#0D2B45',
        'light-blue': '#213C56',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(5px)' },
          '50%': { transform: 'translateX(-5px)' },
          '75%': { transform: 'translateX(5px)' },
        },
      },
      animation: {
        shake: 'shake 0.5s linear',
      },
    },
  },
  plugins: [animate],
}

export default config
