import { createApp } from 'vue'
import App from './App.vue'
import { createI18n } from 'vue-i18n'
import { jobFairTranslations } from './translations/jobFair.js'



const i18n = createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages: jobFairTranslations,
})
const app = createApp(App)
app.use(i18n)
app.mount('#app')
