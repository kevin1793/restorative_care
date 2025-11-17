/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
  extend: {
    colors: {
      primary: "#2d6db2", // your new teal/blue color,
      primaryLight: "#e6f0fa",
    },
    fontFamily: {
      sans: ['"Inter"', 'ui-sans-serif', 'system-ui'],
      serif: ['"Merriweather"', 'serif'],
      heading: ['"Poppins"', 'sans-serif'],
      body: ['"Roboto"', 'sans-serif'],
      fancy: ['"Playwrite AU TAS"', 'cursive']
    },
  },
},
  plugins: [],
}