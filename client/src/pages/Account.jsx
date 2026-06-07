import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import Section from '../components/ui/Section'
import SectionHeading from '../components/ui/SectionHeading'
import { Card, Badge } from '../components/ui/Card'
import Button from '../components/ui/Button'
import Spinner from '../components/ui/Spinner'
import SubmissionForm from '../components/SubmissionForm'
import { apiGet } from '../lib/api'
import { useAuth } from '../lib/auth'
import { formatDate } from '../lib/format'
import './pages.css'

const statusBadge = (s) =>
  s === 'approved' ? <Badge variant="red">Live</Badge> : <Badge variant="silver">Pending review</Badge>

export default function Account() {
  const { user, updateProfile, logout } = useAuth()
  const [rsvps, setRsvps] = useState([])
  const [subs, setSubs] = useState({ creators: [], posts: [] })
  const [loading, setLoading] = useState(true)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')
  const [editing, setEditing] = useState(null) // { kind, existing } | null

  const reloadSubs = () =>
    apiGet('/me/submissions').then(setSubs).catch(() => {})

  useEffect(() => {
    Promise.all([
      apiGet('/me/rsvps').then(setRsvps).catch(() => {}),
      reloadSubs(),
    ]).finally(() => setLoading(false))
  }, [])

  const saveProfile = async (e) => {
    e.preventDefault()
    const fd = new FormData(e.target)
    setError('')
    try {
      await updateProfile({ name: fd.get('name'), phone: fd.get('phone'), avatar: fd.get('avatar') })
      setSaved(true)
      setTimeout(() => setSaved(false), 2500)
    } catch (err) {
      setError(err.message)
    }
  }

  const onSaved = () => {
    setEditing(null)
    reloadSubs()
  }

  return (
    <>
      <PageHeader eyebrow="Members" title={`Hi, ${user.name}`} subtitle="Manage your profile, RSVPs and submissions." />

      <Section>
        <div className="two-col">
          <div>
            <SectionHeading title="Your profile" />
            <p className="text-muted" style={{ marginTop: 'calc(-1 * var(--sp-3))' }}>
              Saved here once, then reused to prefill RSVPs and submissions.
            </p>
            {error && <p className="admin-error">{error}</p>}
            <form className="form" onSubmit={saveProfile}>
              <label className="field"><span>Name</span>
                <input name="name" defaultValue={user.name} required />
              </label>
              <label className="field"><span>Email</span>
                <input value={user.email} disabled />
              </label>
              <label className="field"><span>Phone</span>
                <input name="phone" defaultValue={user.phone || ''} placeholder="Optional" />
              </label>
              <label className="field"><span>Avatar URL</span>
                <input name="avatar" defaultValue={user.avatar || ''} placeholder="Optional" />
              </label>
              <Button type="submit">{saved ? '✓ Saved' : 'Save profile'}</Button>
            </form>
            <p className="form-note">
              <button className="link-button" onClick={logout}>Log out</button>
            </p>
          </div>

          <aside>
            <SectionHeading title="Your RSVPs" />
            {loading ? <Spinner /> : rsvps.length === 0 ? (
              <Card hover={false} className="tile"><p className="text-muted">No RSVPs yet. <Link to="/events" className="text-accent">Browse events →</Link></p></Card>
            ) : (
              <div className="account-list">
                {rsvps.map((e) => (
                  <Card hover={false} key={e.slug} className="tile account-item">
                    <div>
                      <Link to={`/events/${e.slug}`} className="account-item__title">{e.title}</Link>
                      <p className="text-muted">{formatDate(e.date)} · {e.venue}</p>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </aside>
        </div>
      </Section>

      <Section className="section--alt">
        <div className="account-head">
          <SectionHeading title="Your submissions" />
          <div className="account-head__actions">
            <Button size="sm" variant="ghost" onClick={() => setEditing({ kind: 'cosplayer' })}>+ Cosplayer</Button>
            <Button size="sm" variant="ghost" onClick={() => setEditing({ kind: 'creator' })}>+ Creator</Button>
            <Button size="sm" variant="ghost" onClick={() => setEditing({ kind: 'blog' })}>+ Blog post</Button>
          </div>
        </div>

        {loading ? <Spinner /> : (
          <div className="account-list">
            {subs.creators.length === 0 && subs.posts.length === 0 && (
              <Card hover={false} className="tile"><p className="text-muted">No submissions yet.</p></Card>
            )}
            {subs.creators.map((c) => (
              <Card hover={false} key={`c${c.id}`} className="tile account-item">
                <div>
                  <strong>{c.name}</strong>{' '}
                  <Badge variant="silver">{c.kind}</Badge>{' '}{statusBadge(c.status)}
                  <p className="text-muted">{c.specialty || '—'}</p>
                </div>
                <Button size="sm" variant="ghost" onClick={() => setEditing({ kind: c.kind, existing: c })}>Edit</Button>
              </Card>
            ))}
            {subs.posts.map((p) => (
              <Card hover={false} key={`p${p.id}`} className="tile account-item">
                <div>
                  <strong>{p.title}</strong>{' '}
                  <Badge variant="silver">blog</Badge>{' '}{statusBadge(p.status)}
                  <p className="text-muted">{p.category || '—'}</p>
                </div>
                <Button size="sm" variant="ghost" onClick={() => setEditing({ kind: 'blog', existing: p })}>Edit</Button>
              </Card>
            ))}
          </div>
        )}
      </Section>

      {editing && (
        <SubmissionForm
          kind={editing.kind}
          existing={editing.existing || null}
          onClose={() => setEditing(null)}
          onSaved={onSaved}
        />
      )}
    </>
  )
}
