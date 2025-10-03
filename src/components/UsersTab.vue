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
      <!-- Create User Form -->
      <div class="bg-gray-50 p-6 rounded-lg">
        <h3 class="text-xl font-bold mb-4 flex items-center gap-2">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
          </svg>
          Create User
        </h3>
        <form @submit.prevent="createUser">
          <div class="space-y-3">
            <input
              v-model="userForm.username"
              type="text"
              required
              minlength="3"
              placeholder="Username (min 3 characters)"
              class="w-full p-2 border rounded focus:ring-2 focus:ring-indigo-500"
            />
            <input
              v-model="userForm.email"
              type="email"
              required
              placeholder="Email"
              class="w-full p-2 border rounded focus:ring-2 focus:ring-indigo-500"
            />
            <input
              v-model="userForm.password"
              type="password"
              required
              minlength="8"
              placeholder="Password (min 8 characters)"
              class="w-full p-2 border rounded focus:ring-2 focus:ring-indigo-500"
            />
            <input
              v-model="userForm.fullName"
              type="text"
              required
              placeholder="Full Name"
              class="w-full p-2 border rounded focus:ring-2 focus:ring-indigo-500"
            />
            <input
              v-model="userForm.phoneNumber"
              type="tel"
              required
              placeholder="Phone Number (e.g., +201234567890)"
              class="w-full p-2 border rounded focus:ring-2 focus:ring-indigo-500"
            />
            <button
              type="submit"
              :disabled="loading"
              class="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 disabled:bg-gray-400"
            >
              Create User
            </button>
          </div>
        </form>
      </div>

      <!-- Search Users -->
      <div class="bg-gray-50 p-6 rounded-lg">
        <h3 class="text-xl font-bold mb-4 flex items-center gap-2">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
          Search Users
        </h3>
        <div class="space-y-3">
          <div class="flex gap-2">
            <input
              v-model="searchUsername"
              type="text"
              placeholder="Search by username"
              class="flex-1 p-2 border rounded focus:ring-2 focus:ring-indigo-500"
            />
            <button
              @click="searchByUsername"
              :disabled="loading"
              class="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
            >
              Search
            </button>
          </div>
          <button
            @click="loadAllUsers"
            :disabled="loading"
            class="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 flex items-center justify-center gap-2"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
            </svg>
            Load All Users
          </button>
        </div>
      </div>
    </div>

    <!-- Users List -->
    <div class="bg-gray-50 p-6 rounded-lg">
      <h3 class="text-xl font-bold mb-4">Users List ({{ users.length }})</h3>
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-indigo-100">
            <tr>
              <th class="p-3 text-left">ID</th>
              <th class="p-3 text-left">Username</th>
              <th class="p-3 text-left">Email</th>
              <th class="p-3 text-left">Full Name</th>
              <th class="p-3 text-left">Phone</th>
              <th class="p-3 text-left">Created At</th>
              <th class="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user.id" class="border-b hover:bg-white">
              <td class="p-3">{{ user.id }}</td>
              <td class="p-3">{{ user.username }}</td>
              <td class="p-3">{{ user.email }}</td>
              <td class="p-3">{{ user.fullName }}</td>
              <td class="p-3">{{ user.phoneNumber }}</td>
              <td class="p-3">{{ formatDate(user.createdAt) }}</td>
              <td class="p-3">
                <button
                  @click="deleteUser(user.id)"
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
        <p v-if="users.length === 0" class="text-center text-gray-500 py-4">No users found</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { userService } from '@/services/userService'

const users = ref([])
const loading = ref(false)
const errorMessage = ref('')
const successMessage = ref('')

const userForm = ref({
  username: '',
  email: '',
  password: '',
  fullName: '',
  phoneNumber: ''
})

const searchUsername = ref('')

const clearMessages = () => {
  errorMessage.value = ''
  successMessage.value = ''
}

const resetForm = () => {
  userForm.value = {
    username: '',
    email: '',
    password: '',
    fullName: '',
    phoneNumber: ''
  }
}

const formatDate = (dateString) => {
  if (!dateString) return 'N/A'
  return new Date(dateString).toLocaleDateString()
}

const createUser = async () => {
  loading.value = true
  clearMessages()

  try {
    const newUser = await userService.createUser(userForm.value)
    users.value.push(newUser)
    successMessage.value = 'User created successfully!'
    resetForm()
  } catch (error) {
    errorMessage.value = error.response?.data?.message || 'Failed to create user'
  } finally {
    loading.value = false
  }
}

const loadAllUsers = async () => {
  loading.value = true
  clearMessages()

  try {
    users.value = await userService.getAllUsers()
    successMessage.value = 'Users loaded successfully!'
  } catch (error) {
    errorMessage.value = 'Failed to fetch users'
  } finally {
    loading.value = false
  }
}

const searchByUsername = async () => {
  if (!searchUsername.value) return

  loading.value = true
  clearMessages()

  try {
    const user = await userService.getUserByUsername(searchUsername.value)
	users.value = [user]
    successMessage.value = 'User found!'
  } catch (error) {
    errorMessage.value = 'User not found'
  } finally {
    loading.value = false
  }
}

const deleteUser = async (id) => {
  if (!confirm('Are you sure you want to delete this user?')) return

  loading.value = true
  clearMessages()

  try {
    await userService.deleteUser(id)
    users.value = users.value.filter(u => u.id !== id)
    successMessage.value = 'User deleted successfully!'
  } catch (error) {
    errorMessage.value = 'Failed to delete user'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadAllUsers()
})
</script>