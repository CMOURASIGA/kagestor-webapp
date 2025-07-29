import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

async function getCards() {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/cards`);
    return response.data?.data || []; // garantir que seja um array
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
export { getCards, getUsers };
