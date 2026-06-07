import { useState, useEffect } from 'react'
import PageHeader from '../components/PageHeader'
import Section from '../components/ui/Section'
import { useApi } from '../lib/useApi'
import { GALLERY, GALLERY_CATEGORIES } from '../data/content'
import './pages.css'

export default function Gallery() {
  const [cat, setCat] = useState('All')
  const [active, setActive] = useState(null)
  const { data: gallery } = useApi('/gallery', GALLERY)

  const filtered = gallery.filter((g) => cat === 'All' || g.category === cat)

  // Close lightbox on Escape
  useEffect(() => {
    if (!active) return
    const onKey = (e) => e.key === 'Escape' && setActive(null)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [active])

  return (
    <>
      <PageHeader eyebrow="Gallery" title="Community moments" subtitle="Cosplay, meetups, conventions and everything in between." />
      <Section>
        <div className="filter-bar">
          {GALLERY_CATEGORIES.map((c) => (
            <button key={c} className={`chip ${cat === c ? 'chip--active' : ''}`} onClick={() => setCat(c)}>
              {c}
            </button>
          ))}
        </div>
        <div className="masonry">
          {filtered.map((img) => (
            <button key={img.id} className="masonry__item" onClick={() => setActive(img.src)} aria-label="View image">
              <img src={img.src} alt={img.category} loading="lazy" />
            </button>
          ))}
        </div>
      </Section>

      {active && (
        <div className="lightbox" onClick={() => setActive(null)} role="dialog" aria-modal="true">
          <button className="lightbox__close" aria-label="Close">×</button>
          <img src={active.replace('/600/', '/1000/')} alt="" onClick={(e) => e.stopPropagation()} />
        </div>
      )}
    </>
  )
}
