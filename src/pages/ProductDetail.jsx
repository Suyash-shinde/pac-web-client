import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import Section from '../components/ui/Section'
import Button from '../components/ui/Button'
import { Badge } from '../components/ui/Card'
import { useApi } from '../lib/useApi'
import { PRODUCTS } from '../data/content'
import NotFound from './NotFound'
import './pages.css'

export default function ProductDetail() {
  const { slug } = useParams()
  const { data: products } = useApi('/products', PRODUCTS)
  const product = products.find((p) => p.slug === slug)
  const [notified, setNotified] = useState(false)
  if (!product) return <NotFound />

  return (
    <Section>
      <Link to="/store" className="back-link">← Back to store</Link>
      <div className="product-detail">
        <img src={product.image} alt={product.name} className="product-detail__img" />
        <div className="product-detail__info">
          {product.tag && <Badge>{product.tag}</Badge>}
          <h1>{product.name}</h1>
          <span className="product-detail__cat">{product.category}</span>
          <p className="product-detail__price">{product.price === '₹0' ? 'Free' : product.price}</p>
          <p className="text-muted">
            A community favourite. High-quality print, soft fabric and that unmistakable PAC energy.
            Sizes S–XXL available at launch.
          </p>
          {notified ? (
            <p className="form-success">✓ We&apos;ll notify you when this drops!</p>
          ) : (
            <Button size="lg" onClick={() => setNotified(true)}>Notify me when available</Button>
          )}
          <p className="form-note">Secure checkout &amp; payments are coming in a future update.</p>
        </div>
      </div>
    </Section>
  )
}
