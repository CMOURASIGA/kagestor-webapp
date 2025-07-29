import React from 'react';

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
        className="bg-white rounded-2xl shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto p-6"
        onClick={(e) => e.stopPropagation()} // Impede que o clique feche o modal
      >
        <header className="flex justify-between items-start mb-4">
          <h2 className="text-2xl font-bold">{title}</h2>
          <button onClick={onClose} className="text-2xl font-bold">&times;</button>
        </header>

        <div className="prose max-w-none mb-4">
          <p dangerouslySetInnerHTML={{ __html: description }} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-sm">
          <DetailItem label="ID Customizado" value={custom_id} />
          <DetailItem label="Tipo" value={type?.value} />
          <DetailItem label="Proprietário (ID)" value={owner_user_id} />
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
            <h4 className="font-bold mb-2">Sub-tarefas</h4>
            <ul className="list-disc list-inside text-sm">
              {subtasks.map(subtask => (
                <li key={subtask.task_id}>{subtask.title}</li>
              ))}
            </ul>
          </div>
        )}
        
        {child_card_stats && (
          <div className="mt-4 text-sm">
            <h4 className="font-bold mb-2">Cards Filhos</h4>
            <p>Em Aberto: {child_card_stats.open_cards}</p>
            <p>Concluídos: {child_card_stats.closed_cards}</p>
          </div>
        )}
      </div>
    </div>
  );
}
