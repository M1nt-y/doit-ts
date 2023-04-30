<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useRoute } from 'vue-router'
import { useMainStore } from '@/stores/main'
import { useAuthStore } from '@/stores/auth'
import ProfileBar from '@/components/ProfileBar.vue'


const route = useRoute()
const mainStore = useMainStore()
const authStore = useAuthStore()

const { currentUser } = storeToRefs(authStore)

const isBurger = computed(() => {
  return mainStore.windowWidth <= 1260
})

const displayProfile = computed(() => {
  return mainStore.windowWidth > 500 && route.name !== 'profile'
})

const zIndex = computed(() => mainStore.headerIndex)
</script>

<template>
  <header class="header" :class="{'header--active': mainStore.showMenu}">
    <div class="container">
      <div class="header__menu">
        <img class="header__menu-logo" src="../assets/logo.png" alt="">
        <div class="header__nav" v-if="!isBurger">
          <div class="header__nav-item">Play</div>
          <div class="header__nav-item">News</div>
          <div class="header__nav-item">Games</div>
          <div class="header__nav-item">Shop</div>
          <div class="header__nav-item">Sponsorship</div>
        </div>
        <div class="header__burger" @click="mainStore.toggleMenu" v-else>
          <span/><span/><span/>
        </div>
      </div>
      <div class="header__wrapper" v-if="displayProfile">
        <ProfileBar v-if="currentUser" />
        <div class="header__buttons" v-else>
          <button class="button button-default" @click="mainStore.showLogin">Login</button>
          <button class="button button-gradient" @click="mainStore.showSignup">Sign up</button>
        </div>
      </div>
    </div>
    <transition name="dropdown">
      <div class="header__content" v-if="mainStore.showMenu">
        <ul class="header__content-links">
          <li class="header__content-link">Play</li>
          <li class="header__content-link">News</li>
          <li class="header__content-link">Games</li>
          <li class="header__content-link">Shop</li>
          <li class="header__content-link">Sponsorship</li>
          <li class="header__content-link" v-if="currentUser && !displayProfile">Profile</li>
        </ul>
        <div class="header__content-buttons" v-if="!currentUser && !displayProfile">
          <button class="button button-default" @click="mainStore.showLogin">Login</button>
          <button class="button button-gradient" @click="mainStore.showSignup">Sign up</button>
        </div>
      </div>
    </transition>
  </header>
</template>

<style scoped lang="scss">
.header {
  position: fixed;
  z-index: v-bind(zIndex);
  top: 0;
  left: 0;
  right: 0;
  color: #F5F5F5;
  background: #0F1215;
  padding: 32px 0;
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 24px;
  margin-right: calc(-1 * (100vw - 100%));
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

.dropdown-enter-from { max-height: 0 }
.dropdown-enter-to { max-height: 400px }
.dropdown-enter-active { transition: max-height .4s }
.dropdown-leave-from { max-height: 400px }
.dropdown-leave-to { max-height: 0 }
.dropdown-leave-active { transition: max-height .4s }

@media screen and (max-width: 1260px) {
  .header {
    padding: 24px 0;
    &__burger {
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
    &--active {
      overflow-y: scroll;
      height: 100%;
    }
    &__content {
      width: 100%;
      max-width: 330px;
      margin: 17px auto 0;
      overflow-y: hidden;
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
  }
}
@media screen and (max-width: 768px) {
  .header {
    padding: 15px 0;
  }
}
@media screen and (max-width: 500px) {
  .header__menu {
    width: 100%;
    justify-content: space-between;
    &-logo {
      width: 56px;
      height: 48px;
    }
  }
  .button-default {
    margin-right: 0;
    margin-bottom: 12px;
  }
}
</style>