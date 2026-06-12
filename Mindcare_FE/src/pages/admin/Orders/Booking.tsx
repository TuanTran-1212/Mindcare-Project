
import DataTable from '../../../components/admin/DataTable'
import type { FieldDef, FilterDef } from '../../../components/admin/DataTable'
import { ADMIN_BOOKINGS } from '../../../data/UserData'

interface Booking extends Record<string, unknown> {
  id: string; name: string; type: string; user: string; hourSent: string; status: string
}

const INITIAL: Booking[] = ADMIN_BOOKINGS.map(b => ({
  id: b.id, name: b.name, type: b.booking, user: b.user, hourSent: b.hourSent, status: b.status,
}))

const FIELDS: FieldDef<Booking>[] = [
  { key: 'name',     label: 'Name',         type: 'text',   required: true },
  { key: 'type',     label: 'Booking Type', type: 'text',   required: true },
  { key: 'user',     label: 'User',         type: 'text',   required: true },
  { key: 'hourSent', label: 'Hour Sent',    type: 'text',   required: true },
  { key: 'status',   label: 'Status',       type: 'select', required: true,
    options: [
      { label: 'Confirmed', value: 'Confirmed' },
      { label: 'Pending',   value: 'Pending'   },
      { label: 'Cancelled', value: 'Cancelled' },
    ] },
]

const FILTERS: FilterDef[] = [
  { key: 'search', type: 'search', placeholder: 'Search bookings...' },
  { key: 'status', type: 'select', options: [
    { label: 'Confirmed', value: 'Confirmed' },
    { label: 'Pending',   value: 'Pending'   },
    { label: 'Cancelled', value: 'Cancelled' },
  ]},
]

const Booking = () => (
  <>
    {/* <div className="d-flex align-items-center justify-content-between mb-3">
      <h4 className="mb-0">Booking</h4>
    </div> */}
    <DataTable<Booking>
      title="Bookings"
      addLabel="New Booking"
      initialData={INITIAL}
      fields={FIELDS}
      filters={FILTERS}
      pageSize={8}
      idKey="id"
      idPrefix="bk"
      defaultValues={() => ({ name: '', type: '', user: '', hourSent: '', status: 'Pending' })}
    />
  </>
)
export default Booking
