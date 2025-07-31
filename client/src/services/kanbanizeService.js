import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

async function getCards() {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/cards`);
    console.log('Data received from /api/cards:', response.data);
    return response.data?.data || []; // Corrigido para extrair o array de cards
  } catch (error) {
    console.error('Erro ao buscar cards:', error);
    return [];
  }
}

async function getUsers() {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/users`);
    return response.data?.data || [];
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
    return [];
  }
}

// ✅ Exportações necessárias
export { getCards, getUsers, getBoardStructure };

async function getBoardStructure() {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/board-structure`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar a estrutura do quadro:', error);
    // Lançar o erro para que o componente que chama possa tratá-lo
    throw error;
  }
}

