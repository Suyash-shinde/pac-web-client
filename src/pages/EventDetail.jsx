import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import Section from '../components/ui/Section'
import Button from '../components/ui/Button'
import { Badge } from '../components/ui/Card'
import Spinner from '../components/ui/Spinner'
import Countdown from '../components/Countdown'
import { useApi } from '../lib/useApi'
import { apiGet, apiPost } from '../lib/api'
import { useAuth } from '../lib/auth'
import { getEventBySlug } from '../data/events'
import { formatDate, formatTime } from '../lib/format'
import NotFound from './NotFound'
import './pages.css'

export default function EventDetail() {
  const { slug } = useParams()
  const { data: event, loading } = useApi(`/events/${slug}`, getEventBySlug(slug))
  const { user } = useAuth()
  const navigate = useNavigate()

  const [going, setGoing] = useState(false)
  const [count, setCount] = useState(null) // null until we have a live count; render falls back to event.rsvpCount
  const [busy, setBusy] = useState(false)

  // Fetch the user's RSVP status (and an authoritative count) once we know them.
  useEffect(() => {
    if (!user || !slug) return
    let active = true
    apiGet(`/events/${slug}/rsvp`)
      .then((r) => { if (active) { setGoing(r.going); setCount(r.count) } })
      .catch(() => {})
    return () => { active = false }
  }, [user, slug])

  if (loading && !event) return <Section><Spinner /></Section>
  if (!event) return <NotFound />

  const isPast = new Date(event.date) < new Date()
  const mapsHref = event.mapUrl
    || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.venue || 'Pune')}`
  const mapEmbed = `https://www.google.com/maps?q=${encodeURIComponent(event.venue || 'Pune')}&output=embed`

  const toggleRsvp = async () => {
    if (!user) return navigate('/login', { state: { from: `/events/${slug}` } })
    setBusy(true)
    try {
      const r = await apiPost(`/events/${slug}/rsvp`)
      setGoing(r.going)
      setCount(r.count)
    } catch {
      // ignore; button stays as-is
    } finally {
      setBusy(false)
    }
  }

  return (
    <Section>
      <Link to="/events" className="back-link">← Back to events</Link>

      <div className="event-detail">
        <img src={event.image} alt={event.title} className="event-detail__banner" />

        <div className="event-detail__head">
          <Badge>{event.category}</Badge>
          <h1>{event.title}</h1>
          <p className="text-muted">{event.excerpt}</p>
          {!isPast && (
            <div className="event-detail__cta">
              <Countdown date={event.date} compact />
              <Button size="lg" variant={going ? 'ghost' : 'primary'} disabled={busy} onClick={toggleRsvp}>
                {busy ? 'Saving…' : going ? '✓ You’re going (cancel)' : 'Register / RSVP'}
              </Button>
            </div>
          )}
        </div>

        <div className="info-grid">
          <div className="info-item">
            <span>Date &amp; Time</span>
            <strong>{formatDate(event.date)} · {formatTime(event.date)}</strong>
          </div>
          <div className="info-item">
            <span>Venue</span>
            <strong>{event.venue}</strong>
            <a href={mapsHref} target="_blank" rel="noreferrer" className="text-accent event-detail__maplink">
              Open in Google Maps ↗
            </a>
          </div>
          <div className="info-item">
            <span>{isPast ? 'Attendance' : 'Entry'}</span>
            <strong>{isPast ? `${event.attendance || '—'} attended` : event.price || 'TBA'}</strong>
          </div>
          <div className="info-item">
            <span>RSVPs</span>
            <strong>{count != null ? count : event.rsvpCount || 0} going</strong>
          </div>
        </div>

        <div className="prose" style={{ marginInline: 0 }}>
          <h2>About this event</h2>
          <p>
            {event.excerpt} Join the PAC community for a memorable time with fellow fans. Full
            schedule, guests and details will be shared with registered attendees.
          </p>
          <h3>What to expect</h3>
          <p>
            • A welcoming, all-levels-friendly crowd{'\n'}• Activities, games and giveaways{'\n'}•
            Plenty of time to meet new friends{'\n'}• Photo opportunities
          </p>
        </div>

        <div className="event-detail__map">
          <iframe
            title="Event location"
            src={mapEmbed}
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </Section>
  )
}
