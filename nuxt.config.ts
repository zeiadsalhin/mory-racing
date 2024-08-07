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
    { hid: 'description', name: 'description', content: 'Welcome to ChatTok Gaming! Are you ready to elevate your TikTok presence and engage your audience like never before? At ChatTok Gaming! use games on live tiktok live games, how to make money on tiktok' },
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
    '@dargmuesli/nuxt-cookie-control',
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
    iframes: false,
    directiveOnly: true,
  },
  // cookieConsent: {
    // provider: 'cookiescript',
    //     id: '66a42beecce52be588a69de06794ba56',
    // provider: 'cookiebot',
    //     cbid: '96864872-1c7b-4e41-901b-ede43d04f1b6', // Replace with you own cbid

        // // Optional
        // consentMode: false, // Disable consent mode (default: true)
        // consentModeDefaults: false, //
// },
cookieControl: {
  barPosition: 'bottom-full',
closeModalOnClickOutside: false,
colors: {
  barBackground: '#111',
  barButtonBackground: '#999',
  barButtonColor: '#000',
  barButtonHoverBackground: '#333',
  barButtonHoverColor: '#fff',
  barTextColor: '#fff',
  checkboxActiveBackground: '#999',
  checkboxActiveCircleBackground: '#fff',
  checkboxDisabledBackground: '#ddd',
  checkboxDisabledCircleBackground: '#fff',
  checkboxInactiveBackground: '#000',
  checkboxInactiveCircleBackground: '#fff',
  controlButtonBackground: '#fff',
  controlButtonHoverBackground: '#000',
  controlButtonIconColor: '#000',
  controlButtonIconHoverColor: '#fff',
  focusRingColor: '#808080',
  modalBackground: '#777',
  modalButtonBackground: '#000',
  modalButtonColor: '#fff',
  modalButtonHoverBackground: '#333',
  modalButtonHoverColor: '#fff',
  modalOverlay: '#000',
  modalOverlayOpacity: 0.8,
  modalTextColor: '#fff',
  modalUnsavedColor: '#fff',
},
cookies: {
  necessary: [],
  optional: [],
  description: {
    en: 'This cookie stores preferences.'
  },
  id: 'chattok_c_id', // use a short cookie id to save bandwidth and prefixes to separate
  isPreselected: false, // `true` is not GDPR compliant! This flag does not enable any cookies, it only preselects the cookie's modal toggle. The default is `false`.
  name: {
    en: 'chattok_usercookies' // you always have to specify a cookie name (in English)
  },
  links: {
    'https://chattokgaming.com/termsofservice': 'Terms of Service',
  },
  src: 'https://example.com/preferences/js?id=<API-KEY>',
  targetCookieIds: ['xmpl_a', 'xmpl_b'],
},


cookieExpiryOffsetMs: 1000 * 60 * 60 * 24 * 365, // one year
cookieNameIsConsentGiven: 'chattok_c',
cookieNameCookiesEnabledIds: 'chattok_e',

cookieOptions: {
  path: '/',
  sameSite: 'strict',
},

isAcceptNecessaryButtonEnabled: false,
isControlButtonEnabled: false,
isCookieIdVisible: false,
isCssEnabled: true,
isCssPonyfillEnabled: false,
isDashInDescriptionEnabled: false,
isIframeBlocked: false,
isModalForced: false,
locales: ['en', 'ar', 'es'],
localeTexts: {
  en: {
    save: 'Remember',
  }
},
domain: 'chattokgaming.com',
}
})