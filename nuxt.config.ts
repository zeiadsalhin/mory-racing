import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
export default defineNuxtConfig({
  devtools: { enabled: true },
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      htmlAttrs: {
        lang: 'en-US'
      },
      title: 'Chattok Gaming',
      link: [{ rel: 'icon', type: 'image/x-icon', href: "/mainicon.ico" }],
  meta: [
    { hid: 'description', name: 'description', content: 'Welcome to ChatTok Gaming! Are you ready to elevate your TikTok presence and engage your audience like never before? At ChatTok Gaming, we offer you the chance to use games on your TikTok live shows to captivate your followers and increase your visibility.' },
    { hid: 'og:image', name: 'og:image', content: 'https://chattokgaming.com/mainicon.ico' }
  ],
  // script: [
  //   { src: `https://www.paypal.com/sdk/js?client-id=${process.env.PAYPAL}&vault=true&intent=subscription`, body: true }
  // ],
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
    '@nuxtjs/i18n',
    '@nuxt/image',
    'nuxt-gtag',
    '@nuxtjs/sitemap',
    'nuxt-lazy-load',
    'nuxt-aos',
    // 'nuxt-paypal',
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
  // paypal: {
  //   clientId: import.meta.env.PAYPAL,
  //   vault: true,
  //   // intent: 'subscription',
  // },
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
  },
  i18n: {
    locales: [
      {
        code: 'en',
        file: 'en-US.ts'
      },
      {
        code: 'es',
        file: 'es-ES.ts'
      },
      {
        code: 'ar',
        file: 'ar-AR.ts'
      }
    ],
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_lang',
      // redirectOn: 'root', // recommended
      // alwaysRedirect: true,
    },
    lazy: true,
    langDir: 'lang',
    strategy: 'no_prefix',
    // skipSettingLocaleOnNavigate: true,
    defaultLocale: 'en'
  },
  image: {
    // provider: 'netlifyImageCdn',
  },
  gtag: {
    id: 'G-4KL58X89LD'
  },
  site: {
    url: 'https://chattokgaming.com',
    name: 'Chattok Gaming'
  },
  lazyLoad: {
    directiveOnly: true,
  }
})