import React, { useState, useMemo, useCallback } from "react";
import type { DataTableProps, FieldDef } from "./types";
import DataTableModal from "./DataTableModal";
import ConfirmModal from "../Modal/ConfirmModal";

type Mode = "add" | "edit" | null; // view removed

function DataTable<T extends Record<string, unknown>>({
  title,
  addLabel,
  initialData,
  fields,
  filters = [],
  pageSize = 8,
  idKey = "id",
  idPrefix = "row",
  defaultValues,
  hideAdd = false,
  hideBulkDelete = false,
  customModal,
}: DataTableProps<T>) {
  const [data, setData] = useState<T[]>(initialData);
  const [filterValues, setFilterValues] = useState<Record<string, string>>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [mode, setMode] = useState<Mode>(null);
  const [selected, setSelected] = useState<T | null>(null);
  const [form, setForm] = useState<Partial<T>>({});
  const [deleteTarget, setDeleteTarget] = useState<T | null>(null);
  const [checkedIds, setCheckedIds] = useState<Set<string>>(new Set());
  const [bulkDeleteOpen, setBulkDeleteOpen] = useState(false);

  // columns = fields shown in table (not formOnly, not hideColumn, not hidden type)
  const columns = useMemo(
    () =>
      fields.filter((f) => !f.formOnly && f.type !== "hidden" && !f.hideColumn),
    [fields],
  );

  // ── Filtering ──────────────────────────────────────────────────────────────
  const filtered = useMemo(
    () =>
      data.filter((row) =>
        filters.every((filter) => {
          const val = filterValues[filter.key] ?? "";
          if (!val || val === "all") return true;
          if (filter.type === "search") {
            return columns.some((col) =>
              String(row[col.key] ?? "")
                .toLowerCase()
                .includes(val.toLowerCase()),
            );
          }
          if (filter.type === "select") {
            return (
              String(row[filter.key as keyof T] ?? "").toLowerCase() ===
              val.toLowerCase()
            );
          }
          return true;
        }),
      ),
    [data, filterValues, filters, columns],
  );

  // ── Pagination ─────────────────────────────────────────────────────────────
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const safePage = Math.min(currentPage, totalPages);
  const pageStart = (safePage - 1) * pageSize;
  const pageEnd = pageStart + pageSize;
  const pageData = filtered.slice(pageStart, pageEnd);

  const showingText =
    filtered.length === 0
      ? "Showing 0 to 0 of 0 entries"
      : `Showing ${pageStart + 1} to ${Math.min(pageEnd, filtered.length)} of ${filtered.length} entries`;

  // ── Form helpers ──────────────────────────────────────────────────────────
  const buildEmpty = useCallback((): Partial<T> => {
    if (defaultValues) return defaultValues() as Partial<T>;
    const empty: Partial<T> = {};
    fields.forEach((f) => {
      (empty as Record<string, unknown>)[f.key] = f.type === "number" ? 0 : "";
    });
    return empty;
  }, [fields, defaultValues]);

  const rowToForm = (row: T): Partial<T> => {
    const f: Partial<T> = {};
    fields.forEach((field) => {
      (f as Record<string, unknown>)[field.key] = row[field.key];
    });
    return f;
  };

  // ── CRUD ───────────────────────────────────────────────────────────────────
  const openAdd = () => {
    setForm(buildEmpty());
    setMode("add");
  };
  const openEdit = (row: T) => {
    setSelected(row);
    setForm(rowToForm(row));
    setMode("edit");
  };
  const closeModal = () => {
    setMode(null);
    setSelected(null);
  };

  const handleFormChange = (key: string, value: unknown) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSave = () => {
    const missing = fields
      .filter((f) => f.required && !f.tableOnly && f.type !== "hidden")
      .find((f) => !String(form[f.key] ?? "").trim());
    if (missing) {
      alert(`"${missing.label}" is required`);
      return;
    }

    if (mode === "add") {
      setData((prev) => [
        { ...form, [idKey]: idPrefix + Date.now() } as T,
        ...prev,
      ]);
    } else if (mode === "edit" && selected) {
      setData((prev) =>
        prev.map((r) =>
          r[idKey] === selected[idKey] ? ({ ...selected, ...form } as T) : r,
        ),
      );
    }
    closeModal();
    setCurrentPage(1);
  };

  // Handle save from customModal
  const handleCustomSave = (row: T) => {
    if (mode === "add") {
      setData((prev) => [row, ...prev]);
    } else if (mode === "edit" && selected) {
      setData((prev) =>
        prev.map((r) => (r[idKey] === selected[idKey] ? row : r)),
      );
    }
    closeModal();
    setCurrentPage(1);
  };

  const handleDelete = (row: T) => setDeleteTarget(row);
  const confirmDelete = () => {
    if (deleteTarget) {
      setData((prev) => prev.filter((r) => r[idKey] !== deleteTarget[idKey]));
      setCheckedIds((prev) => {
        const s = new Set(prev);
        s.delete(String(deleteTarget[idKey]));
        return s;
      });
    }
    setDeleteTarget(null);
  };

  // ── Checkbox ───────────────────────────────────────────────────────────────
  const allPageIds = pageData.map((r) => String(r[idKey]));
  const allChecked =
    allPageIds.length > 0 && allPageIds.every((id) => checkedIds.has(id));
  const someChecked = allPageIds.some((id) => checkedIds.has(id));
  const toggleAll = () =>
    setCheckedIds((prev) => {
      const s = new Set(prev);
      if (allChecked) allPageIds.forEach((id) => s.delete(id));
      else allPageIds.forEach((id) => s.add(id));
      return s;
    });
  const toggleOne = (id: string) =>
    setCheckedIds((prev) => {
      const s = new Set(prev);

      // Change the ternary to a standard if-else statement
      if (s.has(id)) {
        s.delete(id);
      } else {
        s.add(id);
      }

      return s;
    });
  const confirmBulkDelete = () => {
    setData((prev) => prev.filter((r) => !checkedIds.has(String(r[idKey]))));
    setCheckedIds(new Set());
    setBulkDeleteOpen(false);
  };

  // ── Cell renderer ──────────────────────────────────────────────────────────
  const renderCell = (field: FieldDef<T>, row: T) => {
    const val = row[field.key];
    if (field.render) return field.render(val, row);

    if (field.type === "image") {
      return val ? (
        <img
          src={String(val)}
          alt=""
          style={{ width: 56, height: 80, objectFit: "cover", borderRadius: 4 }}
        />
      ) : (
        <div
          style={{
            width: 56,
            height: 80,
            background: "#f0f0f0",
            borderRadius: 4,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <i className="fas fa-image text-muted" />
        </div>
      );
    }

    if (field.type === "badge") {
      if (typeof val === "object" && val !== null && "label" in val) {
        const v = val as unknown as { label: string; className: string };
        return <span className={`badge ${v.className}`}>{v.label}</span>;
      }
      const s = String(val);
      const cls = /published|active|delivered|approved|confirmed/i.test(s)
        ? "bg-success-subtle text-success"
        : /draft|inactive|pending/i.test(s)
          ? "bg-warning-subtle text-warning"
          : /cancelled|rejected/i.test(s)
            ? "bg-danger-subtle text-danger"
            : "bg-info-subtle text-info";
      return <span className={`badge ${cls}`}>{s}</span>;
    }

    if (field.type === "number")
      return typeof val === "number" ? val.toLocaleString() : String(val);
    return String(val ?? "");
  };

  // ── Pagination ─────────────────────────────────────────────────────────────
  const renderPagination = () => {
    if (totalPages <= 1) return null;
    return (
      <ul className="pagination pagination-sm mb-0">
        <li className={`page-item${safePage <= 1 ? " disabled" : ""}`}>
          <button
            className="page-link"
            onClick={() => setCurrentPage((p) => p - 1)}
          >
            «
          </button>
        </li>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
          <li key={p} className={`page-item${p === safePage ? " active" : ""}`}>
            <button className="page-link" onClick={() => setCurrentPage(p)}>
              {p}
            </button>
          </li>
        ))}
        <li className={`page-item${safePage >= totalPages ? " disabled" : ""}`}>
          <button
            className="page-link"
            onClick={() => setCurrentPage((p) => p + 1)}
          >
            »
          </button>
        </li>
      </ul>
    );
  };

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <>
      <div className="row">
        <div className="col-lg-12">
          <div className="card" id={`${idPrefix}List`}>
            {/* Header */}
            <div className="card-header border-0">
              <div className="row align-items-center gy-3">
                <div className="col-sm">
                  <h5 className="card-title mb-0">{title}</h5>
                </div>
                <div className="col-sm-auto">
                  <div className="d-flex gap-2 flex-wrap">
                    {!hideAdd && (
                      <button
                        type="button"
                        className="btn btn-success"
                        onClick={openAdd}
                      >
                        <i className="fas fa-plus me-1"></i>
                        {addLabel ?? `Add ${title}`}
                      </button>
                    )}
                    {!hideBulkDelete && checkedIds.size > 0 && (
                      <button
                        className="btn btn-danger"
                        onClick={() => setBulkDeleteOpen(true)}
                      >
                        <i className="fas fa-trash me-1"></i>Delete (
                        {checkedIds.size})
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Filters */}
            {filters.length > 0 && (
              <div className="card-body border border-dashed border-end-0 border-start-0 py-3">
                <div className="row g-3">
                  {filters.map((filter) => (
                    <div
                      key={filter.key}
                      className={
                        filter.type === "search"
                          ? "col-xl-5 col-sm-6"
                          : "col-xl-2 col-sm-6"
                      }
                    >
                      {filter.type === "search" ? (
                        <div style={{ position: "relative" }}>
                          <input
                            type="text"
                            className="form-control"
                            placeholder={filter.placeholder ?? "Search..."}
                            value={filterValues[filter.key] ?? ""}
                            style={{ paddingLeft: "2.2rem" }}
                            onChange={(e) => {
                              setFilterValues((p) => ({
                                ...p,
                                [filter.key]: e.target.value,
                              }));
                              setCurrentPage(1);
                            }}
                          />
                          <i
                            className="fas fa-search"
                            style={{
                              position: "absolute",
                              left: "0.75rem",
                              top: "50%",
                              transform: "translateY(-50%)",
                              color: "#adb5bd",
                              pointerEvents: "none",
                            }}
                          />
                        </div>
                      ) : (
                        <select
                          className="form-select"
                          value={filterValues[filter.key] ?? "all"}
                          onChange={(e) => {
                            setFilterValues((p) => ({
                              ...p,
                              [filter.key]: e.target.value,
                            }));
                            setCurrentPage(1);
                          }}
                        >
                          {filter.options?.map((o) => (
                            <option key={o.value} value={o.value}>
                              {o.label}
                            </option>
                          ))}
                        </select>
                      )}
                    </div>
                  ))}
                  <div className="col-xl-2 col-sm-6 d-flex align-items-end">
                    <button
                      type="button"
                      className="btn btn-outline-primary w-100"
                      id="resetFilter"
                      onClick={() => {
                        setFilterValues({});
                        setCurrentPage(1);
                      }}
                    >
                      <i className="fas fa-refresh me-1"></i>Reset Filter
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Table */}
            <div className="card-body pt-0">
              <div className="table-responsive table-card mb-2">
                <table
                  className="table table-nowrap align-middle mb-0"
                  id={`${idPrefix}Table`}
                >
                  <thead className="text-muted table-light">
                    <tr className="text-uppercase">
                      {!hideBulkDelete && (
                        <th style={{ width: 20 }}>
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              checked={allChecked}
                              ref={(el) => {
                                if (el)
                                  el.indeterminate = someChecked && !allChecked;
                              }}
                              onChange={toggleAll}
                            />
                          </div>
                        </th>
                      )}
                      {columns.map((col) => (
                        <th
                          key={col.key}
                          style={{
                            textAlign: col.align ?? "left",
                            width: col.width,
                          }}
                        >
                          {col.label}
                        </th>
                      ))}
                      <th style={{ textAlign: "center", width: 100 }}>
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {pageData.length === 0 ? (
                      <tr>
                        <td
                          colSpan={columns.length + (hideBulkDelete ? 1 : 2)}
                          className="text-center py-5"
                        >
                          <p className="text-muted mb-0">No data found</p>
                        </td>
                      </tr>
                    ) : (
                      pageData.map((row, idx) => {
                        const rowId = String(row[idKey]);
                        const checked = checkedIds.has(rowId);
                        return (
                          <tr
                            key={rowId}
                            style={{
                              background: checked
                                ? "rgba(13,110,253,0.04)"
                                : undefined,
                            }}
                          >
                            {!hideBulkDelete && (
                              <td>
                                <div className="form-check">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    checked={checked}
                                    onChange={() => toggleOne(rowId)}
                                  />
                                </div>
                              </td>
                            )}
                            {columns.map((col) => (
                              <td
                                key={col.key}
                                style={{ textAlign: col.align ?? "left" }}
                              >
                                {col.key === idKey ? (
                                  <span className="fw-medium text-muted small">
                                    {pageStart + idx + 1}
                                  </span>
                                ) : (
                                  renderCell(col, row)
                                )}
                              </td>
                            ))}
                            <td style={{ textAlign: "center" }}>
                              <div className="d-flex gap-1 justify-content-center">
                                <button
                                  className="btn btn-sm btn-outline-success"
                                  title="Edit"
                                  onClick={() => openEdit(row)}
                                >
                                  <i className="fas fa-edit" />
                                </button>
                                <button
                                  className="btn btn-sm btn-outline-danger"
                                  title="Delete"
                                  onClick={() => handleDelete(row)}
                                >
                                  <i className="fas fa-trash" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>

              <div className="row align-items-center">
                <div className="col-sm">
                  <p className="text-muted mb-0 small">{showingText}</p>
                </div>
                <div className="col-sm-auto">{renderPagination()}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal — custom or default */}
      {customModal ? (
        customModal(mode, selected, closeModal, handleCustomSave)
      ) : (
        <DataTableModal<T>
          mode={mode}
          title={title.replace(" List", "").replace(" Collection", "").trim()}
          fields={fields}
          form={form}
          onChange={handleFormChange}
          onClose={closeModal}
          onSave={handleSave}
        />
      )}

      <ConfirmModal
        show={!!deleteTarget}
        title="Confirm Delete"
        message="Are you sure you want to delete this record? This action cannot be undone."
        onClose={() => setDeleteTarget(null)}
        onConfirm={confirmDelete}
      />

      <ConfirmModal
        show={bulkDeleteOpen}
        title="Confirm Bulk Delete"
        message={`Delete ${checkedIds.size} selected record(s)? This cannot be undone.`}
        onClose={() => setBulkDeleteOpen(false)}
        onConfirm={confirmBulkDelete}
      />
    </>
  );
}

export default DataTable;
