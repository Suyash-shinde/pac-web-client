import './ui.css'

export default function SectionHeading({ eyebrow, title, subtitle, center = false }) {
  return (
    <div className={`section-heading ${center ? 'section-heading--center' : ''}`}>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2>{title}</h2>
      {subtitle && <p>{subtitle}</p>}
    </div>
  )
}
