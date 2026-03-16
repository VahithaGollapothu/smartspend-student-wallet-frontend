import { formatCurrency, formatDate } from '../utils/helpers'

export default function TransactionTable({ transactions }) {
  if (!transactions?.length) return (
    <div style={{ textAlign:'center', padding:'2.5rem', color:'#8e96b8' }}>
      <div style={{ fontSize:'2rem', marginBottom:'0.5rem' }}>📭</div>
      <p style={{ fontWeight:500 }}>No transactions yet</p>
    </div>
  )

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:'0.4rem' }}>
      {transactions.map((tx) => (
        <div key={tx.id} style={{
          display:'flex', alignItems:'center', justifyContent:'space-between',
          padding:'0.875rem 1rem', borderRadius:12,
          background:'#f8f9fe', border:'1px solid #eef1fb',
          transition:'background 0.15s'
        }}
          onMouseEnter={e => e.currentTarget.style.background='#f0f1fe'}
          onMouseLeave={e => e.currentTarget.style.background='#f8f9fe'}
        >
          <div style={{ display:'flex', alignItems:'center', gap:'0.875rem' }}>
            <div style={{
              width:38, height:38, borderRadius:10, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'0.95rem', fontWeight:600,
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
  )
}