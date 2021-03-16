
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
      }
    },
    colors: {
      'idc-green': '#7cb342',
      'idc-blue': '#4598d7',
      'action-danger': '#ff1744',
      'action-sucess': '#29d14b',
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
