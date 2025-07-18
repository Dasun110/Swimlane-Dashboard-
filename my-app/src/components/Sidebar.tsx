import React from 'react'
import { 
  LayoutDashboard, 
  Folder, 
  MessageCircle, 
  Calendar, 
  Users, 
  HelpCircle, 
  LogOut,
  ChevronDown,
  Plus
} from 'lucide-react'
import { useBoardStore } from '../lib/store'

export function Sidebar() {
  const { setSidebarOpen } = useBoardStore()

  const handleNavClick = () => {
    if (window.innerWidth < 768) {
      setSidebarOpen(false)
    }
  }

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col h-full">
      {/* Logo */}
      <div className="p-4 border-b border-gray-200 flex-shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
            <div className="w-4 h-4 bg-white rounded-sm"></div>
          </div>
          <span className="text-lg font-semibold">Board App</span>
        </div>
      </div>

      {/* User Profile */}
      <div className="p-4 border-b border-gray-200 flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center">
            <span className="text-white text-sm">U</span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1">
              <span className="text-sm font-medium truncate">Root folder</span>
              <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0" />
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-2">
          <NavItem 
            icon={LayoutDashboard} 
            label="Dashboard" 
            onClick={handleNavClick}
          />
          <NavItem 
            icon={Folder} 
            label="Boards" 
            active
            onClick={handleNavClick}
          >
            <div className="ml-8 mt-2 space-y-1">
              <SubNavItem label="Create routes" onClick={handleNavClick} />
              <SubNavItem label="Development React App" onClick={handleNavClick} />
              <SubNavItem label="Sport Xi Project" active onClick={handleNavClick} />
              <SubNavItem label="Wordpress theme" onClick={handleNavClick} />
            </div>
          </NavItem>
          <NavItem 
            icon={MessageCircle} 
            label="Messages" 
            badge="6" 
            onClick={handleNavClick}
          />
          <NavItem 
            icon={Calendar} 
            label="Calendar" 
            onClick={handleNavClick}
          />
          <NavItem 
            icon={Users} 
            label="Team members" 
            onClick={handleNavClick}
          />
        </div>
      </nav>

      {/* Bottom Navigation */}
      <div className="p-4 border-t border-gray-200 flex-shrink-0">
        <div className="space-y-2">
          <NavItem 
            icon={HelpCircle} 
            label="Support" 
            onClick={handleNavClick}
          />
          <NavItem 
            icon={LogOut} 
            label="Logout" 
            onClick={handleNavClick}
          />
        </div>
      </div>
    </div>
  )
}

interface NavItemProps {
  icon: React.ElementType
  label: string
  active?: boolean
  badge?: string
  children?: React.ReactNode
  onClick?: () => void
}

function NavItem({ icon: Icon, label, active, badge, children, onClick }: NavItemProps) {
  return (
    <div>
      <div 
        className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-colors ${
          active ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'
        }`}
        onClick={onClick}
      >
        <Icon className="w-5 h-5 flex-shrink-0" />
        <span className="flex-1 truncate">{label}</span>
        {badge && (
          <span className="bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0">
            {badge}
          </span>
        )}
      </div>
      {children}
    </div>
  )
}

function SubNavItem({ label, active, onClick }: { label: string; active?: boolean; onClick?: () => void }) {
  return (
    <div 
      className={`px-3 py-1 rounded cursor-pointer text-sm transition-colors ${
        active ? 'text-blue-600 bg-blue-50' : 'text-gray-600 hover:bg-gray-50'
      }`}
      onClick={onClick}
    >
      <span className="truncate block">{label}</span>
    </div>
  )
}