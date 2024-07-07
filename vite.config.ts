import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { quasar, transformAssetUrls } from "@quasar/vite-plugin";
import path from "path";
import UnoCSS from 'unocss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    }
  },
  plugins: [
    vue({
      template: { transformAssetUrls },
    }),
    UnoCSS(),
    quasar({
      sassVariables: "src/quasar-variables.sass",
    }),
  ],
});
