import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        balginLight: ["Balgin-Light"],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        brown: "#545046",
        lightBrown: "#635F53",
        beige: "#DCDCDA"
      },
      opacity: {
        '80': '0.8',
      },
       backgroundOpacity: {
        '80': '0.8',
        }
    },
  },
  plugins: [],
} satisfies Config;
