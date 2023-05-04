import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { GameProfile } from '@/types/User'


export const useProfileStore = defineStore('Profile', () => {
    const profilePages = ref(['User panel', 'My profile', 'My team', 'Deposit/Withdraw', 'Premium', 'Statistics', 'Support', 'Settings', 'Game profile'])
    const currentPage = ref('User panel')
    const paymentPage = ref('Deposit')
    const paymentMethod = ref('Paypal')
    const paymentTabs = ref(['Withdraw', 'Deposit', 'History'])
    const paymentMethods = ref(['Paypal', 'BTC', 'QIWI', 'Card'])
    const paymentDone = ref(true)
    const paymentsHistory = ref([])

    const userPanelButtons = ref(['My profile', 'My team', 'Deposit', 'Withdraw', 'Premium', 'Statistics', 'Support', 'Settings', 'Game profile', 'Logout'])
    const settingsButtons = ref(['Edit account details', 'Change email address', 'Change password', 'Manage preferences', 'Close account'])



    const formData = ref({
        amount: '',
        email: '',
        username: '',
        currentPassword: '',
        password: '',
        fullName: '',
        country: '',
        mainTeam: '',
        gender: '',
        day: '',
        month: '',
        year: ''
    })
    const singleError = ref('')

    const gameProfile = ref<GameProfile | null>(null)

    return {
        profilePages,
        currentPage,
        paymentPage,
        paymentMethod,
        paymentTabs,
        paymentMethods,
        paymentDone,
        paymentsHistory,
        userPanelButtons,
        settingsButtons,
        formData,
        singleError,
        gameProfile
    }
})