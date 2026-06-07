import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../lib/auth'
import Button from '../../components/ui/Button'
import '../../components/admin/admin.css'

export default function AdminLogin() {
  const { login, user } = useAuth()
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  // Already logged in
  if (user?.role === 'admin') navigate('/admin', { replace: true })

  const submit = async (e) => {
    e.preventDefault()
    const fd = new FormData(e.target)
    setBusy(true)
    setError('')
    try {
      await login(fd.get('email'), fd.get('password'))
      navigate('/admin', { replace: true })
    } catch (err) {
      setError(err.message || 'Login failed')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="admin-login">
      <form className="admin-login__card" onSubmit={submit}>
        <div className="admin-brand admin-brand--lg">
          <span className="admin-brand__mark">PAC</span>
        </div>
        <h1>Admin Login</h1>
        <p className="text-muted">Sign in to manage the community site.</p>

        {error && <p className="admin-error">{error}</p>}

        <label className="field">
          <span>Email</span>
          <input type="email" name="email" required autoComplete="username" placeholder="admin@pac.local" />
        </label>
        <label className="field">
          <span>Password</span>
          <input type="password" name="password" required autoComplete="current-password" placeholder="••••••••" />
        </label>
        <Button type="submit" block disabled={busy}>
          {busy ? 'Signing in…' : 'Sign in'}
        </Button>
        <a href="/" className="admin-back">← Back to site</a>
      </form>
    </div>
  )
}
