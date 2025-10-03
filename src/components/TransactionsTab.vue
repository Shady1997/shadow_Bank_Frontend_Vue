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
      <!-- Create Transaction Form -->
      <div class="bg-gray-50 p-6 rounded-lg">
        <h3 class="text-xl font-bold mb-4 flex items-center gap-2">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
          </svg>
          Create Transaction
        </h3>
        <form @submit.prevent="createTransaction">
          <div class="space-y-3">
            <input
              v-model="transactionForm.transactionReference"
              type="text"
              required
              placeholder="Transaction Reference (unique)"
              class="w-full p-2 border rounded focus:ring-2 focus:ring-indigo-500"
            />
            <input
              v-model="transactionForm.fromAccountId"
              type="text"
              required
              placeholder="From Account ID"
              class="w-full p-2 border rounded focus:ring-2 focus:ring-indigo-500"
            />
            <input
              v-model="transactionForm.toAccountId"
              type="text"
              placeholder="To Account ID (optional for DEPOSIT/WITHDRAWAL)"
              class="w-full p-2 border rounded focus:ring-2 focus:ring-indigo-500"
            />
            <select
              v-model="transactionForm.transactionType"
              class="w-full p-2 border rounded focus:ring-2 focus:ring-indigo-500"
            >
              <option value="DEPOSIT">Deposit</option>
              <option value="WITHDRAWAL">Withdrawal</option>
              <option value="TRANSFER">Transfer</option>
              <option value="PAYMENT">Payment</option>
            </select>
            <input
              v-model="transactionForm.amount"
              type="number"
              step="0.01"
              required
              placeholder="Amount"
              class="w-full p-2 border rounded focus:ring-2 focus:ring-indigo-500"
            />
            <input
              v-model="transactionForm.fee"
              type="number"
              step="0.01"
              placeholder="Fee (optional)"
              class="w-full p-2 border rounded focus:ring-2 focus:ring-indigo-500"
            />
            <input
              v-model="transactionForm.description"
              type="text"
              placeholder="Description"
              class="w-full p-2 border rounded focus:ring-2 focus:ring-indigo-500"
            />
            <button
              type="submit"
              :disabled="loading"
              class="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 disabled:bg-gray-400"
            >
              Create Transaction
            </button>
          </div>
        </form>
      </div>

      <!-- Search Transactions -->
      <div class="bg-gray-50 p-6 rounded-lg">
        <h3 class="text-xl font-bold mb-4 flex items-center gap-2">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
          Search Transactions
        </h3>
        <div class="space-y-3">
          <div class="flex gap-2">
            <input
              v-model="searchReference"
              type="text"
              placeholder="Reference Number"
              class="flex-1 p-2 border rounded focus:ring-2 focus:ring-indigo-500"
            />
            <button
              @click="searchByReference"
              :disabled="loading"
              class="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
            >
              Search
            </button>
          </div>
          <div class="flex gap-2">
            <input
              v-model="searchAccountId"
              type="text"
              placeholder="Account ID"
              class="flex-1 p-2 border rounded focus:ring-2 focus:ring-indigo-500"
            />
            <button
              @click="searchByAccountId"
              :disabled="loading"
              class="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
            >
              Search
            </button>
          </div>
          <button
            @click="loadAllTransactions"
            :disabled="loading"
            class="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 flex items-center justify-center gap-2"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
            </svg>
            Load All Transactions
          </button>
        </div>
      </div>
    </div>

    <!-- Transactions List -->
    <div class="bg-gray-50 p-6 rounded-lg">
      <h3 class="text-xl font-bold mb-4">Transactions List ({{ transactions.length }})</h3>
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-indigo-100">
            <tr>
              <th class="p-3 text-left">ID</th>
              <th class="p-3 text-left">Reference</th>
              <th class="p-3 text-left">Type</th>
              <th class="p-3 text-left">From Account</th>
              <th class="p-3 text-left">To Account</th>
              <th class="p-3 text-left">Amount</th>
              <th class="p-3 text-left">Fee</th>
              <th class="p-3 text-left">Status</th>
              <th class="p-3 text-left">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="transaction in transactions" :key="transaction.id" class="border-b hover:bg-white">
              <td class="p-3">{{ transaction.id }}</td>
              <td class="p-3">{{ transaction.transactionReference }}</td>
              <td class="p-3">
                <span 
                  :class="getTypeClass(transaction.transactionType)"
                  class="px-2 py-1 rounded text-xs"
                >
                  {{ transaction.transactionType }}
                </span>
              </td>
              <td class="p-3">{{ transaction.fromAccount?.accountNumber || 'N/A' }}</td>
              <td class="p-3">{{ transaction.toAccount?.accountNumber || 'N/A' }}</td>
              <td class="p-3">${{ transaction.amount?.toFixed(2) }}</td>
              <td class="p-3">${{ transaction.fee?.toFixed(2) || '0.00' }}</td>
              <td class="p-3">
                <span 
                  :class="getStatusClass(transaction.status)"
                  class="px-2 py-1 rounded text-xs"
                >
                  {{ transaction.status }}
                </span>
              </td>
              <td class="p-3">{{ transaction.description }}</td>
            </tr>
          </tbody>
        </table>
        <p v-if="transactions.length === 0" class="text-center text-gray-500 py-4">No transactions found</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { transactionService } from '@/services/transactionService'

