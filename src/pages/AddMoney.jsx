import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import walletService from '../services/walletService'
import toast from 'react-hot-toast'

const QUICK = [100, 200, 500, 1000]

export default function AddMoney() {
  const { user }  = useAuth()
  const navigate  = useNavigate()
  const [amount, setAmount]   = useState('')
  const [desc, setDesc]       = useState('Wallet top-up')
  const [loading, setLoading] = useState(false)

  const submit = async e => {
    e.preventDefault()
    if (!amount || Number(amount) < 1) return toast.error('Minimum ₹1')
    setLoading(true)
    try {
      await walletService.addMoney(user.studentId, parseFloat(amount), desc)
      toast.success(`₹${amount} added!`)
      navigate('/dashboard')
    } catch (err) { toast.error(err.response?.data?.error || 'Failed') }
    finally { setLoading(false) }
  }

  return (
    <div style={{ minHeight:'100vh', background:'#f5f7ff', padding:'2.5rem 1rem', display:'flex', justifyContent:'center' }}>
      <div style={{ width:'100%', maxWidth:460 }}>
        <button onClick={() => navigate(-1)} style={{ background:'none', border:'none', color:'#8e96b8', cursor:'pointer', fontSize:'0.875rem', padding:'0 0 1.5rem 0', fontFamily:'var(--font)' }}>← Back</button>

        <div style={{ marginBottom:'1.75rem' }}>
          <div style={{ display:'inline-flex', alignItems:'center', gap:'0.4rem', background:'#d1fae5', borderRadius:8, padding:'0.3rem 0.75rem', marginBottom:'0.75rem' }}>
            <span style={{ color:'#059669', fontSize:'0.78rem', fontWeight:700 }}>↑ ADD FUNDS</span>
          </div>
          <h1 style={{ fontSize:'1.75rem', fontWeight:700, color:'#1e2340' }}>Add Money</h1>
          <p style={{ color:'#8e96b8', fontSize:'0.875rem', marginTop:'0.2rem' }}>Top up your SmartSpend wallet</p>
        </div>

        <div style={{ background:'#fff', border:'1px solid #e4e8f5', borderRadius:24, padding:'2rem', boxShadow:'0 4px 24px rgba(91,106,240,0.08)' }}>
          <p style={{ fontSize:'0.72rem', fontWeight:600, color:'#8e96b8', textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:'0.75rem' }}>Quick Select</p>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'0.6rem', marginBottom:'1.75rem' }}>
            {QUICK.map(q => (
              <button key={q} type="button" onClick={() => setAmount(String(q))}
                style={{
                  padding:'0.65rem', borderRadius:12, border:'1.5px solid',
                  borderColor: amount === String(q) ? '#5b6af0' : '#e4e8f5',
                  background: amount === String(q) ? '#f0f1fe' : '#f8f9fe',
                  color: amount === String(q) ? '#5b6af0' : '#4b5680',
                  fontWeight:600, fontSize:'0.875rem', cursor:'pointer',
                  fontFamily:'var(--mono)', transition:'all 0.15s'
                }}>₹{q}</button>
            ))}
          </div>

          <form onSubmit={submit}>
            <div style={{ marginBottom:'1.25rem' }}>
              <label style={{ display:'block', fontSize:'0.72rem', fontWeight:600, color:'#8e96b8', textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:'0.5rem' }}>Amount</label>
              <div style={{ position:'relative' }}>
                <span style={{ position:'absolute', left:'1rem', top:'50%', transform:'translateY(-50%)', color:'#5b6af0', fontWeight:600, fontSize:'1.1rem', fontFamily:'var(--mono)' }}>₹</span>
                <input type="number" min="1" value={amount} onChange={e => setAmount(e.target.value)} required placeholder="0"
                  style={{ width:'100%', padding:'0.9rem 1rem 0.9rem 2.4rem', background:'#f8f9fe', border:'1.5px solid #e4e8f5', borderRadius:14, color:'#1e2340', fontSize:'1.5rem', fontWeight:500, outline:'none', fontFamily:'var(--mono)', boxSizing:'border-box', transition:'border-color 0.2s' }}
                  onFocus={e => e.target.style.borderColor='#5b6af0'}
                  onBlur={e => e.target.style.borderColor='#e4e8f5'}
                />
              </div>
            </div>

            <div style={{ marginBottom:'1.5rem' }}>
              <label style={{ display:'block', fontSize:'0.72rem', fontWeight:600, color:'#8e96b8', textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:'0.5rem' }}>Note</label>
              <input type="text" value={desc} onChange={e => setDesc(e.target.value)} placeholder="e.g. Pocket money"
                style={{ width:'100%', padding:'0.75rem 1rem', background:'#f8f9fe', border:'1.5px solid #e4e8f5', borderRadius:12, color:'#1e2340', fontSize:'0.9rem', outline:'none', fontFamily:'var(--font)', boxSizing:'border-box' }}
                onFocus={e => e.target.style.borderColor='#5b6af0'}
                onBlur={e => e.target.style.borderColor='#e4e8f5'}
              />
            </div>

            <button type="submit" disabled={loading} style={{
              width:'100%', padding:'0.875rem',
              background: loading ? '#e4e8f5' : '#059669',
              color: loading ? '#8e96b8' : '#fff',
              border:'none', borderRadius:14, fontSize:'0.95rem', fontWeight:600,
              cursor: loading ? 'not-allowed' : 'pointer', fontFamily:'var(--font)',
              boxShadow: loading ? 'none' : '0 4px 16px rgba(16,185,129,0.3)',
              transition:'all 0.2s'
            }}>
              {loading ? 'Processing…' : `↑ Add ₹${amount || '0'} to Wallet`}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}