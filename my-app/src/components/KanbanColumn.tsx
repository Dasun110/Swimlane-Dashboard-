import React, { forwardRef } from 'react';
import { useDrop } from 'react-dnd';
import { Task, useBoardStore } from '../lib/store';
import { TaskCard } from './TaskCard';
import { Plus, MoreHorizontal } from 'lucide-react';

interface KanbanColumnProps {
  id: string;
  title: string;
  color: string;
  tasks: Task[];
}

const KanbanColumn = forwardRef<HTMLDivElement, KanbanColumnProps>(({ id, title, color, tasks }, ref) => {
  const { moveTask } = useBoardStore();

  const [{ isOver }, drop] = useDrop({
    accept: 'task',
    drop: (item: { id: string }) => {
      moveTask(item.id, id as Task['status']);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  // Combine drop ref with forwarded ref
  const dropRef = (node: HTMLDivElement | null) => {
    drop(node); 
    if (typeof ref === 'function') {
      ref(node); 
    } else if (ref) {
      (ref as React.MutableRefObject<HTMLDivElement | null>).current = node; 
    }
  };

  return (
    <div
      ref={dropRef}
      className={`min-w-[300px] rounded-lg p-4 ${
        isOver ? 'bg-blue-50 border-blue-200' : 'bg-white'
      } border border-gray-200 transition-colors`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full ${color}`}></div>
          <h3 className="font-medium text-gray-900">{title}</h3>
        </div>
        <div className="flex items-center gap-1">
          <button className="p-1 hover:bg-gray-100 rounded">
            <Plus className="w-4 h-4 text-gray-500" />
          </button>
          <button className="p-1 hover:bg-gray-100 rounded">
            <MoreHorizontal className="w-4 h-4 text-gray-500" />
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
});

KanbanColumn.displayName = 'KanbanColumn';

export { KanbanColumn };