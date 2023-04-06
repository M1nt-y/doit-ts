<script setup lang="ts">

import FixedNavigation from "@/components/FixedNavigation.vue";
import TheHeader from "@/components/TheHeader.vue";
</script>

<template>
  <FixedNavigation />
  <TheHeader />
  <main class="main">
    <slot />
  </main>
</template>

<style scoped lang="scss">

</style>