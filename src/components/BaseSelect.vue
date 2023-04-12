<script setup lang="ts">
import { computed } from 'vue'
import type { PropType } from 'vue'
import type Country from '@/types/Country'
import { useMainStore } from '@/stores/main'
import type { ErrorObject } from '@vuelidate/core'

const mainStore = useMainStore()

const props = defineProps({
  label: {
    type: String,
    default: ''
  },
  modelValue: {
    type: String,
    default: ''
  },
  options: {
    required: true,
    type: Array as PropType<Country[]>
  },
  errors: {
    required: false,
    type: Array as PropType<ErrorObject[]>
  },
})

const optionsFound = computed(() => {
  if (mainStore.customSelect.input) {
    return props.options.filter(option => option.name.toLowerCase().includes(mainStore.customSelect.input.toLowerCase()))
  }
  else
    return props.options
})

const emits = defineEmits(['update:modelValue'])

function toggleSelect() {
  emits('update:modelValue', '')
  if (mainStore.customSelect.input === mainStore.customSelect.selected && mainStore.customSelect.input !== '') {
    mainStore.customSelect.selected = mainStore.customSelect.input = ''
    mainStore.customSelect.active = !mainStore.customSelect.active
  }
  else {
    mainStore.customSelect.active = true
  }
}

function selectOption(option: string) {
  emits('update:modelValue', option)
  mainStore.customSelect.selected = option
  mainStore.customSelect.input = option
  mainStore.customSelect.active = false
}
</script>

<template>
  <div class="select-wrapper">
    <p class="select-wrapper__label">{{ label }}</p>
    <input
        class="input" type="text"
        @click="toggleSelect" v-bind="$attrs"
        v-model="mainStore.customSelect.input"
        :class="{'input--error': errors && errors.length > 0}"
    />
    <transition name="options">
      <div class="options-wrapper" v-if="mainStore.customSelect.active">
        <ul class="options">
          <li class="option option--disabled" v-if="optionsFound.length === 0">There are no matches</li>
          <li class="option" v-for="(option, index) in optionsFound" :key="index" @click="selectOption(option.name)">{{ option.name }}</li>
        </ul>
      </div>
    </transition>
    <p class="select-wrapper__error-message" v-for="error in errors" :key="error.$uid">{{ error.$message }}</p>
  </div>
</template>

<style scoped lang="scss">
.select-wrapper {
  margin-bottom: 16px;
  &__label {
    color: #FFFFFF;
    font-size: 14px;
    font-weight: 400;
    line-height: 100%;
    margin-bottom: 6px;
  }
  &__error-message {
    color: #B83333;
    margin-top: 4px;
  }
}
.options-wrapper {
  z-index: 1;
  width: 100%;
  margin-top: 4px;
  overflow: hidden;
  max-height: 240px;
  position: absolute;
  border-radius: 2px;
  background: #0B1729;
  border: 1px solid #1472FF;
}
.options {
  max-height: 240px;
  margin-right: 6px;
  overflow-y: scroll;
  position: relative;
  scrollbar-color: #121F33 #627CA3; /* track thumb */
  scrollbar-width: 4px; /* none, thin, or auto */
  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background: #627CA3;
    border-radius: 2px;
  }
  &::-webkit-scrollbar-track {
    background: #121F33;
    border-radius: 2px;
  }
}
.option {
  color: #627CA3;
  cursor: pointer;
  font-size: 16px;
  font-weight: 400;
  line-height: 100%;
  padding: 10px 15px;
  margin-right: 15px;
  transition: all .3s;
  &--disabled {
    cursor: default;
  }
  &:hover {
    color: #E6E6E6;
    background: #1472FF;
  }
  &--disabled:hover {
    color: #627CA3;
    background: none;
  }
}

.options-enter-from { max-height: 0 }
.options-enter-to { max-height: 240px }
.options-enter-active { transition: max-height .4s }
.options-leave-from { max-height: 240px }
.options-leave-to { max-height: 0 }
.options-leave-active { transition: max-height .4s }
</style>