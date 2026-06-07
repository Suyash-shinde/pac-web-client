import Container from './ui/Container'
import './pageheader.css'

export default function PageHeader({ eyebrow, title, subtitle, children }) {
  return (
    <header className="page-header">
      <Container>
        <div className="page-header__inner fade-up">
          {eyebrow && <span className="eyebrow">{eyebrow}</span>}
          <h1>{title}</h1>
          {subtitle && <p className="page-header__subtitle">{subtitle}</p>}
          {children}
        </div>
      </Container>
    </header>
  )
}
