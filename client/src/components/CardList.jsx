import React from 'react';
import Card from './Card';

// Mapeamento de IDs de colunas para nomes de colunas
function getColumnNameById(id) {
  const columns = {
    6: 'Backlog',
    7: 'Entendimento',
    56: 'Validação',
    8: 'Em Andamento',
    9: 'Concluído'
  };
  return columns[id] || 'Outros';
}

const CardList = ({ cards }) => {
  // Agrupa os cards pela coluna
  const groupedCards = cards.reduce((acc, card) => {
    const columnName = getColumnNameById(card.column_id);
    if (!acc[columnName]) {
      acc[columnName] = [];
    }
    acc[columnName].push(card);
    return acc;
  }, {});

  const columnOrder = ['Backlog', 'Entendimento', 'Validação', 'Em Andamento', 'Concluído', 'Outros'];

  return (
    <div className="flex space-x-4 p-4 overflow-x-auto">
      {columnOrder.map(columnName => (
        groupedCards[columnName] && (
          <div key={columnName} className="flex-shrink-0 w-80 bg-gray-100 rounded-lg shadow-md">
            <h2 className="text-lg font-bold p-3 bg-gray-200 rounded-t-lg">{columnName} ({groupedCards[columnName].length})</h2>
            <div className="p-2 space-y-2">
              {groupedCards[columnName].map(card => (
                <Card key={card.card_id} card={card} />
              ))}
            </div>
          </div>
        )
      ))}
    </div>
  );
};

export default CardList;
