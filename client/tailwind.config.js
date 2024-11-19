/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#3498db',
        secondary: '#95a5a6',
        warning: '#e74c3c',
        error: '#e74c3c'
      }
    }
  },
  plugins: [require('@tailwindcss/typography'), require('daisyui')]
}
