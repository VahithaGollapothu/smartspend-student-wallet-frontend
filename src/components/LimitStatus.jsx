import { formatCurrency } from '../utils/helpers'
import { Link } from 'react-router-dom'

export default function LimitStatus({ spent, limit }) {
  if (!limit) return (
    <div style={{
      background: '#fff', border: '1.5px dashed #e4e8f5', borderRadius: 24, padding: '2rem',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      gap: '0.75rem', minHeight: 180, textAlign: 'center'
    }}>
      <div style={{ width:48, height:48, borderRadius:14, background:'#f0f1fe', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.4rem' }}>🛡️</div>
      <p style={{ color:'#8e96b8', fontSize:'0.875rem', fontWeight:500 }}>No spend limit set</p>
      <Link to="/set-limit" style={{
        background:'#f0f1fe', color:'#5b6af0', borderRadius:8,
        padding:'0.4rem 1rem', fontSize:'0.825rem', fontWeight:600
      }}>Set a limit →</Link>
    </div>
  )

  const pct   = Math.min((spent / limit) * 100, 100)
  const color = pct >= 90 ? '#ef4444' : pct >= 60 ? '#f59e0b' : '#10b981'
  const bgc   = pct >= 90 ? '#fee2e2' : pct >= 60 ? '#fef3c7' : '#d1fae5'

  return (
    <div style={{ background:'#fff', border:'1px solid #e4e8f5', borderRadius:24, padding:'2rem', boxShadow:'0 2px 16px rgba(91,106,240,0.06)' }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'1.25rem' }}>
        <div>
          <p style={{ fontSize:'0.72rem', fontWeight:600, color:'#8e96b8', textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:'0.3rem' }}>Monthly Spend</p>
          <p style={{ fontSize:'1.5rem', fontWeight:600, color:'#1e2340', fontFamily:'var(--mono)' }}>{formatCurrency(spent)}</p>
        </div>
        <div style={{ textAlign:'right' }}>
          <p style={{ fontSize:'0.72rem', color:'#8e96b8', marginBottom:'0.3rem' }}>of</p>
          <p style={{ fontSize:'1rem', fontWeight:600, color:'#4b5680', fontFamily:'var(--mono)' }}>{formatCurrency(limit)}</p>
        </div>
      </div>

      <div style={{ background:'#f0f1fe', borderRadius:999, height:8, marginBottom:'0.75rem', overflow:'hidden' }}>
        <div style={{ width:`${pct}%`, height:'100%', borderRadius:999, background:color, transition:'width 0.6s ease' }} />
      </div>

      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
        <span style={{ display:'inline-block', background:bgc, color:color, borderRadius:999, padding:'0.2rem 0.65rem', fontSize:'0.78rem', fontWeight:600 }}>
          {pct >= 90 ? '⚠️ Near limit' : pct >= 60 ? '🟡 Moderate' : '✅ On track'}
        </span>
        <span style={{ fontSize:'0.78rem', color:'#8e96b8', fontFamily:'var(--mono)' }}>{Math.round(pct)}%</span>
      </div>
    </div>
  )
}