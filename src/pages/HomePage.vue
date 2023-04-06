<script setup lang="ts">
import { computed } from 'vue'
import { useMainStore } from "@/stores/main"

const mainStore = useMainStore();

const display = computed(() => {
  return mainStore.windowWidth < 730;
})
</script>

<template>
  <div class="container">
    <div class="first-screen">
      <svg class="first-screen__triangles" width="1040" height="793" viewBox="0 0 1040 793" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g opacity="0.32" filter="url(#filter0_d_511_229)">
          <path d="M531.241 774.837L6.81946 32.9061L1010.65 3.0549L531.241 774.837Z" stroke="url(#paint0_linear_511_229)" stroke-width="2"/>
        </g>
        <g opacity="0.32" filter="url(#filter1_d_511_229)">
          <path d="M512.407 774.927L25.5738 7.80771L1029.65 27.9711L512.407 774.927Z" stroke="url(#paint1_linear_511_229)" stroke-width="2"/>
        </g>
        <g filter="url(#filter2_f_511_229)">
          <path d="M520 775.001L17.8631 17.8108L1022.14 17.8108L520 775.001Z" stroke="url(#paint2_linear_511_229)" stroke-width="2"/>
        </g>
        <path d="M520 775.002L17.8628 17.8115L1022.14 17.8115L520 775.002Z" stroke="url(#paint3_linear_511_229)" stroke-width="2"/>
        <path opacity="0.08" d="M519 410.998L364.859 177.812L673.14 177.812L519 410.998Z" stroke="url(#paint4_linear_511_229)" stroke-width="2"/>
        <path opacity="0.32" d="M520 581.002L204.863 105.812L835.137 105.812L520 581.002Z" stroke="url(#paint5_linear_511_229)" stroke-width="2"/>
        <defs>
          <filter id="filter0_d_511_229" x="0.92749" y="2" width="1015.55" height="782.645" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
            <feFlood flood-opacity="0" result="BackgroundImageFix"/>
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
            <feOffset dy="4"/>
            <feGaussianBlur stdDeviation="2"/>
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_511_229"/>
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_511_229" result="shape"/>
          </filter>
          <filter id="filter1_d_511_229" x="19.7312" y="6.77051" width="1015.8" height="777.966" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
            <feFlood flood-opacity="0" result="BackgroundImageFix"/>
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
            <feOffset dy="4"/>
            <feGaussianBlur stdDeviation="2"/>
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_511_229"/>
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_511_229" result="shape"/>
          </filter>
          <filter id="filter2_f_511_229" x="0" y="0.810791" width="1040" height="792" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
            <feFlood flood-opacity="0" result="BackgroundImageFix"/>
            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
            <feGaussianBlur stdDeviation="8" result="effect1_foregroundBlur_511_229"/>
          </filter>
          <linearGradient id="paint0_linear_511_229" x1="508.705" y1="16.9809" x2="531.295" y2="776.645" gradientUnits="userSpaceOnUse">
            <stop offset="0" stop-color="#3ABEFF"/>
            <stop offset="1" stop-color="#095FE0"/>
          </linearGradient>
          <linearGradient id="paint1_linear_511_229" x1="527.63" y1="16.8896" x2="512.371" y2="776.736" gradientUnits="userSpaceOnUse">
            <stop offset="0" stop-color="#3ABEFF"/>
            <stop offset="1" stop-color="#095FE0"/>
          </linearGradient>
          <linearGradient id="paint2_linear_511_229" x1="520" y1="16.8108" x2="520" y2="776.811" gradientUnits="userSpaceOnUse">
            <stop offset="0" stop-color="#3ABEFF"/>
            <stop offset="1" stop-color="#095FE0"/>
          </linearGradient>
          <linearGradient id="paint3_linear_511_229" x1="520" y1="16.8115" x2="520" y2="776.812" gradientUnits="userSpaceOnUse">
            <stop offset="0" stop-color="#3ABEFF"/>
            <stop offset="1" stop-color="#095FE0"/>
          </linearGradient>
          <linearGradient id="paint4_linear_511_229" x1="519" y1="176.812" x2="519" y2="412.812" gradientUnits="userSpaceOnUse">
            <stop offset="0" stop-color="#3ABEFF"/>
            <stop offset="1" stop-color="#095FE0"/>
          </linearGradient>
          <linearGradient id="paint5_linear_511_229" x1="520" y1="104.812" x2="520" y2="582.812" gradientUnits="userSpaceOnUse">
            <stop offset="0" stop-color="#3ABEFF"/>
            <stop offset="1" stop-color="#095FE0"/>
          </linearGradient>
        </defs>
      </svg>
      <div class="first-screen__content">
        <h1 class="first-screen__title">DOIT<span v-if="!display"> BETA</span></h1>
        <p class="first-screen__text">
          Prepare for your esports career and get ready for awesome tournaments with big prize pools and many fun!
          <br>Register Now!
        </p>
        <div class="first-screen__buttons" v-if="!display">
          <button class="button button-default">Login</button>
          <button class="button button-gradient">Sign up</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.first-screen {
  margin-top: 15px;
  width: 100%;
  &__content {
    width: 100%;
    padding-top: 14.9%;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
  }
  &__title {
    font-size: 125px;
    line-height: 100%;
    text-align: center;
    color: #F5F5F5;
    letter-spacing: -2px;
  }
  &__text {
    margin-top: 17px;
    max-width: 463px;
    font-size: 16px;
    line-height: 150%;
    letter-spacing: 0.3px;
    text-align: center;
    color: #CCCCCC;
    -webkit-text-fill-color: #CCCCCC;
    -webkit-text-stroke: 0.5px #000000;
  }
  &__buttons {
    margin-top: 13px;
    margin-left: 5px;
  }
}

@media screen and (max-width: 1300px) {
  .first-screen__triangles {
    display: block;
    width: 100%;
    height: auto;
  }
}

@media screen and (max-width: 1100px) {
  .container:nth-child(1) {
    height: 100%;
    flex-direction: column;
    justify-content: center;
  }
}

@media screen and (max-width: 875px) {
  .first-screen__content {
    padding-top: 10%;
  }
  .first-screen__title {
    font-size: 84px;
  }
  .first-screen__text {
    font-size: 14px;
    margin-top: 5px;
  }
}

@media screen and (max-width: 425px) {
  .first-screen {
    margin-top: 0;
    margin-bottom: 12px;
    &__content {
      padding-top: 7.6%;
    }
  }
}
</style>