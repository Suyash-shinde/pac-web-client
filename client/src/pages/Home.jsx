import { Link } from 'react-router-dom'
import Section from '../components/ui/Section'
import Container from '../components/ui/Container'
import SectionHeading from '../components/ui/SectionHeading'
import Button from '../components/ui/Button'
import Logo from './../components/layout/Logo'
import { Card } from '../components/ui/Card'
import EventCard from '../components/cards/EventCard'
import CreatorCard from '../components/cards/CreatorCard'
import ProductCard from '../components/cards/ProductCard'
import Countdown from '../components/Countdown'
import { useApi } from '../lib/useApi'
import { apiPost } from '../lib/api'
import { useState } from 'react'
import { UPCOMING_EVENTS } from '../data/events'
import { CREATORS } from '../data/creators'
import { PRODUCTS, STATS, TESTIMONIALS } from '../data/content'
import { SOCIALS } from '../data/socials'
import './home.css'

export default function Home() {
  const { data: events } = useApi('/events', UPCOMING_EVENTS)
  const { data: creators } = useApi('/creators', CREATORS)
  const { data: products } = useApi('/products', PRODUCTS)
  const { data: stats } = useApi('/stats', STATS)
  const { data: testimonials } = useApi('/testimonials', TESTIMONIALS)
  const [subscribed, setSubscribed] = useState(false)

  const nextEvent = events[0]

  const handleSubscribe = async (e) => {
    e.preventDefault()
    const fd = new FormData(e.target)
    try {
      await apiPost('/newsletter', {
        name: fd.get('name'),
        email: fd.get('email'),
      })
    } catch {
      // Non-blocking: still confirm to the user in dev without a backend.
    }
    setSubscribed(true)
    e.target.reset()
  }

  return (
    <>
      {/* Hero */}
      <section className="hero">
        <Container>
          <div className="hero__inner fade-up">
            <span className="badge">Pune&apos;s Ultimate Anime Community</span>
            <h1 className="hero__title">
              Where Anime Fans <span className="text-accent">Become Family</span>
            </h1>
            <p className="hero__lead">
              From cosplay to concerts — experience anime together. PAC brings together fans,
              cosplayers, artists, gamers and creators through meetups, events and unforgettable
              experiences.
            </p>
            <div className="hero__cta">
              <Button to="/contact" size="lg">Join the Community</Button>
              <Button to="/events" variant="ghost" size="lg">Explore Events</Button>
              <Button to="/store" variant="outline" size="lg">Visit Store</Button>
            </div>
            <div className="hero__stats">
              {stats.map((s) => (
                <div key={s.label} className="hero__stat">
                  <strong>{s.value}</strong>
                  <span>{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* About preview */}
      <Section className="home-about">
        <div className="home-about__grid">
          <div>
            <span className="eyebrow">About PAC</span>
            <h2>A growing anime &amp; pop-culture community</h2>
            <p>
              Pune Anime Community (PAC) brings together fans, cosplayers, artists, gamers, creators
              and enthusiasts through meetups, screenings, conventions, workshops and unforgettable
              experiences.
            </p>
            <div className="home-about__actions">
              <Button to="/about" variant="ghost">Learn More</Button>
              <Button to="/contact">Become a Member</Button>
            </div>
          </div>
            <Logo size="xl" wordmark={false} />
        </div>
      </Section>

      {/* Upcoming events */}
      <Section className="home-events">
        <SectionHeading
          eyebrow="What's Next"
          title="Upcoming Events"
          subtitle="Meetups, cosplay walks, workshops and trips — there's always something happening."
        />
        {nextEvent && (
          <Card hover={false} className="home-events__feature">
            <div className="home-events__feature-info">
              <span className="eyebrow">Next up</span>
              <h3>{nextEvent.title}</h3>
              <p>{nextEvent.excerpt}</p>
              <Countdown date={nextEvent.date} />
            </div>
            <Button to={`/events/${nextEvent.slug}`}>Register</Button>
          </Card>
        )}
        <div className="grid grid-3">
          {events.slice(0, 3).map((e) => (
            <EventCard key={e.slug} event={e} />
          ))}
        </div>
        <div className="text-center home-events__more">
          <Button to="/events" variant="outline">View all events</Button>
        </div>
      </Section>

      {/* Featured creators */}
      <Section className="home-creators">
        <SectionHeading
          eyebrow="Spotlight"
          title="Featured Creators & Cosplayers"
          subtitle="The talented people who make our community shine."
        />
        <div className="grid grid-3">
          {creators.slice(0, 3).map((c) => (
            <CreatorCard key={c.slug} creator={c} />
          ))}
        </div>
        <div className="text-center home-events__more">
          <Button to="/creators" variant="outline">Explore Creator Hub</Button>
        </div>
      </Section>

      {/* Store preview */}
      <Section className="home-store">
        <SectionHeading
          eyebrow="PAC Store"
          title="Wear the Community"
          subtitle="Official merch, limited drops and anime-inspired apparel."
        />
        <div className="grid grid-4">
          {products.slice(0, 4).map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
        <div className="text-center home-events__more">
          <Button to="/store" variant="outline">Shop the store</Button>
        </div>
      </Section>

      {/* Testimonials */}
      <Section className="home-testimonials">
        <SectionHeading center eyebrow="Community Voices" title="What members say" />
        <div className="grid grid-3">
          {testimonials.map((t) => (
            <Card hover={false} key={t.name} className="testimonial">
              <p className="testimonial__quote">“{t.quote}”</p>
              <div className="testimonial__person">
                <img src={t.avatar} alt={t.name} />
                <div>
                  <strong>{t.name}</strong>
                  <span>{t.role}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* Social + newsletter */}
      <Section className="home-cta">
        <Card hover={false} className="home-cta__card glass">
          <h2>Stay in the loop</h2>
          <p>Get updates on meetups, conventions, giveaways and anime events.</p>
          {subscribed ? (
            <p className="form-success" style={{ maxWidth: 520, margin: 'var(--sp-5) auto' }}>
              ✓ You&apos;re on the list! Watch your inbox for PAC updates.
            </p>
          ) : (
            <form className="home-cta__form" onSubmit={handleSubscribe}>
              <input type="text" name="name" placeholder="Your name" aria-label="Name" required />
              <input type="email" name="email" placeholder="Email address" aria-label="Email" required />
              <Button type="submit">Subscribe</Button>
            </form>
          )}
          <div className="home-cta__socials">
            {SOCIALS.map((s) => (
              <a key={s.name} href={s.url} target="_blank" rel="noreferrer">
                {s.name}
              </a>
            ))}
          </div>
          <p className="home-cta__note">
            Prefer chat? <Link to="/socials">Join our Discord &amp; WhatsApp →</Link>
          </p>
        </Card>
      </Section>
    </>
  )
}
