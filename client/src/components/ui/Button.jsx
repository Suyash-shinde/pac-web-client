import { Link } from 'react-router-dom'
import './ui.css'

/**
 * Button / link button.
 * Use `to` for internal routes, `href` for external links, else a <button>.
 */
export default function Button({
  children,
  variant = 'primary',
  size,
  block = false,
  to,
  href,
  className = '',
  ...props
}) {
  const classes = [
    'btn',
    `btn--${variant}`,
    size ? `btn--${size}` : '',
    block ? 'btn--block' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {children}
      </Link>
    )
  }
  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className={classes}
        {...props}
      >
        {children}
      </a>
    )
  }
  return (
    <button className={classes} {...props}>
      {children}
    </button>
  )
}
