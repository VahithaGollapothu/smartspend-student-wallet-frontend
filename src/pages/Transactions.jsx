import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import transactionService from '../services/transactionService'
import { formatCurrency, formatDate } from '../utils/helpers'
import toast from 'react-hot-toast'

const FILTERS = ['ALL', 'CREDIT', 'DEBIT']

export default function Transactions() {
  const { user }  = useAuth()
  const [txns, setTxns]       = useState([])
  const [filter, setFilter]   = useState('ALL')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    transactionService.getHistory(user.studentId)
      .then(setTxns)
      .catch(() => toast.error('Failed to load'))
      .finally(() => setLoading(false))
  }, [user.studentId])

  const filtered = filter === 'ALL' ? txns : txns.filter(t => t.type === filter)
  const totalIn  = txns.filter(t => t.type === 'CREDIT').reduce((s, t) => s + Number(t.amount), 0)
  const totalOut = txns.filter(t => t.type === 'DEBIT').reduce((s, t) => s + Number(t.amount), 0)

  return (
    <div style={{ minHeight:'100vh', background:'#f5f7ff', padding:'2.5rem 1rem' }}>
      <div style={{ maxWidth:800, margin:'0 auto' }}>
        <h1 style={{ fontSize:'1.75rem', fontWeight:700, color:'#1e2340', marginBottom:'0.25rem' }}>Transaction History</h1>
        <p style={{ color:'#8e96b8', fontSize:'0.875rem', marginBottom:'2rem' }}>All your wallet activity in one place</p>

        {/* Summary cards */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'1rem', marginBottom:'2rem' }}>
          {[
            { label:'Total Added',  value:formatCurrency(totalIn),           color:'#059669', bg:'#f0fdf4', border:'#bbf7d0' },
            { label:'Total Spent',  value:formatCurrency(totalOut),          color:'#dc2626', bg:'#fff1f2', border:'#fecdd3' },
            { label:'Net Balance',  value:formatCurrency(totalIn - totalOut), color:'#5b6af0', bg:'#f0f1fe', border:'#c7d2fe' },
          ].map(s => (
            <div key={s.label} style={{ background:s.bg, border:`1px solid ${s.border}`, borderRadius:18, padding:'1.25rem 1.5rem' }}>
              <p style={{ margin:'0 0 0.4rem 0', fontSize:'0.72rem', fontWeight:600, color:'#6b7280', textTransform:'uppercase', letterSpacing:'0.08em' }}>{s.label}</p>
              <p style={{ margin:0, fontSize:'1.35rem', fontWeight:600, color:s.color, fontFamily:'var(--mono)' }}>{s.value}</p>
            </div>
          ))}
        </div>

        <div style={{ background:'#fff', border:'1px solid #e4e8f5', borderRadius:24, padding:'1.5rem', boxShadow:'0 2px 16px rgba(91,106,240,0.06)' }}>
          <div style={{ display:'flex', alignItems:'center', gap:'0.5rem', marginBottom:'1.5rem' }}>
            {FILTERS.map(f => (
              <button key={f} onClick={() => setFilter(f)} style={{
                padding:'0.4rem 1rem', borderRadius:999, border:'1.5px solid',
                borderColor: filter === f ? '#5b6af0' : '#e4e8f5',
                background: filter === f ? '#f0f1fe' : '#fff',
                color: filter === f ? '#5b6af0' : '#8e96b8',
                fontWeight:600, fontSize:'0.8rem', cursor:'pointer',
                fontFamily:'var(--font)', transition:'all 0.15s'
              }}>
                {f} {f !== 'ALL' && `(${txns.filter(t => t.type === f).length})`}
              </button>
            ))}
            <span style={{ marginLeft:'auto', fontSize:'0.78rem', color:'#8e96b8', fontFamily:'var(--mono)' }}>
              {filtered.length} records
            </span>
          </div>

          {loading ? (
            <div style={{ textAlign:'center', padding:'3rem', color:'#8e96b8' }}>Loading…</div>
          ) : filtered.length === 0 ? (
            <div style={{ textAlign:'center', padding:'3rem', color:'#8e96b8' }}>
              <div style={{ fontSize:'2.5rem', marginBottom:'0.5rem' }}>📭</div>
              <p style={{ fontWeight:500 }}>No transactions found</p>
            </div>
          ) : (
            <div style={{ display:'flex', flexDirection:'column', gap:'0.4rem' }}>
              {filtered.map((tx, i) => (
                <div key={tx.id} style={{
                  display:'flex', alignItems:'center', justifyContent:'space-between',
                  padding:'0.875rem 1rem', borderRadius:12,
                  background: i % 2 === 0 ? '#f8f9fe' : '#fff',
                  border:'1px solid #eef1fb', transition:'background 0.15s'
                }}
                  onMouseEnter={e => e.currentTarget.style.background='#f0f1fe'}
                  onMouseLeave={e => e.currentTarget.style.background = i % 2 === 0 ? '#f8f9fe' : '#fff'}
                >
                  <div style={{ display:'flex', alignItems:'center', gap:'0.875rem' }}>
                    <div style={{
                      width:40, height:40, borderRadius:11, display:'flex', alignItems:'center', justifyContent:'center', fontWeight:600, fontSize:'0.9rem',
                      background: tx.type === 'CREDIT' ? '#d1fae5' : '#fee2e2',
                      color: tx.type === 'CREDIT' ? '#059669' : '#dc2626'
                    }}>
                      {tx.type === 'CREDIT' ? '↑' : '↓'}
                    </div>
                    <div>
                      <p style={{ margin:0, fontWeight:500, fontSize:'0.875rem', color:'#1e2340' }}>{tx.description}</p>
                      <p style={{ margin:'0.1rem 0 0 0', fontSize:'0.75rem', color:'#8e96b8', fontFamily:'var(--mono)' }}>{formatDate(tx.createdAt)}</p>
                    </div>
                  </div>
                  <div style={{ textAlign:'right' }}>
                    <p style={{ margin:0, fontWeight:600, fontSize:'0.9rem', fontFamily:'var(--mono)', color: tx.type === 'CREDIT' ? '#059669' : '#dc2626' }}>
                      {tx.type === 'CREDIT' ? '+' : '-'}{formatCurrency(tx.amount)}
                    </p>
                    <span className={`badge ${tx.type === 'CREDIT' ? 'badge-green' : 'badge-red'}`}>{tx.type}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}