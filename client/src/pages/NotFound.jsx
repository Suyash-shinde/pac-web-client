import Section from '../components/ui/Section'
import Button from '../components/ui/Button'
import './pages.css'

export default function NotFound() {
  return (
    <Section>
      <div className="notfound">
        <p className="notfound__code">404</p>
        <h1>Page not found</h1>
        <p className="text-muted">Looks like this page wandered off into another dimension.</p>
        <div style={{ marginTop: 'var(--sp-5)', display: 'flex', gap: 'var(--sp-3)', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button to="/">Back home</Button>
          <Button to="/events" variant="ghost">Browse events</Button>
        </div>
      </div>
    </Section>
  )
}
