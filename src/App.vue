<script setup lang="ts">
import { RouterView } from "vue-router";
import {useMainStore} from "@/stores/main";
import AppLayout from "@/layouts/AppLayout.vue";
import {onMounted, onUnmounted} from "vue";

const mainStore = useMainStore();

onMounted(() => window.addEventListener('resize', mainStore.onWidthChange))
onUnmounted(() => window.removeEventListener('resize', mainStore.onWidthChange))
</script>


<template>
  <AppLayout>
    <RouterView />
  </AppLayout>
</template>

<style scoped lang="scss">
/*nav a.router-link-exact-active {*/
/*  color: var(--color-text);*/
/*}*/

/*nav a.router-link-exact-active:hover {*/
/*  background-color: transparent;*/
/*}*/
</style>
