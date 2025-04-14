import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// GitHub Pages deployment requires the base path to match the repository name
// Since this is a project site (username.github.io/repository), we need to specify the repo name
export default defineConfig({
  plugins: [react()],
  base: '/abhisheksur.github.io/',  // Match the repository name exactly
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: false,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@assets': path.resolve(__dirname, './attached_assets'),
    },
  },
});