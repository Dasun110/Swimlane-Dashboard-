import React from 'react'
import { Badge } from './ui/badge'
import { Calendar, Edit3, Users } from 'lucide-react'

export function ProjectHeader() {
  return (
    <div className="mb-4 md:mb-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="min-w-0 flex-1">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2">
            <h1 className="text-xl md:text-2xl font-semibold truncate">Sport Xi Project</h1>
            <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100 w-fit">
              In progress
            </Badge>
          </div>
          <p className="text-gray-600 mb-3 text-sm md:text-base">event production</p>
          
          {/* Desktop layout */}
          <div className="hidden md:flex items-center gap-6 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <span>assigned</span>
              <div className="flex -space-x-1">
                <div className="w-6 h-6 bg-gray-400 rounded-full border-2 border-white"></div>
                <div className="w-6 h-6 bg-gray-600 rounded-full border-2 border-white"></div>
                <div className="w-6 h-6 bg-gray-800 rounded-full border-2 border-white"></div>
                <div className="w-6 h-6 bg-gray-300 rounded-full border-2 border-white flex items-center justify-center">
                  <span className="text-xs">+</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <span>Manage</span>
              <Edit3 className="w-4 h-4" />
            </div>
          </div>
          
          {/* Mobile layout */}
          <div className="md:hidden space-y-2">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span>Team:</span>
              <div className="flex -space-x-1">
                <div className="w-5 h-5 bg-gray-400 rounded-full border-2 border-white"></div>
                <div className="w-5 h-5 bg-gray-600 rounded-full border-2 border-white"></div>
                <div className="w-5 h-5 bg-gray-800 rounded-full border-2 border-white"></div>
                <div className="w-5 h-5 bg-gray-300 rounded-full border-2 border-white flex items-center justify-center">
                  <span className="text-xs">+</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <Edit3 className="w-4 h-4" />
              <span>Manage project</span>
            </div>
          </div>
          
          <p className="text-xs md:text-sm text-gray-500 mt-2">
            Last updated on 04 April 2022
          </p>
        </div>
      </div>
    </div>
  )
}