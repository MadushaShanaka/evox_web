import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';
import { cmsWriterPlugin } from './src/lib/cmsWriterPlugin.ts';

// https://vitejs.dev/config/
export default defineConfig({
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
