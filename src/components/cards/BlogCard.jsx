import { Link } from 'react-router-dom'
import { Card, Badge } from '../ui/Card'
import { formatDate } from '../../lib/format'
import './cards.css'

export default function BlogCard({ post }) {
  return (
    <Card className="blog-card">
      <Link to={`/blog/${post.slug}`} className="blog-card__link">
        <img src={post.image} alt={post.title} className="card__media" loading="lazy" />
        <div className="card__body">
          <div className="blog-card__meta">
            <Badge variant="silver">{post.category}</Badge>
            <span>{formatDate(post.date)}</span>
          </div>
          <h3 className="card__title">{post.title}</h3>
          <p className="card__text">{post.excerpt}</p>
          <span className="blog-card__author">By {post.author}</span>
        </div>
      </Link>
    </Card>
  )
}
