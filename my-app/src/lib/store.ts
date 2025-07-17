import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface Task {
  id: string
  title: string
  description: string
  status: 'todo' | 'in_progress' | 'approved' | 'reject'
  priority: 'low' | 'medium' | 'high'
  assignees: string[]
  dueDate?: string
  comments: number
  attachments: number
  reports?: number
  category: 'research' | 'design' | 'production' | 'ux_research' | 'development'
  tags: string[]
}

export interface User {
  id: string
  name: string
  avatar: string
  initials: string
}

interface BoardStore {
  tasks: Task[]
  users: User[]
  searchQuery: string
  setSearchQuery: (query: string) => void
  moveTask: (taskId: string, newStatus: Task['status']) => void
  getFilteredTasks: () => Task[]
  getTasksByStatus: (status: Task['status']) => Task[]
}

// Mock data
const mockUsers: User[] = [
  { id: '1', name: 'Alex Johnson', avatar: '/api/placeholder/32/32', initials: 'AJ' },
  { id: '2', name: 'Sarah Wilson', avatar: '/api/placeholder/32/32', initials: 'SW' },
  { id: '3', name: 'Mike Brown', avatar: '/api/placeholder/32/32', initials: 'MB' },
  { id: '4', name: 'Emma Davis', avatar: '/api/placeholder/32/32', initials: 'ED' },
  { id: '5', name: 'John Smith', avatar: '/api/placeholder/32/32', initials: 'JS' },
]

const mockTasks: Task[] = [
  {
    id: '1',
    title: 'User interview',
    description: 'Conduct user interviews for the new feature',
    status: 'todo',
    priority: 'medium',
    assignees: ['1'],
    comments: 2,
    attachments: 0,
    category: 'research',
    tags: ['research'],
    dueDate: 'Tomorrow'
  },
  {
    id: '2',
    title: 'Design System',
    description: 'Create comprehensive design system',
    status: 'todo',
    priority: 'high',
    assignees: ['2', '3'],
    comments: 3,
    attachments: 0,
    category: 'design',
    tags: ['design'],
    reports: 2
  },
  {
    id: '3',
    title: 'Speech',
    description: 'Prepare speech for the conference',
    status: 'todo',
    priority: 'low',
    assignees: ['1', '4'],
    comments: 1,
    attachments: 3,
    category: 'production',
    tags: ['production']
  },
  {
    id: '4',
    title: 'Wireframe',
    description: 'Create wireframes for mobile app',
    status: 'todo',
    priority: 'high',
    assignees: ['2', '5'],
    comments: 1,
    attachments: 0,
    category: 'design',
    tags: ['design']
  },
  {
    id: '5',
    title: 'UI Design',
    description: 'Design user interface components',
    status: 'in_progress',
    priority: 'high',
    assignees: ['2', '3'],
    comments: 2,
    attachments: 0,
    category: 'design',
    tags: ['design'],
    dueDate: 'Tomorrow'
  },
  {
    id: '6',
    title: 'Check Clients Feedback',
    description: 'Review and analyze client feedback',
    status: 'in_progress',
    priority: 'medium',
    assignees: ['1', '4'],
    comments: 8,
    attachments: 0,
    category: 'ux_research',
    tags: ['production'],
    dueDate: '22 April, 2022'
  },
  {
    id: '7',
    title: 'Copyright',
    description: 'Handle copyright documentation',
    status: 'in_progress',
    priority: 'low',
    assignees: ['5'],
    comments: 4,
    attachments: 0,
    category: 'production',
    tags: ['production'],
    dueDate: '22 April, 2022'
  },
  {
    id: '8',
    title: 'Filter sorting',
    description: 'Implement filter and sorting functionality',
    status: 'in_progress',
    priority: 'medium',
    assignees: ['3', '4'],
    comments: 6,
    attachments: 0,
    category: 'development',
    tags: ['development']
  },
  {
    id: '9',
    title: 'Prototype',
    description: 'Create interactive prototype',
    status: 'approved',
    priority: 'medium',
    assignees: ['1', '2'],
    comments: 35,
    attachments: 243,
    category: 'research',
    tags: ['research']
  },
  {
    id: '10',
    title: 'Detail Page',
    description: 'Design detailed page layouts',
    status: 'approved',
    priority: 'high',
    assignees: ['2', '3'],
    comments: 6,
    attachments: 28,
    category: 'design',
    tags: ['design']
  },
  {
    id: '11',
    title: 'Animation preloaders',
    description: 'Create loading animations',
    status: 'approved',
    priority: 'low',
    assignees: ['4'],
    comments: 4,
    attachments: 9,
    category: 'production',
    tags: ['production']
  },
  {
    id: '12',
    title: 'Sorting category',
    description: 'Implement category sorting',
    status: 'approved',
    priority: 'medium',
    assignees: ['1', '3', '5'],
    comments: 2,
    attachments: 0,
    category: 'ux_research',
    tags: ['ux_research']
  },
  {
    id: '13',
    title: 'Group Management',
    description: 'Implement group management features',
    status: 'reject',
    priority: 'high',
    assignees: ['4'],
    comments: 329,
    attachments: 0,
    category: 'development',
    tags: ['other']
  },
  {
    id: '14',
    title: 'Design System',
    description: 'Refine design system components',
    status: 'reject',
    priority: 'high',
    assignees: ['5'],
    comments: 3,
    attachments: 0,
    category: 'design',
    tags: ['design'],
    reports: 2
  },
  {
    id: '15',
    title: 'Slider controls',
    description: 'Create slider control components',
    status: 'reject',
    priority: 'medium',
    assignees: ['2', '3'],
    comments: 6,
    attachments: 31,
    category: 'design',
    tags: ['design']
  },
  {
    id: '16',
    title: 'Slider controls',
    description: 'Create advanced slider controls',
    status: 'reject',
    priority: 'medium',
    assignees: ['1', '4'],
    comments: 2,
    attachments: 0,
    category: 'design',
    tags: ['design']
  }
]

export const useBoardStore = create<BoardStore>()(
  persist(
    (set, get) => ({
      tasks: mockTasks,
      users: mockUsers,
      searchQuery: '',
      setSearchQuery: (query: string) => set({ searchQuery: query }),
      moveTask: (taskId: string, newStatus: Task['status']) => {
        const tasks = get().tasks
        const updatedTasks = tasks.map(task => 
          task.id === taskId ? { ...task, status: newStatus } : task
        )
        set({ tasks: updatedTasks })
      },
      getFilteredTasks: () => {
        const { tasks, searchQuery } = get()
        if (!searchQuery) return tasks
        
        return tasks.filter(task => 
          task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          task.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          task.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
        )
      },
      getTasksByStatus: (status: Task['status']) => {
        const filteredTasks = get().getFilteredTasks()
        return filteredTasks.filter(task => task.status === status)
      }
    }),
    {
      name: 'board-storage',
    }
  )
)