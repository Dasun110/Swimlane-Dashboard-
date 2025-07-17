'use client'

import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { Sidebar } from '@/components/Sidebar'
import { Header } from '@/components/Header'


export default function Home() {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen bg-gray-50 flex">
        <Sidebar />
        <main className="flex-1 flex flex-col">
          <Header />
          <div className="flex-1 p-6">
            {/* Main content goes here */}
            <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
            <p>Welcome to your dashboard!</p>
          </div>
        </main>
      </div>
    </DndProvider>
  )
}