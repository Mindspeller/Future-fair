<template>
  <div class="job-fair-page">

    <section class="job-fair-hero">
      <div class="hero-inner">
        <div class="hero-character">
          <img src="../assets/The Future 2.png" alt="Mindspeller character" class="character-image">

        </div>

        <div class="hero-content">
          <div class="event-badge">
            <span class="badge-icon">
              <svg width="24" height="24" viewBox="0 0 116 116" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="49.1927" cy="49.1501" r="27.8535" stroke="#4534DA" stroke-width="6.52989"/>
                <path d="M62.8418 70.9914L70.9497 62.8835L93.8727 85.8065C96.1116 88.0454 96.1116 91.6755 93.8727 93.9144C91.6338 96.1533 88.0037 96.1533 85.7648 93.9144L62.8418 70.9914Z" fill="#4534DA"/>
                <path d="M31.5059 47.648H66.871V59.588C66.871 61.2037 65.5612 62.5135 63.9455 62.5135H34.4313C32.8156 62.5135 31.5059 61.2037 31.5059 59.588V47.648Z" fill="#4534DA"/>
                <path d="M31.5059 45.6407H66.871V39.8741C66.871 38.2584 65.5612 36.9487 63.9455 36.9487H34.4313C32.8156 36.9487 31.5059 38.2584 31.5059 39.8741V45.6407Z" fill="#4534DA"/>
                <path d="M42.2393 36.1435C42.2393 34.5278 43.549 33.218 45.1647 33.218H53.2048C54.8205 33.218 56.1303 34.5278 56.1303 36.1435V43.2714H42.2393V36.1435Z" stroke="#4534DA" stroke-width="2.92547"/>
              </svg>
            </span>
            <span class="badge-text">{{ $t('message.badge') }}</span>
          </div>

          <h1 class="hero-title">
            {{ $t('message.titleFirst') }} @<br>{{ $t('message.titleSecond') }}
          </h1>

          <p class="hero-subtitle">
            {{ $t('message.subtitle') }}
          </p>

          <div class="cta-section">
            <button class="cta-button" @click="claimTicket">{{ $t('message.cta') }}</button>
            <p class="slots-remaining"><i><strong>Only 125 </strong>{{ $t('message.slotsRemaining') }}</i></p>
          </div>
        </div>
      </div>
    </section>


    <section class="how-help-section">
      <div class="how-help-inner">
        <div class="video-container">
          <video 
            v-if="jobFairVideoUrl"
            ref="videoRef"
            :src="jobFairVideoUrl"
            controls 
            playsinline
            preload="metadata"
            class="job-fair-video"
          >
            Your browser does not support the video tag.
          </video>
          <div v-if="!jobFairVideoUrl" class="video-placeholder">
            <div class="play-button">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>


    <transition name="fade">
      <div v-if="showBookingPopup" class="booking-backdrop" role="dialog" aria-modal="true" aria-labelledby="confirm-heading">
        <div class="booking-modal" role="dialog" aria-modal="true">
          <button type="button" class="modal-close-btn" aria-label="Close" @click="closeBookingPopup">×</button>
          
          <div class="booking-header">
            <h2 id="confirm-heading" class="booking-title">{{ $t('message.confirmTitle') }}</h2>
          </div>
          
          <div class="booking-body">
            <div class="booking-info-card" role="group">
              <p class="booking-info-text" style="text-align: center;">
                <strong>{{ $t('message.mainText') }}</strong>
                
              </p>
              <p class="booking-info-text" style="text-align: center; margin-top: 1rem; font-size: 0.85rem; color: #6b7280;">
                <em>{{ $t('message.disclaimer') }}</em>
              </p>
            </div>
          </div>
          
          <div class="booking-actions">
            <button type="button" class="booking-action-btn" >
              <a 
                class="book-aTag" 
                href="https://www.eventbrite.com/e/mindspeller-neuroprofiling-supernova-job-fair-tickets-1980472741282?utm-campaign=social&utm-content=attendeeshare&utm-medium=discovery&utm-term=listing&utm-source=cp&aff=ebdsshcopyurl"
                target="_blank"
                rel="noopener noreferrer"
              >
                {{ $t('message.confirm') }}
              </a>
              
            </button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>

import { ref, computed, onBeforeUnmount, nextTick, watch } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const videoRef = ref(null);
const showBookingPopup = ref(false);
let videoObserver = null;


