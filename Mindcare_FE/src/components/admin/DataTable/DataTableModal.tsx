import  { useEffect } from 'react'
import type { FieldDef } from './types'

type Mode = 'add' | 'edit' | null   // view removed

interface DataTableModalProps<T extends Record<string, unknown>> {
  mode: Mode
  title: string
  fields: FieldDef<T>[]
  form: Partial<T>
  onChange: (key: string, value: unknown) => void
  onClose: () => void
  onSave: () => void
  size?: 'md' | 'lg' | 'xl'
}

function DataTableModal<T extends Record<string, unknown>>({
  mode, title, fields, form, onChange, onClose, onSave, size = 'md',
}: DataTableModalProps<T>) {
  const show = mode !== null

  useEffect(() => {
    if (!show) return
    const h = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', h)
    return () => document.removeEventListener('keydown', h)
  }, [show, onClose])

  useEffect(() => {
    document.body.style.overflow = show ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [show])

  if (!show) return null

  // Only fields that should appear in the form
  const formFields = fields.filter(f => !f.tableOnly && f.type !== 'hidden' && !f.hideColumn)

  const maxW = size === 'xl' ? 960 : size === 'lg' ? 720 : 540

  const renderInput = (field: FieldDef<T>) => {
    const val = form[field.key] ?? ''

    switch (field.type) {
      case 'select':
        return (
          <select className="form-select" value={String(val)}
            onChange={e => onChange(field.key, e.target.value)}>
            <option value="">-- Select --</option>
            {field.options?.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        )

      case 'textarea':
        return (
          <textarea className="form-control" rows={3} value={String(val)}
            placeholder={`Enter ${field.label.toLowerCase()}`}
            onChange={e => onChange(field.key, e.target.value)} />
        )

      case 'textarea-lg':
        return (
          <textarea className="form-control" rows={8}
            style={{ resize: 'vertical', minHeight: 180 }}
            value={String(val)}
            placeholder={`Enter ${field.label.toLowerCase()}`}
            onChange={e => onChange(field.key, e.target.value)} />
        )

      case 'image':
        return (
          <>
            {val && (
              <div className="mb-2">
                <img src={String(val)} alt="preview"
                  style={{ width: 80, height: 110, objectFit: 'cover', borderRadius: 6 }} />
              </div>
            )}
            <input type="file" className="form-control" accept="image/*"
              onChange={e => {
                const file = e.target.files?.[0]
                if (file) {
                  const reader = new FileReader()
                  reader.onload = ev => onChange(field.key, ev.target?.result)
                  reader.readAsDataURL(file)
                }
              }} />
          </>
        )

      default:
        return (
          <input type={field.type ?? 'text'} className="form-control"
            placeholder={`Enter ${field.label.toLowerCase()}`}
            value={String(val)}
            onChange={e => onChange(field.key,
              field.type === 'number' ? Number(e.target.value) : e.target.value)} />
        )
    }
  }

  const modalTitle = mode === 'add' ? `Add ${title}` : `Edit ${title}`

  return (
    <>
      <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1050 }} onClick={onClose} />
      <div style={{ position: 'fixed', inset: 0, zIndex: 1055, overflowY: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
        <div style={{ background: '#fff', borderRadius: 12, width: '100%', maxWidth: maxW, maxHeight: '90vh', display: 'flex', flexDirection: 'column', boxShadow: '0 8px 32px rgba(0,0,0,0.18)' }}>
          {/* Header */}
          <div style={{ background: '#f8f9fa', padding: '1rem 1.5rem', borderBottom: '1px solid #dee2e6', borderRadius: '12px 12px 0 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h5 style={{ margin: 0, fontWeight: 600 }}>{modalTitle}</h5>
            <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 22, color: '#6c757d', padding: '0 4px', lineHeight: 1 }}>×</button>
          </div>

          {/* Body */}
          <div style={{ padding: '1.5rem', overflowY: 'auto', flex: 1 }}>
            {formFields.map(field => (
              <div className="mb-3" key={field.key}>
                <label className="form-label fw-medium">
                  {field.label}
                  {field.required && <span className="text-danger ms-1">*</span>}
                </label>
                {renderInput(field)}
              </div>
            ))}
          </div>

          {/* Footer */}
          <div style={{ padding: '1rem 1.5rem', borderTop: '1px solid #dee2e6', display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
            <button className="btn btn-light" onClick={onClose}>Close</button>
            <button className="btn btn-success" onClick={onSave}>
              <i className="fas fa-check me-1"></i>
              {mode === 'add' ? `Add ${title}` : `Update ${title}`}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default DataTableModal
