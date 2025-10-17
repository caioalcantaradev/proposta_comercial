/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#d2f547',
        secondary: '#1a1a1a',
      },
      fontFamily: {
        'syne': ['Syne', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
