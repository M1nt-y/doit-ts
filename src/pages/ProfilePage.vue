<script setup lang="ts">
import { watch, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
// import { useAuthStore } from '@/stores/auth'
import { useProfileStore } from '@/stores/profile'
import { useRoute, useRouter } from 'vue-router'


// const authStore = useAuthStore()
// const { currentUser } = storeToRefs(authStore)
// const { token } = authStore


const profileStore = useProfileStore()
const { currentPage } = storeToRefs(profileStore)
const { profilePages, userPanelButtons, settingsButtons } = profileStore
function isActive(page: string) {
  return page === currentPage?.value
}


const route = useRoute()
const router = useRouter()
onMounted(() => {
  getUrlQueryParams()
})
async function getUrlQueryParams() {
  await router.isReady()
  if (route.query.q) {
    currentPage.value = route.query.q.toString()
  }
  else {
    await router.push({ query: { 'q': currentPage.value } })
  }
}
watch(() => currentPage.value, () => {
  router.push({ query: { 'q': currentPage.value } })
})
watch(() => route.query.q, () => {
  if (currentPage.value !== route.query.q) {
    currentPage.value = route.query.q?.toString() as string
  }
})

function profileNavigation(goTo: string) {
  if (goTo !== 'Logout') {
    currentPage.value = goTo
  }
}
</script>

<template>
  <div class="profile">
    <div class="profile__info">
      <div class="profile__info-wrapper">
        <div class="profile__info-pfp"></div>
        <div class="profile__info-content">
          <p class="profile__info-name">Nikodem Świder</p>
          <h2 class="profile__info-nickname">BlacerLordTV</h2>
          <p class="profile__info-team">Blacer team</p>
          <p class="profile__info-balance">Balance: </p>
          <div class="profile__info-icons"></div>
        </div>
      </div>
      <ul class="profile__info-nav">
        <li v-for="(page, index) in profilePages" :key="index" class="profile__info-link" :class="{ 'profile__info-link--active': isActive(page) }">
          <label>
            {{ page }}
            <input type="radio" :value="page" v-model="currentPage" />
          </label>
        </li>
      </ul>
    </div>
    <div class="profile__main">
      <h1 class="profile__main-title">{{ currentPage }}</h1>
      <div class="profile__main-controls" v-if="currentPage === 'User panel'">
        <div class="profile__main-button" v-for="(button, index) in userPanelButtons" :key="index" @click="profileNavigation(button)">{{ button }}</div>
      </div>

      <div class="profile__main-controls" v-else-if="currentPage === 'Settings'">
        <div class="profile__main-button" v-for="(button, index) in settingsButtons" :key="index" @click="profileNavigation(button)">{{ button }}</div>
      </div>

      <div class="profile__main-controls" v-else-if="currentPage === 'My team'">
        <div class="profile__main-button" @click="profileNavigation('Create team')">Create team</div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.profile {
  width: 100%;
  display: flex;
  margin-top: 50px;
  margin-left: 215px;
  font-style: normal;
  font-family: 'Rubik', sans-serif;
  &__info {
    display: flex;
    margin-top: 65px;
    margin-right: 69px;
    padding-right: 135px;
    flex-direction: column;
    border-right: 1px solid #1A1F24;
    &-pfp {
      width: 104px;
      height: 104px;
      background: #0a68f5;
    }
    &-name {
      color: #909AA3;
      font-size: 16px;
      line-height: 130%;
      margin-bottom: 5px;
      margin-top: 23px;
    }
    &-nickname {
      color: #F5F5F5;
      line-height: 130%;
      margin-bottom: 7px;
    }
    &-team {
      color: #37B7FA;
      font-size: 16px;
      line-height: 130%;
      //margin-bottom: 11px;
      text-transform: uppercase;
    }
    &-balance {
      color: #37B7FA;
      font-size: 16px;
      line-height: 130%;
      margin-bottom: 11px;
      text-transform: uppercase;
    }
    &-icons {
      height: 24px;
      display: flex;
    }

    &-nav {
      margin-top: 17px;
    }
    &-link {
      cursor: pointer;
      color: #FFFFFF;
      font-size: 16px;
      font-weight: 400;
      line-height: 100%;
      position: relative;
      padding-left: 20px;
      margin-bottom: 24px;
      transition: all 0.4s ease;
    }
    &-link:nth-last-child(1) {
      margin-bottom: 0;
    }
    &-link::before, &-link::after {
      content: '';
      position: absolute;
      border-radius: 50%;
      transition: all 0.4s ease;
    }
    &-link::before {
      width: 11px;
      height: 11px;
      background: #FFFFFF;
      left: 0;
    }
    &-link::after {
      width: 9px;
      height: 9px;
      background: #151A1F;
      left: 1px;
      top: 1px;
    }
    &-link--active,
    &-link:hover {
      color: #37B7FA;
    }
    &-link--active::before, &-link--active::after,
    &-link:hover::before, &-link:hover::after {
      background: #37B7FA;
    }
    &-link input {
      display: none;
    }
  }
  &__main {
    width: 100%;
    max-width: 989px;
    margin-right: auto;
    &-title {
      color: #F5F5F5;
      font-size: 48px;
      text-align: center;
      line-height: 137.5%;
      margin-bottom: 59px;
    }
    &-controls {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
    }
    &-button {
      max-width: 274px;
      width: 100%;
      color: #F5F5F5;
      cursor: pointer;
      font-size: 22px;
      font-weight: 700;
      line-height: 100%;
      text-align: center;
      padding: 30px 15px;
      margin-right: 64px;
      margin-bottom: 50px;
      border: 2px solid #20252B;
    }
    &-button:nth-child(3n),
    &-button:nth-last-child(1){
      margin-right: 0;
    }
  }
}
</style>