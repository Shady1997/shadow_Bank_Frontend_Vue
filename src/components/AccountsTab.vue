<template>
  <div>
    <!-- Notifications -->
    <div v-if="errorMessage" class="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4 rounded">
      {{ errorMessage }}
    </div>
    <div v-if="successMessage" class="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4 rounded">
      {{ successMessage }}
    </div>

    <div class="grid md:grid-cols-2 gap-6 mb-6">
      <!-- Create Account Form -->
      <div class="bg-gray-50 p-6 rounded-lg">
        <h3 class="text-xl font-bold mb-4 flex items-center gap-2">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
          </svg>
          Create Account
        </h3>
        <form @submit.prevent="createAccount">
          <div class="space-y-3">
            <input
              v-model="accountForm.accountNumber"
              type="text"
              required
              placeholder="Account Number"
              class="w-full p-2 border rounded focus:ring-2 focus:ring-indigo-500"
            />
            <select
              v-model="accountForm.accountType"
              class="w-full p-2 border rounded focus:ring-2 focus:ring-indigo-500"
            >
              <option value="SAVINGS">Savings</option>
              <option value="CHECKING">Checking</option>
              <option value="CREDIT">Credit</option>
            </select>
            <input
              v-model="accountForm.balance"
              type="number"
              step="0.01"
              required
              placeholder="Initial Balance"
              class="w-full p-2 border rounded focus:ring-2 focus:ring-indigo-500"
            />
            <input
              v-model="accountForm.creditLimit"
              type="number"
              step="0.01"
              placeholder="Credit Limit (optional)"
              class="w-full p-2 border rounded focus:ring-2 focus:ring-indigo-500"
            />
            <input
              v-model="accountForm.userId"
              type="text"
              required
              placeholder="User ID"
              class="w-full p-2 border rounded focus:ring-2 focus:ring-indigo-500"
            />
            <button
              type="submit"
              :disabled="loading"
              class="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 disabled:bg-gray-400"
            >
              Create Account
            </button>
          </div>
        </form>
      </div>

      <!-- Search Accounts -->
      <div class="bg-gray-50 p-6 rounded-lg">
        <h3 class="text-xl font-bold mb-4 flex items-center gap-2">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
          Search Accounts
        </h3>
        <div class="space-y-3">
          <div class="flex gap-2">
            <input
              v-model="searchAccountNumber"
              type="text"
              placeholder="Account Number"
              class="flex-1 p-2 border rounded focus:ring-2 focus:ring-indigo-500"
            />
            <button
              @click="searchByAccountNumber"
              :disabled="loading"
              class="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
            >
              Search
            </button>
          </div>
          <div class="flex gap-2">
            <input
              v-model="searchUserId"
              type="text"
              placeholder="User ID"
              class="flex-1 p-2 border rounded focus:ring-2 focus:ring-indigo-500"
            />
            <button
              @click="searchByUserId"
              :disabled="loading"
              class="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
            >
              Search
            </button>
          </div>
          <button
            @click="loadAllAccounts"
            :disabled="loading"
            class="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 flex items-center justify-center gap-2"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
            </svg>
            Load All Accounts
          </button>
        </div>
      </div>
    </div>

    <!-- Accounts List -->
    <div class="bg-gray-50 p-6 rounded-lg">
      <h3 class="text-xl font-bold mb-4">Accounts List ({{ accounts.length }})</h3>
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-indigo-100">
            <tr>
              <th class="p-3 text-left">ID</th>
              <th class="p-3 text-left">Account Number</th>
              <th class="p-3 text-left">Type</th>
              <th class="p-3 text-left">Balance</th>
              <th class="p-3 text-left">Credit Limit</th>
              <th class="p-3 text-left">Status</th>
              <th class="p-3 text-left">User</th>
              <th class="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="account in accounts" :key="account.id" class="border-b hover:bg-white">
              <td class="p-3">{{ account.id }}</td>
              <td class="p-3">{{ account.accountNumber }}</td>
              <td class="p-3">
                <span class="px-2 py-1 rounded text-xs bg-blue-100 text-blue-800">
                  {{ account.accountType }}
                </span>
              </td>
              <td class="p-3">${{ account.balance?.toFixed(2) }}</td>
              <td class="p-3">${{ account.creditLimit?.toFixed(2) || '0.00' }}</td>
              <td class="p-3">
                <span 
                  :class="getStatusClass(account.status)"
                  class="px-2 py-1 rounded text-xs"
                >
                  {{ account.status }}
                </span>
              </td>
              <td class="p-3">{{ account.user?.username || 'N/A' }}</td>
              <td class="p-3">
                <button
                  @click="deleteAccount(account.id)"
                  class="text-red-600 hover:text-red-800"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                  </svg>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <p v-if="accounts.length === 0" class="text-center text-gray-500 py-4">No accounts found</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { accountService } from '@/services/accountService'

