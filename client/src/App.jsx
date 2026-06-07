import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import About from './pages/About'
import Events from './pages/Events'
import EventDetail from './pages/EventDetail'
import PastEvents from './pages/PastEvents'
import Creators from './pages/Creators'
import Cosplayers from './pages/Cosplayers'
import CreatorProfile from './pages/CreatorProfile'
import Gallery from './pages/Gallery'
import Store from './pages/Store'
import ProductDetail from './pages/ProductDetail'
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'
import Socials from './pages/Socials'
import Contact from './pages/Contact'
import Faq from './pages/Faq'
import Terms from './pages/Terms'
import Login from './pages/Login'
import Account from './pages/Account'
import RequireUser from './components/auth/RequireUser'
import NotFound from './pages/NotFound'
import AdminLayout from './components/admin/AdminLayout'
import AdminLogin from './pages/admin/AdminLogin'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminResource from './pages/admin/AdminResource'
import AdminSubmissions from './pages/admin/AdminSubmissions'

export default function App() {
  return (
    <Routes>
      {/* Admin (separate shell, protected inside AdminLayout) */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path=":resource" element={<AdminResource />} />
        <Route path="submissions" element={<AdminSubmissions />} />
      </Route>

      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="events" element={<Events />} />
        <Route path="events/past" element={<PastEvents />} />
        <Route path="events/:slug" element={<EventDetail />} />
        <Route path="creators" element={<Creators />} />
        <Route path="creators/:slug" element={<CreatorProfile />} />
        <Route path="cosplayers" element={<Cosplayers />} />
        <Route path="cosplayers/:slug" element={<CreatorProfile />} />
        <Route path="gallery" element={<Gallery />} />
        <Route path="store" element={<Store />} />
        <Route path="store/:slug" element={<ProductDetail />} />
        <Route path="blog" element={<Blog />} />
        <Route path="blog/:slug" element={<BlogPost />} />
        <Route path="socials" element={<Socials />} />
        <Route path="contact" element={<Contact />} />
        <Route path="login" element={<Login />} />
        <Route path="account" element={<RequireUser><Account /></RequireUser>} />
        <Route path="faq" element={<Faq />} />
        <Route path="terms" element={<Terms />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
