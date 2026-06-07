import { Link } from 'react-router-dom'
import Logo from './Logo'
import SocialIcon from '../SocialIcon'
import { SOCIALS } from '../../data/socials'
import './layout.css'

const COLUMNS = [
  {
    title: 'Explore',
    links: [
      { to: '/about', label: 'About Us' },
      { to: '/events', label: 'Events' },
      { to: '/gallery', label: 'Gallery' },
      { to: '/blog', label: 'Blog / News' },
    ],
  },
  {
    title: 'Community',
    links: [
      { to: '/creators', label: 'Creator Hub' },
      { to: '/cosplayers', label: 'Cosplayer Hub' },
      { to: '/socials', label: 'Socials' },
      { to: '/store', label: 'Store' },
    ],
  },
  {
    title: 'Get Involved',
    links: [
      { to: '/socials', label: 'Join PAC' },
      { to: '/contact#volunteer', label: 'Volunteer' },
      { to: '/contact#partner', label: 'Become a Partner' },
      { to: '/faq', label: 'FAQs' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <Logo size="md" />
          <p className="footer__tagline">Where anime fans become family. Pune&apos;s ultimate anime community.</p>
          <div className="footer__socials">
            {SOCIALS.map((s) => (
              <a
                key={s.name}
                href={s.url}
                target="_blank"
                rel="noreferrer"
                className="footer__social"
                aria-label={s.name}
                title={s.name}
              >
                <SocialIcon name={s.icon} size={18} />
              </a>
            ))}
          </div>
        </div>

        {COLUMNS.map((col) => (
          <div key={col.title} className="footer__col">
            <h4 className="footer__col-title">{col.title}</h4>
            <ul>
              {col.links.map((l) => (
                <li key={l.label}>
                  <Link to={l.to} className="footer__link">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="container footer__bottom">
        <p>© {new Date().getFullYear()} Pune Anime Community. All rights reserved.</p>
        <div className="footer__legal">
          <Link to="/terms">Terms</Link>
          <Link to="/terms#privacy">Privacy Policy</Link>
          <Link to="/admin">Admin</Link>
        </div>
      </div>
    </footer>
  )
}
