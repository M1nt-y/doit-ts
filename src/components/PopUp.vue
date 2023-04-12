<script setup lang="ts">
import { computed } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, or, email, helpers } from '@vuelidate/validators'
import BaseInput from '@/components/BaseInput.vue'
import { useMainStore } from '@/stores/main'
import BaseSelect from "@/components/BaseSelect.vue";


const mainStore = useMainStore()

const popupTitle = computed(() => {
  if (mainStore.popupType.login) {
    return 'Login'
  } else if (mainStore.popupType.signup) {
    return 'Sign up 1/2'
  } else if (mainStore.popupType.signupNext) {
    return 'Sign up 2/2'
  } else if (mainStore.popupType.forgotPass) {
    return 'Forgot password'
  } else {
    return ''
  }
})
const showTitle = computed(() => {
  return !(mainStore.popupType.signupDone || mainStore.popupType.reportScores)
})
const showPass = computed(() => {
  return !(mainStore.popupType.signupNext || mainStore.popupType.forgotPass)
})
const btnContent = computed(() => {
  if (mainStore.popupType.login) {
    return 'Login'
  } else if (mainStore.popupType.signup) {
    return 'Next step'
  } else if (mainStore.popupType.signupNext) {
    return 'Create an account'
  } else if (mainStore.popupType.signupDone) {
    return 'Verify email'
  } else if (mainStore.popupType.forgotPass) {
    return 'Reset password'
  } else {
    return 'Submit scores'
  }
})
const showOptions = computed(() => {
  return mainStore.popupType.login || mainStore.popupType.signup
})

const username = helpers.regex(/^([a-z0-9]|[-._](?![-._])){4,20}$/);

const rules = computed(() => {
  if (mainStore.popupType.login) {
    return {
      login: { required, valid: or(email, username) },
      password: { required },
    }
  }
  else if (mainStore.popupType.signup) {
    return {
      email: { required, email },
      password: { required },
    }
  }
  else if (mainStore.popupType.signupNext) {
    return {
      username: { required, username },
      country: { required },
      day: { required },
      month: { required },
      year: { required }
    }
  }
  else {
    return {
      login: { required, valid: or(email, username) }
    }
  }
})

const v$ = useVuelidate(rules, mainStore.formData)

const submitForm = async () => {
  const results = await v$.value.$validate()
  if (results) {
    if (mainStore.popupType.login) {
      await mainStore.login()
    }
    else if (mainStore.popupType.signup) {
      await mainStore.signup()
    }
    else if (mainStore.popupType.signupNext) {
      await mainStore.continueSignup()
    }
  }
  else {
    alert('fail')
  }
}
</script>

