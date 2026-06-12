import React from "react";
import DataTable from "../../../components/admin/DataTable";
import type { FieldDef, FilterDef } from "../../../components/admin/DataTable";
import { ADMIN_TEAM } from "../../../data/TeamMember";

interface Member extends Record<string, unknown> {
  id: string;
  name: string;
  role: string;
  email: string;
  phone: string;
  joinDate: string;
  status: string;
  avatar: string
}

const INITIAL: Member[] = ADMIN_TEAM.map((m) => ({ ...m }));
const ROLES = [
  "Admin",
  "Editor",
  "Author",
  "Support",
  "Marketing",
  "Developer",
];

const FIELDS: FieldDef<Member>[] = [
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
            background: "#0d6efd20",
            color: "#0d6efd",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 700,
            fontSize: 14,
            flexShrink: 0,
          }}
        >
          
        </img>
        <span className="fw-medium">{String(val)}</span>
      </div>
    ),
  },
  {
    key: "role",
    label: "Role",
    type: "select",
    required: true,
    options: ROLES.map((r) => ({ label: r, value: r })),
    render: (val) => (
      <span className="badge bg-info-subtle text-info">{String(val)}</span>
    ),
  },
  { key: "email", label: "Email", type: "email", required: true },
  { key: "phone", label: "Phone", type: "tel" },
  // joinDate shown in table but NOT in modal form
  { key: "joinDate", label: "Join Date", tableOnly: true },
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
  { key: "search", type: "search", placeholder: "Search name, role, email..." },
  {
    key: "role",
    type: "select",
    options: ROLES.map((r) => ({ label: r, value: r })),
  },
  {
    key: "status",
    type: "select",
    options: [
      { label: "Active", value: "Active" },
      { label: "Inactive", value: "Inactive" },
    ],
  },
];

const TeamList: React.FC = () => (
  <>
    {/* <div className="d-flex align-items-center justify-content-between mb-3">
      <h4 className="mb-0">Team List</h4>
    </div> */}
    <DataTable<Member>
      title="Team"
      addLabel="Add Member"
      initialData={INITIAL}
      fields={FIELDS}
      filters={FILTERS}
      pageSize={8}
      idKey="id"
      idPrefix="team"
      defaultValues={() => ({
        name: "",
        role: "Editor",
        email: "",
        phone: "",
        joinDate: "",
        status: "Active",
      })}
    />
  </>
);
export default TeamList;
