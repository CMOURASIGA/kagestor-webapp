import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

/**
 * Solicita um resumo de um card para o backend.
 * @param {object} card - O objeto do card a ser resumido.
 * @returns {Promise<string|null>} O texto do resumo ou null em caso de erro.
 */
export async function getSummary(card) {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/summarize`, { card });
    return response.data?.summary || null;
  } catch (error) {
    console.error('Erro ao buscar resumo do card:', error.response?.data?.error || error.message);
    // Retorna uma mensagem de erro amigável que pode ser exibida na UI
    return 'Não foi possível gerar o resumo. Tente novamente mais tarde.';
  }
}
