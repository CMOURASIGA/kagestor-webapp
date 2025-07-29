import React, { useEffect, useState } from 'react';
import { getCards } from '../services/kanbanizeService';
import Card from '../components/Card';
import CardDetailsModal from '../components/CardDetailsModal';

// Definição das colunas com base no column_id
const columnsConfig = {
  'A Fazer': 88,
  'Em Andamento': 89,
  'Concluído': 90,
};

const Column = ({ title, cards, onCardClick }) => (
  <div className="flex-shrink-0 w-full sm:w-80 bg-gray-100 rounded-xl p-3">
    <h2 className="text-lg font-bold text-center mb-4 sticky top-0 bg-gray-100 py-2">{title}</h2>
    <div className="space-y-3 h-[calc(100vh-12rem)] overflow-y-auto">
      {cards.length > 0 ? (
        cards.map(card => <Card key={card.card_id} card={card} onClick={onCardClick} />)
      ) : (
        <p className="text-center text-gray-500 pt-10">Nenhum card aqui.</p>
      )}
    </div>
  </div>
);

export default function Board() {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCard, setSelectedCard] = useState(null);

  useEffect(() => {
    const fetchCards = async () => {
      setLoading(true);
      const fetchedCards = await getCards();
      setCards(fetchedCards);
      setLoading(false);
    };
    fetchCards();
  }, []);

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const handleCloseModal = () => {
    setSelectedCard(null);
  };

  // Agrupa os cards por coluna
  const groupedCards = Object.fromEntries(
    Object.keys(columnsConfig).map(key => [key, []])
  );

  cards.forEach(card => {
    const columnName = Object.keys(columnsConfig).find(
      key => columnsConfig[key] === card.column_id
    );
    if (columnName) {
      groupedCards[columnName].push(card);
    }
  });

  if (loading) {
    return <div className="flex justify-center items-center h-screen font-bold text-xl">Carregando...</div>;
  }

  return (
    <div className="p-4 bg-gray-50 min-h-screen font-sans">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-center text-gray-800">Quadro Kanban</h1>
      </header>
      <main className="flex gap-4 overflow-x-auto pb-4">
        {Object.entries(groupedCards).map(([title, items]) => (
          <Column key={title} title={title} cards={items} onCardClick={handleCardClick} />
        ))}
      </main>
      <CardDetailsModal card={selectedCard} onClose={handleCloseModal} />
    </div>
  );
}
