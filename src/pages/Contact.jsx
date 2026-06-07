import { useState } from 'react'
import PageHeader from '../components/PageHeader'
import Section from '../components/ui/Section'
import Button from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { apiPost } from '../lib/api'
import './pages.css'

const TABS = [
  { id: 'partner', label: 'Collaboration' },
  { id: 'volunteer', label: 'Volunteer' },
]

function useFormState(type) {
  const [sent, setSent] = useState(false)
  const [busy, setBusy] = useState(false)
  const submit = async (e) => {
    e.preventDefault()
    const fd = new FormData(e.target)
    setBusy(true)
    try {
      await apiPost('/contact', {
        type,
        name: fd.get('name'),
        email: fd.get('email'),
        subject: fd.get('subject') || undefined,
        org: fd.get('org') || undefined,
        area: fd.get('area') || undefined,
        message: fd.get('message'),
      })
    } catch {
      // Non-blocking in dev when the backend isn't running.
    }
    setBusy(false)
    setSent(true)
    e.target.reset()
  }
  return { sent, busy, submit, reset: () => setSent(false) }
}

function Field({ label, children }) {
  return (
    <label className="field">
      <span>{label}</span>
      {children}
    </label>
  )
}

export default function Contact() {
  const initial = typeof window !== 'undefined' && window.location.hash
    ? window.location.hash.replace('#', '')
    : 'partner'
  const [tab, setTab] = useState(TABS.some((t) => t.id === initial) ? initial : 'partner')
  const form = useFormState(tab)

  return (
    <>
      <PageHeader eyebrow="Contact" title="Get in touch" subtitle="Join, collaborate, volunteer or just say hi — we'd love to hear from you." />

      <Section>
        <div className="two-col">
          <div>
            <div className="filter-bar">
              {TABS.map((t) => (
                <button
                  key={t.id}
                  className={`chip ${tab === t.id ? 'chip--active' : ''}`}
                  onClick={() => { setTab(t.id); form.reset() }}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {form.sent ? (
              <Card hover={false} className="tile">
                <p className="form-success">✓ Thanks! Your message has been received. We&apos;ll be in touch soon.</p>
                <Button variant="ghost" onClick={form.reset} style={{ marginTop: 'var(--sp-3)' }}>
                  Send another
                </Button>
              </Card>
            ) : (
              <form className="form" onSubmit={form.submit}>
                <Field label="Name">
                  <input type="text" name="name" required placeholder="Your name" />
                </Field>
                <Field label="Email">
                  <input type="email" name="email" required placeholder="you@example.com" />
                </Field>

                {tab === 'partner' && (
                  <Field label="Organisation / Brand">
                    <input type="text" name="org" placeholder="Company or brand name" />
                  </Field>
                )}
                {tab === 'volunteer' && (
                  <Field label="Area you'd like to help with">
                    <select name="area" defaultValue="">
                      <option value="" disabled>Select an area</option>
                      <option>Event Operations</option>
                      <option>Creative / Design</option>
                      <option>Social Media</option>
                      <option>Photography</option>
                      <option>Anything!</option>
                    </select>
                  </Field>
                )}

                <Field label="Message">
                  <textarea name="message" required placeholder="Tell us more…" />
                </Field>

                <Button type="submit" disabled={form.busy}>
                  {form.busy ? 'Sending…' : 'Send message'}
                </Button>
                <p className="form-note">We typically reply within 2–3 days.</p>
              </form>
            )}
          </div>

          <aside className="contact-aside">
            <Card hover={false} className="tile">
              <h4>Business inquiries</h4>
              <p>Event partnerships, brand activations and sponsorships.</p>
              <a href="mailto:hello@puneanimecommunity.in" className="text-accent">hello@puneanimecommunity.in</a>
            </Card>
            <Card hover={false} className="tile">
              <h4>Based in</h4>
              <p>Pune, Maharashtra, India 🇮🇳</p>
            </Card>
            <Card hover={false} className="tile">
              <h4>Prefer chat?</h4>
              <p>Join our Discord &amp; WhatsApp community for the fastest response.</p>
            </Card>
          </aside>
        </div>
      </Section>
    </>
  )
}
