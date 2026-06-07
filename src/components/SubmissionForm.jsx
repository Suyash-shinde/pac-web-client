import { useState } from 'react'
import { apiPost, apiPut } from '../lib/api'
import { useAuth } from '../lib/auth'
import Button from './ui/Button'
import './submission-form.css'

// Field configs per submission kind. `level` only applies to cosplayers.
const CREATOR_FIELDS = [
  { name: 'name', label: 'Display name', required: true },
  { name: 'specialty', label: 'Specialty (e.g. Artists, Editors)' },
  { name: 'commissions', label: 'Commissions', type: 'select', options: ['', 'Open', 'Closed'] },
  { name: 'avatar', label: 'Avatar image URL' },
  { name: 'cover', label: 'Cover image URL' },
  { name: 'bio', label: 'Bio', type: 'textarea' },
  { name: 'instagram', label: 'Instagram URL' },
  { name: 'youtube', label: 'YouTube URL' },
]

const COSPLAYER_FIELDS = [
  { name: 'name', label: 'Display name', required: true },
  { name: 'specialty', label: 'Series / specialty (e.g. Shonen)' },
  { name: 'level', label: 'Level', type: 'select', options: ['', 'Beginner', 'Intermediate', 'Advanced'] },
  { name: 'avatar', label: 'Avatar image URL' },
  { name: 'cover', label: 'Cover image URL' },
  { name: 'bio', label: 'Bio', type: 'textarea' },
  { name: 'instagram', label: 'Instagram URL' },
  { name: 'youtube', label: 'YouTube URL' },
]

const BLOG_FIELDS = [
  { name: 'title', label: 'Title', required: true },
  { name: 'category', label: 'Category' },
  { name: 'image', label: 'Cover image URL' },
  { name: 'excerpt', label: 'Short summary', type: 'textarea' },
  { name: 'body', label: 'Post body', type: 'textarea' },
]

const CONFIG = {
  creator: { label: 'Creator profile', fields: CREATOR_FIELDS, endpoint: 'creators', kind: 'creator' },
  cosplayer: { label: 'Cosplayer profile', fields: COSPLAYER_FIELDS, endpoint: 'creators', kind: 'cosplayer' },
  blog: { label: 'Blog post', fields: BLOG_FIELDS, endpoint: 'blog' },
}

// Build the initial form state, prefilling from an existing row (edit) or the
// logged-in user's profile (new) so they don't retype their details.
function buildInitial(cfg, existing, user) {
  const init = {}
  for (const f of cfg.fields) init[f.name] = ''
  if (existing) {
    for (const f of cfg.fields) {
      if (f.name === 'instagram' || f.name === 'youtube') {
        init[f.name] = existing.socials?.[f.name] || ''
      } else if (existing[f.name] != null) {
        init[f.name] = existing[f.name]
      }
    }
  } else if (cfg.endpoint === 'creators' && user?.name && !init.name) {
    init.name = user.name
  }
  return init
}

function toPayload(cfg, form) {
  if (cfg.endpoint === 'blog') {
    return { title: form.title, category: form.category, image: form.image, excerpt: form.excerpt, body: form.body }
  }
  const socials = {}
  if (form.instagram) socials.instagram = form.instagram
  if (form.youtube) socials.youtube = form.youtube
  return {
    name: form.name,
    kind: cfg.kind,
    specialty: form.specialty,
    level: form.level,
    commissions: form.commissions,
    avatar: form.avatar,
    cover: form.cover,
    bio: form.bio,
    socials,
  }
}

/**
 * Modal form for members to submit/edit a creator, cosplayer or blog post.
 * Submissions are created/updated as `pending` and need admin approval.
 *
 * Props: kind ('creator'|'cosplayer'|'blog'), existing (row|null), onClose, onSaved
 */
export default function SubmissionForm({ kind, existing = null, onClose, onSaved }) {
  const cfg = CONFIG[kind]
  const { user } = useAuth()
  const [form, setForm] = useState(() => buildInitial(cfg, existing, user))
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)

  const setField = (name, value) => setForm((f) => ({ ...f, [name]: value }))

  const save = async (e) => {
    e.preventDefault()
    setSaving(true)
    setError('')
    try {
      const payload = toPayload(cfg, form)
      const id = existing?.id
      if (id) await apiPut(`/me/${cfg.endpoint}/${id}`, payload)
      else await apiPost(`/me/${cfg.endpoint}`, payload)
      onSaved?.()
    } catch (err) {
      setError(err.message || 'Could not save submission')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="sub-modal" role="dialog" aria-modal="true">
      <div className="sub-modal__backdrop" onClick={onClose} />
      <form className="sub-modal__card" onSubmit={save}>
        <header className="sub-modal__head">
          <h2>{existing ? `Edit ${cfg.label}` : `Submit ${cfg.label}`}</h2>
          <button type="button" className="sub-modal__close" onClick={onClose} aria-label="Close">×</button>
        </header>

        <p className="form-note">
          Submissions are reviewed by an admin before going live. You can edit yours anytime
          (edits return it to review).
        </p>

        {error && <p className="admin-error">{error}</p>}

        <div className="form">
          {cfg.fields.map((f) => (
            <label key={f.name} className="field">
              <span>{f.label}{f.required && ' *'}</span>
              {f.type === 'textarea' ? (
                <textarea
                  value={form[f.name] ?? ''}
                  required={f.required}
                  onChange={(e) => setField(f.name, e.target.value)}
                />
              ) : f.type === 'select' ? (
                <select value={form[f.name] ?? ''} onChange={(e) => setField(f.name, e.target.value)}>
                  {f.options.map((o) => (
                    <option key={o} value={o}>{o === '' ? '—' : o}</option>
                  ))}
                </select>
              ) : (
                <input
                  type="text"
                  value={form[f.name] ?? ''}
                  required={f.required}
                  onChange={(e) => setField(f.name, e.target.value)}
                />
              )}
            </label>
          ))}
        </div>

        <div className="sub-modal__actions">
          <Button type="button" variant="ghost" onClick={onClose}>Cancel</Button>
          <Button type="submit" disabled={saving}>{saving ? 'Submitting…' : 'Submit for review'}</Button>
        </div>
      </form>
    </div>
  )
}
