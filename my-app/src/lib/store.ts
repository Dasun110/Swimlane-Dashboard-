import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface Task {
  id: string
  title: string
  description?: string
  status: 'todo' | 'in_progress' | 'approved' | 'reject'
  priority: 'low' | 'medium' | 'high'
  category: string
  assignees: string[]
  dueDate?: string
  comments: number
  attachments: number
  reports?: number
}

export interface User {
  id: string
  name: string
  initials: string
  avatar?: string
}

interface BoardState {
  tasks: Task[]
  users: User[]
  searchQuery: string
  sidebarOpen: boolean
  setSearchQuery: (query: string) => void
  setSidebarOpen: (open: boolean) => void
  toggleSidebar: () => void
  addTask: (task: Omit<Task, 'id'>) => void
  updateTask: (id: string, updates: Partial<Task>) => void
  deleteTask: (id: string) => void
  moveTask: (taskId: string, newStatus: Task['status']) => void
  getTasksByStatus: (status: Task['status']) => Task[]
  getFilteredTasks: () => Task[]
}

const initialTasks: Task[] = [
  {
    id: '1',
    title: 'Research',
    description: 'User research for the new feature',
    status: 'todo',
    priority: 'high',
    category: 'research',
    assignees: ['1', '2'],
    dueDate: '2024-01-15',
    comments: 3,
    attachments: 2
  },
  {
    id: '2',
    title: 'Design System',
    description: 'Create design system components',
    status: 'in_progress',
    priority: 'medium',
    category: 'design',
    assignees: ['2', '3'],
    comments: 5,
    attachments: 1,
    reports: 2
  },
  {
    id: '3',
    title: 'Production Ready',
    description: 'Prepare for production deployment',
    status: 'approved',
    priority: 'high',
    category: 'production',
    assignees: ['1', '3'],
    dueDate: '2024-01-20',
    comments: 8,
    attachments: 3
  },
  {
    id: '4',
    title: 'UX Research Phase 2',
    description: 'Second phase of user experience research',
    status: 'reject',
    priority: 'low',
    category: 'ux_research',
    assignees: ['2'],
    comments: 2,
    attachments: 0
  },
  {
    id: '5',
    title: 'Frontend Development',
    description: 'Implement frontend components',
    status: 'in_progress',
    priority: 'high',
    category: 'development',
    assignees: ['1', '2', '3'],
    dueDate: '2024-01-18',
    comments: 12,
    attachments: 4
  },
  {
    id: '6',
    title: 'Frontend Development',
    description: 'Implement frontend components',
    status: 'reject',
    priority: 'high',
    category: 'development',
    assignees: ['1', '2', '3'],
    dueDate: '2024-01-18',
    comments: 12,
    attachments: 4
  }
]

const initialUsers: User[] = [
  { id: '1', name: 'John Doe', initials: 'JD' },
  { id: '2', name: 'Jane Smith', initials: 'JS' },
  { id: '3', name: 'Mike Johnson', initials: 'MJ' },
]

export const useBoardStore = create<BoardState>()(
  persist(
    (set, get) => ({
      tasks: initialTasks,
      users: initialUsers,
      searchQuery: '',
      sidebarOpen: false,
      setSearchQuery: (query) => set({ searchQuery: query }),
      setSidebarOpen: (open) => set({ sidebarOpen: open }),
      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
      addTask: (task) => 
        set((state) => ({
          tasks: [...state.tasks, { ...task, id: Date.now().toString() }]
        })),
      updateTask: (id, updates) =>
        set((state) => ({
          tasks: state.tasks.map((task) => 
            task.id === id ? { ...task, ...updates } : task
          )
        })),
      deleteTask: (id) =>
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id)
        })),
      moveTask: (taskId, newStatus) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === taskId ? { ...task, status: newStatus } : task
          )
        })),
      getTasksByStatus: (status) => {
        const state = get()
        return state.getFilteredTasks().filter((task) => task.status === status)
      },
      getFilteredTasks: () => {
        const { tasks, searchQuery } = get()
        if (!searchQuery) return tasks
        
        return tasks.filter((task) =>
          task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          task.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          task.category.toLowerCase().includes(searchQuery.toLowerCase())
        )
      }
    }),
    {
      name: 'board-storage',
      partialize: (state) => ({ 
        tasks: state.tasks, 
        users: state.users,
        searchQuery: state.searchQuery 
      }),
    }
  )
)