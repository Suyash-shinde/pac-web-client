import { Link } from 'react-router-dom'
import { Card, Badge } from '../ui/Card'
import { formatDate } from '../../lib/format'
import Button from '../ui/Button'
import './cards.css'

export default function EventCard({ event, past = false }) {
  const href = `/events/${event.slug}`
  return (
    <Card className="event-card">
      {/* Media and body text link to the detail page. The Register button is a
          sibling (not nested inside these links) so its ?register=1 navigation
          isn't swallowed by the card-wide link — nested <a> tags break that. */}
      <Link to={href} className="event-card__media">
        <img src={event.image} alt={event.title} className="card__media" loading="lazy" />
        <div className="event-card__cat">
          <Badge>{event.category}</Badge>
        </div>
      </Link>
      <div className="card__body">
        <Link to={href} className="event-card__link">
          <div className="event-card__meta">
            <span>{formatDate(event.date)}</span>
            {!past && event.price && <span className="event-card__price">{event.price}</span>}
            {past && event.attendance && <span>{event.attendance} attended</span>}
          </div>
          <h3 className="card__title">{event.title}</h3>
          <p className="card__text">{event.excerpt}</p>
          <span className="event-card__venue">📍 {event.venue}</span>
        </Link>
        {!past && (
          <Button to={`${href}?register=1`} block className="event-card__register">
            Register
          </Button>
        )}
      </div>
    </Card>
  )
}
