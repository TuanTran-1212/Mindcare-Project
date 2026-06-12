
import DataTable from "../../../components/admin/DataTable";
import type { FieldDef, FilterDef } from "../../../components/admin/DataTable";
import { ADMIN_FULL_CUSTOMERS } from "../../../data/UserData";

interface Customer extends Record<string, unknown> {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: string;
  avatar: string;
}

// Remove orders, totalSpent, joinDate from the shape
const INITIAL: Customer[] = ADMIN_FULL_CUSTOMERS.map(
  ({ id, name, email, phone, status, avatar }) => ({
    id,
    name,
    email,
    phone,
    status,
    avatar,
  }),
);

const FIELDS: FieldDef<Customer>[] = [
  {
    key: "name",
    label: "Name",
    type: "text",
    required: true,
    render: (val, row) => (
      <div className="d-flex align-items-center gap-2">
        <img
          src={row.avatar}
          style={{
            width: 34,
            height: 34,
            borderRadius: "50%",
            background: "#0dcaf020",
            color: "#0dcaf0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 700,
            fontSize: 14,
            flexShrink: 0,
          }}
        ></img>
        <span className="fw-medium">{String(val)}</span>
      </div>
    ),
  },
  { key: "email", label: "Email", type: "email", required: true },
  { key: "phone", label: "Phone", type: "tel" },
  {
    key: "status",
    label: "Status",
    type: "select",
    required: true,
    options: [
      { label: "Active", value: "Active" },
      { label: "Inactive", value: "Inactive" },
    ],
  },
];

const FILTERS: FilterDef[] = [
  { key: "search", type: "search", placeholder: "Search name or email..." },
  {
    key: "status",
    type: "select",
    options: [
      { label: "Active", value: "Active" },
      { label: "Inactive", value: "Inactive" },
    ],
  },
];

const CustomerList = () => (
  <>
    {/* <div className="d-flex align-items-center justify-content-between mb-3">
      <h4 className="mb-0">Customer List</h4>
    </div> */}
    <DataTable<Customer>
      title="Customers"
      addLabel="Add Customer"
      initialData={INITIAL}
      fields={FIELDS}
      filters={FILTERS}
      pageSize={8}
      idKey="id"
      idPrefix="cust"
      defaultValues={() => ({
        name: "",
        email: "",
        phone: "",
        status: "Active",
      })}
    />
  </>
);
export default CustomerList;
