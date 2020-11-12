const defaultTheme = require('tailwindcss/defaultTheme')
const windmill = require('@windmill/react-ui/config')

module.exports = windmill({
  purge: ['src/**/*.js'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
      boxShadow: {
        bottom: '0 5px 6px -7px rgba(0, 0, 0, 0.6), 0 2px 4px -5px rgba(0, 0, 0, 0.06)',
      },
    },
    colors: {
      'midnightGreen': '#1A535C',
      'mediumTurquoise':'#4ECDC4',
      'mintCream':'#F7FFF7',
      'bitterSweet': '#FF6B6B',
      'naplesYellow': '#FFE66D'
    }
  },
})
