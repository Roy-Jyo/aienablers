// tailwind.config.ts
import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/styles/**/*.{css}"
  ],
  theme: { extend: {} },
  plugins: [],
} satisfies Config;
