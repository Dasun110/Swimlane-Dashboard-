import React from 'react'
import { useBoardStore } from '../lib/store'
import { KanbanColumn } from './KanbanColumn'

const columns = [
  { id: 'todo', title: 'To Do', color: 'bg-gray-100' },
  { id: 'in_progress', title: 'In Progress', color: 'bg-orange-100' },
  { id: 'approved', title: 'Approved', color: 'bg-green-100' },
  { id: 'reject', title: 'Reject', color: 'bg-red-100' }
] as const

export function KanbanBoard() {
  const { getTasksByStatus } = useBoardStore()

  return (
    <div className="flex-1 overflow-hidden">
      <div className="flex gap-3 md:gap-6 overflow-x-auto pb-4 md:pb-6 h-full">
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
    </div>
  )
}