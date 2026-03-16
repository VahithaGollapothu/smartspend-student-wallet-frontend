// Format number as currency
export const formatCurrency = (amount) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount)

// Format ISO date to readable string
export const formatDate = (dateStr) =>
  new Date(dateStr).toLocaleString('en-IN', {
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit'
  })

// Truncate long strings
export const truncate = (str, n = 30) =>
  str?.length > n ? str.slice(0, n) + '…' : str