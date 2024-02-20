import { nextui } from '@nextui-org/theme'

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [nextui({
    prefix: "nextui", // prefix for themes variables
    addCommonColors: false, // override common colors (e.g. "blue", "green", "pink").
    defaultTheme: "light", // default theme from the themes object
    defaultExtendTheme: "light", // default theme to extend on custom themes
    layout: {}, // common layout tokens (applied to all themes)
    themes: {
      light: {
        layout: {},
        colors: {
          foreground: '#1a1e1f',
          background: '#f2f2f2',
          primary: {
            DEFAULT: '#097671',
            50: '#35b935'
          }
        },
      },
      dark: {
        layout: {},
        colors: {
          foreground: '#f2f2f2',
          background: '#1a1e1f',
          primary: {
            DEFAULT: '#097671',
            50: '#35b935'
          }
        },
      },
    },
  }),],
}
