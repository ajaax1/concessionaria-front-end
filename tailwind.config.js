/** @type {import('tailwindcss').Config} */
export default {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'white-yellow': '#EEEBDD',
        'red-mid':'#810000',
        'black-mid':'#1B1717',
      },
    },
  },
  plugins: [],
}

