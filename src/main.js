const params = new URLSearchParams(window.location.search);
const path = params.get('path');
if (path) {
  const cleanPath = decodeURIComponent(path).split('?path=')[0];
  window.history.replaceState(null, '', cleanPath);
}


import { createApp } from 'vue'
import App from './App.vue'
import { createI18n } from 'vue-i18n'
import { jobFairTranslations } from './translations/jobFair.js'
import router from './router'
import { createHead } from '@unhead/vue'

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages: jobFairTranslations,
})



const head = createHead()
const app = createApp(App)

app.use(head)
app.use(i18n)
app.use(router)
app.mount('#app')
