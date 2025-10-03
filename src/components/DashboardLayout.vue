<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
    <div class="container mx-auto p-6">
      <div class="bg-white rounded-lg shadow-lg p-6 mb-6 flex justify-between items-center">
        <div>
          <h1 class="text-3xl font-bold text-indigo-900 mb-2">Mobile Banking Dashboard</h1>
          <p class="text-gray-600">Manage users, accounts, and transactions</p>
        </div>
        <button
          @click="handleLogout"
          class="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
          </svg>
          Logout
        </button>
      </div>

      <div class="bg-white rounded-lg shadow-lg mb-6">
        <div class="flex border-b">
          <button
            @click="navigateTo('/dashboard/users')"
            :class="[
              'flex items-center gap-2 px-6 py-4 font-semibold transition',
              currentRoute === 'Users' 
                ? 'border-b-2 border-indigo-600 text-indigo-600' 
                : 'text-gray-600 hover:text-indigo-600'
            ]"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
            </svg>
            Users
          </button>
          <button
            @click="navigateTo('/dashboard/accounts')"
            :class="[
              'flex items-center gap-2 px-6 py-4 font-semibold transition',
              currentRoute === 'Accounts' 
                ? 'border-b-2 border-indigo-600 text-indigo-600' 
                : 'text-gray-600 hover:text-indigo-600'
            ]"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path>
            </svg>
            Accounts
          </button>
          <button
            @click="navigateTo('/dashboard/transactions')"
            :class="[
              'flex items-center gap-2 px-6 py-4 font-semibold transition',
              currentRoute === 'Transactions' 
                ? 'border-b-2 border-indigo-600 text-indigo-600' 
                : 'text-gray-600 hover:text-indigo-600'
            ]"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"></path>
            </svg>
            Transactions
          </button>
        </div>

        <div class="p-6">
          <router-view />
        </div>
      </div>

      <div class="text-center text-gray-600 mt-6">
        <p>Mobile Banking API Frontend - Created for Shady Ahmed's Banking Project</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

const currentRoute = computed(() => route.name)

const navigateTo = (path) => {
  router.push(path)
}

const handleLogout = () => {
  authStore.logout()
  router.push('/login')
}
</script>