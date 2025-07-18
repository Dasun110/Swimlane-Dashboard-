import React from 'react'
import { Search, Plus, Bell, Settings, Menu, X } from 'lucide-react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { useBoardStore } from '../lib/store'

export function Header() {
  const { searchQuery, setSearchQuery, sidebarOpen, toggleSidebar } = useBoardStore()

  return (
    <header className="bg-white border-b border-gray-200 px-4 md:px-6 py-4">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden"
            onClick={toggleSidebar}
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="hidden md:flex lg:hidden"
            onClick={toggleSidebar}
          >
            <Menu className="w-5 h-5" />
          </Button>
          
          <Button className="hidden sm:flex bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg items-center gap-2">
            <Plus className="w-4 h-4" />
            <span className="hidden md:inline">Create new board</span>
            <span className="md:hidden">Create</span>
          </Button>
        </div>
        
        <div className="flex items-center gap-2 md:gap-4">
          <div className="relative flex-1 max-w-xs">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-full bg-gray-50 border-gray-200 text-sm"
            />
          </div>
          
          <div className="flex items-center gap-1 md:gap-2">
            <Button variant="ghost" size="icon" className="rounded-full">
              <Settings className="w-4 h-4 md:w-5 md:h-5" />
            </Button>
            
            <Button variant="ghost" size="icon" className="rounded-full">
              <Bell className="w-4 h-4 md:w-5 md:h-5" />
            </Button>
            
            <div className="w-7 h-7 md:w-8 md:h-8 bg-gray-800 rounded-full flex items-center justify-center">
              <span className="text-white text-xs md:text-sm">U</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="sm:hidden mt-3">
        <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg flex items-center justify-center gap-2">
          <Plus className="w-4 h-4" />
          Create new board
        </Button>
      </div>
    </header>
  )
}