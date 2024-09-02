import type { Config } from 'tailwindcss';
import daisyui from "daisyui"

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'hero-pattern': "url('/hero-mobile.png')"
      }
    }
  },
  plugins: [
    daisyui,
  ],
  daisyui: {
    themes: [{
      light: {
        ...require("daisyui/src/theming/themes")["light"],
        "primary": "#facc15"
      },
      dark: {
        ...require("daisyui/src/theming/themes")["dark"],
        "primary": "#facc15"
      }
    }],
    base: true,
    styled: true
  },
};
export default config;
