import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "add-ship-modal": "url('/images/add-ship-modal.webp')",
        "home-background": "url('/images/home-background.webp')",
        "eve-online": "url('/images/eve_online_fitting_platform_top_view_view_from_above.webp')",
        "exploration-dashboard": "url('/images/exploration-dashboard/background.webp')",
        "characters": "url('/images/characters/background.webp')",
      },
    },
    fontFamily: {
      'quantico': ['Quantico', 'sans-serif'],
    }
  },
  plugins: [],
};
export default config;
