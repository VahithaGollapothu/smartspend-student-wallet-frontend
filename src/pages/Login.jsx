import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'

export default function Login() {
  const { login } = useAuth()
  const navigate  = useNavigate()
  const [form, setForm]       = useState({ email:'', password:'' })
  const [loading, setLoading] = useState(false)
  const handle = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const submit = async e => {
    e.preventDefault()
    setLoading(true)
    try {
      await login(form.email, form.password)
      toast.success('Welcome back!')
      navigate('/dashboard')
    } catch (err) {
      toast.error(err.response?.data?.error || 'Login failed')
    } finally { setLoading(false) }
  }

  return (
    <div style={{ minHeight:'100vh', display:'flex', background:'#f5f7ff' }}>
      {/* Left panel */}
      <div style={{ width:'45%', background:'linear-gradient(145deg,#5b6af0,#818cf8)', display:'flex', flexDirection:'column', justifyContent:'center', padding:'3rem', color:'#fff' }}>
        <div style={{ width:48, height:48, borderRadius:14, background:'rgba(255,255,255,0.2)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.4rem', marginBottom:'2rem' }}>₹</div>
        <h1 style={{ fontSize:'2.2rem', fontWeight:700, lineHeight:1.2, marginBottom:'1rem' }}>Manage your student wallet smarter</h1>
        <p style={{ opacity:0.75, fontSize:'0.95rem', lineHeight:1.7 }}>Track spending, set limits, and stay on top of your finances with SmartSpend.</p>
        <div style={{ marginTop:'2.5rem', display:'flex', flexDirection:'column', gap:'0.75rem' }}>
          {['💸 Real-time balance tracking','🛡️ Monthly spend limits','📊 Full transaction history'].map(f => (
            <div key={f} style={{ display:'flex', alignItems:'center', gap:'0.75rem', fontSize:'0.875rem', opacity:0.85 }}>
              <div style={{ width:7, height:7, borderRadius:'50%', background:'#a5b4fc' }} />
              {f}
            </div>
          ))}
        </div>
      </div>

      {/* Right panel */}
      <div style={{ flex:1, display:'flex', alignItems:'center', justifyContent:'center', padding:'2rem' }}>
        <div style={{ width:'100%', maxWidth:400 }}>
          <h2 style={{ fontSize:'1.6rem', fontWeight:700, color:'#1e2340', marginBottom:'0.3rem' }}>Sign in</h2>
          <p style={{ color:'#8e96b8', marginBottom:'2rem', fontSize:'0.9rem' }}>Enter your credentials to continue</p>

          <form onSubmit={submit}>
            {[
              { label:'Email', name:'email', type:'email', placeholder:'you@university.edu' },
              { label:'Password', name:'password', type:'password', placeholder:'••••••••' }
            ].map(f => (
              <div key={f.name} style={{ marginBottom:'1.1rem' }}>
                <label style={{ display:'block', fontSize:'0.78rem', fontWeight:600, color:'#8e96b8', textTransform:'uppercase', letterSpacing:'0.07em', marginBottom:'0.45rem' }}>{f.label}</label>
                <input name={f.name} type={f.type} value={form[f.name]} onChange={handle} required placeholder={f.placeholder}
                  style={{ width:'100%', padding:'0.75rem 1rem', background:'#fff', border:'1.5px solid #e4e8f5', borderRadius:12, color:'#1e2340', fontSize:'0.9rem', outline:'none', fontFamily:'var(--font)', boxSizing:'border-box', transition:'border-color 0.2s' }}
                  onFocus={e => e.target.style.borderColor='#5b6af0'}
                  onBlur={e => e.target.style.borderColor='#e4e8f5'}
                />
              </div>
            ))}

            <button type="submit" disabled={loading} style={{
              width:'100%', padding:'0.875rem', marginTop:'0.5rem',
              background: loading ? '#e4e8f5' : '#5b6af0',
              color: loading ? '#8e96b8' : '#fff',
              border:'none', borderRadius:12, fontSize:'0.95rem', fontWeight:600,
              cursor: loading ? 'not-allowed' : 'pointer', fontFamily:'var(--font)',
              boxShadow: loading ? 'none' : '0 4px 16px rgba(91,106,240,0.3)',
              transition:'all 0.2s'
            }}>
              {loading ? 'Signing in…' : 'Sign In →'}
            </button>
          </form>

          <p style={{ textAlign:'center', marginTop:'1.5rem', fontSize:'0.875rem', color:'#8e96b8' }}>
            No account? <Link to="/register" style={{ color:'#5b6af0', fontWeight:600 }}>Create one</Link>
          </p>
        </div>
      </div>
    </div>
  )
}