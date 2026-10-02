import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';
import { cmsWriterPlugin } from './src/lib/cmsWriterPlugin.ts';

// https://vitejs.dev/config/
export default defineConfig({
  // Path the site is served from. The GitHub Pages workflow sets BASE_PATH
  // (e.g. '/evox_web'); local builds are served from the root.
  base: `${process.env.BASE_PATH ?? ''}/`,
  plugins: [react(), cmsWriterPlugin()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
