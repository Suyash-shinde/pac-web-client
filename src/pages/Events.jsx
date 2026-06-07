import { useState } from 'react'
import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import Section from '../components/ui/Section'
import Button from '../components/ui/Button'
import EventCard from '../components/cards/EventCard'
import { useApi } from '../lib/useApi'
import { UPCOMING_EVENTS, EVENT_CATEGORIES } from '../data/events'
import './pages.css'

export default function Events() {
  const [cat, setCat] = useState('All')
  const [query, setQuery] = useState('')
  const { data: events } = useApi('/events', UPCOMING_EVENTS)

  const filtered = events.filter((e) => {
    const matchCat = cat === 'All' || e.category === cat
    const matchQuery = e.title.toLowerCase().includes(query.toLowerCase())
    return matchCat && matchQuery
  })

  return (
    <>
      <PageHeader eyebrow="Events" title="Upcoming Events" subtitle="Find your next meetup, workshop, screening or convention trip.">
        <div style={{ marginTop: 'var(--sp-5)' }}>
          <Button to="/events/past" variant="ghost">View past events →</Button>
        </div>
      </PageHeader>

      <Section>
        <input
          type="search"
          className="search-input"
          placeholder="Search events…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search events"
        />
        <div className="filter-bar">
          {EVENT_CATEGORIES.map((c) => (
            <button
              key={c}
              className={`chip ${cat === c ? 'chip--active' : ''}`}
              onClick={() => setCat(c)}
            >
              {c}
            </button>
          ))}
        </div>

        {filtered.length ? (
          <div className="grid grid-3">
            {filtered.map((e) => (
              <EventCard key={e.slug} event={e} />
            ))}
          </div>
        ) : (
          <div className="empty">
            <p>No events match your filters.</p>
            <Link to="/events" className="text-accent" onClick={() => { setCat('All'); setQuery('') }}>
              Clear filters
            </Link>
          </div>
        )}
      </Section>
    </>
  )
}
