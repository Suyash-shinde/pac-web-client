import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import Section from '../components/ui/Section'
import Button from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import CreatorCard from '../components/cards/CreatorCard'
import SubmissionForm from '../components/SubmissionForm'
import { useApi } from '../lib/useApi'
import { useAuth } from '../lib/auth'
import { CREATORS, CREATOR_CATEGORIES } from '../data/creators'
import './pages.css'

export default function Creators() {
  const [cat, setCat] = useState('All')
  const [joining, setJoining] = useState(false)
  const { data: creators } = useApi('/creators', CREATORS)
  const filtered = creators.filter((c) => cat === 'All' || c.specialty === cat)
  const { user } = useAuth()
  const navigate = useNavigate()

  const handleJoin = () => {
    if (!user) navigate('/login', { state: { from: '/creators' } })
    else setJoining(true)
  }

  return (
    <>
      <PageHeader
        eyebrow="Creator Hub"
        title="Showcase your craft"
        subtitle="A platform where artists, editors, musicians and more share their work and grow with the community."
      >
        <div style={{ display: 'flex', gap: 'var(--sp-3)', marginTop: 'var(--sp-5)', flexWrap: 'wrap' }}>
          <Button onClick={handleJoin}>Submit your portfolio</Button>
          <Button to="/cosplayers" variant="ghost">Cosplayer Hub →</Button>
        </div>
      </PageHeader>

      <Section>
        <div className="filter-bar">
          {CREATOR_CATEGORIES.map((c) => (
            <button key={c} className={`chip ${cat === c ? 'chip--active' : ''}`} onClick={() => setCat(c)}>
              {c}
            </button>
          ))}
        </div>
        <div className="grid grid-3">
          {filtered.map((c) => (
            <CreatorCard key={c.slug} creator={c} basePath="/creators" />
          ))}
        </div>
      </Section>

      <Section className="section--alt">
        <Card hover={false} className="board">
          <div>
            <span className="eyebrow">Collaboration Board</span>
            <h2>Looking to collaborate?</h2>
            <p className="text-muted">
              Need a photographer, editor or cosplay group? Post a request and connect with creators
              across the community.
            </p>
          </div>
          <Button to="/contact">Post a request</Button>
        </Card>
      </Section>

      {joining && (
        <SubmissionForm
          kind="creator"
          onClose={() => setJoining(false)}
          onSaved={() => { setJoining(false); navigate('/account') }}
        />
      )}
    </>
  )
}
