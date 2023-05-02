import { ref } from 'vue'
import axios from 'axios'
import { defineStore } from 'pinia'
import type { User } from '@/types/User'

export const useAuthStore = defineStore('Auth', () => {
    const currentUser = ref<User | undefined>(undefined)
    const token = ref('')
    const formData = ref({
        login: '',
        email: '',
        username: '',
        forgot: '',
        password: '',
        country: '',
        day: '',
        month: '',
        year: ''
    })
    const singleError = ref('')

    function clearForm() {
        formData.value.login = ''
        formData.value.email = ''
        formData.value.username = ''
        formData.value.forgot = ''
        formData.value.password = ''
        formData.value.country = ''
        formData.value.day = ''
        formData.value.month = ''
        formData.value.year = ''
        singleError.value = ''
    }

    async function login() {
        await axios.post('/api/auth/local', {
            identifier: formData.value.login,
            password: formData.value.password,
        }).then(response => {
            currentUser.value = response.data.user
            token.value = response.data.jwt
            clearForm()
        }).catch(error => {
            console.log('An error occurred:', error.response)
        })
    }

    async function checkEmail() {
        singleError.value = ''
        await axios.get(`/signup-helper/email/${formData.value.email}`).then(response => {
            if (response.data === false) {
                singleError.value = 'Email already in use'
            } else {
                singleError.value = ''
            }
        }).catch(error => {
            console.log('An error occurred:', error.response)
        })
    }

    async function signup() {
        singleError.value = ''
        await axios.get(`/signup-helper/username/${formData.value.username}`).then(async response => {
            if (response.data === false) {
                singleError.value = 'Username already in use'
            } else {
                await axios.post('/api/auth/local/register', {
                    username: formData.value.username,
                    email: formData.value.email,
                    password: formData.value.password,
                    country: formData.value.country,
                    birthdate: formData.value.year + '-' + formData.value.month + '-' + formData.value.day
                }).then(res => {
                    currentUser.value = res.data.user
                    token.value = res.data.jwt
                    clearForm()
                }).catch(error => {
                    console.log('An error occurred:', error.response)
                })
            }
        }).catch(error => {
            console.log('An error occurred:', error.response)
        })
    }

    async function getProfile() {
        await axios.get('/api/users/me?populate=*', {
            headers: {
                Authorization: `Bearer ${token.value}`,
            },
        }).then(response => {
            currentUser.value = response.data
        }).catch(error => {
            console.log('An error occurred:', error.response)
        })
    }

    return { currentUser, token, formData, singleError, clearForm, login, checkEmail, signup, getProfile }
}, { persist: true })