const transactions = ref([])
const loading = ref(false)
const errorMessage = ref('')
const successMessage = ref('')

const transactionForm = ref({
  transactionReference: '',
  fromAccountId: '',
  toAccountId: '',
  transactionType: 'DEPOSIT',
  amount: 0,
  fee: 0,
  description: ''
})

const searchReference = ref('')
const searchAccountId = ref('')

const clearMessages = () => {
  errorMessage.value = ''
  successMessage.value = ''
}

const resetForm = () => {
  transactionForm.value = {
    transactionReference: '',
    fromAccountId: '',
    toAccountId: '',
    transactionType: 'DEPOSIT',
    amount: 0,
    fee: 0,
    description: ''
  }
}

const getTypeClass = (type) => {
  const classes = {
    'DEPOSIT': 'bg-green-200 text-green-800',
    'WITHDRAWAL': 'bg-red-200 text-red-800',
    'TRANSFER': 'bg-blue-200 text-blue-800',
    'PAYMENT': 'bg-purple-200 text-purple-800'
  }
  return classes[type] || 'bg-gray-200 text-gray-800'
}

const getStatusClass = (status) => {
  const classes = {
    'COMPLETED': 'bg-green-200 text-green-800',
    'PENDING': 'bg-yellow-200 text-yellow-800',
    'FAILED': 'bg-red-200 text-red-800',
    'CANCELLED': 'bg-gray-200 text-gray-800'
  }
  return classes[status] || 'bg-gray-200 text-gray-800'
}

const createTransaction = async () => {
  loading.value = true
  clearMessages()

  try {
    const payload = {
      ...transactionForm.value,
      fromAccountId: parseInt(transactionForm.value.fromAccountId),
      toAccountId: transactionForm.value.toAccountId ? parseInt(transactionForm.value.toAccountId) : null,
      amount: parseFloat(transactionForm.value.amount),
      fee: parseFloat(transactionForm.value.fee)
    }
    const newTransaction = await transactionService.createTransaction(payload)
    transactions.value.push(newTransaction)
    successMessage.value = 'Transaction created successfully!'
    resetForm()
  } catch (error) {
    errorMessage.value = error.response?.data?.message || 'Failed to create transaction'
  } finally {
    loading.value = false
  }
}

const loadAllTransactions = async () => {
  loading.value = true
  clearMessages()

  try {
    transactions.value = await transactionService.getAllTransactions()
    successMessage.value = 'Transactions loaded successfully!'
  } catch (error) {
    errorMessage.value = 'Failed to fetch transactions'
  } finally {
    loading.value = false
  }
}

const searchByReference = async () => {
  if (!searchReference.value) return

  loading.value = true
  clearMessages()

  try {
    const transaction = await transactionService.getTransactionByReference(searchReference.value)
    transactions.value = [transaction]
    successMessage.value = 'Transaction found!'
  } catch (error) {
    errorMessage.value = 'Transaction not found'
  } finally {
    loading.value = false
  }
}

const searchByAccountId = async () => {
  if (!searchAccountId.value) return

  loading.value = true
  clearMessages()

  try {
    transactions.value = await transactionService.getTransactionsByAccountId(parseInt(searchAccountId.value))
    successMessage.value = 'Transactions found!'
  } catch (error) {
    errorMessage.value = 'Transactions not found'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadAllTransactions()
})
</script>