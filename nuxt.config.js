module.exports = {
  mode: "spa",

  head: {
    title: "FITCHOO 핏츄 - 스타일, 체형별 패션 인싸 쇼핑앱",
    script: [
      {
        src: "https://static.nid.naver.com/js/naveridlogin_js_sdk_2.0.0.js",
        type: "text/javascript",
        charset: "utf-8"
      },
      {
        src: "https://connect.facebook.net/en_US/sdk.js",
        defer: true
      },
      { src: "/js/fb-sdk.js" },
      // {
      //   src: "https://www.googletagmanager.com/gtag/js?id=UA-129312575-1",
      //   async: true
      // },
      // {
      //   src: "/js/gtag.js"
      // }, 
      // {
      //   src:"/js/googletagmanager.js"
      // },
      {
        src: "https://apis.google.com/js/platform.js",
        type: "text/javascript",
        async: true,
        defer: true
      },
      {
        src:"https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"
      }
    ],

    meta: [
      {
        charset: "utf-8"
      },
      {
        name: "viewport",
        content:
          "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
      },
      {
        name: "HandheldFriendly",
        content: "true"
      },
      {
        "http-equiv": "pragma",
        content: "no-cache, no-store, must-revalidate"
      },
      { "http-equiv": "cache-control", content: "no-cache" },
      { "http-equiv": "expires", content: "0" },
      {
        hid: "description",
        name: "description",
        content:
          "내 스타일과 체형의 패션 인싸를 만나보세요."
      },
      {
        hid: "keywords",
        name: "keywords",
        content:
          "인플루언서, 모델, 쇼핑몰, 패션, 여자쇼핑몰, 키작녀쇼핑몰, 10대여자쇼핑몰, 20대여자쇼핑몰, 30대여자쇼핑몰, 쇼핑몰추천, 여자옷, 키작은여자바지, 여자슬랙스"
      },
      {
        name: "naver-site-verification",
        content: "827a9abad2955018531b79ad0f4e3dfa9d983de6"
      },
      {
        property: "og:type",
        content: "website"
      },
      {
        property: "og:title",
        content: "핏츄 - FITCHOO"
      },
      {
        property: "og:description",
        content: "핏츄, 스타일, 체형별 패션 인싸 쇼핑앱"
      },
      {
        property: "og:image",
        content: "https://fitchoo.kr/graphicimg.jpg"
      },
      {
        property: "og:url",
        content: "https://fitchoo.kr"
      },
      {
        property: "og:locale",
        content: "ko_kr"
      },
      {
        name: "msapplication-TileColor",
        content: "#da532c"
      },
      {
        name: "theme-color",
        content: "#ffffff"
      },
      {
        name: "google-signin-client_id",
        content:
          "797072200153-12234jka3idovnqi1sm2qnlefmj86f9h.apps.googleusercontent.com"
      }
    ],

    link: [
      {
        rel: "apple-touch-icon",
        sizes: "180x180",
        href: "/apple-touch-icon.png"
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        href: "/favicon-32x32.png"
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        href: "/favicon-16x16.png"
      },
      {
        rel: "manifest",
        href: "/site.webmanifest"
      },
      {
        rel: "stylesheet",
        href:
          "https://fonts.googleapis.com/css?family=Barlow:400,600|Playfair+Display:700"
      },
      {
        rel: "canonical",
        href: "https://fitchoo.kr"
      },
      {
        rel: "stylesheet",
        href: "https://use.fontawesome.com/releases/v5.8.1/css/all.css",
        integrity:
          "sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf",
        crossorigin: "anonymous"
      }
    ]
  },

  loading: { color: "#ec3e39" },

  css: ["@/assets/main.css", "~assets/app.styl"],

  modules: [
    "bootstrap-vue/nuxt",
    "@nuxtjs/vuetify",
    "@nuxtjs/style-resources",
    [
      '@nuxtjs/google-tag-manager',
    {
      id: 'GTM-5KW535K',
      layer: 'dataLayer',
      pageTracking: true
    }
  ],
    [
      "nuxt-amplitude",
      {
        apiKey: "87d1f63b69740fff1e06f0f4487db359",
        config: {
          includeUtm: true,
          includeReferrer: true
        }
      }
    ],
    [
      "nuxt-facebook-pixel-module",
      {
        track: "PageView",
        pixelId: "613338709087586",
        disabled: false
      }
    ],
    ["nuxt-client-init-module"],
    ["@nuxtjs/axios", "@nuxtjs/auth"]
  ],

  styleResources: {
    scss: ["@/assets/_variables.scss"]
  },

  build: {
    babel: {
      presets() {
        const targets = {
          ie: "11"
        };
        return [
          [
            require.resolve("@nuxt/babel-preset-app"),
            {
              targets
            }
          ]
        ];
      }
    },
    vendor: ["vuetify"],
    extend() {}
  },

  plugins: [
    "~/plugins/history-push",
    "~/plugins/vue-masonry",
    "~/plugins/router-plugin.js",
    "~/plugins/clipboard.js",
    "~/plugins/vuetify.js",
    "~/plugins/amplitude.js",
    "~/plugins/v-viewer.js"
  ]
};
