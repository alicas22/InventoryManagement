/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sidebar: {
          bg: '#EEF1FF',
          hover: '#D2DAFF',
          active: '#AAC4FF'
        },
        primary: '#6366f1',
        success: '#22c55e',
        warning: '#f59e0b',
        danger: '#ef4444',
        'table-header': '#AAC4FF',
      },
      boxShadow: {
        'card': '0 0 10px rgba(0, 0, 0, 0.1)',
      }
    },
  },
  plugins: [],
}
