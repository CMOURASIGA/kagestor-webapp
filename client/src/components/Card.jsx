import React from 'react';

const Card = ({ card }) => {
  return (
    <div className="bg-white shadow rounded p-3 mb-2">
      <h3 className="text-sm font-semibold">{card.title}</h3>
      <p className="text-xs text-gray-500">{card.description}</p>
    </div>
  );
};

export default Card;