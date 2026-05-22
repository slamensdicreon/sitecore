/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Forge Industrial design tokens
        'forge-slate': '#1A2332',
        'forge-slate-dark': '#0F1720',
        'forge-amber': '#F59E0B',
        'forge-rust': '#C2410C',
        'forge-steel': '#4B5563',
      },
      fontFamily: {
        'forge': ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
