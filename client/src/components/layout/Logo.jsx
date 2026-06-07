import { Link } from 'react-router-dom'
import logo from '../../assets/logo.png'
import './layout.css'

/** PAC club logo: image badge + stacked "Pune Anime / Community" wordmark. */
export default function Logo({ size = 'md', wordmark = true }) {
  return (
    <Link to="/" className={`logo logo--${size}`} aria-label="Pune Anime Community home">
      <img src={logo} alt="Pune Anime Community" className="logo__img" />
      {wordmark && (
        <span className="logo__text">
          <span className="logo__text-top">Pune Anime</span>
          <span className="logo__text-bottom">Community</span>
        </span>
      )}
    </Link>
  )
}
