import React, { useEffect, useState, useMemo } from 'react';
import { getCards } from '../services/kanbanizeService';
import Card from '../components/Card';
import CardDetailsModal from '../components/CardDetailsModal';
import FilterBar from '../components/FilterBar';

// Definição das colunas com base no column_id
const columnsConfig = {
  'A Fazer': 88,
  'Em Andamento': 89,
  'Concluído': 90,
};

const LoadingSpinner = () => (
  <div className="flex justify-center items-center h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    <span className="ml-3 text-lg font-semibold text-gray-700">Carregando dados...</span>
  </div>
);

const ErrorState = ({ onRetry }) => (
  <div className="flex flex-col justify-center items-center h-screen text-center">
    <div className="text-red-500 text-6xl mb-4">⚠️</div>
    <h2 className="text-2xl font-bold text-gray-800 mb-2">Erro ao carregar dados</h2>
    <p className="text-gray-600 mb-4">Não foi possível conectar com a API. Verifique sua conexão.</p>
    <button 
      onClick={onRetry}
      className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors"
    >
      Tentar novamente
    </button>
  </div>
);

const Column = ({ title, cards, onCardClick }) => (
  <div className="flex-shrink-0 w-full sm:w-80 bg-gray-100 rounded-xl p-3">
    <div className="flex justify-between items-center mb-4 sticky top-0 bg-gray-100 py-2">
      <h2 className="text-lg font-bold">{title}</h2>
      <span className="bg-gray-300 text-gray-700 text-xs font-semibold px-2 py-1 rounded-full">
        {cards.length}
      </span>
    </div>
    <div className="space-y-3 h-[calc(100vh-12rem)] overflow-y-auto">
      {cards.length > 0 ? (
        cards.map(card => <Card key={card.card_id} card={card} onClick={onCardClick} />)
      ) : (
        <div className="text-center text-gray-500 pt-10">
          <div className="text-4xl mb-2">📋</div>
          <p>Nenhum card aqui</p>
        </div>
      )}
    </div>
  </div>
);

export default function Board() {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  
  // Estados dos filtros
  const [searchTerm, setSearchTerm] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');
  const [assigneeFilter, setAssigneeFilter] = useState('');

  const fetchCards = async () => {
    setLoading(true);
    setError(false);
    try {
      const fetchedCards = await getCards();
      console.log('📊 Cards fetched in Board:', fetchedCards.length);
      setCards(fetchedCards);
    } catch (err) {
      console.error('❌ Error in Board component:', err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCards();
  }, []);

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const handleCloseModal = () => {
    setSelectedCard(null);
  };

  const handleRetry = () => {
    fetchCards();
  };

  // Filtros e responsáveis disponíveis
  const availableAssignees = useMemo(() => {
    const assignees = new Set();
    cards.forEach(card => {
      if (card.owner_user_id) {
        assignees.add(card.owner_user_id);
      }
      if (card.co_owner_ids) {
        card.co_owner_ids.forEach(id => assignees.add(id));
      }
    });
    return Array.from(assignees).sort((a, b) => {
      if (typeof a === 'number' && typeof b === 'number') {
        return a - b;
      }
      return String(a).localeCompare(String(b));
    });
  }, [cards]);

  // Cards filtrados
  const filteredCards = useMemo(() => {
    return cards.filter(card => {
      const matchesSearch = !searchTerm || 
        card.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        card.description?.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesPriority = !priorityFilter || card.priority === priorityFilter;
      
      const allAssignees = [card.owner_user_id, ...(card.co_owner_ids || [])];
      const matchesAssignee = !assigneeFilter || allAssignees.includes(Number(assigneeFilter));
      
      return matchesSearch && matchesPriority && matchesAssignee;
    });
  }, [cards, searchTerm, priorityFilter, assigneeFilter]);

  const handleClearFilters = () => {
    setSearchTerm('');
    setPriorityFilter('');
    setAssigneeFilter('');
  };

  // Agrupa os cards filtrados por coluna
  const groupedCards = Object.fromEntries(
    Object.keys(columnsConfig).map(key => [key, []])
  );

  filteredCards.forEach(card => {
    const columnName = Object.keys(columnsConfig).find(
      key => columnsConfig[key] === card.column_id
    );
    if (columnName) {
      groupedCards[columnName].push(card);
    }
  });

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorState onRetry={handleRetry} />;
  }

  const totalCards = cards.length;
  const filteredTotal = filteredCards.length;

  return (
    <div className="p-4 bg-gray-50 min-h-screen font-sans">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">Quadro Kanban</h1>
        <div className="text-center text-gray-600">
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
            {filteredTotal} de {totalCards} cards
          </span>
        </div>
      </header>
      
      <FilterBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        priorityFilter={priorityFilter}
        onPriorityChange={setPriorityFilter}
        assigneeFilter={assigneeFilter}
        onAssigneeChange={setAssigneeFilter}
        availableAssignees={availableAssignees}
        onClearFilters={handleClearFilters}
      />
      
      <main className="flex gap-4 overflow-x-auto pb-4">
        {Object.entries(groupedCards).map(([title, items]) => (
          <Column key={title} title={title} cards={items} onCardClick={handleCardClick} />
        ))}
      </main>
      <CardDetailsModal card={selectedCard} onClose={handleCloseModal} />
    </div>
  );
}
