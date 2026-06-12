import React from 'react'

// Generic table row — renders any object as a <tr>
// Caller provides a render function for each cell

interface TableRowProps<T> {
  row: T
  columns: Array<{
    key: string
    render: (row: T) => React.ReactNode
    align?: 'left' | 'right' | 'center'
  }>
}

function TableRow<T>({ row, columns }: TableRowProps<T>) {
  return (
    <tr>
      {columns.map((col, i) => (
        <td key={i} style={{ textAlign: col.align ?? 'left' }}>
          {col.render(row)}
        </td>
      ))}
    </tr>
  )
}

export default TableRow
