import PageHeader from '../components/PageHeader'
import Section from '../components/ui/Section'
import SectionHeading from '../components/ui/SectionHeading'
import { Card } from '../components/ui/Card'
import { useApi } from '../lib/useApi'
import { TEAM, VALUES, PARTNERS } from '../data/content'
import './pages.css'

export default function About() {
  const { data: team } = useApi('/team', TEAM)
  const { data: partners } = useApi('/partners', PARTNERS)
  return (
    <>
      <PageHeader
        eyebrow="About Us"
        title="The story of Pune Anime Community"
        subtitle="PAC began as a small gathering of anime fans and evolved into one of Pune's most active anime communities."
      />

      <Section>
        <div className="two-col">
          <div>
            <span className="eyebrow">Our Story</span>
            <h2>From a handful of fans to a family</h2>
            <p>
              What started as a few friends meeting to talk about their favourite shows has grown
              into a vibrant community spanning meetups, conventions, workshops and online events.
              We exist to make sure no anime fan in Pune ever has to fandom alone.
            </p>
            <p>
              Today PAC connects thousands of members across the city and India — cosplayers,
              artists, gamers, musicians and everyday fans who simply love anime.
            </p>
          </div>
          <div className="grid grid-2">
            <Card hover={false} className="tile">
              <h4>Our Mission</h4>
              <p>To create a welcoming space where anime lovers can connect, create and celebrate fandom together.</p>
            </Card>
            <Card hover={false} className="tile">
              <h4>Our Vision</h4>
              <p>To become India&apos;s most creative and impactful anime community.</p>
            </Card>
          </div>
        </div>
      </Section>

      <Section className="section--alt">
        <SectionHeading center eyebrow="Our Values" title="What we stand for" />
        <div className="grid grid-3">
          {VALUES.map((v) => (
            <Card hover={false} key={v.title} className="tile">
              <h4>{v.title}</h4>
              <p>{v.text}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeading center eyebrow="The People" title="Meet the team" />
        <div className="grid grid-4">
          {team.map((m) => (
            <Card key={m.name} className="team-card">
              <img src={m.avatar} alt={m.name} className="team-card__avatar" loading="lazy" />
              <h4>{m.name}</h4>
              <span className="team-card__role">{m.role}</span>
              <span className="team-card__group">{m.group}</span>
            </Card>
          ))}
        </div>
      </Section>

      <Section className="section--alt">
        <SectionHeading center eyebrow="Collaborators" title="Partners & sponsors" />
        <div className="partners">
          {partners.map((p) => (
            <div key={p} className="partners__item">{p}</div>
          ))}
        </div>
      </Section>
    </>
  )
}
