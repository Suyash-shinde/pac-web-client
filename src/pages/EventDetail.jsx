import { useEffect, useState } from 'react'
import { useParams, useNavigate, useSearchParams, Link } from 'react-router-dom'
import Section from '../components/ui/Section'
import Button from '../components/ui/Button'
import { Badge } from '../components/ui/Card'
import Spinner from '../components/ui/Spinner'
import Countdown from '../components/Countdown'
import RegistrationModal from '../components/RegistrationModal'
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
  const [searchParams, setSearchParams] = useSearchParams()

  const [going, setGoing] = useState(false)
  const [count, setCount] = useState(null) // null until we have a live count; render falls back to event.rsvpCount
  const [busy, setBusy] = useState(false)
  const [registration, setRegistration] = useState(null) // the user's saved sign-up details
  const [showModal, setShowModal] = useState(false)

  // Fetch the user's RSVP status (and an authoritative count) once we know them.
  useEffect(() => {
    if (!user || !slug) return
    let active = true
    apiGet(`/events/${slug}/rsvp`)
      .then((r) => { if (active) { setGoing(r.going); setCount(r.count); setRegistration(r.registration || null) } })
      .catch(() => {})
    return () => { active = false }
  }, [user, slug])

  // Whether the event is over. Trust the admin-controlled flag from the API;
  // fall back to a date check only for offline stub data that lacks it.
  const isPast = event
    ? (event.isPast ?? new Date(event.date) < new Date())
    : false

  // Auto-open the sign-up modal when arrived via a "Register" link (?register=1).
  useEffect(() => {
    if (!event || isPast) return
    if (searchParams.get('register') == null) return
    if (!user) {
      navigate('/login', { state: { from: `/events/${slug}?register=1` } })
      return
    }
    setShowModal(true)
    // Clear the flag so a refresh doesn't reopen it.
    searchParams.delete('register')
    setSearchParams(searchParams, { replace: true })
  }, [event, isPast, user, slug, searchParams, setSearchParams, navigate])

  if (loading && !event) return <Section><Spinner /></Section>
  if (!event) return <NotFound />

  const mapsHref = event.mapUrl
    || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.venue || 'Pune')}`
  const mapEmbed = `https://www.google.com/maps?q=${encodeURIComponent(event.venue || 'Pune')}&output=embed`

  // Not going → open the sign-up modal (login first if needed).
  const openRegister = () => {
    if (!user) return navigate('/login', { state: { from: `/events/${slug}?register=1` } })
    setShowModal(true)
  }

  // Already going → cancel the RSVP (also clears saved registration server-side).
  const cancelRsvp = async () => {
    setBusy(true)
    try {
      const r = await apiPost(`/events/${slug}/rsvp`)
      setGoing(r.going)
      setCount(r.count)
      if (!r.going) setRegistration(null)
    } catch {
      // ignore; button stays as-is
    } finally {
      setBusy(false)
    }
  }

  const onRegistered = (r) => {
    setGoing(true)
    if (r?.count != null) setCount(r.count)
    setShowModal(false)
    // Refresh saved details for a later edit.
    apiGet(`/events/${slug}/rsvp`).then((s) => setRegistration(s.registration || null)).catch(() => {})
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
              {going ? (
                <div className="event-detail__going">
                  <Button size="lg" variant="ghost" onClick={() => setShowModal(true)}>
                    ✓ You’re registered — edit details
                  </Button>
                  <Button variant="outline" disabled={busy} onClick={cancelRsvp}>
                    {busy ? 'Cancelling…' : 'Cancel'}
                  </Button>
                </div>
              ) : (
                <Button size="lg" variant="primary" onClick={openRegister}>
                  Register / RSVP
                </Button>
              )}
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

      {showModal && (
        <RegistrationModal
          event={event}
          existing={registration}
          onClose={() => setShowModal(false)}
          onRegistered={onRegistered}
        />
      )}
    </Section>
  )
}
