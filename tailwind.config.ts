import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        pizarra: "#496275", // color principal
        marfil: "#F0EEE9", // fondo
        noche: "#222D35", // oscuro
        piedra: "#6B675F", // texto secundario
        borde: "#D8D4CC",
        niebla: "#DCE4EA", // claro de la marca
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        etiqueta: "0.08em",
      },
    },
  },
  plugins: [],
};

export default config;
