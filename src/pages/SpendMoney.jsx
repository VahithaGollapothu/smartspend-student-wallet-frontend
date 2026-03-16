import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import walletService from '../services/walletService'
import toast from 'react-hot-toast'

const CATEGORIES = [
  { label:'🍕 Food & Drinks', value:'Food & Drinks' },
  { label:'📚 Stationery', value:'Stationery' },
  { label:'🚌 Transport', value:'Transport' },
  { label:'👕 Laundry', value:'Laundry' },
  { label:'🎮 Entertainment', value:'Entertainment' },
  { label:'🛒 Other', value:'Other' },
]

export default function SpendMoney() {
  const { user }  = useAuth()
  const navigate  = useNavigate()
  const [amount, setAmount]     = useState('')
  const [category, setCategory] = useState('')
  const [loading, setLoading]   = useState(false)

  const submit = async e => {
    e.preventDefault()
    if (!category) return toast.error('Select a category')
    setLoading(true)
    try {
      await walletService.spendMoney(user.studentId, parseFloat(amount), category)
      toast.success(`₹${amount} spent!`)
      navigate('/dashboard')
    } catch (err) { toast.error(err.response?.data?.error || 'Transaction failed') }
    finally { setLoading(false) }
  }

  return (
    <div style={{ minHeight:'100vh', background:'#f5f7ff', padding:'2.5rem 1rem', display:'flex', justifyContent:'center' }}>
      <div style={{ width:'100%', maxWidth:460 }}>
        <button onClick={() => navigate(-1)} style={{ background:'none', border:'none', color:'#8e96b8', cursor:'pointer', fontSize:'0.875rem', padding:'0 0 1.5rem 0', fontFamily:'var(--font)' }}>← Back</button>

        <div style={{ marginBottom:'1.75rem' }}>
          <div style={{ display:'inline-flex', alignItems:'center', background:'#dbeafe', borderRadius:8, padding:'0.3rem 0.75rem', marginBottom:'0.75rem' }}>
            <span style={{ color:'#2563eb', fontSize:'0.78rem', fontWeight:700 }}>↓ SPEND</span>
          </div>
          <h1 style={{ fontSize:'1.75rem', fontWeight:700, color:'#1e2340' }}>Spend Money</h1>
          <p style={{ color:'#8e96b8', fontSize:'0.875rem', marginTop:'0.2rem' }}>Record a payment from your wallet</p>
        </div>

        <div style={{ background:'#fff', border:'1px solid #e4e8f5', borderRadius:24, padding:'2rem', boxShadow:'0 4px 24px rgba(91,106,240,0.08)' }}>
          <form onSubmit={submit}>
            <div style={{ marginBottom:'1.5rem' }}>
              <label style={{ display:'block', fontSize:'0.72rem', fontWeight:600, color:'#8e96b8', textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:'0.5rem' }}>Amount</label>
              <div style={{ position:'relative' }}>
                <span style={{ position:'absolute', left:'1rem', top:'50%', transform:'translateY(-50%)', color:'#2563eb', fontWeight:600, fontSize:'1.1rem', fontFamily:'var(--mono)' }}>₹</span>
                <input type="number" min="0.01" step="0.01" value={amount} onChange={e => setAmount(e.target.value)} required placeholder="0"
                  style={{ width:'100%', padding:'0.9rem 1rem 0.9rem 2.4rem', background:'#f8f9fe', border:'1.5px solid #e4e8f5', borderRadius:14, color:'#1e2340', fontSize:'1.5rem', fontWeight:500, outline:'none', fontFamily:'var(--mono)', boxSizing:'border-box' }}
                  onFocus={e => e.target.style.borderColor='#2563eb'}
                  onBlur={e => e.target.style.borderColor='#e4e8f5'}
                />
              </div>
            </div>

            <div style={{ marginBottom:'1.5rem' }}>
              <label style={{ display:'block', fontSize:'0.72rem', fontWeight:600, color:'#8e96b8', textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:'0.75rem' }}>Category</label>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0.6rem' }}>
                {CATEGORIES.map(c => (
                  <button key={c.value} type="button" onClick={() => setCategory(c.value)}
                    style={{
                      padding:'0.75rem 1rem', borderRadius:12, border:'1.5px solid',
                      borderColor: category === c.value ? '#2563eb' : '#e4e8f5',
                      background: category === c.value ? '#eff6ff' : '#f8f9fe',
                      color: category === c.value ? '#1d4ed8' : '#4b5680',
                      fontWeight:500, fontSize:'0.85rem', cursor:'pointer',
                      fontFamily:'var(--font)', textAlign:'left', transition:'all 0.15s'
                    }}>
                    {c.label}
                  </button>
                ))}
              </div>
            </div>

            <button type="submit" disabled={loading || !amount || !category}
              style={{
                width:'100%', padding:'0.875rem',
                background: !amount || !category ? '#e4e8f5' : '#2563eb',
                color: !amount || !category ? '#8e96b8' : '#fff',
                border:'none', borderRadius:14, fontSize:'0.95rem', fontWeight:600,
                cursor: !amount || !category ? 'not-allowed' : 'pointer', fontFamily:'var(--font)',
                boxShadow: amount && category ? '0 4px 16px rgba(37,99,235,0.3)' : 'none',
                transition:'all 0.2s'
              }}>
              {loading ? 'Processing…' : `↓ Pay ₹${amount || '0'}`}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}