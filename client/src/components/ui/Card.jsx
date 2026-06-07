import './ui.css'

export function Card({ children, className = '', hover = true, ...props }) {
  return (
    <div className={`card ${hover ? 'glow-hover' : ''} ${className}`} {...props}>
      {children}
    </div>
  )
}

export function Badge({ children, variant = 'red' }) {
  return <span className={`badge ${variant === 'silver' ? 'badge--silver' : ''}`}>{children}</span>
}

export default Card
