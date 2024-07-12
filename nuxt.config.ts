import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
export default defineNuxtConfig({
  devtools: { enabled: true },
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'Chattok Gaming',
      link: [{ rel: 'icon', type: 'image/x-icon', href: "/mainicon.ico" }],
  meta: [
    { hid: 'description', name: 'description', content: 'Welcome to ChatTok Gaming! Are you ready to elevate your TikTok presence and engage your audience like never before? At ChatTok Gaming, we offer you the chance to use games on your TikTok live shows to captivate your followers and increase your visibility.' },
    { hid: 'og:image', property: 'og:image', content: 'https://mory-racing.netlify.app/mainicon.ico' }
  ],
  script: [
    { src: `https://www.paypal.com/sdk/js?client-id=${process.env.PAYPAL}&vault=true&intent=subscription`, body: true }
  ],
    },
    // pageTransition: { name: 'page', mode: 'out-in' }
  },
  build: {
    transpile: ['vuetify'],
  },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/image',
    '@nuxt/content',
    'nuxt-paypal',
    // "@unlok-co/nuxt-stripe",
    '@pinia/nuxt',
    '@nuxtjs/supabase',
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }))
      })
    },
  ],
  css: [`assets/css/main.css`],
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
  paypal: {
    clientId: import.meta.env.PAYPAL,
    vault: true,
    // intent: 'subscription',
  },
  supabase: {
    // Options
    redirectOptions: {
      login: '/login',
      callback: '/confirm',
      include: ['/admin(/*)?'],
      exclude: ['/'],
      cookieRedirect: false,
    }
  },
  runtimeConfig: {
    public: {
      appUrl: process.env.NODE_ENV === 'production'
      ? 'https://chattokgaming.com/'
      : 'http://localhost:3000/',
      stripePk: import.meta.env.VITE_STRIPE_PUBLIC_KEY,
    },
  }
})