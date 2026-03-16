import api from './api'

const transactionService = {
  getHistory: (studentId) =>
    api.get(`/transactions/${studentId}/history`).then(r => r.data),

  getById: (transactionId) =>
    api.get(`/transactions/${transactionId}`).then(r => r.data),
}

export default transactionService