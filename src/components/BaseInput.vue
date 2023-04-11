<script setup lang="ts">
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
    type: Array,
    default: () => []
  },
  singleError: {
    type: String,
    default: ''
  }
})
</script>

<template>
  <div class="input-wrapper">
    <p class="input-wrapper__label">{{ label }}</p>
    <input
        class="input" type="text" :value="modelValue"
        :class="{'input--error': errors.length > 0}"
        @input="$emit('update:modelValue', $event.target.value)"
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