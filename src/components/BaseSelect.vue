<script setup lang="ts">
import {ref} from 'vue'
import type { PropType } from 'vue'
import type Country from '@/types/Country'

defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  options: {
    required: true,
    type: Array as PropType<Country[]>
  }
})

const emits = defineEmits(['update:modelValue'])

function emitInput(event: Event) {
  const target = event.target as HTMLInputElement
  emits('update:modelValue', target.value)
}

const isActive = ref(false)

function toggleSelect() {
  isActive.value = !isActive.value
}
</script>

<template>
  <div ref="selectWrapper" class="select-wrapper">

    <input
        class="input" type="text"
        ref="customSelect" :value="modelValue"
        @click="toggleSelect"
        @input="emitInput($event)"
        v-bind="$attrs"
    />

    <ul ref="customOptions" class="options" v-if="isActive">
      <li class="option" v-for="(option, index) in options" :key="index">{{ option.name }}</li>
    </ul>

  </div>
</template>

<style scoped lang="scss">
.options {
  margin-top: 4px;
  max-height: 240px;
  overflow-y: scroll;
  border-radius: 2px;
  border: 1px solid #1472FF;
}
.option {
  padding: 10px 15px;
  margin-right: 15px;
  font-weight: 400;
  font-size: 16px;
  line-height: 100%;
  color: #627CA3;
  cursor: pointer;
  transition: all .3s;
  &:hover {
    color: #E6E6E6;
    background: #1472FF;
  }
}
</style>