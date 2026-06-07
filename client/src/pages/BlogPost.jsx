import { useParams, Link } from 'react-router-dom'
import Section from '../components/ui/Section'
import { Badge } from '../components/ui/Card'
import Spinner from '../components/ui/Spinner'
import { useApi } from '../lib/useApi'
import { getPostBySlug } from '../data/content'
import { formatDate } from '../lib/format'
import NotFound from './NotFound'
import './pages.css'

export default function BlogPost() {
  const { slug } = useParams()
  const { data: post, loading } = useApi(`/blog/${slug}`, getPostBySlug(slug))
  if (loading && !post) return <Section><Spinner /></Section>
  if (!post) return <NotFound />

  return (
    <Section>
      <article className="prose">
        <Link to="/blog" className="back-link">← All posts</Link>
        <div className="blog-card__meta" style={{ justifyContent: 'flex-start' }}>
          <Badge variant="silver">{post.category}</Badge>
          <span>{formatDate(post.date)}</span>
          <span>· By {post.author}</span>
        </div>
        <h1>{post.title}</h1>
        <img
          src={post.image}
          alt={post.title}
          style={{ width: '100%', borderRadius: 'var(--radius-lg)', margin: 'var(--sp-5) 0' }}
        />
        <p>{post.body}</p>
      </article>
    </Section>
  )
}
