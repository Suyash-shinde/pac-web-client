import { useState } from 'react'
import { apiPost } from '../lib/api'
import { useAuth } from '../lib/auth'
import Button from './ui/Button'
import './submission-form.css'

// The three fixed fields every event collects. Prefilled from the user's
// profile (or a previous registration) so members don't retype them.
const FIXED_FIELDS = [
  { key: 'name', label: 'Full name', type: 'text', required: true },
  { key: 'email', label: 'Email', type: 'email', required: true },
  { key: 'phone', label: 'Phone number', type: 'tel', required: false },
]

// A custom field is stored/submitted under `data[key]`.
const customKey = (f, i) => f.key || `field_${i}`

function buildInitial(fields, user, existing) {
  const form = {
    name: existing?.name || user?.name || '',
    email: existing?.email || user?.email || '',
    phone: existing?.phone || user?.phone || '',
  }
  const data = {}
  for (let i = 0; i < fields.length; i++) {
    const key = customKey(fields[i], i)
    data[key] = existing?.data?.[key] ?? (fields[i].type === 'checkbox' ? false : '')
  }
  return { form, data }
}

/**
 * Registration / sign-up modal for an event.
 * Collects the fixed name/email/phone plus any admin-configured extra fields,
 * then POSTs to /events/:slug/register (which also records the RSVP).
 *
 * Props: event, existing (prior registration|null), onClose, onRegistered
 */
export default function RegistrationModal({ event, existing = null, onClose, onRegistered }) {
  const { user } = useAuth()
  const fields = Array.isArray(event.signupFields) ? event.signupFields : []
  const initial = buildInitial(fields, user, existing)
  const [form, setForm] = useState(initial.form)
  const [data, setData] = useState(initial.data)
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)

  const setFixed = (name, value) => setForm((f) => ({ ...f, [name]: value }))
  const setCustom = (key, value) => setData((d) => ({ ...d, [key]: value }))

  const submit = async (e) => {
    e.preventDefault()
    setSaving(true)
    setError('')
    try {
      const r = await apiPost(`/events/${event.slug}/register`, {
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim() || null,
        data,
      })
      onRegistered?.(r)
    } catch (err) {
      setError(err.message || 'Could not complete registration')
    } finally {
      setSaving(false)
    }
  }

  const renderInput = (f, key, value, onChange) => {
    if (f.type === 'textarea') {
      return <textarea value={value} required={f.required} onChange={(e) => onChange(e.target.value)} />
    }
    if (f.type === 'select') {
      return (
        <select value={value} required={f.required} onChange={(e) => onChange(e.target.value)}>
          <option value="">—</option>
          {(f.options || []).map((o) => (
            <option key={o} value={o}>{o}</option>
          ))}
        </select>
      )
    }
    if (f.type === 'checkbox') {
      return (
        <input
          type="checkbox"
          className="admin-checkbox"
          checked={!!value}
          onChange={(e) => onChange(e.target.checked)}
        />
      )
    }
    return (
      <input
        type={f.type || 'text'}
        value={value}
        required={f.required}
        onChange={(e) => onChange(e.target.value)}
      />
    )
  }

  return (
    <div className="sub-modal" role="dialog" aria-modal="true">
      <div className="sub-modal__backdrop" onClick={onClose} />
      <form className="sub-modal__card" onSubmit={submit}>
        <header className="sub-modal__head">
          <h2>{existing ? 'Update registration' : `Register for ${event.title}`}</h2>
          <button type="button" className="sub-modal__close" onClick={onClose} aria-label="Close">×</button>
        </header>

        <p className="form-note">
          Your name, email and phone are filled in from your profile — edit them here if needed.
        </p>

        {error && <p className="admin-error">{error}</p>}

        <div className="form">
          {FIXED_FIELDS.map((f) => (
            <label key={f.key} className="field">
              <span>{f.label}{f.required && ' *'}</span>
              {renderInput(f, f.key, form[f.key], (v) => setFixed(f.key, v))}
            </label>
          ))}

          {fields.map((f, i) => {
            const key = customKey(f, i)
            return (
              <label key={key} className={`field ${f.type === 'checkbox' ? 'field--inline' : ''}`}>
                <span>{f.label || key}{f.required && ' *'}</span>
                {renderInput(f, key, data[key], (v) => setCustom(key, v))}
              </label>
            )
          })}
        </div>

        <div className="sub-modal__actions">
          <Button type="button" variant="ghost" onClick={onClose}>Cancel</Button>
          <Button type="submit" disabled={saving}>
            {saving ? 'Saving…' : existing ? 'Update' : 'Complete registration'}
          </Button>
        </div>
      </form>
    </div>
  )
}
