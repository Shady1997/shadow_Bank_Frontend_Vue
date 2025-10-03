<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 flex items-center justify-center p-6">
    <div class="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-indigo-600 rounded-full mb-4">
          <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
          </svg>
        </div>
        <h1 class="text-3xl font-bold text-gray-900 mb-2">Mobile Banking</h1>
        <p class="text-gray-600">Sign in to access your dashboard</p>
      </div>

      <form @submit.prevent="handleLogin">
        <div v-if="errorMessage" class="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded mb-6">
          {{ errorMessage }}
        </div>

        <div class="mb-6">
          <label class="block text-sm font-medium text-gray-700 mb-2">Username</label>
          <input
            v-model="username"
            type="text"
            required
            class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            placeholder="Enter your username"
          />
        </div>

        <div class="mb-6">
          <label class="block text-sm font-medium text-gray-700 mb-2">Password</label>
          <input
            v-model="password"
            type="password"
            required
            class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            placeholder="Enter your password"
          />
        </div>

        <button
          type="submit"
          class="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition font-semibold"
        >
          Sign In
        </button>
      </form>

      <div class="mt-6 text-center text-sm text-gray-600">
        <p>Demo Credentials:</p>
        <p class="font-mono text-xs mt-1">Username: shady1997</p>
        <p class="font-mono text-xs">Password: shady1997</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const username = ref('')
const password = ref('')
const errorMessage = ref('')

const handleLogin = () => {
  errorMessage.value = ''
  
  if (authStore.login(username.value, password.value)) {
    router.push('/dashboard')
  } else {
    errorMessage.value = 'Invalid username or password'
  }
}
</script>