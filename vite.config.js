import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"), // Add this alias
    }
  },
  server: {
    allowedHosts: true,
    host: true,
    strictPort: true,
    port: 5173
  }
});