import { defineStore } from 'pinia'
import { ref } from 'vue'


export const useProfileStore = defineStore('Profile', () => {
    const profilePages = ref(['User panel', 'My profile', 'My team', 'Deposit', 'Withdraw', 'Premium', 'Statistics', 'Support', 'Settings', 'Game profile'])
    const currentPage = ref('User panel')

    const userPanelButtons = ref(['My profile', 'My team', 'Deposit', 'Withdraw', 'Premium', 'Statistics', 'Support', 'Settings', 'Game profile', 'Logout'])
    const settingsButtons = ref(['Edit account details', 'Change email address', 'Change password', 'Manage preferences', 'Close account'])

    return { profilePages, currentPage, userPanelButtons, settingsButtons }
})