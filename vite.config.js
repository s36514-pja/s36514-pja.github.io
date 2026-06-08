import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  base: '/',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        presentation: resolve(__dirname, 'src/pages/presentation.html'),
        about: resolve(__dirname, 'src/pages/about.html'),
        minigame: resolve(__dirname, 'src/pages/minigame.html'),
      }
    }
  }
})
