import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import walletService from '../services/walletService'
import transactionService from '../services/transactionService'
import WalletCard from '../components/WalletCard'
import LimitStatus from '../components/LimitStatus'
import TransactionTable from '../components/TransactionTable'
import toast from 'react-hot-toast'

const actions = [
  { to:'/add-money',    label:'Add Money',    icon:'↑', color:'#059669', bg:'#d1fae5', border:'#a7f3d0' },
  { to:'/spend',        label:'Spend',         icon:'↓', color:'#2563eb', bg:'#dbeafe', border:'#bfdbfe' },
  { to:'/emergency',    label:'Emergency',     icon:'⚡', color:'#dc2626', bg:'#fee2e2', border:'#fecaca' },
  { to:'/set-limit',    label:'Set Limit',     icon:'🛡', color:'#7c3aed', bg:'#ede9fe', border:'#ddd6fe' },
  { to:'/transactions', label:'All History',   icon:'≡',  color:'#d97706', bg:'#fef3c7', border:'#fde68a' },
]

export default function Dashboard() {
  const { user } = useAuth()
  const [balance, setBalance]       = useState(null)
  const [spendLimit, setSpendLimit] = useState(null)
  const [txns, setTxns]             = useState([])
  const [loading, setLoading]       = useState(true)
  const [waking, setWaking]         = useState(true)

  // Wake up Render backend on first load
  useEffect(() => {
    fetch('https://smartspend-student-wallet-backend.onrender.com/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({})
    })
    .catch(() => {})
    .finally(() => setWaking(false))
  }, [])

  const fetchData = async () => {
    try {
      const [wallet, transactions] = await Promise.all([
        walletService.getBalance(user.studentId),
        transactionService.getHistory(user.studentId)
      ])
      setBalance(wallet.balance)
      setSpendLimit(wallet.spendLimit)
      setTxns(transactions)
    } catch { toast.error('Failed to load data') }
    finally { setLoading(false) }
  }

  useEffect(() => {
    if (!waking) fetchData()
  }, [waking, user.studentId])

  const monthlySpent = txns
    .filter(t => t.type === 'DEBIT' && new Date(t.createdAt).getMonth() === new Date().getMonth())
    .reduce((s, t) => s + Number(t.amount), 0)

  if (waking) return (
    <div style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', height:'80vh', color:'#8e96b8', gap:'1rem' }}>
      <div style={{ fontSize:'2rem', animation:'spin 1s linear infinite' }}>⟳</div>
      <p style={{ fontSize:'0.9rem' }}>Waking up server, please wait...</p>
      <p style={{ fontSize:'0.78rem', color:'#b0b8d4' }}>This may take up to 60 seconds on first load</p>
    </div>
  )

  if (loading) return (
    <div style={{ display:'flex', alignItems:'center', justifyContent:'center', height:'80vh', color:'#8e96b8' }}>
      Loading your wallet…
    </div>
  )

  return (
    <div className="page">
      <div className="container">
        <div style={{ marginBottom:'1.75rem' }}>
          <h1 style={{ fontSize:'1.5rem', fontWeight:700, color:'#1e2340' }}>
            Good day, <span style={{ color:'#5b6af0' }}>{user.name?.split(' ')[0]}</span> 👋
          </h1>
          <p style={{ color:'#8e96b8', fontSize:'0.875rem', marginTop:'0.2rem' }}>Here's your wallet overview</p>
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1.25rem', marginBottom:'1.5rem' }}>
          <WalletCard balance={balance} studentId={user.studentId} />
          <LimitStatus spent={monthlySpent} limit={spendLimit} />
        </div>

        <div style={{ background:'#fff', border:'1px solid #e4e8f5', borderRadius:20, padding:'1.5rem', marginBottom:'1.5rem', boxShadow:'0 2px 12px rgba(91,106,240,0.05)' }}>
          <p style={{ fontSize:'0.72rem', fontWeight:600, color:'#8e96b8', textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:'1rem' }}>Quick Actions</p>
          <div style={{ display:'flex', gap:'0.75rem', flexWrap:'wrap' }}>
            {actions.map(a => (
              <Link to={a.to} key={a.to}>
                <button style={{
                  background: a.bg, border:`1.5px solid ${a.border}`,
                  color: a.color, borderRadius:12, padding:'0.55rem 1.1rem',
                  fontWeight:600, fontSize:'0.85rem', cursor:'pointer',
                  fontFamily:'var(--font)', display:'flex', alignItems:'center', gap:'0.4rem',
                  transition:'all 0.18s'
                }}
                  onMouseEnter={e => { e.currentTarget.style.transform='translateY(-2px)'; e.currentTarget.style.boxShadow=`0 4px 12px ${a.border}` }}
                  onMouseLeave={e => { e.currentTarget.style.transform='none'; e.currentTarget.style.boxShadow='none' }}
                >
                  {a.icon} {a.label}
                </button>
              </Link>
            ))}
          </div>
        </div>

        <div style={{ background:'#fff', border:'1px solid #e4e8f5', borderRadius:20, padding:'1.5rem', boxShadow:'0 2px 12px rgba(91,106,240,0.05)' }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'1.25rem' }}>
            <p style={{ fontSize:'0.72rem', fontWeight:600, color:'#8e96b8', textTransform:'uppercase', letterSpacing:'0.1em' }}>Recent Activity</p>
            <Link to="/transactions" style={{ fontSize:'0.8rem', color:'#5b6af0', fontWeight:600 }}>View all →</Link>
          </div>
          <TransactionTable transactions={txns.slice(0, 5)} />
        </div>
      </div>
    </div>
  )
}