import PageHeader from '../components/PageHeader'
import Section from '../components/ui/Section'
import './pages.css'

export default function Terms() {
  return (
    <>
      <PageHeader eyebrow="Legal" title="Terms & Privacy Policy" subtitle="Last updated: May 2026" />
      <Section>
        <article className="prose">
          <h2>Terms of Use</h2>
          <p>
            By using the Pune Anime Community (PAC) website and participating in our events, you agree
            to follow our community guidelines: be respectful, inclusive and kind. Harassment,
            discrimination and harmful behaviour are not tolerated and may result in removal from the
            community and our events.
          </p>
          <p>
            Event registrations, ticket terms and refund policies are specified on each event page.
            PAC reserves the right to update event details when necessary.
          </p>

          <h2 id="privacy">Privacy Policy</h2>
          <p>
            We collect only the information you provide through our forms (such as your name, email
            and message) to respond to you and keep you updated about community activities. We never
            sell your data.
          </p>
          <p>
            You can request to access or delete your information at any time by contacting
            hello@puneanimecommunity.in. We use cookies only for essential site functionality and
            anonymous analytics.
          </p>

          <h3>Contact</h3>
          <p>
            Questions about these terms? Reach us at hello@puneanimecommunity.in.
          </p>
        </article>
      </Section>
    </>
  )
}
