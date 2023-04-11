<script setup lang="ts">
import { useRegisterSW } from 'virtual:pwa-register/vue';

// replaced dyanmicaly
const reloadSW: any = '__RELOAD_SW__'
const { offlineReady, needRefresh, updateServiceWorker } = useRegisterSW({
  immediate: true,
  onRegisteredSW(swUrl, r) {
    // eslint-disable-next-line no-console
    console.log(`Service Worker at: ${swUrl}`)
    if (reloadSW === 'true') {
      r && setInterval(async () => {
        // eslint-disable-next-line no-console
        console.log('Checking for sw update')
        await r.update()
      }, 20000 /* 20s for testing purposes */)
    }
    else {
      // eslint-disable-next-line no-console
      console.log(`SW Registered: ${r}`)
    }
  },
})
const close = async () => {
  offlineReady.value = false;
  needRefresh.value = false;
};

async function handleUpdateServiceWorker() {
  await updateServiceWorker();
}
</script>

<template>
  <div v-if="offlineReady || needRefresh" class="pwa-toast" role="alert">
    <div class="message">
      <span v-if="offlineReady"> App ready to work offline </span>
      <span v-else>New content available, click on reload button to update.</span>
    </div>
    <button v-if="needRefresh" @click="handleUpdateServiceWorker" class="button">
      Reload
    </button>
    <button @click="close" class="button">
      Close
    </button>
  </div>
</template>


<style scoped lang="scss">
.pwa-toast {
  position: fixed;
  right: 0;
  bottom: 0;
  margin: 16px;
  padding: 12px;
  border: 1px solid #8885;
  border-radius: 4px;
  z-index: 2;
  text-align: left;
  color: #F5F5F5;
  background: #0F1215;
  box-shadow: 3px 4px 5px 0 #8885;
  & .message {
    margin-bottom: 8px;
  }
  & button {
    border: 1px solid #8885;
    outline: none;
    margin-right: 5px;
    border-radius: 2px;
    padding: 3px 10px;
  }
}
</style>