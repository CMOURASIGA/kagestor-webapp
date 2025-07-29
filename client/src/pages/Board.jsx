import React, { useEffect, useState } from 'react';
import Card from '../components/Card';

export default function Board() {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    fetch('/api/cards')
      .then(res => res.json())
      .then(data => setCards(data.data.data));
  }, []);

  const columns = {
    'A Fazer': [],
    'Em Andamento': [],
    'Concluído': []
  };

  cards.forEach(card => {
    if (card.lane_id === 82) columns['A Fazer'].push(card);
    else if (card.lane_id === 83) columns['Em Andamento'].push(card);
    else if (card.lane_id === 84) columns['Concluído'].push(card);
  });

  return (
    <div className='flex flex-col md:flex-row gap-4 p-4'>
      {Object.entries(columns).map(([title, items]) => (
        <div key={title} className='flex-1 bg-gray-100 rounded p-2'>
          <h2 className='font-bold text-center mb-2'>{title}</h2>
          {items.map(card => <Card key={card.card_id} card={card} />)}
        </div>
      ))}
    </div>
  );
}
