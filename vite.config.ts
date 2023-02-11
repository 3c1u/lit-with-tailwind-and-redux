import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    lib: {
      entry: 'src/my-app.ts',
      formats: ['es'],
    },
    rollupOptions: {
      external: /^lit/,
    },
  },
  resolve: {
    alias: {
      '~/': '/src/',
    },
  },
})
