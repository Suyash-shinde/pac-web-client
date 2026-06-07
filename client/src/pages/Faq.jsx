import { useState } from 'react'
import PageHeader from '../components/PageHeader'
import Section from '../components/ui/Section'
import { FAQS } from '../data/content'
import './pages.css'

export default function Faq() {
  const [open, setOpen] = useState(0)

  return (
    <>
      <PageHeader eyebrow="Help" title="Frequently asked questions" subtitle="Everything you need to know about PAC." />
      <Section>
        <div className="accordion">
          {FAQS.map((f, i) => (
            <div className="accordion__item" key={f.q}>
              <button
                className="accordion__q"
                onClick={() => setOpen(open === i ? -1 : i)}
                aria-expanded={open === i}
              >
                {f.q}
                <span className="accordion__icon">{open === i ? '−' : '+'}</span>
              </button>
              {open === i && <p className="accordion__a">{f.a}</p>}
            </div>
          ))}
        </div>
      </Section>
    </>
  )
}
