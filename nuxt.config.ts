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
    { hid: 'description', name: 'description', content: 'Welcome to Chattok Gaming' }
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
  // stripe: {
  //   // Server
  //   // server: {
  //   //   key: "sk_test_123",
  //   //   options: {
  //   //     // your api options override for stripe server side
  //   //     // https://github.com/stripe/stripe-node?tab=readme-ov-file#configuration
  //   //   },
  //   //   // CLIENT
  //   // },
  //   client: {
  //     key: "pk_test_51PbCugI4aHqhinrA9sCytQD7jIlhqLWBYQireLPZjFtcIEBs5Sgxt46yDomCTz6xHjnloKIJIveFxbgmNjZ9f0la00uY4BdDvv",
  //     // your api options override for stripe client side https://stripe.com/docs/js/initializing#init_stripe_js-options
  //     options: {},
  //   },
  // },
  runtimeConfig: {
    public: {
      appUrl: 'http://localhost:3000',
      stripePk: 'pk_test_51PbCugI4aHqhinrA9sCytQD7jIlhqLWBYQireLPZjFtcIEBs5Sgxt46yDomCTz6xHjnloKIJIveFxbgmNjZ9f0la00uY4BdDvv',
    },
  }
})