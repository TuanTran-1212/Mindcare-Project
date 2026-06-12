import type { ReactNode } from 'react'

export type FieldType =
  | 'text' | 'number' | 'email' | 'tel'
  | 'textarea' | 'textarea-lg'   // textarea-lg = bigger rows for content fields
  | 'select' | 'image' | 'badge' | 'hidden'

export interface SelectOption { label: string; value: string }

export interface FieldDef<T extends Record<string, unknown>> {
  key: keyof T & string
  label: string
  type?: FieldType
  options?: SelectOption[]
  required?: boolean
  /** show in table only, hidden in modal form */
  tableOnly?: boolean
  /** show in modal form only, hidden in table */
  formOnly?: boolean
  align?: 'left' | 'right' | 'center'
  render?: (value: unknown, row: T) => ReactNode
  width?: string | number
  /** hide this column in table but keep in form — alias for formOnly */
  hideColumn?: boolean
}

export interface FilterDef {
  key: string
  placeholder?: string
  type: 'search' | 'select'
  options?: SelectOption[]
}

export interface DataTableProps<T extends Record<string, unknown>> {
  title: string
  addLabel?: string
  initialData: T[]
  fields: FieldDef<T>[]
  filters?: FilterDef[]
  pageSize?: number
  idKey?: keyof T & string
  idPrefix?: string
  defaultValues?: () => Omit<T, 'id'>
  hideAdd?: boolean
  hideBulkDelete?: boolean
  /** Custom modal rendered instead of default DataTableModal */
  customModal?: (mode: 'add' | 'edit' | null, row: T | null, onClose: () => void, onSave: (row: T) => void) => ReactNode
}
