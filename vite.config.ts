import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  plugins: [react()],
  optimizeDeps: {
    // Asegura que jsx-runtime se procese
    include: ['react/jsx-runtime', 'react/jsx-dev-runtime'],
    // Evita reempaquetar @react-page/editor y sus deps internas
    exclude: ['@react-page/editor', 'react-dnd', 'dnd-core'],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      react: path.resolve(__dirname, 'node_modules/react'),
      'react-dom': path.resolve(__dirname, 'node_modules/react-dom'),
    },
  },
})
