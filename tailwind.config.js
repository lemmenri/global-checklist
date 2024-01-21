module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        // Use Light colored text on Primary colored background only. 
        // Dark text on Primary colored background doens't have enough contrast. 
        'primary': '#06746B',
        'light': '#E7EAEE',
        'dark': '#042A33',
        // high contrast:
        'MT': '#0E7481',
        'NM': '#2B783A',
        'EX': '#676E17',
        'GD': '#856000',
        'LP': '#A65002',
        'PL': '#CA2634',
        'PO': '#CC2333',
        'collected': '#3DB057',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
