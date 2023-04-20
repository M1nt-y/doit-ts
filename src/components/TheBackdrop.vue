<script setup lang="ts">
import { useMainStore } from '@/stores/main'
import { useAuthStore } from '@/stores/auth'

const mainStore = useMainStore()
const authStore = useAuthStore()
const { clearForm } = authStore

function closeAll() {
  mainStore.closeAll()
  clearForm()
}
</script>

<template>
  <div class="backdrop" @click="closeAll" />
</template>

<style scoped>

</style>