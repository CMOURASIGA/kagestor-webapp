import React from 'react';

export default function FilterBar({ 
  searchTerm, 
  onSearchChange, 
  priorityFilter, 
  onPriorityChange,
  assigneeFilter,
  onAssigneeChange,
  availableAssignees,
  onClearFilters
}) {
  const priorities = ['Critical', 'High', 'Medium', 'Low', 'Lowest'];

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-6">
      <div className="flex flex-wrap gap-4 items-center">
        {/* Busca por texto */}
        <div className="flex-1 min-w-64">
          <input
            type="text"
            placeholder="Buscar cards..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Filtro por prioridade */}
        <div className="min-w-40">
          <select
            value={priorityFilter}
            onChange={(e) => onPriorityChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Todas as prioridades</option>
            {priorities.map(priority => (
              <option key={priority} value={priority}>{priority}</option>
            ))}
          </select>
        </div>

        {/* Filtro por responsável */}
        <div className="min-w-48">
          <select
            value={assigneeFilter}
            onChange={(e) => onAssigneeChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Todos os responsáveis</option>
            {availableAssignees.map(assignee => (
              <option key={assignee} value={assignee}>{assignee}</option>
            ))}
          </select>
        </div>

        {/* Botão limpar filtros */}
        <button
          onClick={onClearFilters}
          className="px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-md transition-colors"
        >
          Limpar filtros
        </button>
      </div>
    </div>
  );
}

