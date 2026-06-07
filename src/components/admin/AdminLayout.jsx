import { NavLink, Outlet, useNavigate, Navigate } from 'react-router-dom'
import { useAuth } from '../../lib/auth'
import { RESOURCE_KEYS, RESOURCES } from '../../lib/adminConfig'
import Spinner from '../ui/Spinner'
import Button from '../ui/Button'
import './admin.css'

export default function AdminLayout() {
  const { user, ready, logout } = useAuth()
  const navigate = useNavigate()

  if (!ready) return <div className="admin-loading"><Spinner /></div>
  if (!user) return <Navigate to="/admin/login" replace />
  if (user.role !== 'admin') return <Navigate to="/" replace />

  const handleLogout = () => {
    logout()
    navigate('/admin/login')
  }

  const link = ({ isActive }) => `admin-nav__link ${isActive ? 'admin-nav__link--active' : ''}`

  return (
    <div className="admin">
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <span className="admin-brand__mark">PAC</span>
          <span>Admin</span>
        </div>
        <nav className="admin-nav">
          <NavLink to="/admin" end className={link}>Dashboard</NavLink>
          {RESOURCE_KEYS.map((k) => (
            <NavLink key={k} to={`/admin/${k}`} className={link}>
              {RESOURCES[k].label}
            </NavLink>
          ))}
          <NavLink to="/admin/submissions" className={link}>Submissions</NavLink>
        </nav>
        <div className="admin-sidebar__footer">
          <span className="admin-user">{user.name}</span>
          <Button variant="ghost" size="sm" onClick={handleLogout}>Log out</Button>
          <a href="/" className="admin-back">← View site</a>
        </div>
      </aside>
      <main className="admin-main">
        <Outlet />
      </main>
    </div>
  )
}
