import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useMainStore = defineStore('Main', () => {

    const windowWidth = ref(window.innerWidth)
    const onWidthChange = () => windowWidth.value = window.innerWidth

    const count = ref(0)
    const doubleCount = computed(() => count.value * 2)
    function increment() {
        count.value++
    }

    return {
        windowWidth, onWidthChange,
        count, doubleCount, increment
    }
})
