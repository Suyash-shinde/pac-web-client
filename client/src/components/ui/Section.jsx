import Container from './Container'

/**
 * Page section with vertical rhythm. `bleak` removes the inner container
 * (e.g. for full-bleed content).
 */
export default function Section({
  children,
  id,
  className = '',
  bleak = false,
  ...props
}) {
  return (
    <section id={id} className={`section ${className}`} {...props}>
      {bleak ? children : <Container>{children}</Container>}
    </section>
  )
}
