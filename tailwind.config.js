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
          base: '#FFFFFF',
          soft: '#FAF8FC',
          pale: '#EDE7F6',
          deep: '#6B4E9E',
          ink: '#1A1625',
          muted: '#9B92AC'
        }
      }
    },
  },
  plugins: [],
}
