import colors from 'tailwindcss/colors'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.tsx'],
  theme: {
    extend: {
      spacing: {
        15: '3.75rem',
        42: '10.5rem',
        46: '11.5rem',
        49: '12.25rem',
        55: '13.75rem',
        92: '23rem',
        100: '25rem',
        107: '26.75rem',
        108: '27rem',
        110: '27.5rem',
        125: '31.25rem',
        135: '33.75rem',
        137: '34.25rem',
        175: '43.75rem',
        312: '78rem'
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
        mask: '1001',
        toast: '1002',
        max: '9999'
      },
      boxShadow: {
        popover:
          '0 1px 8px 1px rgb(0 0 0 / 0.1), 0 1px 8px 1px rgb(0 0 0 / 0.1);'
      },
      aspectRatio: {
        cover: '27 / 10'
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
