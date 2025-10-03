import axios from 'axios'

const API_URL = 'http://localhost:8083/api/accounts'

export const accountService = {
  async createAccount(account) {
    const response = await axios.post(API_URL, account)
    return response.data
  },

  async getAllAccounts() {
    const response = await axios.get(API_URL)
    return response.data
  },

  async getAccountById(id) {
    const response = await axios.get(`${API_URL}/${id}`)
    return response.data
  },

  async getAccountsByUserId(userId) {
    const response = await axios.get(`${API_URL}/user/${userId}`)
    return response.data
  },

  async getAccountByNumber(accountNumber) {
    const response = await axios.get(`${API_URL}/number/${accountNumber}`)
    return response.data
  },

  async updateAccount(id, account) {
    const response = await axios.put(`${API_URL}/${id}`, account)
    return response.data
  },

  async deleteAccount(id) {
    await axios.delete(`${API_URL}/${id}`)
  }
}