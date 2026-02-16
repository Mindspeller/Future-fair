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
  const videoUrl = 'https://mindspeller-static-prod-en.s3.eu-central-1.amazonaws.com/Mindspeller_supernova_video.mp4';
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

