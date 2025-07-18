import React from 'react'
import { useBoardStore } from '../lib/store'
import { KanbanColumn } from './KanbanColumn'
import { Plus } from 'lucide-react'

const columns = [
  { id: 'todo', title: 'To Do', color: 'bg-gray-100' },
  { id: 'in_progress', title: 'In Progress', color: 'bg-orange-100' },
  { id: 'approved', title: 'Approved', color: 'bg-green-100' },
  { id: 'reject', title: 'Reject', color: 'bg-red-100' }
] as const

export function KanbanBoard() {
  const { getTasksByStatus } = useBoardStore()

  return (
    <div className="flex gap-6 overflow-x-auto pb-6">
      {columns.map((column) => (
        <KanbanColumn
          key={column.id}
          id={column.id}
          title={column.title}
          color={column.color}
          tasks={getTasksByStatus(column.id)}
        />
      ))}
      

    </div>
  )
}