import { formatCurrency } from '../utils/helpers'

export default function WalletCard({ balance, studentId }) {
  return (
    <div style={{
      background: 'linear-gradient(135deg, #5b6af0 0%, #7b89f4 50%, #a5b4fc 100%)',
      borderRadius: 24, padding: '2rem',
      boxShadow: '0 8px 32px rgba(91,106,240,0.25)',
      position: 'relative', overflow: 'hidden', color: '#fff'
    }}>
      <div style={{ position:'absolute', top:-30, right:-30, width:140, height:140, borderRadius:'50%', background:'rgba(255,255,255,0.08)' }} />
      <div style={{ position:'absolute', bottom:-20, left:20, width:90, height:90, borderRadius:'50%', background:'rgba(255,255,255,0.06)' }} />

      <p style={{ fontSize:'0.75rem', fontWeight:600, opacity:0.75, textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:'0.75rem' }}>Wallet Balance</p>

      <p style={{ fontSize:'2.4rem', fontWeight:600, letterSpacing:'-0.5px', marginBottom:'0.25rem', fontFamily:'var(--mono)' }}>
        {balance !== null ? formatCurrency(balance) : '—'}
      </p>

      <div style={{ display:'flex', alignItems:'center', gap:'0.5rem', marginTop:'1.25rem', paddingTop:'1rem', borderTop:'1px solid rgba(255,255,255,0.15)' }}>
        <div style={{ width:7, height:7, borderRadius:'50%', background:'#a7f3d0' }} />
        <span style={{ fontSize:'0.8rem', opacity:0.7, fontFamily:'var(--mono)' }}>Student #{studentId}</span>
      </div>
    </div>
  )
}