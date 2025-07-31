import React, { useState, useEffect } from 'react';
import { getSummary } from '../services/openaiService';

const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  return date.toLocaleString('pt-BR', {
    dateStyle: 'short',
    timeStyle: 'short',
  });
};

const DetailItem = ({ label, value }) => {
  if (!value) return null;
  return (
    <div className="mb-2">
      <span className="font-semibold text-gray-600">{label}: </span>
      <span className="text-gray-800">{value}</span>
    </div>
  );
};

const Summary = ({ card }) => {
  const [summary, setSummary] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (card) {
      setIsLoading(true);
      getSummary(card)
        .then(result => setSummary(result))
        .catch(() => setSummary('Não foi possível gerar o resumo.'))
        .finally(() => setIsLoading(false));
    }
  }, [card]);

  return (
    <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
      <h4 className="font-bold text-blue-800 mb-2">Resumo com IA ✨</h4>
      {isLoading ? (
        <p className="text-sm text-blue-700 animate-pulse">Gerando resumo...</p>
      ) : (
        <p className="text-sm text-blue-900 whitespace-pre-wrap">{summary}</p>
      )}
    </div>
  );
};

export default function CardDetailsModal({ card, onClose }) {
  if (!card) return null;

  const {
    title,
    description,
    custom_id,
    created_at,
    last_modified,
    deadline,
    owner_user_id,
    co_owner_ids,
    type,
    block_reason,
    child_card_stats,
    subtasks,
  } = card;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] sm:max-h-[80vh] overflow-y-auto p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="flex justify-between items-start mb-4">
          <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800 text-3xl font-light">&times;</button>
        </header>

        <Summary card={card} />

        <div className="prose max-w-none my-4">
          <h4 className="font-bold text-gray-700">Descrição Completa</h4>
          <div className="text-sm text-gray-600" dangerouslySetInnerHTML={{ __html: description || '<p>Nenhuma descrição fornecida.</p>' }} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-sm mt-4 border-t pt-4">
          <DetailItem label="ID Customizado" value={custom_id} />
          <DetailItem label="Tipo" value={type?.name} />
          <DetailItem label="Responsáveis (IDs)" value={[owner_user_id, ...(co_owner_ids || [])].filter(id => id != null).join(', ')} />
          <DetailItem label="Prazo Final" value={formatDate(deadline)} />
          <DetailItem label="Criado em" value={formatDate(created_at)} />
          <DetailItem label="Última Modificação" value={formatDate(last_modified)} />
        </div>

        {block_reason && (
          <div className="mt-4 p-3 bg-yellow-100 rounded-lg">
            <h4 className="font-bold text-yellow-800">Motivo do Bloqueio</h4>
            <p className="text-sm text-yellow-700">{block_reason}</p>
          </div>
        )}

        {subtasks?.length > 0 && (
          <div className="mt-4">
            <h4 className="font-bold mb-2 text-gray-700">Sub-tarefas</h4>
            <ul className="list-disc list-inside text-sm text-gray-600">
              {subtasks.map(subtask => (
                <li key={subtask.task_id}>{subtask.title}</li>
              ))}
            </ul>
          </div>
        )}
        
        {child_card_stats && (
          <div className="mt-4 text-sm">
            <h4 className="font-bold mb-2 text-gray-700">Cards Filhos</h4>
            <p>Em Aberto: {child_card_stats.open_cards}</p>
            <p>Concluídos: {child_card_stats.closed_cards}</p>
          </div>
        )}
      </div>
    </div>
  );
}
