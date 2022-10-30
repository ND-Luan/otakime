/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./templates/**/*.html",
    "./static/src/**/*.js"
  ],
  theme: {
    extend: {
      fontFamily:{
        "maven":['Maven Pro','sans-serif']
      },

    },
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
}
