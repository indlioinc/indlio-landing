import { fileURLToPath } from 'node:url'
import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/fonts', '@nuxt/image'],
  css: ['~/assets/css/main.css'],
  alias: {
    '#content': fileURLToPath(new URL('./content', import.meta.url)),
  },
  vite: {
    plugins: [tailwindcss()],
  },
  fonts: {
    families: [
      { name: 'Inter', provider: 'google' },
      // Product typefaces: keep the names so a local install wins, but do not fetch files.
      { name: 'Google Sans', provider: 'none' },
      { name: 'Product Sans', provider: 'none' },
      // Closest official Google Fonts stand-in for titles (global so it loads even when Google Sans is first in the stack).
      { name: 'DM Sans', provider: 'google', global: true, weights: [400, 500, 600, 700] },
      { name: 'Newsreader', provider: 'google', weights: [500, 600] },
    ],
  },
  nitro: {
    publicAssets: [
      {
        baseURL: '/logos',
        dir: fileURLToPath(new URL('./app/assets/logos', import.meta.url)),
        maxAge: 60 * 60 * 24 * 7,
      },
      {
        baseURL: '/svgs',
        dir: fileURLToPath(new URL('./app/assets/svgs', import.meta.url)),
        maxAge: 60 * 60 * 24 * 7,
      },
      {
        baseURL: '/brand_logo',
        dir: fileURLToPath(new URL('./app/assets/brand_logo', import.meta.url)),
        maxAge: 60 * 60 * 24 * 7,
      },
      {
        baseURL: '/downloads',
        dir: fileURLToPath(new URL('./app/assets/downloads', import.meta.url)),
        maxAge: 60 * 60 * 24 * 7,
      },
      {
        baseURL: '/product_images',
        dir: fileURLToPath(new URL('./app/assets/product_images', import.meta.url)),
        maxAge: 60 * 60 * 24 * 7,
      },
      {
        baseURL: '/founders',
        dir: fileURLToPath(new URL('./app/assets/founders', import.meta.url)),
        maxAge: 60 * 60 * 24 * 7,
      },
    ],
  },
  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      link: [
        { rel: 'icon', type: 'image/png', href: '/logos/indlio-logo-color-black.png' },
      ],
    },
  },
  components: [
    { path: '~/components', pathPrefix: false },
  ],
})
