import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import reactRefresh from "@vitejs/plugin-react-refresh";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), reactRefresh()],
  build: {
    outDir: "dist",
    rollupOptions: {
      input: {
        app1: "./index.html",
        app2: "./popup.html"
      }
    }
  }
});
