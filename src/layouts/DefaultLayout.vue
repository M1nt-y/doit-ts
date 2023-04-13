<script setup lang="ts">
import FixedNavigation from '@/components/FixedNavigation.vue'
import TheHeader from '@/components/TheHeader.vue'
import TheBackdrop from '@/components/TheBackdrop.vue'
import PopUp from '@/components/PopUp.vue'
import {useMainStore} from '@/stores/main'


const mainStore = useMainStore()
</script>

<template>
  <TheHeader />
  <FixedNavigation />
  <TheBackdrop v-if="mainStore.showBackdrop" />
  <transition name="fade">
    <PopUp v-if="mainStore.showPopup" />
  </transition>
  <main class="main">
    <slot />
  </main>
</template>

<style scoped lang="scss">
.fade-enter-from { opacity: 0; }
.fade-enter-to { opacity: 1; }
.fade-enter-active { transition: opacity .6s }
.fade-leave-from { opacity: 1; }
.fade-leave-to { opacity: 0; }
.fade-leave-active { transition: opacity .6s }
</style>