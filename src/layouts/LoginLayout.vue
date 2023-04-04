<script setup lang="ts">

</script>

<template>
  <main class="main">
    <slot />
  </main>
</template>

<style scoped lang="scss">
@import "@/assets/main.scss";
.main {
  background: $bg-dark;
}
</style>