import React from "react";
import DataTable from "../../../components/admin/DataTable";
import type { FieldDef, FilterDef } from "../../../components/admin/DataTable";
import { BLOG_CATEGORIES } from "../../../data/Blog";

interface BlogCat extends Record<string, unknown> {
  id: string;
  name: string;
  postCount: number;
  status: string;
}

// remove slug from data shape entirely
const INITIAL: BlogCat[] = BLOG_CATEGORIES.map(
  ({ id, name, postCount, status }) => ({ id, name, postCount, status }),
);

const FIELDS: FieldDef<BlogCat>[] = [
  { key: "name", label: "Name", type: "text", required: true },
  {
    key: "postCount",
    label: "Posts",
    type: "number",
    width: 80,
    align: "right",
  },
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
  { key: "search", type: "search", placeholder: "Search categories..." },
  {
    key: "status",
    type: "select",
    options: [
      { label: "Active", value: "Active" },
      { label: "Inactive", value: "Inactive" },
    ],
  },
];

const BlogCategory: React.FC = () => (
  <>
    {/* <div className="d-flex align-items-center justify-content-between mb-3">
      <h4 className="mb-0">Blog Category</h4>
    </div> */}
    <DataTable<BlogCat>
      title="Blog Categories"
      addLabel="Add Category"
      initialData={INITIAL}
      fields={FIELDS}
      filters={FILTERS}
      pageSize={8}
      idKey="id"
      idPrefix="bc"
      defaultValues={() => ({ name: "", postCount: 0, status: "Active" })}
    />
  </>
);
export default BlogCategory;
