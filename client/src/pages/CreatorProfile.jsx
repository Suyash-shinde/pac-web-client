import { useParams, Link, useLocation } from 'react-router-dom'
import Section from '../components/ui/Section'
import Button from '../components/ui/Button'
import { Badge } from '../components/ui/Card'
import Spinner from '../components/ui/Spinner'
import { useApi } from '../lib/useApi'
import { getCreatorBySlug } from '../data/creators'
import NotFound from './NotFound'
import './pages.css'

export default function CreatorProfile() {
  const { slug } = useParams()
  const { pathname } = useLocation()
  const isCosplayer = pathname.startsWith('/cosplayers')
  const { data: person, loading } = useApi(
    `/${isCosplayer ? 'cosplayers' : 'creators'}/${slug}`,
    getCreatorBySlug(slug)
  )
  if (loading && !person) return <Section><Spinner /></Section>
  if (!person) return <NotFound />

  const backTo = isCosplayer ? '/cosplayers' : '/creators'
  const backLabel = backTo === '/cosplayers' ? 'cosplayers' : 'creators'

  return (
    <Section>
      <div className="profile">
        <Link to={backTo} className="back-link">← Back to {backLabel}</Link>
        <img src={person.cover} alt="" className="profile__cover" />
        <div className="profile__head">
          <img src={person.avatar} alt={person.name} className="profile__avatar" />
          <h1>{person.name}</h1>
          <div className="profile__tags">
            <Badge>{person.specialty}</Badge>
            {person.level && <Badge variant="silver">{person.level}</Badge>}
            {person.commissions && (
              <Badge variant={person.commissions === 'Open' ? 'red' : 'silver'}>
                Commissions {person.commissions}
              </Badge>
            )}
          </div>
          <p className="text-muted" style={{ maxWidth: 520 }}>{person.bio}</p>
          <div className="profile__socials">
            {Object.entries(person.socials || {}).map(([k, url]) => (
              <Button key={k} href={url} variant="ghost" size="sm">
                {k[0].toUpperCase() + k.slice(1)}
              </Button>
            ))}
          </div>
        </div>

        <div className="info-grid" style={{ marginTop: 'var(--sp-7)' }}>
          {[1, 2, 3, 4].map((n) => (
            <img
              key={n}
              src={`https://picsum.photos/seed/${slug}-${n}/500/500`}
              alt={`${person.name} work ${n}`}
              style={{ borderRadius: 'var(--radius)', width: '100%', aspectRatio: '1', objectFit: 'cover' }}
              loading="lazy"
            />
          ))}
        </div>
      </div>
    </Section>
  )
}
