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
      backgroundColor: {
        main: colors.slate[100]
      },
      fontSize: {
        15: '15px',
        13: '13px'
      },
      zIndex: {
        header: '1000'
      }
    }
  },
  plugins: []
}
