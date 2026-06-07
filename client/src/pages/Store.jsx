import { useState } from 'react'
import PageHeader from '../components/PageHeader'
import Section from '../components/ui/Section'
import ProductCard from '../components/cards/ProductCard'
import { useApi } from '../lib/useApi'
import { PRODUCTS, PRODUCT_CATEGORIES } from '../data/content'
import './pages.css'

export default function Store() {
  const [cat, setCat] = useState('All')
  const { data: products } = useApi('/products', PRODUCTS)
  const filtered = products.filter((p) => cat === 'All' || p.category === cat)

  return (
    <>
      <PageHeader
        eyebrow="PAC Store"
        title="Official merch & drops"
        subtitle="Wear the community. New designs and limited editions throughout the year."
      />
      <Section>
        <p className="form-note" style={{ marginBottom: 'var(--sp-5)' }}>
          🛒 Checkout is coming soon — browse the collection and use “Notify me” on any product.
        </p>
        <div className="filter-bar">
          {PRODUCT_CATEGORIES.map((c) => (
            <button key={c} className={`chip ${cat === c ? 'chip--active' : ''}`} onClick={() => setCat(c)}>
              {c}
            </button>
          ))}
        </div>
        <div className="grid grid-4">
          {filtered.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </Section>
    </>
  )
}
