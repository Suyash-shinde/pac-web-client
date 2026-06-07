import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import Section from '../components/ui/Section'
import Button from '../components/ui/Button'
import BlogCard from '../components/cards/BlogCard'
import SubmissionForm from '../components/SubmissionForm'
import { useApi } from '../lib/useApi'
import { useAuth } from '../lib/auth'
import { BLOG_POSTS } from '../data/content'
import './pages.css'

export default function Blog() {
  const { data: posts } = useApi('/blog', BLOG_POSTS)
  const { user } = useAuth()
  const navigate = useNavigate()
  const [writing, setWriting] = useState(false)

  const handleWrite = () => {
    if (!user) navigate('/login', { state: { from: '/blog' } })
    else setWriting(true)
  }

  return (
    <>
      <PageHeader eyebrow="Blog / News" title="Stories from the community" subtitle="Anime recommendations, event recaps, cosplay spotlights and more.">
        <div style={{ marginTop: 'var(--sp-5)' }}>
          <Button onClick={handleWrite}>Write a post</Button>
        </div>
      </PageHeader>
      <Section>
        <div className="grid grid-3">
          {posts.map((p) => (
            <BlogCard key={p.slug} post={p} />
          ))}
        </div>
      </Section>

      {writing && (
        <SubmissionForm
          kind="blog"
          onClose={() => setWriting(false)}
          onSaved={() => { setWriting(false); navigate('/account') }}
        />
      )}
    </>
  )
}
