import api from './api'

const walletService = {
  getBalance: (studentId) =>
    api.get(`/wallet/${studentId}/balance`).then(r => r.data),

  addMoney: (studentId, amount, description) =>
    api.post(`/wallet/${studentId}/add`, {
      amount: parseFloat(amount),
      description: description || 'Wallet top-up'
    }).then(r => r.data),

  spendMoney: (studentId, amount, description) =>
    api.post(`/wallet/${studentId}/spend`, {
      amount: parseFloat(amount),
      description: description
    }).then(r => r.data),

  setSpendLimit: (studentId, limit) =>
    api.post(`/wallet/${studentId}/set-limit`, {
      spendLimit: parseFloat(limit)
    }).then(r => r.data),

  removeSpendLimit: (studentId) =>
    api.delete(`/wallet/${studentId}/remove-limit`).then(r => r.data),
}

export default walletService