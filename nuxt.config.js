import pkg from './package.json'
const sentryDSN = process.env.SENTRY_DSN;

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s | ' + process.env.APP_TITLE,
    title: 'fe-ums-web',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, shrink-to-fit=no">' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      // {
      //   rel: 'stylesheet',
      //   href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'
      // },
      {
        rel: 'stylesheet',
        href: 'https://cdn.jsdelivr.net/npm/@mdi/font@6.9.96/css/materialdesignicons.min.css'
      },
      {
        rel: 'preconnect',
        href: 'https://fonts.googleapis.com'
      },
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossorigin: true
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap'
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Ubuntu:wght@300;400;500;600;700&display=swap'
      },
      // {
      //   rel: 'stylesheet',
      //   href: 'https://fonts.googleapis.com/icon?family=Material+Icons'
      // }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~assets/css/main.scss'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    {src: "~/plugins/elastic-apm-node.js", mode: 'server'},
    {src: "~/plugins/elastic-apm-rum.js", mode: 'client'},
    {src:'~/plugins/v-calendar.js', ssr: false},
    {src: "~/plugins/v-waypoint.js", ssr: false},
    '~/plugins/v-click-outside.js',
    '~/plugins/vue-nav-tabs.js',
    '~/plugins/helpers.js',
    '~/plugins/axios-override.js'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    '@nuxtjs/style-resources',
    '@nuxtjs/fontawesome'
  ],

  fontawesome: {
    component: 'Fa',
    suffix: true,
    icons: {
      regular: true,
      solid: true,
      brands: true
    }
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/i18n',
    'vue-social-sharing/nuxt',
    '@nuxtjs/sentry',
  ],

  sentry: {
    dsn: sentryDSN,
    lazy: true,
    sourceMapStyle: 'hidden-source-map',
    // Additional Module Options go here
    // https://sentry.nuxtjs.org/sentry/options
    config: {
      // Add native Sentry config here
      // https://docs.sentry.io/platforms/javascript/guides/vue/configuration/options/
    },
  },

  bootstrapVue: {
    bootstrapCSS: false,
    bootstrapVueCSS: false
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: process.env.APP_API_URL
  },

  i18n: {
    langDir: '~/locales/',
    vuex: { moduleName: 'lang', syncRouteParams: true },
    // routesNameSeparator: '___',
    onLanguageSwitched: (old_locale, new_locale) => {
      console.log(old_locale, new_locale);
    },
    defaultLocale: 'id',
    vueI18n: {
      fallbackLocale: 'id',
    },
    locales: [
      { code: 'en', iso: 'en-US', file: 'en.js', dir: 'ltr' },
      { code: 'id', iso: 'id-ID', file: 'id.js', dir: 'ltr' },
      { code: 'ar', iso: 'ar-AR', file: 'ar.js' },
    ],
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'umsweb_i18n_redirected',
      redirectOn: 'root',  // recommended
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    cssModules: {
      localIdentName: '[local]_[hash:base64:5]',
      modules: true,
      hashPrefix: 'ums'
    },
  },

  bootstrapVue: {
    bootstrapCSS: false,
    bootstrapVueCSS: false
  },

  styleResources: {
    scss: [
    ]
  },

  loading: {
    color: '#F5C13A',
    height: '2px',
    continuous: true
  },

  publicRuntimeConfig: {
    API_TOKEN: process.env.APP_API_TOKEN,
    ELASTIC_APM_RUM: {
      serviceName: process.env.ELASTIC_APM_RUM_SERVICE_NAME,
      serverUrl: process.env.ELASTIC_APM_RUM_SERVER_URL,
      serviceVersion: pkg.version,
      environment: process.env.NODE_ENV || 'development'
    }
  },

  server: {
    host: '0',
    port: 3000
  }
}
