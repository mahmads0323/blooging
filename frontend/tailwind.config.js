/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        softRed: "#D96846",
        greyishBlue: "#CDCBD6",
        darkYellow: "#596235",
        waterGreen: "#2F3020",
        textColor: "#000000"
      },
      animation: {
        "slideFromBottomToTop": "slideFromBottomToTop 1s ease" 
      },
      keyframes: {
        slideFromBottomToTop : {
          '0%': {
            bottom: "-100%",
            opacity: 0,
          },
          "100%":{
            bottom: "20%",
            opacity: 1,
          }
        }
      }
    },
  },
  plugins: [],
}