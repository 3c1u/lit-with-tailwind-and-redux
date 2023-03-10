/** @type {import('tailwindcss').Config} */
module.exports = {
  content: {
    files: ['./src/**/*.ts'],
  },
  theme: {
    extend: {
      fontWeight: {
        '100': '100',
        '200': '200',
        '300': '300',
        '400': '400',
        '500': '500',
        '600': '600',
        '700': '700',
      },
    },
  },
  plugins: [],
}
