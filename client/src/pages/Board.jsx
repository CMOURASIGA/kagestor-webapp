
import React, { useEffect, useState, useMemo } from "react";
import Card from "../components/Card";
import { getCards } from "../services/kanbanizeService";
import { getUsers } from "../services/userService";

function Board() {
  const [cards, setCards] = useState([]);
  const [users, setUsers] = useState([]);
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    getCards().then(setCards);
    getUsers().then(setUsers);
    setColumns([
      { column_id: 1, name: "A Fazer" },
      { column_id: 2, name: "Em Andamento" },
      { column_id: 3, name: "Concluído" },
      { column_id: 4, name: "Aguardando" },
      { column_id: 5, name: "Validação" },
    ]);
  }, []);

  const filteredCards = useMemo(() => {
    return cards.filter(card => card.workflow_id === 2);
  }, [cards]);

  const groupedCards = useMemo(() => {
    const grouped = {};
    columns.forEach(column => {
      grouped[column.column_id] = [];
    });

    filteredCards.forEach(card => {
      if (!grouped[card.column_id]) {
        grouped[card.column_id] = [];
      }
      grouped[card.column_id].push(card);
    });

    return grouped;
  }, [columns, filteredCards]);

  return (
    <div className="p-4">
      {columns.map(column => (
        <div key={column.column_id} className="mb-4">
          <h2 className="text-xl font-bold text-gray-800 mb-2">{column.name}</h2>
          <div className="grid gap-2">
            {groupedCards[column.column_id] &&
              groupedCards[column.column_id].map(card => (
                <Card key={card.card_id} card={card} users={users} />
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Board;
