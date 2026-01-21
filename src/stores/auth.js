import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const token = ref(null)
  const username = ref(null)

  function login(user, authToken) {
    token.value = authToken
    username.value = user
  }

  function logout() {
    token.value = null
    username.value = null
  }

  return { username, token, login, logout }
},
{
  persist: {
    key: 'auth-store',
    paths: ['username', 'token'],
  },
})
