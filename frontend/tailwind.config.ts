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
      animation: {
        fadeInUp: 'fadeInUp 0.25s ease-in-out 0s 1',
      },
      keyframes: {
        fadeInUp: {
          "0%": {
            opacity: "0",
            transform: "translate3d(0, 20%, 0)",
          },
          "100%": {
            opacity: "1",
            transform: "translate3d(0, 0, 0)",
          },
        },
      },
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
