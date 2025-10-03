import axios from 'axios'

const API_URL = 'http://localhost:8083/api/transactions'

export const transactionService = {
  async createTransaction(transaction) {
    const response = await axios.post(API_URL, transaction)
    return response.data
  },

  async getAllTransactions() {
    const response = await axios.get(API_URL)
    return response.data
  },

  async getTransactionById(id) {
    const response = await axios.get(`${API_URL}/${id}`)
    return response.data
  },

  async getTransactionsByAccountId(accountId) {
    const response = await axios.get(`${API_URL}/account/${accountId}`)
    return response.data
  },

  async getTransactionByReference(reference) {
    const response = await axios.get(`${API_URL}/reference/${reference}`)
    return response.data
  }
}
