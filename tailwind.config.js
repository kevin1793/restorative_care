/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
  extend: {
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

