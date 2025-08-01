
import React, { useEffect, useState, useMemo } from "react";
import { getCards } from "../services/kanbanizeService";
import { getUsers } from "../services/userService";

const Board = () => {
  const [cards, setCards] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cardsData = await getCards();
        setCards(cardsData);
        const usersData = await getUsers();
        setUsers(usersData);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    fetchData();
  }, []);

  const columns = useMemo(() => [
    { id: 50, name: "A Fazer" },
    { id: 51, name: "Em Andamento" },
    { id: 52, name: "Concluído" },
    { id: 53, name: "Aguardando" },
    { id: 54, name: "Validação" },
  ], []);

  const groupedCards = useMemo(() => {
    const grouped = {};
    columns.forEach(col => {
      grouped[col.id] = [];
    });
    cards.forEach(card => {
      if (grouped[card.column_id]) {
        grouped[card.column_id].push(card);
      }
    });
    return grouped;
  }, [columns, cards]);

  const getUserNameById = (userId) => {
    const user = users.find(user => user.id === userId);
    return user ? user.name : "Desconhecido";
  };

  return (
    <div style={{ display: "flex", gap: "16px", padding: "20px" }}>
      {columns.map(column => (
        <div key={column.id} style={{ flex: 1 }}>
          <h2>{column.name}</h2>
          {groupedCards[column.id]?.map(card => (
            <div key={card.taskid} style={{ border: "1px solid #ccc", padding: "8px", marginBottom: "8px" }}>
              <strong>{card.title}</strong>
              <p>ID: {card.taskid}</p>
              <p>Responsável: {getUserNameById(card.assignee_user_id)}</p>
              <p>Status: {card.status}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;
