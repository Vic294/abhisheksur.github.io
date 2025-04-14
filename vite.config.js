import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// GitHub Pages deployment requires the base path to match the repository name
// For a user site like username.github.io, we can use '/'
export default defineConfig({
  plugins: [react()],
  base: '/',  // For user/organization site (username.github.io)
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