const jobFairVideoUrl = computed(() => {
  const videoUrl = 'https://mindspeller-static-prod-en.s3.eu-central-1.amazonaws.com/Mindspeller_supernova_video.mp4?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZLPLOI4ZXCPS4KZA%2F20260216%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Date=20260216T124310Z&X-Amz-Expires=300&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG0aDGV1LWNlbnRyYWwtMSJIMEYCIQDyZ8zncTrfO96umtLHYrqqiR1udtl8gfcIxbwkse0vLwIhAMakomJiIp8uW2LCuFTRuh%2BU6VafC6PWamMGnpGB2TpUKu8CCDYQBBoMNjQzMTI4MjQ4MTE1IgxRE3n3ZL8%2BACI5kkcqzAJrfLnAV28PN%2BgjtsIw2Qy3XzoKmm6w6O4lVSX%2F6kue2nSNVSJjz58qKMvUodb7KRMc1M58Ajckgxr5xTSY3dr7lffruoEqagQRo0Wf%2BBF5t1KnDi1brZpnQhnJzBkzwCBy9IhfJi9EYrajgc8lnKvy8c5xLBixc0jYznGh%2BJN%2Fisc%2FDjHxS%2BTewRBetFE3OJc3Ye3BGGJaTAba5d5Ncec2U8hhkf9Snf%2Bb0x99zuLNzQRufaWpt7RL21y80k5pvdv2UoZrJzpT%2FSADtkXGFKYegruIgWcbSp3eI7FfkgIhq0KKZFAzJgbH0rBjrnN2F3RwT3%2BROLyl%2Bkwilej0eJNqzj62n%2FKCDrDgDuX3HonsHzJUI8XGw2jhsZq%2FZZwJxDbcO3%2F6vsqP4UXQrQbycq4OKtQHmhTET1Fxal0rPmZsRdZgG0XXDoufE1Lg8zD%2FoMzMBjqsAsROf5TtSSR6l44sT7pYELoYoQGGvfO6vT8bmCnTVCAqbGY8XNtNN2gX4VIV06TX6bSBsF6%2FBKDl4siD3BL%2BD9l4ychKoTMdGQ%2F%2BR1xzlDpszl7q9EFyG1EAI9nJfflILj2Ywz7ETS1TFQ2mVRdPx4HyUbj%2F8tNwlSjPC%2FAZVEg3JMzoVRBCVD0JmwO0%2FcoNh9Mf9%2Bzlzv%2FqhcULPIBRTuxfmn4sbLfhD1iE6nLntDWljJAuW0tDiwW2YW0GUgLIu%2BchCKfEkZOAWgxgR%2BgqZE8VUr27hUgE6JZUalaAEYEw%2BPcCMug6qTSCVCw%2BiND9lueuSoP1fnEVAZhwAocrsqK3qrf5Wcf8sZ8OtAsXMGcqzVIOSB9k9UkYE5MaDrwlDRdBHXcJtUdhYJ5DqQ%3D%3D&X-Amz-Signature=496d6afe265a319561c03f05d41feeb814f3e0e337aafa53713299f5050111f4&X-Amz-SignedHeaders=host&response-content-disposition=inline&response-content-disposition=inline';
  return videoUrl;
});

const claimTicket = () => {
  showBookingPopup.value = true;
  console.log('Opening booking confirmation modal');
};

const setupVideoObserver = () => {
  if (!videoRef.value) return;
  
  const footerEl = document.querySelector('.np-footer') || document.querySelector('footer');
  
  const targetEl = footerEl || videoRef.value;
  
  videoObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && videoRef.value) {
          videoRef.value.muted = false;
          videoRef.value.play().catch(() => {
            if (videoRef.value) {
              videoRef.value.muted = true;
              videoRef.value.play().catch(() => {});
            }
          });
        }
      });
    },
    { threshold: 0.1 }
  );
  
  videoObserver.observe(targetEl);
};

watch(videoRef, (el) => {
  if (el) {
    nextTick(() => setupVideoObserver());
  }
});

onBeforeUnmount(() => {
  if (videoObserver) {
    videoObserver.disconnect();
    videoObserver = null;
  }
});

const closeBookingPopup = () => {
  showBookingPopup.value = false;
};

import '../styles/jobFair.scss';
</script>

