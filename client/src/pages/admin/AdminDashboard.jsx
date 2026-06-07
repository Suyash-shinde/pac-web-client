import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { apiGet } from '../../lib/api'
import Spinner from '../../components/ui/Spinner'
import '../../components/admin/admin.css'

const CARDS = [
  { key: 'events', label: 'Events', to: '/admin/events' },
  { key: 'posts', label: 'Blog Posts', to: '/admin/blog' },
  { key: 'creators', label: 'Creators', to: '/admin/creators' },
  { key: 'products', label: 'Products', to: '/admin/products' },
  { key: 'messages', label: 'Messages', to: '/admin/submissions' },
  { key: 'subscribers', label: 'Subscribers', to: '/admin/submissions' },
]

export default function AdminDashboard() {
  const [stats, setStats] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    apiGet('/admin/stats')
      .then(setStats)
      .catch((e) => setError(e.message))
  }, [])

  return (
    <div className="admin-page">
      <header className="admin-page__head">
        <h1>Dashboard</h1>
      </header>
      {error && <p className="admin-error">{error}</p>}
      {!stats && !error ? (
        <Spinner />
      ) : (
        <div className="admin-cards">
          {stats &&
            CARDS.map((c) => (
              <Link key={c.label} to={c.to} className="admin-card glow-hover">
                <span className="admin-card__num">{stats[c.key] ?? 0}</span>
                <span className="admin-card__label">{c.label}</span>
              </Link>
            ))}
        </div>
      )}
    </div>
  )
}
