import React from 'react';
import { useDrop, ConnectDropTarget } from 'react-dnd';
import { Task, useBoardStore } from '../lib/store';
import { TaskCard } from './TaskCard';
import { Plus, MoreHorizontal } from 'lucide-react';

interface KanbanColumnProps {
  id: string;
  title: string;
  color: string;
  tasks: Task[];
}

export function KanbanColumn({ id, title, color, tasks }: KanbanColumnProps) {
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

  return (
    <div
      ref={drop as unknown as React.RefObject<HTMLDivElement>} 
      className={`min-w-[280px] md:min-w-[300px] rounded-lg p-3 md:p-4 flex-shrink-0 ${
        isOver ? 'bg-blue-50 border-blue-200' : 'bg-white'
      } border border-gray-200 transition-colors flex flex-col max-h-full`}
    >
      <div className="flex items-center justify-between mb-3 md:mb-4 flex-shrink-0">
        <div className="flex items-center gap-2 min-w-0">
          <div className={`w-3 h-3 rounded-full ${color} flex-shrink-0`}></div>
          <h3 className="font-medium text-gray-900 text-sm md:text-base truncate">{title}</h3>
          <span className="text-xs md:text-sm text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
            {tasks.length}
          </span>
        </div>
        <div className="flex items-center gap-1 flex-shrink-0">
          <button className="p-1 hover:bg-gray-100 rounded transition-colors">
            <Plus className="w-4 h-4 text-gray-500" />
          </button>
          <button className="p-1 hover:bg-gray-100 rounded transition-colors">
            <MoreHorizontal className="w-4 h-4 text-gray-500" />
          </button>
        </div>
      </div>
      
      <div className="space-y-2 md:space-y-3 overflow-y-auto flex-1 min-h-0">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
        {tasks.length === 0 && (
          <div className="text-center py-8 text-gray-400">
            <div className="text-4xl mb-2">📋</div>
            <p className="text-sm">No tasks yet</p>
          </div>
        )}
      </div>
    </div>
  );
}