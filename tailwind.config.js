module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        'primary': '#078D82',
        'light': '#E7EAEE',
        'dark': '#042A33',
        'MT': '#17A2B8',
        'NM': '#3DB057',
        'EX': '#82891E',
        'GD': '#FFC107',
        'LP': '#FD8B2B',
        'PL': '#E56874',
        'PO': '#DC3545',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
