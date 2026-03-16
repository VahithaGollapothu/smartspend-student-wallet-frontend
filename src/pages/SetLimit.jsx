import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import walletService from '../services/walletService'
import toast from 'react-hot-toast'

const PRESETS = [1000, 2000, 3000, 5000]

export default function SetLimit() {
  const { user }  = useAuth()
  const navigate  = useNavigate()
  const [limit, setLimit]               = useState('')
  const [currentLimit, setCurrentLimit] = useState(null)
  const [loading, setLoading]           = useState(false)

  useEffect(() => {
    walletService.getBalance(user.studentId).then(d => setCurrentLimit(d.spendLimit))
  }, [user.studentId])

  const submit = async e => {
    e.preventDefault()
    if (!limit || Number(limit) < 1) return toast.error('Enter a valid limit')
    setLoading(true)
    try {
      await walletService.setSpendLimit(user.studentId, limit)
      toast.success(`Limit set to ₹${limit}`)
      navigate('/dashboard')
    } catch (err) { toast.error(err.response?.data?.error || 'Failed') }
    finally { setLoading(false) }
  }

  const removeLimit = async () => {
    setLoading(true)
    try {
      await walletService.removeSpendLimit(user.studentId)
      toast.success('Limit removed')
      navigate('/dashboard')
    } catch { toast.error('Failed') }
    finally { setLoading(false) }
  }

  return (
    <div style={{ minHeight:'100vh', background:'#f5f7ff', padding:'2.5rem 1rem', display:'flex', justifyContent:'center' }}>
      <div style={{ width:'100%', maxWidth:460 }}>
        <button onClick={() => navigate(-1)} style={{ background:'none', border:'none', color:'#8e96b8', cursor:'pointer', fontSize:'0.875rem', padding:'0 0 1.5rem 0', fontFamily:'var(--font)' }}>← Back</button>

        <div style={{ marginBottom:'1.75rem' }}>
          <div style={{ display:'inline-flex', background:'#ede9fe', borderRadius:8, padding:'0.3rem 0.75rem', marginBottom:'0.75rem' }}>
            <span style={{ color:'#7c3aed', fontSize:'0.78rem', fontWeight:700 }}>🛡 BUDGET CONTROL</span>
          </div>
          <h1 style={{ fontSize:'1.75rem', fontWeight:700, color:'#1e2340' }}>Spend Limit</h1>
          <p style={{ color:'#8e96b8', fontSize:'0.875rem', marginTop:'0.2rem' }}>Set a monthly budget to stay on track</p>
        </div>

        {currentLimit && (
          <div style={{ background:'linear-gradient(135deg,#5b6af0,#818cf8)', borderRadius:20, padding:'1.5rem', marginBottom:'1.5rem', display:'flex', justifyContent:'space-between', alignItems:'center', boxShadow:'0 6px 20px rgba(91,106,240,0.2)', color:'#fff' }}>
            <div>
              <p style={{ margin:0, fontSize:'0.75rem', fontWeight:600, opacity:0.75, textTransform:'uppercase', letterSpacing:'0.08em' }}>Active Limit</p>
              <p style={{ margin:'0.3rem 0 0.1rem 0', fontSize:'1.9rem', fontWeight:600, fontFamily:'var(--mono)' }}>₹{Number(currentLimit).toLocaleString()}</p>
              <p style={{ margin:0, fontSize:'0.78rem', opacity:0.65 }}>per month</p>
            </div>
            <button onClick={removeLimit} disabled={loading}
              style={{ background:'rgba(255,255,255,0.15)', border:'1px solid rgba(255,255,255,0.25)', color:'#fff', borderRadius:10, padding:'0.5rem 1rem', fontWeight:600, cursor:'pointer', fontSize:'0.85rem', fontFamily:'var(--font)' }}>
              Remove
            </button>
          </div>
        )}

        <div style={{ background:'#fff', border:'1px solid #e4e8f5', borderRadius:24, padding:'2rem', boxShadow:'0 4px 24px rgba(91,106,240,0.08)' }}>
          <p style={{ fontSize:'0.72rem', fontWeight:600, color:'#8e96b8', textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:'0.75rem' }}>Quick Presets</p>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'0.6rem', marginBottom:'1.75rem' }}>
            {PRESETS.map(q => (
              <button key={q} type="button" onClick={() => setLimit(String(q))}
                style={{
                  padding:'0.65rem 0.5rem', borderRadius:12, border:'1.5px solid',
                  borderColor: limit === String(q) ? '#7c3aed' : '#e4e8f5',
                  background: limit === String(q) ? '#f5f3ff' : '#f8f9fe',
                  color: limit === String(q) ? '#7c3aed' : '#4b5680',
                  fontWeight:600, fontSize:'0.85rem', cursor:'pointer',
                  fontFamily:'var(--mono)', transition:'all 0.15s'
                }}>₹{q >= 1000 ? `${q/1000}k` : q}</button>
            ))}
          </div>

          <form onSubmit={submit}>
            <div style={{ marginBottom:'1.5rem' }}>
              <label style={{ display:'block', fontSize:'0.72rem', fontWeight:600, color:'#8e96b8', textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:'0.5rem' }}>Custom Amount</label>
              <div style={{ position:'relative' }}>
                <span style={{ position:'absolute', left:'1rem', top:'50%', transform:'translateY(-50%)', color:'#7c3aed', fontWeight:600, fontSize:'1.1rem', fontFamily:'var(--mono)' }}>₹</span>
                <input type="number" min="1" value={limit} onChange={e => setLimit(e.target.value)} required placeholder="Enter limit"
                  style={{ width:'100%', padding:'0.9rem 1rem 0.9rem 2.4rem', background:'#f8f9fe', border:'1.5px solid #e4e8f5', borderRadius:14, color:'#1e2340', fontSize:'1.5rem', fontWeight:500, outline:'none', fontFamily:'var(--mono)', boxSizing:'border-box' }}
                  onFocus={e => e.target.style.borderColor='#7c3aed'}
                  onBlur={e => e.target.style.borderColor='#e4e8f5'}
                />
              </div>
            </div>

            <button type="submit" disabled={loading}
              style={{
                width:'100%', padding:'0.875rem',
                background: loading ? '#e4e8f5' : '#7c3aed',
                color: loading ? '#8e96b8' : '#fff',
                border:'none', borderRadius:14, fontSize:'0.95rem', fontWeight:600,
                cursor: loading ? 'not-allowed' : 'pointer', fontFamily:'var(--font)',
                boxShadow: loading ? 'none' : '0 4px 16px rgba(124,58,237,0.3)',
                transition:'all 0.2s'
              }}>
              {loading ? 'Saving…' : `🛡 Set ₹${limit ? Number(limit).toLocaleString() : '0'} Limit`}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}