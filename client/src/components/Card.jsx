import React from 'react';

// Função para formatar a data
const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('pt-BR');
};

// Função para obter cor da prioridade
const getPriorityColor = (priority) => {
  const priorityColors = {
    'Critical': 'bg-red-100 text-red-800 border-red-200',
    'High': 'bg-orange-100 text-orange-800 border-orange-200',
    'Medium': 'bg-yellow-100 text-yellow-800 border-yellow-200',
    'Low': 'bg-green-100 text-green-800 border-green-200',
    'Lowest': 'bg-gray-100 text-gray-800 border-gray-200'
  };
  return priorityColors[priority] || 'bg-blue-100 text-blue-800 border-blue-200';
};

// Função para obter iniciais do nome
const getInitials = (name) => {
  if (!name) return '?';
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
};

export default function Card({ card, onClick }) {
  const {
    title,
    description,
    color,
    priority,
    reporter,
    created_at,
    owner_user_id,
    current_cycle_time
  } = card;

  // Estilo da borda com base na cor do card
  const cardStyle = {
    borderLeft: `5px solid ${color || '#ccc'}`,
  };

  const assigneeName = reporter?.value || owner_user_id || 'Não atribuído';
  const priorityColorClass = getPriorityColor(priority);

  return (
    <div
      className="bg-white p-3 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-[1.02]"
      style={cardStyle}
      onClick={() => onClick(card)}
    >
      {/* Cabeçalho com título e avatar */}
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-bold text-md flex-1 mr-2 line-clamp-2">{title}</h3>
        <div className="flex-shrink-0 w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-xs font-semibold text-gray-700">
          {getInitials(assigneeName)}
        </div>
      </div>

      {/* Descrição */}
      {description && (
        <p className="text-sm text-gray-600 line-clamp-2 mb-3">
          {description.replace(/<[^>]*>?/gm, '')} {/* Remove tags HTML */}
        </p>
      )}

      {/* Badges de prioridade e tempo */}
      <div className="flex flex-wrap gap-1 mb-3">
        {priority && (
          <span className={`text-xs font-semibold px-2 py-1 rounded-full border ${priorityColorClass}`}>
            {priority}
          </span>
        )}
        {current_cycle_time && (
          <span className="bg-purple-100 text-purple-800 text-xs font-semibold px-2 py-1 rounded-full border border-purple-200">
            {Math.round(current_cycle_time)}d
          </span>
        )}
      </div>

      {/* Rodapé com responsável e data */}
      <div className="flex justify-between items-center text-xs text-gray-500">
        <span className="truncate flex-1 mr-2">{assigneeName}</span>
        <span className="flex-shrink-0">{formatDate(created_at)}</span>
      </div>
    </div>
  );
}
