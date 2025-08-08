import React from 'react'
import { getMockUsers } from '../services/userService'

export default function Card({ card, onClick }) {
  const users = getMockUsers()
  const assignee = users.find(u => u.id === card.assignee_id)
  return (
    <div
      className="bg-white p-4 rounded shadow cursor-pointer hover:shadow-md mb-4"
      onClick={() => onClick(card)}
    >
      <h3 className="font-semibold text-lg">{card.title}</h3>
      <p className="text-sm text-gray-600">{card.lane}</p>
      <div className="flex items-center mt-2">
        {assignee && (
          <img src={assignee.avatar} alt={assignee.name} className="w-6 h-6 rounded-full mr-2" />
        )}
        <span className="text-sm text-gray-700">{assignee?.name}</span>
      </div>
      <p className="text-xs text-gray-500 mt-2">
        Due: {new Date(card.due_date).toLocaleDateString()}
      </p>
    </div>
  )
}