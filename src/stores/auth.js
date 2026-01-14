import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const token = ref(localStorage.getItem('token'))

  function login(newToken) {
    localStorage.setItem('token', newToken)
    token.value = newToken
  }

  function logout() {
    localStorage.removeItem('token')
    token.value = null
  }

  return { token, login, logout }
})
