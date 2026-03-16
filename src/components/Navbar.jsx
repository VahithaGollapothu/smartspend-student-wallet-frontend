import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const handleLogout = () => { logout(); navigate('/login') }

  return (
    <nav style={{
      background: '#ffffff',
      borderBottom: '1px solid #e4e8f5',
      height: 64, display: 'flex', alignItems: 'center',
      position: 'sticky', top: 0, zIndex: 100,
      boxShadow: '0 1px 12px rgba(91,106,240,0.07)'
    }}>
      <div className="container" style={{ display:'flex', justifyContent:'space-between', alignItems:'center', width:'100%' }}>
        <Link to="/dashboard" style={{ display:'flex', alignItems:'center', gap:'0.6rem', fontWeight:700, fontSize:'1.15rem', color:'#1e2340' }}>
          <div style={{ width:34, height:34, borderRadius:10, background:'linear-gradient(135deg,#5b6af0,#7b89f4)', display:'flex', alignItems:'center', justifyContent:'center', color:'#fff', fontWeight:700, fontSize:'0.95rem' }}>₹</div>
          <span style={{ color:'#1e2340', fontWeight:700 }}>Smart<span style={{ color:'#5b6af0' }}>Spend</span></span>
        </Link>
        {user && (
          <div style={{ display:'flex', alignItems:'center', gap:'1.25rem' }}>
            <Link to="/dashboard" style={{ color:'#4b5680', fontSize:'0.875rem', fontWeight:500 }}>Dashboard</Link>
            <Link to="/transactions" style={{ color:'#4b5680', fontSize:'0.875rem', fontWeight:500 }}>History</Link>
            <div style={{ height:18, width:1, background:'#e4e8f5' }} />
            <span style={{ fontSize:'0.875rem', color:'#1e2340', fontWeight:600 }}>Hi, {user.name?.split(' ')[0]} 👋</span>
            <button onClick={handleLogout} style={{
              background:'#fef2f2', border:'1px solid #fecaca', color:'#ef4444',
              borderRadius:10, padding:'0.4rem 1rem', fontWeight:600,
              cursor:'pointer', fontSize:'0.825rem', fontFamily:'var(--font)'
            }}>Logout</button>
          </div>
        )}
      </div>
    </nav>
  )
}