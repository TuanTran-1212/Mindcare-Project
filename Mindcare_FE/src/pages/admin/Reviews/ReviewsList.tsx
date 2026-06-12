
import DataTable from '../../../components/admin/DataTable'
import type { FieldDef, FilterDef } from '../../../components/admin/DataTable'
import { ADMIN_REVIEWS } from '../../../data/UserData'

// ── Types ──────────────────────────────────────────────────────────────────────
interface Review extends Record<string, unknown> {
  id: string
  product: string
  type: string        // Book | Course | Blog
  reviewer: string
  email: string
  rating: number
  content: string     // hidden in table
  date: string
  status: string
}

// ── Seed data ──────────────────────────────────────────────────────────────────
const INITIAL: Review[] = ADMIN_REVIEWS.map((r, i) => ({
  id: r.id,
  product: r.product,
  type: ['Book', 'Course', 'Book', 'Blog', 'Course', 'Blog'][i % 6],
  reviewer: r.reviewer,
  email: `${r.reviewer.toLowerCase().replace(/\s/g, '.')}@example.com`,
  rating: r.rating,
  content: r.comment,
  date: r.date,
  status: r.status,
}))

// ── Products / customers for selects ──────────────────────────────────────────
const PRODUCT_OPTS = [
  { label: 'Atomic Habits (Book)', value: 'Atomic Habits' },
  { label: 'Deep Work (Book)', value: 'Deep Work' },
  { label: 'Zero to One (Book)', value: 'Zero to One' },
  { label: 'React & TypeScript Masterclass (Course)', value: 'React & TypeScript Masterclass' },
  { label: 'System Design Bootcamp (Course)', value: 'System Design Bootcamp' },
  { label: 'Top 10 Books for Entrepreneurs (Blog)', value: 'Top 10 Books for Entrepreneurs' },
  { label: 'The Future of E-Learning (Blog)', value: 'The Future of E-Learning' },
]
const CUSTOMER_OPTS = [
  { label: 'Frank Hook', value: 'Frank Hook' },
  { label: 'Sarah Johnson', value: 'Sarah Johnson' },
  { label: 'Mike Chen', value: 'Mike Chen' },
  { label: 'Emily Davis', value: 'Emily Davis' },
  { label: 'James Wilson', value: 'James Wilson' },
  { label: 'Anna Martinez', value: 'Anna Martinez' },
]
const RATING_OPTS = [1,2,3,4,5].map(n => ({ label: '★'.repeat(n) + ` (${n})`, value: String(n) }))
const TYPE_OPTS   = ['Book','Course','Blog'].map(t => ({ label: t, value: t }))
const STATUS_OPTS = ['Approved','Pending','Rejected'].map(s => ({ label: s, value: s }))

// ── Star render ────────────────────────────────────────────────────────────────
const Stars = ({ n }: { n: number }) => (
  <span>
    {[1,2,3,4,5].map(i => (
      <i key={i} className={`fas fa-star ${i <= n ? 'text-warning' : 'text-muted'}`} style={{ fontSize: 12 }} />
    ))}
    <span className="ms-1 text-muted small">({n})</span>
  </span>
)

// ── Fields — column order: Product, Type, Customer, Rating, Date, Status ───────
const FIELDS: FieldDef<Review>[] = [
  // Product — column + form select
  { key: 'product', label: 'Product', type: 'select', required: true, options: PRODUCT_OPTS,
    render: (val) => <span className="fw-medium">{String(val)}</span> },

  // Type — column + form select
  { key: 'type', label: 'Type', type: 'select', required: true, options: TYPE_OPTS,
    render: (val) => {
      const cls = val === 'Book' ? 'bg-primary-subtle text-primary'
                : val === 'Course' ? 'bg-info-subtle text-info'
                : 'bg-warning-subtle text-warning'
      return <span className={`badge ${cls}`}>{String(val)}</span>
    }},

  // Customer — column shows name + email, form uses select
  { key: 'reviewer', label: 'Customer', type: 'select', required: true, options: CUSTOMER_OPTS,
    render: (val, row) => (
      <div>
        <div className="fw-medium" style={{ lineHeight: 1.2 }}>{String(val)}</div>
        <div className="text-muted" style={{ fontSize: 12 }}>{String(row.email ?? '')}</div>
      </div>
    )},

  // email — form only (auto from customer select ideally, but editable)
  { key: 'email', label: 'Customer Email', type: 'email', formOnly: true },

  // Rating — column + form select
  { key: 'rating', label: 'Rating', type: 'select', required: true,
    options: RATING_OPTS,
    render: (val) => <Stars n={Number(val)} /> },

  // content — form only (big textarea, NOT shown in table)
  { key: 'content', label: 'Review Content', type: 'textarea-lg', formOnly: true },

  // Date — column only (not in form)
  { key: 'date', label: 'Date', tableOnly: true },

  // Status — column + form select
  { key: 'status', label: 'Status', type: 'select', required: true, options: STATUS_OPTS },
]

const FILTERS: FilterDef[] = [
  { key: 'search', type: 'search', placeholder: 'Search reviewer, product...' },
  { key: 'type',   type: 'select', options: TYPE_OPTS },
  { key: 'status', type: 'select', options: STATUS_OPTS },
]

// ── Page ───────────────────────────────────────────────────────────────────────
const ReviewsList: React.FC = () => (
  <>
    {/* <div className="d-flex align-items-center justify-content-between mb-3">
      <h4 className="mb-0">Reviews List</h4>
    </div> */}
    <DataTable<Review>
      title="Reviews"
      addLabel="Add Review"
      initialData={INITIAL}
      fields={FIELDS}
      filters={FILTERS}
      pageSize={8}
      idKey="id"
      idPrefix="rev"
      defaultValues={() => ({ product: '', type: 'Book', reviewer: '', email: '', rating: 5, content: '', date: '', status: 'Pending' })}
    />
  </>
)
export default ReviewsList
