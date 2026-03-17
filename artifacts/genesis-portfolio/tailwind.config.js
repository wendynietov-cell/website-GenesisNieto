/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        heading: ['Cormorant Garamond', 'Georgia', 'serif'],
      },
      colors: {
        background: 'hsl(36 40% 97%)',
        foreground: 'hsl(18 37% 23%)',
        primary: 'hsl(18 37% 23%)',
        muted: 'hsl(33 25% 91%)',
        border: 'hsl(33 30% 82%)',
      }
    },
  },
  plugins: [],
}
