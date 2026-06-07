import { useEffect, useState } from 'react'
import { apiGet } from '../../lib/api'
import Spinner from '../../components/ui/Spinner'
import '../../components/admin/admin.css'

export default function AdminSubmissions() {
  const [tab, setTab] = useState('messages')
  const [messages, setMessages] = useState(null)
  const [subs, setSubs] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    Promise.all([apiGet('/admin/contact-messages'), apiGet('/admin/newsletter')])
      .then(([m, s]) => {
        setMessages(m)
        setSubs(s)
      })
      .catch((e) => setError(e.message))
  }, [])

  const fmt = (d) => new Date(d).toLocaleString('en-IN')
  const loading = !messages && !subs && !error

  return (
    <div className="admin-page">
      <header className="admin-page__head">
        <h1>Submissions</h1>
      </header>

      <div className="filter-bar">
        <button className={`chip ${tab === 'messages' ? 'chip--active' : ''}`} onClick={() => setTab('messages')}>
          Messages {messages ? `(${messages.length})` : ''}
        </button>
        <button className={`chip ${tab === 'subs' ? 'chip--active' : ''}`} onClick={() => setTab('subs')}>
          Newsletter {subs ? `(${subs.length})` : ''}
        </button>
      </div>

      {error && <p className="admin-error">{error}</p>}
      {loading && <Spinner />}

      {tab === 'messages' && messages && (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr><th>Date</th><th>Type</th><th>Name</th><th>Email</th><th>Message</th></tr>
            </thead>
            <tbody>
              {messages.length === 0 && <tr><td colSpan={5} className="admin-table__empty">No messages yet.</td></tr>}
              {messages.map((m) => (
                <tr key={m.id}>
                  <td>{fmt(m.created_at)}</td>
                  <td><span className="badge badge--silver">{m.type}</span></td>
                  <td>{m.name}</td>
                  <td><a href={`mailto:${m.email}`} className="admin-link">{m.email}</a></td>
                  <td className="admin-table__msg">{m.subject ? `${m.subject}: ` : ''}{m.message}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === 'subs' && subs && (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr><th>Date</th><th>Name</th><th>Email</th><th>Interests</th></tr>
            </thead>
            <tbody>
              {subs.length === 0 && <tr><td colSpan={4} className="admin-table__empty">No subscribers yet.</td></tr>}
              {subs.map((s) => (
                <tr key={s.id}>
                  <td>{fmt(s.created_at)}</td>
                  <td>{s.name || '—'}</td>
                  <td><a href={`mailto:${s.email}`} className="admin-link">{s.email}</a></td>
                  <td>{s.interests || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
