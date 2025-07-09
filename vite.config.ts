import react from '@vitejs/plugin-react'
import path, { resolve } from 'node:path'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': JSON.stringify({ NODE_ENV: 'production' }),
  },
  resolve: {
    alias: {
      '@styles': resolve(__dirname, 'externals/styles'),
    },
  },
  server: {
    cors: {
      origin: '*',
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
      credentials: false,
    },
  },
  build: {
    minify: false,
    lib: {
      entry: path.resolve(__dirname, 'src/sandbox-component.tsx'),
      name: 'SandboxComponent',
      fileName: 'sandbox-component',
      formats: ['iife'],
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
    watch: {},
  },
})
