import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const token = ref(localStorage.getItem('token'))
  const username = ref('')

  function login(user, authToken) {
    localStorage.setItem('token', authToken)
    token.value = authToken
    username.value = user
  }

  function logout() {
    localStorage.removeItem('token')
    token.value = null
    username.value = ''
  }

  return { username, token, login, logout }
})
