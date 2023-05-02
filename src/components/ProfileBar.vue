<script setup lang="ts">
import { computed } from 'vue'
import { useMainStore } from '@/stores/main'
import { useAuthStore } from '@/stores/auth'

const mainStore = useMainStore()
const authStore = useAuthStore()
const { currentUser } = authStore

const coin = computed(() => {
  if (currentUser)
    return Math.floor(currentUser.balance) / 10
  else
    return 0
})

const mainLinks = ['My profile', 'My team', 'Withdraw', 'Deposit', 'Premium', 'Statistics']

const background = computed(() => {
  if (mainStore.profileExpanded)
    return '#161A1F'
  else
    return 'none'
})
</script>

<template>
  <div class="profile-bar">
    <div class="profile-bar__info">
      <div class="profile-bar__info-pfp"></div>
      <div class="profile-bar__info-text">
        <p class="profile-bar__info-name">{{ currentUser.username }}</p>
        <p class="profile-bar__info-balance">{{ currentUser.balance }} EUR <span>/</span> {{ coin }} DTC</p>
      </div>
      <div class="profile-bar__info-toggle" @click="mainStore.toggleProfile"></div>
    </div>
    <transition name="dropdown">
      <div class="profile-bar__dropdown" v-if="mainStore.profileExpanded">
        <div class="profile-bar__dropdown-top">
          <div class="profile-bar__dropdown-level">
            <p>LVL {{ currentUser.level }}</p>
            <div class="profile-bar__dropdown-progress"></div>
          </div>
          <div class="profile-bar__dropdown-icons"></div>
        </div>
        <ul class="profile-bar__dropdown-main">
          <li class="profile-bar__dropdown-link" v-for="(link, index) in mainLinks" :key="index">
            <RouterLink :to="{ name: 'profile', query: { 'q': link } }">{{ link }}</RouterLink>
          </li>
        </ul>
        <div class="profile-bar__dropdown-bot">
          <RouterLink class="profile-bar__dropdown-link" :to="{ name: 'profile', query: { 'q': 'Support' } }">Support</RouterLink>
          <RouterLink class="profile-bar__dropdown-link" :to="{ name: 'profile', query: { 'q': 'Settings' } }">Settings</RouterLink>
          <p class="profile-bar__dropdown-link">Logout</p>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped lang="scss">
.profile-bar {
  width: 100%;
  max-width: 225px;
  position: relative;
  background: v-bind(background);
  transition: all 0.6s ease;
  &__info {
    width: 100%;
    padding: 8px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    &-pfp {
      width: 40px;
      height: 40px;
      background: #0a68f5;
    }
    &-text {
      margin: 0 8px;
      font-family: 'Rubik', sans-serif;
      font-style: normal;
      font-weight: 500;
      line-height: 100%;
    }
    &-name {
      font-size: 14px;
    }
    &-balance {
      font-size: 12px;
      color: #55AAFF;
      & span {
        margin: 0 4px;
      }
    }
    &-toggle {
      width: 24px;
      height: 24px;
      background: #0a68f5;
    }
  }
  &__dropdown {
    width: 100%;
    overflow: hidden;
    background: #161A1F;
    position: absolute;
    z-index: 2;
    font-weight: 400;
    font-style: normal;
    font-family: 'Rubik', sans-serif;
    &-top {
      padding: 0 8px;
    }
    &-level {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      color: #F5F5F5;
      font-size: 11px;
      line-height: 100%;
    }
    &-progress {
      width: 107px;
      height: 2px;
      margin-left: 7px;
      margin-right: 14px;
      border-radius: 2px;
      background: #2B353F;
    }

    &-main {
      border: 2px solid #0F1215;
      color: #F5F5F5;
      border-left: 0;
      border-right: 0;
      font-size: 12px;
      margin-top: 14px;
      line-height: 100%;
      padding: 14px 12px;
      text-transform: uppercase;
    }
    &-link {
      margin-bottom: 16px;
    }
    &-link a {
      color: inherit;
      text-decoration: none;
    }
    &-link:nth-last-child(1) {
      margin-bottom: 0;
    }

    &-bot {
      display: flex;
      color: #969BA3;
      font-size: 12px;
      padding: 14px 12px;
      line-height: 100%;
      justify-content: space-between;
      & .profile-bar__dropdown-link {
        color: inherit;
        margin-bottom: 0;
        text-decoration: none;
      }
    }
  }
}

.dropdown-enter-from { max-height: 0 }
.dropdown-enter-to { max-height: 250px }
.dropdown-enter-active { transition: max-height .4s }
.dropdown-leave-from { max-height: 250px }
.dropdown-leave-to { max-height: 0 }
.dropdown-leave-active { transition: max-height .4s }
</style>