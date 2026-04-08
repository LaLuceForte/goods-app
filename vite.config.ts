import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@pages": path.resolve(__dirname, "src/pages"),
      "@shared": path.resolve(__dirname, "src/shared"),
      "@features": path.resolve(__dirname, "src/features"),
    },
  },
});
