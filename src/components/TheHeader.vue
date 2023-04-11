<script setup lang="ts">
import { computed } from 'vue'
import { useMainStore } from '@/stores/main'

const mainStore = useMainStore()

const isBurger = computed(() => {
  return mainStore.windowWidth <= 1250;
})
</script>

<template>
  <header class="header">
    <div class="container" v-if="!isBurger">
      <div class="header__menu" >
        <img class="header__menu-logo" src="../assets/logo.png" alt="">
        <div class="header__nav">
          <div class="header__nav-item">Play</div>
          <div class="header__nav-item">News</div>
          <div class="header__nav-item">Games</div>
          <div class="header__nav-item">Shop</div>
          <div class="header__nav-item">Sponsorship</div>
        </div>
      </div>
      <div class="header__buttons">
        <button class="button button-default" @click="mainStore.showLogin">Login</button>
        <button class="button button-gradient" @click="mainStore.showSignup">Sign up</button>
      </div>
    </div>

    <div class="container" v-else>
      <div class="header__menu">
        <div class="header__burger">
          <span/><span/><span/>
        </div>
        <img class="header__logo" src="../assets/logo.png" alt="">
      </div>
      <div class="header__content">
        <ul class="header__content-links">
          <li class="header__content-link">Play</li>
          <li class="header__content-link">News</li>
          <li class="header__content-link">Games</li>
          <li class="header__content-link">Shop</li>
          <li class="header__content-link">Sponsorship</li>
        </ul>
        <div class="header__content-buttons">
          <button class="button button-default button-block">Login</button>
          <button class="button button-gradient button-block">Sign up</button>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped lang="scss">
.header {
  position: fixed;
  z-index: 1;
  top: 0;
  width: 100%;
  color: #F5F5F5;
  background: #0F1215;
  padding: 32px 0;
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 24px;
  letter-spacing: 0.4px;
}
.container {
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.header__menu {
  display: flex;
  align-items: center;
  &-logo {
    margin-right: 56px;
  }
}

.header__nav {
  display: flex;
  &-item {
    margin-right: 56px;
  }
}



@media screen and (max-width: 1250px) {
  .container {
    flex-direction: column;
  }
  .header__menu {
    width: 100%;
    justify-content: space-between;
  }
  .header__burger {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 32px;
    padding: 4px;
    & span {
      height: 2.67px;
      width: 24px;
      background: #F5F5F5;
      margin-bottom: 4px;
    }
    & span:nth-last-child(1) {
      margin-bottom: 0;
    }
  }
  .header__content {
    width: 100%;
    margin-top: 17px;
    transition: height 0.4s;
    height: 0;
    overflow: hidden;
    &-links {
      text-align: center;
    }
    &-link {
      line-height: 100%;
      margin-bottom: 30px;
    }
    &-link:nth-last-child(1) {
      margin-bottom: 0;
    }
    &-buttons {
      display: flex;
      flex-direction: column;
      width: 100%;
      margin-top: 84px;
    }
  }
  .button-default {
    margin-right: 0;
    margin-bottom: 12px;
  }
}
@media screen and (max-width: 768px) {
  .header {
    padding: 15px 0;
  }
}
@media screen and (max-width: 425px) {
  .header__logo {
    width: 56px;
    height: 48px;
  }
}
</style>