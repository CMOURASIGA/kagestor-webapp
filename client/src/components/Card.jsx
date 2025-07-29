
import React from 'react';

export default function Card({ card }) {
  return (
    <div className="bg-white rounded shadow p-2 mb-2 text-sm">
      <div className="font-bold text-indigo-700">#{card.card_id}</div>
      <div className="text-gray-800 font-medium truncate">{card.title}</div>
      <div className="text-gray-500 text-xs truncate">{card.description}</div>
      <div className="text-xs text-right text-gray-400 mt-1">
        👤 {card.owner_username}
      </div>
    </div>
  );
}
