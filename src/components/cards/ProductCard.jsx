import { Link } from 'react-router-dom'
import { Card, Badge } from '../ui/Card'
import './cards.css'

export default function ProductCard({ product }) {
  return (
    <Card className="product-card">
      <Link to={`/store/${product.slug}`} className="product-card__link">
        <div className="product-card__media">
          <img src={product.image} alt={product.name} className="card__media" loading="lazy" />
          {product.tag && (
            <span className="product-card__tag">
              <Badge>{product.tag}</Badge>
            </span>
          )}
        </div>
        <div className="product-card__body">
          <span className="product-card__cat">{product.category}</span>
          <h3 className="product-card__name">{product.name}</h3>
          <span className="product-card__price">{product.price === '₹0' ? 'Free' : product.price}</span>
        </div>
      </Link>
    </Card>
  )
}
