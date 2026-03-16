import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import walletService from '../services/walletService'
import toast from 'react-hot-toast'

export default function EmergencySpend() {
  const { user }  = useAuth()
  const navigate  = useNavigate()
  const [amount, setAmount]   = useState('')
  const [reason, setReason]   = useState('')
  const [confirm, setConfirm] = useState(false)
  const [loading, setLoading] = useState(false)

  const submit = async e => {
    e.preventDefault()
    if (!confirm) return toast.error('Please tick the confirmation box')
    setLoading(true)
    try {
      await walletService.spendMoney(user.studentId, Number(amount), `🚨 Emergency: ${reason}`)
      toast.success(`Emergency spend of ₹${amount} recorded`)
      navigate('/dashboard')
    } catch (err) { toast.error(err.response?.data?.error || 'Transaction failed') }
    finally { setLoading(false) }
  }

  return (
    <div style={{ minHeight:'100vh', background:'#f5f7ff', padding:'2.5rem 1rem', display:'flex', justifyContent:'center' }}>
      <div style={{ width:'100%', maxWidth:460 }}>
        <button onClick={() => navigate(-1)} style={{ background:'none', border:'none', color:'#8e96b8', cursor:'pointer', fontSize:'0.875rem', padding:'0 0 1.5rem 0', fontFamily:'var(--font)' }}>← Back</button>

        <div style={{ background:'#fef2f2', border:'1px solid #fecaca', borderRadius:14, padding:'1rem 1.25rem', marginBottom:'1.5rem', display:'flex', gap:'0.75rem' }}>
          <span style={{ fontSize:'1.3rem' }}>🚨</span>
          <div>
            <p style={{ fontWeight:600, color:'#dc2626', margin:0, fontSize:'0.875rem' }}>Emergency Use Only</p>
            <p style={{ color:'#b91c1c', margin:'0.15rem 0 0 0', fontSize:'0.8rem' }}>This transaction will be permanently flagged in your history.</p>
          </div>
        </div>

        <div style={{ background:'#fff', border:'1.5px solid #fecaca', borderRadius:24, padding:'2rem', boxShadow:'0 4px 24px rgba(239,68,68,0.08)' }}>
          <div style={{ display:'inline-flex', alignItems:'center', background:'#fee2e2', borderRadius:8, padding:'0.3rem 0.75rem', marginBottom:'1rem' }}>
            <span style={{ color:'#dc2626', fontSize:'0.78rem', fontWeight:700 }}>⚡ EMERGENCY</span>
          </div>
          <h1 style={{ fontSize:'1.75rem', fontWeight:700, color:'#dc2626', marginBottom:'1.5rem' }}>Emergency Spend</h1>

          <form onSubmit={submit}>
            <div style={{ marginBottom:'1.2rem' }}>
              <label style={{ display:'block', fontSize:'0.72rem', fontWeight:600, color:'#8e96b8', textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:'0.5rem' }}>Amount</label>
              <div style={{ position:'relative' }}>
                <span style={{ position:'absolute', left:'1rem', top:'50%', transform:'translateY(-50%)', color:'#ef4444', fontWeight:600, fontSize:'1.1rem', fontFamily:'var(--mono)' }}>₹</span>
                <input type="number" min="1" value={amount} onChange={e => setAmount(e.target.value)} required placeholder="0"
                  style={{ width:'100%', padding:'0.9rem 1rem 0.9rem 2.4rem', background:'#fff5f5', border:'1.5px solid #fecaca', borderRadius:14, color:'#1e2340', fontSize:'1.5rem', fontWeight:500, outline:'none', fontFamily:'var(--mono)', boxSizing:'border-box' }}
                  onFocus={e => e.target.style.borderColor='#ef4444'}
                  onBlur={e => e.target.style.borderColor='#fecaca'}
                />
              </div>
            </div>

            <div style={{ marginBottom:'1.2rem' }}>
              <label style={{ display:'block', fontSize:'0.72rem', fontWeight:600, color:'#8e96b8', textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:'0.5rem' }}>Reason</label>
              <textarea rows={3} value={reason} onChange={e => setReason(e.target.value)} required placeholder="Describe the emergency…"
                style={{ width:'100%', padding:'0.75rem 1rem', background:'#fff5f5', border:'1.5px solid #fecaca', borderRadius:12, color:'#1e2340', fontSize:'0.9rem', outline:'none', fontFamily:'var(--font)', boxSizing:'border-box', resize:'vertical' }}
                onFocus={e => e.target.style.borderColor='#ef4444'}
                onBlur={e => e.target.style.borderColor='#fecaca'}
              />
            </div>

            <label style={{ display:'flex', alignItems:'flex-start', gap:'0.75rem', padding:'0.875rem 1rem', background:'#fff5f5', border:'1px solid #fecaca', borderRadius:12, marginBottom:'1.25rem', cursor:'pointer' }}>
              <input type="checkbox" checked={confirm} onChange={e => setConfirm(e.target.checked)} style={{ marginTop:'0.15rem', width:16, height:16, accentColor:'#ef4444', cursor:'pointer' }} />
              <span style={{ fontSize:'0.85rem', fontWeight:500, color:'#7f1d1d', lineHeight:1.5 }}>
                I confirm this is a genuine emergency and understand this will be permanently recorded
              </span>
            </label>

            <button type="submit" disabled={loading || !confirm || !amount}
              style={{
                width:'100%', padding:'0.875rem',
                background: !confirm || !amount ? '#fee2e2' : '#dc2626',
                color: !confirm || !amount ? '#f87171' : '#fff',
                border:'none', borderRadius:14, fontSize:'0.95rem', fontWeight:600,
                cursor: !confirm || !amount ? 'not-allowed' : 'pointer', fontFamily:'var(--font)',
                boxShadow: confirm && amount ? '0 4px 16px rgba(220,38,38,0.3)' : 'none',
                transition:'all 0.2s'
              }}>
              {loading ? 'Processing…' : `🚨 Confirm Emergency ₹${amount || '0'}`}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}