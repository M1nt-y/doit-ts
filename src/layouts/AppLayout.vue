<script setup lang="ts">
import ReloadPWA from "@/components/ReloadPWA.vue";
import { useRoute } from "vue-router";
const route = useRoute();
</script>

<template>
  <div class="wrapper">
    <component :is="route.meta.layoutComponent">
      <slot />
    </component>
    <ReloadPWA />
  </div>
</template>

<style scoped lang="scss">
.wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100%;
}
</style>