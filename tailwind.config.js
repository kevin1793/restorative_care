/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
  extend: {
    colors: {
      // Confirmed brand navy, sampled directly from the logo file
      // (report Status Update, July 23; design system §4.3)
      primary: "#122C71",
      primaryDark: "#0B1D4D", // hover states, dark surfaces (footer)
      primaryLight: "#EEF1F8", // soft tinted backgrounds
    },
    fontFamily: {
      sans: ['"Inter"', 'ui-sans-serif', 'system-ui'],
      serif: ['"Merriweather"', 'serif'],
      heading: ['"Merriweather"', 'serif'],
      body: ['"Roboto"', 'sans-serif'],
      fancy: ['"Playwrite AU TAS"', 'cursive']
    },
    boxShadow: {
      // Navy-tinted elevation instead of default gray shadows, so cards
      // read as branded rather than generic (report §4.3)
      brand: "0 2px 8px rgba(18, 44, 113, 0.06), 0 8px 24px rgba(18, 44, 113, 0.08)",
      "brand-hover": "0 4px 12px rgba(18, 44, 113, 0.1), 0 12px 32px rgba(18, 44, 113, 0.12)",
    },
  },
},
  plugins: [],
}