import React from 'react'

export default function FilterBar({ columns, assignees, selectedColumn, selectedAssignee, onColumnChange, onAssigneeChange }) {
  return (
    <div className="flex space-x-4 mb-4">
      <select
        className="border px-2 py-1 rounded"
        value={selectedColumn}
        onChange={e => onColumnChange(e.target.value)}
      >
        <option value="">All Columns</option>
        {columns.map(col => (
          <option key={col} value={col}>
            {col}
          </option>
        ))}
      </select>
      <select
        className="border px-2 py-1 rounded"
        value={selectedAssignee}
        onChange={e => onAssigneeChange(e.target.value)}
      >
        <option value="">All Assignees</option>
        {assignees.map(user => (
          <option key={user.id} value={user.id}>
            {user.name}
          </option>
        ))}
      </select>
    </div>
  )
}