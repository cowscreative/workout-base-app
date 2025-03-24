import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  base: '/workout/', // same as your deployed folder path
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Workout App',
        short_name: 'Workout',
        start_url: '/workout/',
        scope: '/workout/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#000000',
        icons: [
          {
            src: '/workout/icon-192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/workout/icon-512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })    
  ]
})
