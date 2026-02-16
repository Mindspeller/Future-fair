<template>
  <header class="mn-header">
    <div class="mn-header-inner">
      <div class="mn-logo">
        <img 
          src="../assets/logo-with-text.png" 
          alt="Mindspeller Logo" 
          class="logo-img"
        >
      </div>
      
      <nav class="mn-nav">

        <div class="lang-wrapper">
          <button 
            class="lang-switch" 
            @click="toggleLangMenu"
            :aria-expanded="showLangMenu"
            aria-label="Select language"
          >
            {{ currentLang.toUpperCase() }}
            <span class="chevron">▼</span>
          </button>
          
          <div v-if="showLangMenu" class="lang-menu">
            <button 
              v-for="lang in availableLanguages" 
              :key="lang.code"
              :class="{ active: currentLang === lang.code }"
              @click="changeLang(lang.code)"
            >
              {{ lang.label }}
            </button>
          </div>
        </div>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';

const { locale } = useI18n();
const showLangMenu = ref(false);

const availableLanguages = [
  { code: 'en', label: 'English' },
  { code: 'nl', label: 'Nederlands' }
];

const currentLang = computed(() => locale.value);

const toggleLangMenu = () => {
  showLangMenu.value = !showLangMenu.value;
};

const changeLang = (langCode) => {
  locale.value = langCode;
  showLangMenu.value = false;
}
if (typeof window !== 'undefined') {
  window.addEventListener('click', (e) => {
    if (!e.target.closest('.lang-wrapper')) {
      showLangMenu.value = false;
    }
  });
}
</script>

<style scoped lang="scss">
@import '../styles/variables';
@import '../styles/header';
</style>
