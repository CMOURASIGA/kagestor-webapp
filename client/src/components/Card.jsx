import React from 'react';

// Função para formatar a data
const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('pt-BR');
};

export default function Card({ card, onClick }) {
  const {
    title,
    description,
    color,
    priority,
    reporter,
    created_at
  } = card;

  // Estilo da borda com base na cor do card
  const cardStyle = {
    borderLeft: `5px solid ${color || '#ccc'}`,
  };

  return (
    <div
      className="bg-white p-3 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow"
      style={cardStyle}
      onClick={() => onClick(card)}
    >
      <h3 className="font-bold text-md mb-1">{title}</h3>
      {description && (
        <p className="text-sm text-gray-600 line-clamp-2 mb-3">
          {description.replace(/<[^>]*>?/gm, '')} {/* Remove tags HTML */}
        </p>
      )}
      <div className="flex justify-between items-center text-xs text-gray-500">
        <span>{reporter?.value || 'Não atribuído'}</span>
        <span>{formatDate(created_at)}</span>
      </div>
      {priority && (
        <div className="mt-2">
          <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">
            Prioridade: {priority}
          </span>
        </div>
      )}
    </div>
  );
}
