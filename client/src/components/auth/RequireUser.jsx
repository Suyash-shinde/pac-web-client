import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../lib/auth'
import Spinner from '../ui/Spinner'
import Section from '../ui/Section'

// Gate member-only pages. Sends guests to /login, remembering where they came from.
export default function RequireUser({ children }) {
  const { user, ready } = useAuth()
  const location = useLocation()

  if (!ready) return <Section><Spinner /></Section>
  if (!user) return <Navigate to="/login" state={{ from: location.pathname }} replace />
  return children
}
