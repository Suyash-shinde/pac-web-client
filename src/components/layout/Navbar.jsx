import { useState, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import Logo from './Logo'
import Button from '../ui/Button'
import { useAuth } from '../../lib/auth'
import './layout.css'

const LINKS = [
  { to: '/', label: 'Home', end: true },
  { to: '/about', label: 'About' },
  { to: '/events', label: 'Events' },
  { to: '/creators', label: 'Creators' },
  { to: '/cosplayers', label: 'Cosplayers' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/store', label: 'Store' },
  { to: '/blog', label: 'Blog' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const close = () => setOpen(false)
  const handleLogout = () => {
    logout()
    close()
    navigate('/')
  }

  // Lock body scroll while mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
      <div className="nav__inner container">
        <Logo size="sm" />

        <nav className={`nav__links ${open ? 'nav__links--open' : ''}`} aria-label="Primary">
          {LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              onClick={close}
              className={({ isActive }) => `nav__link ${isActive ? 'nav__link--active' : ''}`}
            >
              {l.label}
            </NavLink>
          ))}
          <div className="nav__cta-mobile">
            {user ? (
              <>
                <Button to="/account" variant="outline" block onClick={close}>
                  My Account
                </Button>
                <Button block onClick={handleLogout}>
                  Log out
                </Button>
              </>
            ) : (
              <>
                <Button to="/login" variant="outline" block onClick={close}>
                  Login / Sign Up
                </Button>
                <Button to="/socials" block onClick={close}>
                  Join PAC
                </Button>
              </>
            )}
          </div>
        </nav>

        <div className="nav__actions">
          {user ? (
            <Button to="/account" size="sm" variant="outline" className="nav__join">
              {user.name?.split(' ')[0] || 'Account'}
            </Button>
          ) : (
            <Button to="/login" size="sm" variant="ghost" className="nav__join">
              Log in
            </Button>
          )}
          <Button to="/socials" size="sm" className="nav__join">
            Join PAC
          </Button>
          <button
            type="button"
            className={`nav__burger ${open ? 'nav__burger--open' : ''}`}
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
      {open && <div className="nav__backdrop" onClick={() => setOpen(false)} />}
    </header>
  )
}
