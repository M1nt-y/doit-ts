<script setup lang="ts">
import axios from 'axios'
import { storeToRefs } from 'pinia'
import { useMainStore } from '@/stores/main'
import { useAuthStore } from '@/stores/auth'
import { useVuelidate } from '@vuelidate/core'
import { watch, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useProfileStore } from '@/stores/profile'
import BaseInput from '@/components/BaseInput.vue'
import BaseSelect from '@/components/BaseSelect.vue'
import { between, helpers, maxValue, required } from '@vuelidate/validators'


const mainStore = useMainStore()

const authStore = useAuthStore()
const { token, currentUser, getProfile } = authStore


const profileStore = useProfileStore()
const { currentPage, paymentPage, formData, singleError, gameProfile, } = storeToRefs(profileStore)
const { profilePages, userPanelButtons, settingsButtons } = profileStore
function isActive(page: string) {
  return page === currentPage?.value
}


const route = useRoute()
const router = useRouter()
onMounted(() => {
  getProfile().then(() => {
    if (currentUser) {
      if (currentUser.gameProfile !== null) {
        gameProfile.value = currentUser.gameProfile
      } else {
        gameProfile.value = {
          riot: '',
          battlenet: '',
          steam: ''
        }
      }
    }
  }).catch(error => {
    console.log('An error occurred:', error.response)
  })
  getUrlQueryParams()
})
async function getUrlQueryParams() {
  await router.isReady()
  if (route.query.q) {
    if (route.query.q === 'Deposit' || route.query.q === 'Withdraw' || route.query.q === 'History') {
      currentPage.value = 'Deposit/Withdraw'
      paymentPage.value = route.query.q.toString() as string
    } else {
      currentPage.value = route.query.q.toString()
    }
  } else {
    await router.push({ query: { 'q': currentPage.value } })
  }
}
watch(() => currentPage.value, () => {
  if (currentPage.value === 'Deposit/Withdraw') {
    router.push({ query: { 'q': paymentPage.value } })
  } else {
    router.push({ query: { 'q': currentPage.value } })
  }
})
watch(() => paymentPage.value, () => {
  router.push({ query: { 'q': paymentPage.value } })
})
watch(() => route.query.q, () => {
  if (route.query.q) {
    if (currentPage.value !== route.query.q) {
      if (route.query.q === 'Deposit' || route.query.q === 'Withdraw' || route.query.q === 'History') {
        currentPage.value = 'Deposit/Withdraw'
        paymentPage.value = route.query.q.toString() as string
      } else {
        currentPage.value = route.query.q.toString() as string
      }
    }
  }
})

function profileNavigation(goTo: string) {
  if (goTo !== 'Logout') {
    if (goTo === 'Deposit' || goTo === 'Withdraw' || goTo === 'History') {
      currentPage.value = 'Deposit/Withdraw'
      paymentPage.value = goTo
    } else {
      currentPage.value = goTo
    }
  } else {
    console.log('Logout')
  }
}


const registrationDate = () => {
  if (currentUser) {
    let date = new Date(currentUser.createdAt)
    let d = date.getDate()
    let m = date.getMonth() + 1
    return (d <= 9 ? '0' + d : d) + '/' + (m<=9 ? '0' + m : m) + '/' + date.getFullYear()
  }
  else
    return ''
}
const userAge = computed(() => {
  if (currentUser) {
    let today = new Date()
    let birthDate = new Date(currentUser.birthdate)
    let age = today.getFullYear() - birthDate.getFullYear()
    let month = today.getMonth() - birthDate.getMonth()
    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }
    return age
  }
  else
    return 0
})

// const teams = computed(() => {
//   if (currentUser && currentUser.teams) {
//     return currentUser.teams
//   }
//   else
//     return ['No team']
// })

const username = helpers.regex(/^([a-z0-9]|[-._](?![-._])){4,20}$/)

const rules = computed(() => {
  if (currentPage.value === 'Edit account details') {
    return {
      username: { required, username },
      fullName: { required },
      country: { required },
      // mainTeam: {  },
      // gender: { required },
      day: { required, maxValue: maxValue(31) },
      month: { required, maxValue: maxValue(12) },
      year: { required, betweenValue: between(1900, 2010) }
    }
  }
  else {
    return ''
  }
})

const v$ = useVuelidate(rules, formData)

const submitForm = async () => {
  const results = await v$.value.$validate()
  if (results) {
    await changeDetails()
  }
}

