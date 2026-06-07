import PageHeader from '../components/PageHeader'
import Section from '../components/ui/Section'
import SocialIcon from '../components/SocialIcon'
import { SOCIALS } from '../data/socials'
import './pages.css'

export default function Socials() {
  return (
    <>
      <PageHeader eyebrow="Socials" title="Connect with PAC" subtitle="All our community links in one place." />
      <Section>
        <div className="social-grid">
          {SOCIALS.map((s) => (
            <a key={s.name} href={s.url} target="_blank" rel="noreferrer" className="social-tile glow-hover">
              <span className="social-tile__icon"><SocialIcon name={s.icon} size={22} /></span>
              {s.name}
            </a>
          ))}
        </div>
      </Section>
    </>
  )
}
