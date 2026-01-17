/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      colors: {
        background: '#0a0a0a',
        'background-secondary': '#1a1a1a',
        foreground: '#ffffff',
        'foreground-secondary': '#888888',
        accent: '#ff6b35',
        'accent-hover': '#ff8c5a',
        border: '#2d2d2d',
      },
      borderRadius: {
        lg: '0.5rem',
        md: '0.375rem',
        sm: '0.25rem'
      },
    }
  },
  plugins: [require("tailwindcss-animate")],
}
