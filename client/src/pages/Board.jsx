import React, { useEffect, useState } from 'react';
import Card from '../components/Card';

const columns = {
  "A Fazer": [21],
  "Em Andamento": [22],
  "Concluído": [23]
};

const Board = () => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    fetch("/api/cards")
      .then(res => res.json())
      .then(data => setCards(data.data || []));
  }, []);

  return (
    <div className="p-2 flex flex-col sm:flex-row gap-2">
      {Object.entries(columns).map(([status, columnIds]) => (
        <div key={status} className="flex-1 bg-gray-100 rounded p-2">
          <h2 className="text-center font-bold text-sm mb-2">{status}</h2>
          {cards.filter(c => columnIds.includes(c.column_id)).map(c => (
            <Card key={c.card_id} card={c} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;