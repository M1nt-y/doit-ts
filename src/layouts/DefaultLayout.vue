<script setup lang="ts">

</script>

<template>
  <header></header>
  <main class="main">
    <slot />
  </main>
</template>

<style scoped lang="scss">
@import "@/assets/main.scss";
.main {
  background: $bg-main;
}
</style>