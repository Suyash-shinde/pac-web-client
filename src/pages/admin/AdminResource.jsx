import { useEffect, useState, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { apiGet, apiPost, apiPut, apiDelete } from '../../lib/api'
import { RESOURCES } from '../../lib/adminConfig'
import Button from '../../components/ui/Button'
import Spinner from '../../components/ui/Spinner'
import '../../components/admin/admin.css'

// ---- value helpers for input types ----
const toInputValue = (field, raw) => {
  if (field.type === 'signupfields') {
    if (Array.isArray(raw)) return raw
    if (typeof raw === 'string' && raw) {
      try { const v = JSON.parse(raw); return Array.isArray(v) ? v : [] } catch { return [] }
    }
    return []
  }
  if (raw == null) return field.type === 'checkbox' ? false : ''
  if (field.type === 'datetime-local') return String(raw).slice(0, 16)
  if (field.type === 'date') return String(raw).slice(0, 10)
  if (field.type === 'checkbox') return Boolean(Number(raw))
  return raw
}

const toPayload = (fields, form) => {
  const out = {}
  for (const f of fields) {
    let v = form[f.name]
    if (f.type === 'signupfields') v = cleanSignupFields(v)
    else if (f.type === 'checkbox') v = v ? 1 : 0
    else if (f.type === 'datetime-local') v = v ? v.replace('T', ' ') + ':00' : null
    else if (f.type === 'number') v = v === '' || v == null ? null : Number(v)
    else if (v === '') v = null
    out[f.name] = v
  }
  return out
}

// Drop unlabeled rows and empty option entries before saving.
const cleanSignupFields = (v) =>
  (Array.isArray(v) ? v : [])
    .filter((f) => f && String(f.label || '').trim())
    .map((f) => ({
      ...f,
      label: f.label.trim(),
      options: f.type === 'select' ? (f.options || []).map((o) => o.trim()).filter(Boolean) : undefined,
    }))

// The field types an admin can add to an event's sign-up modal.
const SIGNUP_FIELD_TYPES = ['text', 'email', 'tel', 'number', 'textarea', 'select', 'checkbox']
const newSignupField = () => ({
  key: `f_${Math.random().toString(36).slice(2, 8)}`,
  label: '',
  type: 'text',
  required: false,
  options: [],
})

// Editor for an event's extra registration fields (name/email/phone are fixed).
function SignupFieldsEditor({ value, onChange }) {
  const rows = Array.isArray(value) ? value : []
  const update = (i, patch) => onChange(rows.map((r, j) => (j === i ? { ...r, ...patch } : r)))
  const remove = (i) => onChange(rows.filter((_, j) => j !== i))
  const add = () => onChange([...rows, newSignupField()])

  return (
    <div className="signup-fields">
      {rows.length === 0 && (
        <p className="text-muted signup-fields__empty">No extra fields — only name, email and phone are collected.</p>
      )}
      {rows.map((f, i) => (
        <div key={f.key || i} className="signup-fields__row">
          <input
            className="signup-fields__label"
            placeholder="Field label (e.g. T-shirt size)"
            value={f.label}
            onChange={(e) => update(i, { label: e.target.value })}
          />
          <select value={f.type} onChange={(e) => update(i, { type: e.target.value })}>
            {SIGNUP_FIELD_TYPES.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
          {f.type === 'select' && (
            <input
              className="signup-fields__options"
              placeholder="Options, comma-separated"
              value={(f.options || []).join(', ')}
              onChange={(e) => update(i, { options: e.target.value.split(',').map((o) => o.trim()) })}
            />
          )}
          <label className="signup-fields__req">
            <input type="checkbox" checked={!!f.required} onChange={(e) => update(i, { required: e.target.checked })} />
            <span>Required</span>
          </label>
          <button type="button" className="admin-link admin-link--danger" onClick={() => remove(i)}>Remove</button>
        </div>
      ))}
      <button type="button" className="admin-link" onClick={add}>+ Add field</button>
    </div>
  )
}

const displayCell = (col, value) => {
  if (value == null) return '—'
  if (col.type === 'datetime') return new Date(value).toLocaleString('en-IN')
  if (col.type === 'date') return new Date(value).toLocaleDateString('en-IN')
  return String(value)
}

function buildInitial(fields, row) {
  const init = {}
  for (const f of fields) init[f.name] = toInputValue(f, row ? row[f.name] : null)
  return init
}

export default function AdminResource() {
  const { resource } = useParams()
  const config = RESOURCES[resource]

  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(null) // null = closed, {} = new, row = edit
  const [form, setForm] = useState({})
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)
  const [statusFilter, setStatusFilter] = useState('all') // all | pending | approved
  const [viewingRegs, setViewingRegs] = useState(null) // event row whose registrations we're viewing
  const [regs, setRegs] = useState([])
  const [regsLoading, setRegsLoading] = useState(false)

  // Plain fetch helper (no setState) — safe to call from the effect.
  const fetchRows = useCallback(() => apiGet(`/admin/${resource}`), [resource])

  // Refresh used by event handlers (save/delete).
  const reload = async () => {
    try {
      setRows(await fetchRows())
      setError('')
    } catch (e) {
      setError(e.message)
    }
  }

  useEffect(() => {
    let active = true
    fetchRows()
      .then((data) => {
        if (!active) return
        setRows(data)
        setError('')
      })
      .catch((e) => active && setError(e.message))
      .finally(() => active && setLoading(false))
    return () => {
      active = false
    }
  }, [fetchRows])

  if (!config) return <div className="admin-page"><p className="admin-error">Unknown resource.</p></div>

  const openNew = () => {
    setForm(buildInitial(config.fields, null))
    setEditing({})
    setError('')
  }
  const openEdit = (row) => {
    setForm(buildInitial(config.fields, row))
    setEditing(row)
    setError('')
  }
  const close = () => setEditing(null)

  const setField = (name, value) => setForm((f) => ({ ...f, [name]: value }))

  const save = async (e) => {
    e.preventDefault()
    setSaving(true)
    setError('')
    try {
      const payload = toPayload(config.fields, form)
      if (editing.id) await apiPut(`/admin/${resource}/${editing.id}`, payload)
      else await apiPost(`/admin/${resource}`, payload)
      close()
      await reload()
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  const remove = async (row) => {
    if (!window.confirm(`Delete "${row.title || row.name || row.slug}"?`)) return
    try {
      await apiDelete(`/admin/${resource}/${row.id}`)
      await reload()
    } catch (err) {
      setError(err.message)
    }
  }

  const approve = async (row) => {
    try {
      await apiPut(`/admin/${resource}/${row.id}`, { status: 'approved' })
      await reload()
    } catch (err) {
      setError(err.message)
    }
  }

  const openRegs = async (row) => {
    setViewingRegs(row)
    setRegsLoading(true)
    try {
      setRegs(await apiGet(`/admin/events/${row.id}/registrations`))
    } catch {
      setRegs([])
    } finally {
      setRegsLoading(false)
    }
  }

  // Extra field labels for the registrations table, from the event's config.
  const regFieldDefs = viewingRegs
    ? toInputValue({ type: 'signupfields' }, viewingRegs.signup_fields)
    : []

  const visibleRows = config.approvable && statusFilter !== 'all'
    ? rows.filter((r) => (r.status || 'approved') === statusFilter)
    : rows
  const pendingCount = config.approvable ? rows.filter((r) => r.status === 'pending').length : 0

  return (
    <div className="admin-page">
      <header className="admin-page__head">
        <h1>{config.label}</h1>
        <Button size="sm" onClick={openNew}>+ New</Button>
      </header>

      {error && !editing && <p className="admin-error">{error}</p>}

      {config.approvable && (
        <div className="filter-bar">
          {['all', 'pending', 'approved'].map((s) => (
            <button
              key={s}
              className={`chip ${statusFilter === s ? 'chip--active' : ''}`}
              onClick={() => setStatusFilter(s)}
            >
              {s[0].toUpperCase() + s.slice(1)}
              {s === 'pending' && pendingCount ? ` (${pendingCount})` : ''}
            </button>
          ))}
        </div>
      )}

      {loading ? (
        <Spinner />
      ) : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                {config.columns.map((c) => (
                  <th key={c.key}>{c.label}</th>
                ))}
                <th aria-label="Actions"></th>
              </tr>
            </thead>
            <tbody>
              {visibleRows.length === 0 && (
                <tr>
                  <td colSpan={config.columns.length + 1} className="admin-table__empty">
                    No {config.label.toLowerCase()} {statusFilter !== 'all' ? `(${statusFilter})` : 'yet'}.
                  </td>
                </tr>
              )}
              {visibleRows.map((row) => (
                <tr key={row.id}>
                  {config.columns.map((c) => (
                    <td key={c.key}>{displayCell(c, row[c.key])}</td>
                  ))}
                  <td className="admin-table__actions">
                    {config.approvable && row.status === 'pending' && (
                      <button className="admin-link" onClick={() => approve(row)}>Approve</button>
                    )}
                    {resource === 'events' && (
                      <button className="admin-link" onClick={() => openRegs(row)}>Registrations</button>
                    )}
                    <button className="admin-link" onClick={() => openEdit(row)}>Edit</button>
                    <button className="admin-link admin-link--danger" onClick={() => remove(row)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {editing && (
        <div className="admin-modal" role="dialog" aria-modal="true">
          <div className="admin-modal__backdrop" onClick={close} />
          <form className="admin-modal__card" onSubmit={save}>
            <header className="admin-modal__head">
              <h2>{editing.id ? `Edit ${config.label}` : `New ${config.label}`}</h2>
              <button type="button" className="admin-modal__close" onClick={close} aria-label="Close">×</button>
            </header>

            {error && <p className="admin-error">{error}</p>}

            <div className="admin-form-grid">
              {config.fields.map((f) => {
                // Use a div (not a label) for the sign-up editor: it contains
                // its own labels, and nested <label>s are invalid HTML.
                const Wrapper = f.type === 'signupfields' ? 'div' : 'label'
                return (
                <Wrapper key={f.name} className={`field ${f.type === 'textarea' || f.type === 'signupfields' ? 'field--full' : ''}`}>
                  <span>{f.label}{f.required && ' *'}</span>
                  {f.help && <small className="field__help">{f.help}</small>}
                  {f.type === 'signupfields' ? (
                    <SignupFieldsEditor
                      value={form[f.name]}
                      onChange={(v) => setField(f.name, v)}
                    />
                  ) : f.type === 'textarea' ? (
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
                  ) : f.type === 'checkbox' ? (
                    <input
                      type="checkbox"
                      className="admin-checkbox"
                      checked={!!form[f.name]}
                      onChange={(e) => setField(f.name, e.target.checked)}
                    />
                  ) : (
                    <input
                      type={f.type || 'text'}
                      value={form[f.name] ?? ''}
                      required={f.required}
                      onChange={(e) => setField(f.name, e.target.value)}
                    />
                  )}
                </Wrapper>
                )
              })}
            </div>

            <div className="admin-modal__actions">
              <Button type="button" variant="ghost" onClick={close}>Cancel</Button>
              <Button type="submit" disabled={saving}>{saving ? 'Saving…' : 'Save'}</Button>
            </div>
          </form>
        </div>
      )}

      {viewingRegs && (
        <div className="admin-modal" role="dialog" aria-modal="true">
          <div className="admin-modal__backdrop" onClick={() => setViewingRegs(null)} />
          <div className="admin-modal__card admin-modal__card--wide">
            <header className="admin-modal__head">
              <h2>Registrations · {viewingRegs.title}</h2>
              <button type="button" className="admin-modal__close" onClick={() => setViewingRegs(null)} aria-label="Close">×</button>
            </header>

            {regsLoading ? (
              <Spinner />
            ) : regs.length === 0 ? (
              <p className="admin-table__empty">No registrations yet.</p>
            ) : (
              <div className="admin-table-wrap">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      {regFieldDefs.map((f, i) => (
                        <th key={f.key || i}>{f.label || f.key}</th>
                      ))}
                      <th>Registered</th>
                    </tr>
                  </thead>
                  <tbody>
                    {regs.map((r) => (
                      <tr key={r.id}>
                        <td>{r.name}</td>
                        <td>{r.email}</td>
                        <td>{r.phone || '—'}</td>
                        {regFieldDefs.map((f, i) => {
                          const v = r.data?.[f.key]
                          return <td key={f.key || i}>{v === true ? '✓' : v === false || v == null || v === '' ? '—' : String(v)}</td>
                        })}
                        <td>{new Date(r.created_at).toLocaleString('en-IN')}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            <div className="admin-modal__actions">
              <Button type="button" variant="ghost" onClick={() => setViewingRegs(null)}>Close</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
