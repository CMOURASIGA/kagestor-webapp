// Serviço para chamada à API do backend
const API_URL = 'https://kagestor-webapp-api.onrender.com/api/cards';

export async function getCards() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('Erro ao buscar os cards');
    }
    const data = await response.json();

    // Suporte para diferentes formatos (se vier "cards" ou "data")
    if (data.cards) return data.cards;
    if (data.data) return data.data;
    return data;
  } catch (error) {
    console.error('Erro ao buscar os cards:', error);
    return [];
  }
}
