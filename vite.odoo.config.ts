import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  base: "/itam_floss/app/",
  publicDir: "public",
  plugins: [tsconfigPaths(), tailwindcss(), react()],
  build: {
    outDir: "itam_floss/static/app",
    emptyOutDir: true,
    sourcemap: false,
    rollupOptions: {
      input: "odoo-index.html",
      output: {
        entryFileNames: "assets/itam-app.js",
        chunkFileNames: "assets/[name]-[hash].js",
        assetFileNames: "assets/[name]-[hash][extname]",
      },
    },
  },
});
