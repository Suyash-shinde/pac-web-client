import { useState } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import Section from '../components/ui/Section'
import { Card } from '../components/ui/Card'
import Button from '../components/ui/Button'
import GoogleButton from '../components/auth/GoogleButton'
import { useAuth } from '../lib/auth'
import './pages.css'

export default function Login() {
  const { login, register, user } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const dest = location.state?.from || '/account'

  const [mode, setMode] = useState('login') // 'login' | 'signup'
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const hasGoogle = Boolean(import.meta.env.VITE_GOOGLE_CLIENT_ID)

  // Already signed in — bounce to where they were headed.
  if (user) {
    navigate(dest, { replace: true })
    return null
  }

  const submit = async (e) => {
    e.preventDefault()
    const fd = new FormData(e.target)
    setBusy(true)
    setError('')
    try {
      if (mode === 'signup') {
        await register(fd.get('name'), fd.get('email'), fd.get('password'))
      } else {
        await login(fd.get('email'), fd.get('password'))
      }
      navigate(dest, { replace: true })
    } catch (err) {
      setError(err.message || 'Something went wrong')
    } finally {
      setBusy(false)
    }
  }

  return (
    <>
      <PageHeader
        eyebrow="Members"
        title={mode === 'signup' ? 'Create your account' : 'Welcome back'}
        subtitle="Sign in to RSVP to events and submit your cosplayer, creator or blog content."
      />
      <Section>
        <Card hover={false} className="auth-card">
          <div className="filter-bar">
            <button className={`chip ${mode === 'login' ? 'chip--active' : ''}`} onClick={() => { setMode('login'); setError('') }}>
              Log in
            </button>
            <button className={`chip ${mode === 'signup' ? 'chip--active' : ''}`} onClick={() => { setMode('signup'); setError('') }}>
              Sign up
            </button>
          </div>

          {error && <p className="admin-error">{error}</p>}

          <form className="form" onSubmit={submit}>
            {mode === 'signup' && (
              <label className="field">
                <span>Name *</span>
                <input type="text" name="name" required placeholder="Your name" autoComplete="name" />
              </label>
            )}
            <label className="field">
              <span>Email *</span>
              <input type="email" name="email" required placeholder="you@example.com" autoComplete="email" />
            </label>
            <label className="field">
              <span>Password *</span>
              <input
                type="password"
                name="password"
                required
                minLength={6}
                placeholder="••••••••"
                autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
              />
            </label>
            <Button type="submit" block disabled={busy}>
              {busy ? 'Please wait…' : mode === 'signup' ? 'Create account' : 'Log in'}
            </Button>
          </form>

          {hasGoogle && (
            <>
              <div className="auth-divider"><span>or</span></div>
              <GoogleButton onSuccess={() => navigate(dest, { replace: true })} onError={setError} />
            </>
          )}

          <p className="form-note" style={{ textAlign: 'center' }}>
            <Link to="/" className="text-accent">← Back to site</Link>
          </p>
        </Card>
      </Section>
    </>
  )
}