const birthdateError = computed(() => {
  if (v$.value.day?.$errors[0]?.$message === 'Value is required'|| v$.value.month?.$errors[0]?.$message === 'Value is required' || v$.value.year?.$errors[0]?.$message === 'Value is required') {
    return 'Value is required'
  }
  else if (v$.value.day?.$errors[0]?.$message === 'The maximum value allowed is 31' || v$.value.month?.$errors[0]?.$message === 'The maximum value allowed is 12' || v$.value.year?.$errors[0]?.$message === 'The value must be between 1900 and 2010') {
    return 'Invalid date'
  }
  else {
    return ''
  }
})

async function changeDetails() {
  if (currentUser) {
    await axios.put(`/api/users/${currentUser.id}`,
        {
          username: formData.value.username,
          fullName: formData.value.fullName,
          country: formData.value.country,
          birthdate: formData.value.year + '-' + formData.value.month + '-' + formData.value.day
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }).then(() => {
      getProfile()
    }).catch(error => {
      console.log('An error occurred:', error.response)
    })
  }
}

async function saveProfile() {
  if (currentUser) {
    await axios.put(`/api/users/${currentUser.id}`,
        {
          gameProfile: gameProfile.value
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }).then(() => {
          getProfile()
        }).catch(error => {
          console.log('An error occurred:', error.response)
        })
  }
}
</script>

<template>
  <div class="profile" @click="mainStore.customSelect.active = false">
    <div class="profile__info">
      <div class="profile__info-wrapper">
        <div class="profile__info-pfp"></div>
        <div class="profile__info-content">
          <p class="profile__info-name">{{ currentUser.fullName }}</p>
          <h2 class="profile__info-nickname">{{ currentUser.username }}</h2>
          <p class="profile__info-team">{{ currentUser.mainTeam }}</p>
          <p class="profile__info-balance">Balance: {{ currentUser.balance }} EUR</p>
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

      <div class="" v-else-if="currentPage === 'My profile'">

        <table class="profile__main-table">
          <tr>
            <td class="profile__main-name">ID</td>
            <td>{{ currentUser.id }}</td>
          </tr>
          <tr>
            <td class="profile__main-name">Name</td>
            <td>{{ currentUser.fullName }}</td>
          </tr>
          <tr>
            <td class="profile__main-name">Username</td>
            <td>{{ currentUser.username }}</td>
          </tr>
          <tr>
            <td class="profile__main-name">With us from</td>
            <td>{{ registrationDate() }}</td>
          </tr>
          <tr>
            <td class="profile__main-name">Gender / Age</td>
            <td>{{ currentUser.gender }} / {{ userAge }}</td>
          </tr>

          <!--     Need nationality?     -->
<!--          <tr>-->
<!--            <td class="profile__main-name">Nationality</td>-->
<!--            <td>Person 2</td>-->
<!--          </tr>-->

          <tr>
            <td class="profile__main-name">Country</td>
            <td>{{ currentUser.country }}</td>
          </tr>
          <!--     Need website?     -->
<!--          <tr>-->
<!--            <td class="profile__main-name">Website</td>-->
<!--            <td>Person 2</td>-->
<!--          </tr>-->
        </table>




      </div>

      <div class="profile__main-controls" v-else-if="currentPage === 'My team'">
        <div class="profile__main-button" @click="profileNavigation('Create team')">Create team</div>
      </div>

      <!--   Teams related pages   -->



      <div class="profile__main-payments" v-else-if="currentPage === 'Deposit/Withdraw'">
        <div class="info">
          <div class="info__profile"></div>
          <div class="info__tabs">
            <h2
                class="info__tabs-link"
                :class="{ 'info__tabs-link--active': paymentPage === 'Withdraw' }"
                @click="profileNavigation('Withdraw')"
            >
              Withdraw
            </h2>
            <h2
                class="info__tabs-link"
                :class="{ 'info__tabs-link--active': paymentPage === 'Deposit' }"
                @click="profileNavigation('Deposit')"
            >
              Deposit
            </h2>
            <h2
                class="info__tabs-link"
                :class="{ 'info__tabs-link--active': paymentPage === 'History' }"
                @click="profileNavigation('History')"
            >
              History
            </h2>
          </div>
        </div>

<!--        <div class="profile__main-deposit" v-if="paymentPage === 'Deposit'"></div>-->

<!--        <div class="profile__main-withdraw" v-else-if="paymentPage === 'Withdraw'"></div>-->

