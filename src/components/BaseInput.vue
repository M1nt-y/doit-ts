<script setup lang="ts">
import type { PropType } from 'vue'
import type { ErrorObject } from '@vuelidate/core'

defineProps({
  label: {
    type: String,
    default: ''
  },
  modelValue: {
    type: String,
    default: ''
  },
  errors: {
    required: false,
    type: Array as PropType<ErrorObject[]>
  },
  singleError: {
    type: String,
    default: ''
  }
})

const emits = defineEmits(['update:modelValue'])

function emitInput(event: Event) {
  const target = event.target as HTMLInputElement
  emits('update:modelValue', target.value)
}
</script>

<template>
  <div class="input-wrapper">
    <p class="input-wrapper__label">{{ label }}</p>
    <input
        class="input" type="text" :value="modelValue"
        :class="{'input--error': errors && errors.length > 0}"
        @input="emitInput($event)"
        v-bind="$attrs"
    />
    <p class="input-wrapper__error-message" v-if="singleError">{{ singleError }}</p>
    <p class="input-wrapper__error-message" v-for="error in errors" :key="error.$uid">{{ error.$message }}</p>
  </div>
</template>

<style scoped lang="scss">
.input-wrapper {
  margin-bottom: 16px;
  &__label {
    font-weight: 400;
    font-size: 14px;
    line-height: 100%;
    color: #FFFFFF;
    margin-bottom: 6px;
  }
  &__error-message {
    color: #B83333;
    margin-top: 4px;
  }
}
</style>