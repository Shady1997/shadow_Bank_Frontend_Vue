import axios from 'axios'

const API_URL = 'http://localhost:8083/api/users'

export const userService = {
  async createUser(user) {
    const response = await axios.post(API_URL, user)
    return response.data
  },

  async getAllUsers() {
    const response = await axios.get(API_URL)
    return response.data
  },

  async getUserById(id) {
    const response = await axios.get(`${API_URL}/${id}`)
    return response.data
  },

  async getUserByUsername(username) {
    const response = await axios.get(`${API_URL}/username/${username}`)
    return response.data
  },

  async updateUser(id, user) {
    const response = await axios.put(`${API_URL}/${id}`, user)
    return response.data
  },

  async deleteUser(id) {
    await axios.delete(`${API_URL}/${id}`)
  }
}