const accounts = ref([])
const loading = ref(false)
const errorMessage = ref('')
const successMessage = ref('')

const accountForm = ref({
  accountNumber: '',
  accountType: 'SAVINGS',
  balance: 0,
  creditLimit: 0,
  userId: ''
})

const searchAccountNumber = ref('')
const searchUserId = ref('')

const clearMessages = () => {
  errorMessage.value = ''
  successMessage.value = ''
}

const resetForm = () => {
  accountForm.value = {
    accountNumber: '',
    accountType: 'SAVINGS',
    balance: 0,
    creditLimit: 0,
    userId: ''
  }
}

const getStatusClass = (status) => {
  const classes = {
    'ACTIVE': 'bg-green-200 text-green-800',
    'FROZEN': 'bg-yellow-200 text-yellow-800',
    'INACTIVE': 'bg-gray-200 text-gray-800',
    'CLOSED': 'bg-gray-200 text-gray-800'
  }
  return classes[status] || 'bg-gray-200 text-gray-800'
}

const createAccount = async () => {
  loading.value = true
  clearMessages()

  try {
    const payload = {
      ...accountForm.value,
      balance: parseFloat(accountForm.value.balance),
      creditLimit: parseFloat(accountForm.value.creditLimit),
      userId: parseInt(accountForm.value.userId)
    }
    const newAccount = await accountService.createAccount(payload)
    accounts.value.push(newAccount)
    successMessage.value = 'Account created successfully!'
    resetForm()
  } catch (error) {
    errorMessage.value = error.response?.data?.message || 'Failed to create account'
  } finally {
    loading.value = false
  }
}

const loadAllAccounts = async () => {
  loading.value = true
  clearMessages()

  try {
    accounts.value = await accountService.getAllAccounts()
    successMessage.value = 'Accounts loaded successfully!'
  } catch (error) {
    errorMessage.value = 'Failed to fetch accounts'
  } finally {
    loading.value = false
  }
}

const searchByAccountNumber = async () => {
  if (!searchAccountNumber.value) return

  loading.value = true
  clearMessages()

  try {
    const account = await accountService.getAccountByNumber(searchAccountNumber.value)
    accounts.value = [account]
    successMessage.value = 'Account found!'
  } catch (error) {
    errorMessage.value = 'Account not found'
  } finally {
    loading.value = false
  }
}

const searchByUserId = async () => {
  if (!searchUserId.value) return

  loading.value = true
  clearMessages()

  try {
    accounts.value = await accountService.getAccountsByUserId(parseInt(searchUserId.value))
    successMessage.value = 'Accounts found!'
  } catch (error) {
    errorMessage.value = 'Accounts not found'
  } finally {
    loading.value = false
  }
}

const deleteAccount = async (id) => {
  if (!confirm('Are you sure you want to delete this account?')) return

  loading.value = true
  clearMessages()

  try {
    await accountService.deleteAccount(id)
    accounts.value = accounts.value.filter(a => a.id !== id)
    successMessage.value = 'Account deleted successfully!'
  } catch (error) {
    errorMessage.value = 'Failed to delete account'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadAllAccounts()
})
</script>