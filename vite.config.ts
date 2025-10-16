import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import postcssPxToViewport8Plugin from "postcss-px-to-viewport-8-plugin";
import { tanstackRouter } from "@tanstack/router-plugin/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tanstackRouter({
      target: "react",
      autoCodeSplitting: true,
    }),
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      "@": "/src",
      "@images": "/src/assets/images",
    },
  },
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
          mediaQuery: true,
        }),
      ],
    },
  },

  define: {
    __ADMIN_URL__: JSON.stringify(
      `http://${process.env.VITE_API_HOST}:${process.env.VITE_API_PORT}${process.env.VITE_API_H5_PATH}`
    ),
    __H5_URL__: JSON.stringify(
      `http://${process.env.VITE_API_HOST}:${process.env.VITE_API_PORT}${process.env.VITE_API_ADMIN_PATH}`
    ),
  },
});
