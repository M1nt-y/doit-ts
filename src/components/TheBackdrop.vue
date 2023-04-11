<script setup lang="ts">
import { useMainStore } from '@/stores/main'

const mainStore = useMainStore();
</script>

<template>
  <div class="backdrop" @click="mainStore.closeAll" />
</template>

<style scoped>

</style>