<!--        <div class="profile__main-history" v-else-if="paymentPage === 'History'"></div>-->

      </div>


      <div class="profile__main-controls" v-else-if="currentPage === 'Settings'">
        <div class="profile__main-button" v-for="(button, index) in settingsButtons" :key="index" @click="profileNavigation(button)">{{ button }}</div>
      </div>

      <div class="profile__main-content" v-else-if="currentPage === 'Edit account details'">
        <div class="profile__main-form">

          <BaseInput
              :label="'Username'"
              placeholder="Username"
              v-model="formData.username"
              :errors="v$?.username?.$errors"
              :single-error="singleError"
          />
          <BaseInput
              :label="'Full name'"
              placeholder="Full name"
              v-model="formData.fullName"
              :errors="v$?.username?.$errors"
          />
          <BaseSelect
              v-model="formData.country"
              :options="mainStore.countries"
              placeholder="Select country"
              @click.stop :label="'Country'"
              :errors="v$?.country?.$errors"
          />

          <!--     Main team select     -->

          <!--     Gender select     -->

          <!--     Make it as component     -->
          <div class="birthdate">
            <p class="birthdate__label">Date of birth</p>
            <div class="birthdate__inputs">
              <BaseInput
                  placeholder="dd" type="number"
                  v-model="formData.day"
                  :errors="v$?.day?.$errors"
                  :displayErrors="false"
              />
              <BaseInput
                  placeholder="mm" type="number"
                  v-model="formData.month"
                  :errors="v$?.month?.$errors"
                  :displayErrors="false"
              />
              <BaseInput
                  placeholder="yyyy" type="number"
                  v-model="formData.year"
                  :errors="v$?.year?.$errors"
                  :displayErrors="false"
              />
            </div>
            <div class="birthdate__errors">
              <p class="birthdate__error-message" v-if="birthdateError">{{ birthdateError }}</p>
            </div>
          </div>


<!--          <BaseInput-->
<!--              v-if="gameProfile"-->
<!--              :label="'Riot Games account'"-->
<!--              placeholder="Riot Games account"-->
<!--              v-model="gameProfile.riot"-->
<!--          />-->
<!--          <BaseInput-->
<!--              v-if="gameProfile"-->
<!--              :label="'Battlenet account'"-->
<!--              placeholder="Battlenet account"-->
<!--              v-model="gameProfile.battlenet"-->
<!--          />-->
<!--          <BaseInput-->
<!--              v-if="gameProfile"-->
<!--              :label="'Steam account'"-->
<!--              placeholder="Steam account"-->
<!--              v-model="gameProfile.steam"-->
<!--          />-->
        </div>
        <button class="profile__main-save" @click="submitForm">Change details</button>
      </div>





      <div class="profile__main-content" v-else-if="currentPage === 'Game profile'">
        <div class="profile__main-form">
          <BaseInput
              v-if="gameProfile"
              :label="'Riot Games account'"
              placeholder="Riot Games account"
              v-model="gameProfile.riot"
          />
          <BaseInput
              v-if="gameProfile"
              :label="'Battlenet account'"
              placeholder="Battlenet account"
              v-model="gameProfile.battlenet"
          />
          <BaseInput
              v-if="gameProfile"
              :label="'Steam account'"
              placeholder="Steam account"
              v-model="gameProfile.steam"
          />
        </div>
        <button class="profile__main-save" @click="saveProfile">Save profile</button>
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

    &-table {
      font-family: 'Rubik', sans-serif;
      font-style: normal;
      font-weight: 400;
      font-size: 16px;
      line-height: 100%;
      color: #FFFFFF;
      & td {
        padding-bottom: 18px;
      }
    }
    &-name {
      color: #67707A;
      padding-right: 60px;
    }

    &-content {
      display: flex;
      align-items: center;
      flex-direction: column;
    }
    &-form {
      width: 100%;
      max-width: 600px;
      padding: 44px 58px;
      margin-bottom: 33px;
      border: 1px solid #20252B;
    }
    &-save {
      border: none;
      outline: none;
      cursor: pointer;
      font-family: 'Rubik', sans-serif;
      font-style: normal;
      font-weight: 700;
      font-size: 16px;
      line-height: 19px;
      text-align: center;
      color: #F5F5F5;
      padding: 16px 32px;
      background: #1A222D;
    }


    &-payments {
      width: 100%;
      max-width: 928px;

      & .info {
        background: #0D1D2C;

        &__tabs {
          display: flex;
          justify-content: space-around;
          &-link {
            color: #ABABAB;
            cursor: pointer;
            line-height: 130%;
            transition: all 0.3s ease;
          }
          &-link--active,
          &-link:hover {
            color: #FFFFFF;
          }
        }
      }
    }


  }
}

.birthdate {
  //margin-bottom: 16px;
  &__label {
    font-family: 'Rubik', sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 100%;
    color: #FFFFFF;
    margin-bottom: 6px;
  }
  &__inputs {
    display: flex;
    & .input-wrapper:nth-child(2) {
      margin-left: 12px;
      margin-right: 12px;
    }
  }
}
</style>