<template>
  <div class="pop-up" @click="mainStore.customSelect.active = false">
    <div class="pop-up__controls">
      <svg class="pop-up__controls-icon" width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M25.3334 16H6.66675" stroke="#1C2F4D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M16.0001 25.3334L6.66675 16L16.0001 6.66669" stroke="#1C2F4D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>

      <svg @click="mainStore.closePopup" class="pop-up__controls-icon" width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M24 8L8 24" stroke="#627CA3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M8 8L24 24" stroke="#627CA3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </div>
    <div class="pop-up__wrapper" v-if="showTitle">
      <img class="pop-up__logo" src="@/assets/logo.png" alt="">
      <h1 class="pop-up__title" v-if="showTitle">{{ popupTitle }}</h1>
      <div class="pop-up__content">
        <div class="pop-up__inputs" v-if="showTitle">
          <BaseInput
              v-if="mainStore.popupType.login || mainStore.popupType.forgotPass"
              :label="'Username or email'"
              placeholder="Username or email"
              v-model="mainStore.formData.login"
              :errors="v$?.login?.$errors"
          />
          <BaseInput
              v-else-if="mainStore.popupType.signup"
              :label="'Email'"
              placeholder="Email"
              v-model="mainStore.formData.email"
              :errors="v$?.email?.$errors"
              :single-error="mainStore.singleError"
          />
          <BaseInput
              v-else
              :label="'Username'"
              placeholder="Username"
              v-model="mainStore.formData.username"
              :errors="v$?.username?.$errors"
          />

          <BaseInput
              v-if="showPass"
              :label="'Password'"
              placeholder="Password"
              v-model="mainStore.formData.password"
              :errors="v$?.password?.$errors"
          />

          <BaseSelect
              v-if="mainStore.popupType.signupNext"
              v-model="mainStore.formData.country"
              :options="mainStore.countries"
              placeholder="Select country"
              @click.stop :label="'Country'"
              :errors="v$?.country?.$errors"
          />

          <div class="birthdate" v-if="mainStore.popupType.signupNext">
            <p class="birthdate__label">Date of birth</p>
            <div class="birthdate__inputs">
              <BaseInput
                  placeholder="dd" type="number"
                  v-model="mainStore.formData.day"
                  :errors="v$?.day?.$errors"
                  :displayErrors="false"
              />
              <BaseInput
                  placeholder="mm" type="number"
                  v-model="mainStore.formData.month"
                  :errors="v$?.month?.$errors"
                  :displayErrors="false"
              />
              <BaseInput
                  placeholder="yyyy" type="number"
                  v-model="mainStore.formData.year"
                  :errors="v$?.year?.$errors"
                  :displayErrors="false"
              />
            </div>
            <div class="birthdate__errors">

            </div>
          </div>


        </div>


        <!--   v-else Signup done   -->


        <button class="button button-gradient button-block" @click="submitForm">{{ btnContent }}</button>
        <div class="pop-up__options" v-if="showOptions">
          <p class="pop-up__options-text">
            or
            <span v-if="mainStore.popupType.login"> login </span>
            <span v-else> signup </span>
            with
          </p>
          <div class="pop-up__options-icons">
            <div class="pop-up__option">
              <img src="@/assets/icons/facebook.png" alt="">
            </div>
            <div class="pop-up__option">
              <img src="@/assets/icons/battle.png" alt="">
            </div>
            <div class="pop-up__option">
              <img src="@/assets/icons/google.png" alt="">
            </div>
            <div class="pop-up__option">
              <img src="@/assets/icons/steam.png" alt="">
            </div>
          </div>
        </div>
        <div class="pop-up__alt">
          <p class="pop-up__alt-forgot pop-up__alt-link"
             v-if="mainStore.popupType.login"
             @click="mainStore.showForgot">
            Forgot password?
          </p>
          <p v-if="mainStore.popupType.login">
            Don't have an account?
            <span class="pop-up__alt-link" @click="mainStore.showSignup">Sign up!</span>
          </p>
          <p class="pop-up__alt-forgot pop-up__alt-link"
             v-else-if="mainStore.popupType.forgotPass"
             @click="mainStore.showLogin">
            Back to login
          </p>
          <p v-else-if="mainStore.popupType.signup">
            Already have an account?
            <span class="pop-up__alt-link" @click="mainStore.showLogin">Login!</span>
          </p>

        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.pop-up {
  display: flex;
  color: #E6E6E6;
  align-items: center;
  flex-direction: column;
  &__controls {
    width: 100%;
    display: flex;
    margin-bottom: 16px;
    justify-content: space-between;
    &-icon {
      cursor: pointer;
    }
  }
  &__wrapper {
    min-width: 240px;
    display: flex;
    align-items: center;
    flex-direction: column;
  }
  &__content {
    width: 100%;
    display: flex;
    max-width: 240px;
    align-items: center;
    flex-direction: column;
  }
  &__logo {
    width: 88px;
    height: 80px;
    margin-bottom: 44px;
  }
  &__title {
    line-height: 100%;
    margin-bottom: 30px;
  }
  &__inputs {
    width: 100%;
    margin-bottom: 6px;
  }
  &__options {
    margin-top: 30px;
    &-text {
      color: #627CA3;
      font-size: 16px;
      line-height: 100%;
      text-align: center;
      margin-bottom: 16px;
    }
    &-icons {
      display: flex;
    }
  }
  &__option {
    width: 48px;
    height: 48px;
    padding: 8px;
    cursor: pointer;
    margin-right: 8px;
    border-radius: 2px;
    border: 1px solid #16263D;
  }
  &__option:nth-last-child(1) {
    margin-right: 0;
  }
  &__alt {
    display: flex;
    margin-top: 30px;
    align-items: center;
    flex-direction: column;
    &-forgot {
      margin-bottom: 12px;
    }
    &-link {
      color: #0A68F5;
      cursor: pointer;
      transition: color 0.4s;
    }
    &-link:hover {
      color: #0960E0;
    }
  }
}

.birthdate {
  //margin-bottom: 16px;
  &__label {
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

@media screen and (max-width: 768px) {
  .pop-up__logo {
    margin-bottom: 30px;
  }
  .pop-up__title {
    margin-bottom: 22px;
  }
  .pop-up__options, .pop-up__alt {
    margin-top: 22px;
  }
}
</style>