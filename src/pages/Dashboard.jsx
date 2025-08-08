import React, { useState, useEffect } from 'react'
import { fetchCards } from '../services/kanbanizeService'
import { analyzeCards } from '../services/openaiService'

export default function Dashboard() {
  const [cards, setCards] = useState([])
  const [analysis, setAnalysis] = useState('')

  useEffect(() => {
    fetchCards().then(setCards)
  }, [])

  useEffect(() => {
    if (cards.length) {
      analyzeCards(cards).then(setAnalysis)
    }
  }, [cards])

  const totalCards = cards.length
  const today = new Date()
  const upcomingCards = cards.filter(card => {
    const due = new Date(card.due_date)
    const diff = (due - today) / (1000 * 60 * 60 * 24)
    return diff >= 0 && diff <= 3
  })

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold">Total Cards</h2>
          <p className="text-2xl">{totalCards}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold">Cards Near Due Date (≤3 days)</h2>
          <p className="text-2xl">{upcomingCards.length}</p>
        </div>
      </div>
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-lg font-semibold mb-2">AI Analysis</h2>
        <pre className="whitespace-pre-wrap">{analysis}</pre>
      </div>
    </div>
  )
}