
import React, { useEffect, useState, useMemo } from "react";
import { getCards, getBoardStructure } from "../services/kanbanizeService";
import { getUsers } from "../services/userService";

const Board = () => {
  const [cards, setCards] = useState([]);
  const [users, setUsers] = useState([]);
  const [columns, setColumns] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Buscar dados em paralelo para otimizar o carregamento
        const [cardsData, usersData, boardData] = await Promise.all([
          getCards(),
          getUsers(),
          getBoardStructure(),
        ]);

        setCards(cardsData);
        setUsers(usersData);
        
        // A API retorna colunas e workflows, vamos usar as colunas
        if (boardData && boardData.columns) {
          // Mapeia para o formato esperado pelo componente [{ id, name }]
          const formattedColumns = boardData.columns.map(col => ({ id: col.column_id, name: col.name }));
          setColumns(formattedColumns);
        } else {
          setColumns([]); // Define como vazio se não houver colunas
        }

      } catch (err) {
        console.error("Erro ao buscar dados:", err);
        setError("Falha ao carregar o quadro. Verifique a conexão e a configuração.");
      }
    };

    fetchData();
  }, []);

  const groupedCards = useMemo(() => {
    if (!columns.length) return {}; // Retorna objeto vazio se não houver colunas

    const grouped = {};
    columns.forEach(col => {
      // Usa o ID da coluna para criar a chave
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

  if (error) {
    return (
      <div style={{ color: 'red', padding: '20px' }}>
        <h2>Erro ao Carregar o Quadro</h2>
        <p>{error}</p>
      </div>
    );
  }

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
