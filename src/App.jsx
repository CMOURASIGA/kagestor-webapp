import { useState } from 'react'
import Board from './pages/Board'
import Dashboard from './pages/Dashboard'
import './index.css'

export default function App() {
  const [activePage, setActivePage] = useState('board')

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-4 flex space-x-4">
          <button
            className={`px-3 py-1 rounded ${activePage === 'board' ? 'bg-blue-500 text-white' : 'text-blue-500'}`}
            onClick={() => setActivePage('board')}
          >
            Board
          </button>
          <button
            className={`px-3 py-1 rounded ${activePage === 'dashboard' ? 'bg-blue-500 text-white' : 'text-blue-500'}`}
            onClick={() => setActivePage('dashboard')}
          >
            Dashboard
          </button>
        </div>
      </header>
      <main className="container mx-auto px-4 py-6">
        {activePage === 'board' ? <Board /> : <Dashboard />}
      </main>
    </div>
  )
}

