import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        float: {
          "0%, 100%": { transform: "translate(-50%, 0) rotate(-2deg)" },
          "25%": { transform: "translate(-45%, -4px) rotate(2deg)" },
          "75%": { transform: "translate(-55%, 4px) rotate(-1deg)" },
        },
      },
      animation: {
        float: "float 3s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
