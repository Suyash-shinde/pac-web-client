import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import Section from '../components/ui/Section'
import { Badge } from '../components/ui/Card'
import { useApi } from '../lib/useApi'
import { PAST_EVENTS } from '../data/events'
import { formatDate } from '../lib/format'
import './pages.css'

export default function PastEvents() {
  const { data: events } = useApi('/events?past=1', PAST_EVENTS)
  return (
    <>
      <PageHeader eyebrow="Archive" title="Past Events" subtitle="A look back at the moments that made our community." />
      <Section>
        <Link to="/events" className="back-link">← Upcoming events</Link>
        <ol className="timeline">
          {events.map((e) => (
            <li key={e.slug} className="timeline__item">
              <div className="timeline__dot" aria-hidden="true" />
              <Link to={`/events/${e.slug}`} className="timeline__card glow-hover">
                <img src={e.image} alt={e.title} loading="lazy" />
                <div className="timeline__body">
                  <div className="timeline__meta">
                    <Badge variant="silver">{e.category}</Badge>
                    <span>{formatDate(e.date)}</span>
                  </div>
                  <h3>{e.title}</h3>
                  <p>{e.excerpt}</p>
                  <span className="timeline__stat">{e.attendance} attendees</span>
                </div>
              </Link>
            </li>
          ))}
        </ol>
      </Section>
    </>
  )
}
