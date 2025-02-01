import type { Config } from "tailwindcss";
import { theme } from "./src/styles/theme";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // 展开主题色系
        bg: theme.colors.background,
        text: theme.colors.text,
        marker: theme.colors.marker,
        state: theme.colors.state,
      },
    },
  },
  plugins: [],
};
export default config;
