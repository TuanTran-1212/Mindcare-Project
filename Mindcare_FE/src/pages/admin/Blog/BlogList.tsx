import React from "react";
import DataTable from "../../../components/admin/DataTable";
import type { FieldDef, FilterDef } from "../../../components/admin/DataTable";
import { ADMIN_BLOGS } from "../../../data/Blog";

interface BlogPost extends Record<string, unknown> {
  id: string;
  title: string;
  category: string;
  author: string;
  date: string;
  views: number;
  status: string;
  content: string;
}

const CATS = [
  "Business",
  "Self-Development",
  "Education",
  "Technology",
  "Development",
  "Lifestyle",
].map((c) => ({ label: c, value: c }));

const INITIAL: BlogPost[] = ADMIN_BLOGS.map((b) => ({ ...b, content: "" }));

const FIELDS: FieldDef<BlogPost>[] = [
  {
    key: "title",
    label: "Title",
    type: "text",
    required: true,
    render: (val) => (
      <span
        className="fw-medium"
        style={{
          maxWidth: 220,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          display: "block",
        }}
      >
        {String(val)}
      </span>
    ),
  },
  {
    key: "category",
    label: "Category",
    type: "select",
    required: true,
    options: CATS,
    render: (val) => (
      <span className="badge bg-info-subtle text-info">{String(val)}</span>
    ),
  },
  { key: "author", label: "Author", type: "text", required: true },
  { key: "date", label: "Date", type: "text" },
  { key: "views", label: "Views", type: "number", width: 80, align: "right" },
  {
    key: "status",
    label: "Status",
    type: "select",
    required: true,
    options: [
      { label: "Published", value: "Published" },
      { label: "Draft", value: "Draft" },
    ],
  },
  // content: formOnly + textarea-lg (big textarea, hidden in table)
  { key: "content", label: "Content", type: "textarea-lg", formOnly: true },
];

const FILTERS: FilterDef[] = [
  { key: "search", type: "search", placeholder: "Search title, author..." },
  { key: "category", type: "select", options: CATS },
  {
    key: "status",
    type: "select",
    options: [
      { label: "Published", value: "Published" },
      { label: "Draft", value: "Draft" },
    ],
  },
];

const BlogList: React.FC = () => (
  <>
    {/* <div className="d-flex align-items-center justify-content-between mb-3">
     
    </div> */}
    <DataTable<BlogPost>
      title="Blog Posts"
      addLabel="New Post"
      initialData={INITIAL}
      fields={FIELDS}
      filters={FILTERS}
      pageSize={8}
      idKey="id"
      idPrefix="blog"
      defaultValues={() => ({
        title: "",
        category: "Business",
        author: "",
        date: "",
        views: 0,
        status: "Draft",
        content: "",
      })}
    />
  </>
);
export default BlogList;
