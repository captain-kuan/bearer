import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from 'path'

import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
// https://vitejs.dev/config/
export default defineConfig(async () => ({
  plugins: [
    vue(),
    AutoImport({
      imports: ["vue", "vue-router", "pinia", "@vueuse/core"],
    }),
  ],

  // Vite options tailored for Tauri development and only applied in `tauri dev` or `tauri build`
  //
  // 1. prevent vite from obscuring rust errors
  clearScreen: false,
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  // 2. tauri expects a fixed port, fail if that port is not available
  server: {
    port: 1420,
    strictPort: true,
    watch: {
      // 3. tell vite to ignore watching `src-tauri`
      ignored: ["**/src-tauri/**"],
    },
  },
}));
