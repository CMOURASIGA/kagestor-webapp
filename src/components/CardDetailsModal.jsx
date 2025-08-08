import React from 'react'
import { getMockUsers } from '../services/userService'

export default function CardDetailsModal({ card, onClose }) {
  if (!card) return null
  const users = getMockUsers()
  const assignee = users.find(u => u.id === card.assignee_id)
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-11/12 max-w-md relative">
        <button
          className="text-gray-500 hover:text-gray-700 absolute top-2 right-2"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-2">{card.title}</h2>
        <p className="text-sm text-gray-600 mb-4">{card.lane}</p>
        <p className="text-gray-800 mb-4">{card.description}</p>
        {assignee && (
          <div className="flex items-center mb-4">
            <img src={assignee.avatar} alt={assignee.name} className="w-8 h-8 rounded-full mr-2" />
            <span>{assignee.name}</span>
          </div>
        )}
        <p className="text-sm text-gray-500 mb-2">Column: {card.column}</p>
        <p className="text-sm text-gray-500">
          Due Date: {new Date(card.due_date).toLocaleDateString()}
        </p>
      </div>
    </div>
  )
}