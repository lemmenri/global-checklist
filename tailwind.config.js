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
        'MT': '#17A2B8',
        'NM': '#3DB057',
        'EX': '#82891E',
        'GD': '#FFC107',
        'LP': '#FD8B2B',
        'PL': '#E56874',
        'PO': '#DC3545',
        'collected': '#3DB057',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
