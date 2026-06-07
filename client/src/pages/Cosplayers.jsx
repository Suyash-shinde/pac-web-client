import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import Section from '../components/ui/Section'
import SectionHeading from '../components/ui/SectionHeading'
import Button from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import CreatorCard from '../components/cards/CreatorCard'
import SubmissionForm from '../components/SubmissionForm'
import { useApi } from '../lib/useApi'
import { useAuth } from '../lib/auth'
import { COSPLAYERS } from '../data/creators'
import './pages.css'

const RESOURCES = [
  { title: 'Wig Styling', text: 'From heat-resistant fibers to gravity-defying spikes.' },
  { title: 'Makeup', text: 'Anime eyes, contouring and special-effects basics.' },
  { title: 'Armor Building', text: 'EVA foam, worbla and finishing techniques.' },
  { title: 'Budget Cosplay', text: 'Look amazing without breaking the bank.' },
]

export default function Cosplayers() {
  const [level, setLevel] = useState('All')
  const [joining, setJoining] = useState(false)
  const levels = ['All', 'Beginner', 'Intermediate', 'Advanced']
  const { data: cosplayers } = useApi('/cosplayers', COSPLAYERS)
  const filtered = cosplayers.filter((c) => level === 'All' || c.level === level)
  const { user } = useAuth()
  const navigate = useNavigate()

  const handleJoin = () => {
    if (!user) navigate('/login', { state: { from: '/cosplayers' } })
    else setJoining(true)
  }

  return (
    <>
      <PageHeader
        eyebrow="Cosplayer Hub"
        title="Bring characters to life"
        subtitle="A dedicated space for cosplayers to showcase transformations, share resources and compete."
      >
        <div style={{ marginTop: 'var(--sp-5)' }}>
          <Button onClick={handleJoin}>Join as a cosplayer</Button>
        </div>
      </PageHeader>

      <Section>
        <SectionHeading title="Featured cosplayers" />
        <div className="filter-bar">
          {levels.map((l) => (
            <button key={l} className={`chip ${level === l ? 'chip--active' : ''}`} onClick={() => setLevel(l)}>
              {l}
            </button>
          ))}
        </div>
        <div className="grid grid-3">
          {filtered.map((c) => (
            <CreatorCard key={c.slug} creator={c} basePath="/cosplayers" />
          ))}
        </div>
      </Section>

      <Section className="section--alt">
        <SectionHeading center eyebrow="Resources" title="Cosplay tutorials & guides" />
        <div className="grid grid-4">
          {RESOURCES.map((r) => (
            <Card hover={false} key={r.title} className="tile">
              <h4>{r.title}</h4>
              <p>{r.text}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section>
        <Card hover={false} className="board">
          <div>
            <span className="eyebrow">Competitions</span>
            <h2>Cosplay competition season</h2>
            <p className="text-muted">Register, get voted on a live leaderboard, and join our winners&apos; archive.</p>
          </div>
          <Button to="/events">See contests</Button>
        </Card>
      </Section>

      {joining && (
        <SubmissionForm
          kind="cosplayer"
          onClose={() => setJoining(false)}
          onSaved={() => { setJoining(false); navigate('/account') }}
        />
      )}
    </>
  )
}
