import { Link } from 'react-router-dom'
import { Card, Badge } from '../ui/Card'
import './cards.css'

export default function CreatorCard({ creator, basePath = '/creators' }) {
  return (
    <Card className="creator-card">
      <Link to={`${basePath}/${creator.slug}`} className="creator-card__link">
        <img src={creator.cover} alt="" className="creator-card__cover" loading="lazy" />
        <div className="creator-card__body">
          <img src={creator.avatar} alt={creator.name} className="creator-card__avatar" loading="lazy" />
          <h3 className="creator-card__name">{creator.name}</h3>
          <div className="creator-card__tags">
            <Badge>{creator.specialty}</Badge>
            {creator.level && <Badge variant="silver">{creator.level}</Badge>}
            {creator.commissions && (
              <Badge variant={creator.commissions === 'Open' ? 'red' : 'silver'}>
                Commissions {creator.commissions}
              </Badge>
            )}
          </div>
          <p className="creator-card__bio">{creator.bio}</p>
        </div>
      </Link>
    </Card>
  )
}
