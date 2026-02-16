<template>
    <footer class="np-footer" style="margin-top: 1rem !important;">
      <div class="np-footer-inner">
        <div class="np-footer-links">
          <a href="https://ads.mindspeller.com/about-us/" target="_blank" rel="noopener" class="np-footer-link">{{ t('message.neuroprofiling_footer_about') }}</a>
          <span class="np-footer-separator">-</span>
          <a href="https://ads.mindspeller.com/legal/" target="_blank" rel="noopener" class="np-footer-link">{{ t('message.neuroprofiling_footer_legal') }}</a>
          <span class="np-footer-separator">-</span>
          <a href="https://ads.mindspeller.com/contact/" target="_blank" rel="noopener" class="np-footer-link">{{ t('message.neuroprofiling_footer_contact') }}</a>
        </div>


        
      </div>
    </footer>
</template>

<script setup>
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
import '../styles/footer.scss';

</script>

