import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/blog/", // Add this line - should match your repository name
  build: {
    outDir: "dist",
    assetsDir: "assets",
    sourcemap: true,
  },
});
