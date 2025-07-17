import React, { forwardRef } from 'react';
import { useDrag } from 'react-dnd';
import { Task, useBoardStore } from '../lib/store';
import { Badge } from './ui/badge';
import {
  MessageCircle,
  Paperclip,
  Calendar,
  AlertTriangle,
  MoreVertical,
} from 'lucide-react';

interface TaskCardProps {
  task: Task;
}

const TaskCard = forwardRef<HTMLDivElement, TaskCardProps>(({ task }, ref) => {
  const { users } = useBoardStore();

  const [{ isDragging }, drag] = useDrag({
    type: 'task',
    item: { id: task.id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const getPriorityColor = (priority: string): string => {
    switch (priority) {
      case 'high':
        return 'bg-red-500';
      case 'medium':
        return 'bg-orange-500';
      case 'low':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getCategoryColor = (category: string): string => {
    switch (category) {
      case 'research':
        return 'bg-green-100 text-green-800';
      case 'design':
        return 'bg-red-100 text-red-800';
      case 'production':
        return 'bg-blue-100 text-blue-800';
      case 'ux_research':
        return 'bg-purple-100 text-purple-800';
      case 'development':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const assignedUsers = users.filter((user) => task.assignees.includes(user.id));

  const dragRef = (node: HTMLDivElement | null) => {
    drag(node);
    if (typeof ref === 'function') {
      ref(node);
    } else if (ref) {
      (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
    }
  };

  return (
    <div
      ref={dragRef}
      className={`bg-white rounded-lg p-4 border border-gray-200 shadow-sm cursor-move ${
        isDragging ? 'opacity-50' : ''
      } hover:shadow-md transition-shadow`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${getPriorityColor(task.priority)}`}></div>
          <Badge
            className={`text-xs ${getCategoryColor(task.category)} hover:${getCategoryColor(task.category)}`}
          >
            {task.category}
          </Badge>
        </div>
        <button className="p-1 hover:bg-gray-100 rounded">
          <MoreVertical className="w-4 h-4 text-gray-400" />
        </button>
      </div>

      <h4 className="font-medium text-gray-900 mb-2">{task.title}</h4>

      <div className="flex items-center gap-2 mb-3">
        <div className="flex -space-x-1">
          {assignedUsers.map((user) => (
            <div
              key={user.id}
              className="w-6 h-6 bg-gray-400 rounded-full border-2 border-white flex items-center justify-center"
              title={user.name}
            >
              <span className="text-xs text-white">{user.initials}</span>
            </div>
          ))}
        </div>
        {task.dueDate && <span className="text-xs text-gray-500">{task.dueDate}</span>}
      </div>

      <div className="flex items-center justify-between text-sm text-gray-500">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <span className="font-medium">#{task.id}</span>
          </div>
          <div className="flex items-center gap-1">
            <MessageCircle className="w-4 h-4" />
            <span>{task.comments}</span>
          </div>
          {task.attachments > 0 && (
            <div className="flex items-center gap-1">
              <Paperclip className="w-4 h-4" />
              <span>{task.attachments}</span>
            </div>
          )}
        </div>
        {task.reports && (
          <div className="flex items-center gap-1">
            <AlertTriangle className="w-4 h-4 text-red-500" />
            <span className="text-red-500">{task.reports} Reports</span>
          </div>
        )}
      </div>

      {task.dueDate && (
        <div className="flex items-center gap-1 mt-2 text-xs text-gray-500">
          <Calendar className="w-3 h-3" />
          <span>Due: {task.dueDate}</span>
        </div>
      )}
    </div>
  );
});

TaskCard.displayName = 'TaskCard';

export { TaskCard };