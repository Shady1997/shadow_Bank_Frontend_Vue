import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const isAuthenticated = ref(false)

  function login(username, password) {
    if (username === 'shady1997' && password === 'shady1997') {
      isAuthenticated.value = true
      localStorage.setItem('isAuthenticated', 'true')
      return true
    }
    return false
  }

  function logout() {
    isAuthenticated.value = false
    localStorage.removeItem('isAuthenticated')
  }

  function checkAuth() {
    isAuthenticated.value = localStorage.getItem('isAuthenticated') === 'true'
    return isAuthenticated.value
  }

  return {
    isAuthenticated,
    login,
    logout,
    checkAuth
  }
})