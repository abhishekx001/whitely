/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-raleway)', 'sans-serif'],
        serif: ['var(--font-raleway)', 'sans-serif'],
      },
      colors: {
        brand: {
          navy: '#3e2c61',
          periwinkle: '#8169af',
          steel: '#75658b',
          lavender: '#e8e4f1',
          pale: '#ffffff',
        }
      }
    },
  },
  plugins: [],
}

