import colors from 'tailwindcss/colors'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.tsx'],
  theme: {
    extend: {
      spacing: {
        15: '3.75rem',
        92: '23rem',
        107: '26.75rem',
        108: '27rem',
        125: '31.25rem'
      },
      colors: {
        main: colors.slate[100]
      },
      fontSize: {
        15: '15px',
        13: '13px'
      },
      zIndex: {
        header: '1000',
        toast: '1001',
        mask: '1002',
        max: '9999'
      },
      boxShadow: {
        popover:
          '0 1px 8px 1px rgb(0 0 0 / 0.1), 0 1px 8px 1px rgb(0 0 0 / 0.1);'
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 }
        },
        'fade-in-up': {
          '0%': { transform: 'translateY(100%)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 }
        }
      },
      animation: {
        'fade-in': 'fade-in .4s ease-in-out',
        'fade-in-up': 'fade-in-up .4s ease-in-out'
      }
    }
  },
  plugins: []
}
