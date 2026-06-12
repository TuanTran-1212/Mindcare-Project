// src/components/common/Items.tsx
import React from "react";
// import "./ItemList.css";

interface ItemsProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  className?: string;
  columns?: 1 | 2 | 3 | 4;
  gap?: string;
  /**
   * Số hàng muốn hiển thị (tuỳ chọn)
   * - Không truyền: hiển thị TẤT CẢ items (bao nhiêu hàng tuỳ data)
   * - Truyền rows={2}: chỉ hiển thị (columns × rows) items đầu tiên
   *
   * Ví dụ: columns={3} rows={2} → hiển thị tối đa 6 items
   */
  rows?: number;
}

const Items = <T,>({
  items,
  renderItem,
  className = "",
  columns = 3,
  gap = "2rem",
  rows, // undefined nếu không truyền
}: ItemsProps<T>) => {
  // Nếu rows được truyền vào → cắt mảng, chỉ lấy (columns × rows) phần tử đầu
  // Nếu rows undefined       → dùng toàn bộ mảng, không cắt
  const visibleItems =
    rows !== undefined
      ? items.slice(0, columns * rows) // columns * rows = số item tối đa
      : items;

  return (
    <div
      className={`grid-list ${className}`}
      style={{
        display: "grid",

        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap: gap,
      }}
    >
      {visibleItems.map((item) => (
        <React.Fragment>{renderItem(item)}</React.Fragment>
      ))}
    </div>
  );
};

export default Items;
