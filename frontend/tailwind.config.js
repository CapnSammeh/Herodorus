
module.exports = {
  purge: [
    './src/**/*.html',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      spacing: {
        '100': '30rem',
        '768': '768px'
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
