import React from 'react'
import { Search, Plus, Bell, Settings } from 'lucide-react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { useBoardStore } from '../lib/store'

export function Header() {
  const { searchQuery, setSearchQuery } = useBoardStore()

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Create new board
          </Button>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search boards..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-64 bg-gray-50 border-gray-200"
            />
          </div>
          
          <Button variant="ghost" size="icon" className="rounded-full">
            <Settings className="w-5 h-5" />
          </Button>
          
          <Button variant="ghost" size="icon" className="rounded-full">
            <Bell className="w-5 h-5" />
          </Button>
          
          <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center">
            <span className="text-white text-sm">U</span>
          </div>
        </div>
      </div>
    </header>
  )
}