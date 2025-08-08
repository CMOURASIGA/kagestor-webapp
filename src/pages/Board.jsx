import React, { useState, useEffect } from 'react'
import FilterBar from '../components/FilterBar'
import Card from '../components/Card'
import CardDetailsModal from '../components/CardDetailsModal'
import { fetchCards } from '../services/kanbanizeService'
import { getMockUsers } from '../services/userService'

export default function Board() {
  const [cards, setCards] = useState([])
  const [selectedColumn, setSelectedColumn] = useState('')
  const [selectedAssignee, setSelectedAssignee] = useState('')
  const [modalCard, setModalCard] = useState(null)

  const assignees = getMockUsers()

  useEffect(() => {
    fetchCards().then(setCards)
  }, [])

  const columns = [...new Set(cards.map(card => card.column))]

  let filteredCards = cards
  if (selectedColumn) {
    filteredCards = filteredCards.filter(card => card.column === selectedColumn)
  }
  if (selectedAssignee) {
    filteredCards = filteredCards.filter(card => String(card.assignee_id) === String(selectedAssignee))
  }

  const cardsByColumn = columns.reduce((acc, col) => {
    acc[col] = filteredCards.filter(card => card.column === col)
    return acc
  }, {})

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Board</h1>
      <FilterBar
        columns={columns}
        assignees={assignees}
        selectedColumn={selectedColumn}
        selectedAssignee={selectedAssignee}
        onColumnChange={setSelectedColumn}
        onAssigneeChange={setSelectedAssignee}
      />
      <div className="flex space-x-4 overflow-x-auto">
        {columns.map(col => {
          const cardsInColumn = cardsByColumn[col] || []
          const lanes = [...new Set(cardsInColumn.map(c => c.lane))]

          return (
            <div key={col} className="min-w-[300px] bg-gray-100 p-2 rounded">
              <h2 className="font-semibold text-lg mb-2">{col}</h2>
              {lanes.map(lane => (
                <div key={lane} className="mb-4">
                  <h3 className="font-medium">{lane}</h3>
                  {cardsInColumn
                    .filter(c => c.lane === lane)
                    .map(card => (
                      <Card key={card.card_id} card={card} onClick={setModalCard} />
                    ))}
                </div>
              ))}
              {cardsInColumn.length === 0 && <p className="text-sm text-gray-500">No cards</p>}
            </div>
          )
        })}
      </div>
      <CardDetailsModal card={modalCard} onClose={() => setModalCard(null)} />
    </div>
  )
}