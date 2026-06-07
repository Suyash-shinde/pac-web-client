import { Link } from 'react-router-dom'
import { Card, Badge } from '../ui/Card'
import { formatDate } from '../../lib/format'
import './cards.css'

export default function EventCard({ event, past = false }) {
  return (
    <Card className="event-card">
      <Link to={`/events/${event.slug}`} className="event-card__link">
        <div className="event-card__media">
          <img src={event.image} alt={event.title} className="card__media" loading="lazy" />
          <div className="event-card__cat">
            <Badge>{event.category}</Badge>
          </div>
        </div>
        <div className="card__body">
          <div className="event-card__meta">
            <span>{formatDate(event.date)}</span>
            {!past && event.price && <span className="event-card__price">{event.price}</span>}
            {past && event.attendance && <span>{event.attendance} attended</span>}
          </div>
          <h3 className="card__title">{event.title}</h3>
          <p className="card__text">{event.excerpt}</p>
          <span className="event-card__venue">📍 {event.venue}</span>
        </div>
      </Link>
    </Card>
  )
}
