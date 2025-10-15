import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import postcssPxToViewport8Plugin from "postcss-px-to-viewport-8-plugin";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  css: {
    postcss: {
      plugins: [
        postcssPxToViewport8Plugin({
          unitToConvert: "px",
          viewportWidth: (file: string) => {
            // return /node_modules\/vant/.test(file) ? 375 : 750
            return file.includes("node_modules/vant") ? 375 : 750;
          },
          unitPrecision: 6,
          viewportUnit: "vw",
          mediaQuery: true
        }),
      ],
    },
  },
});
