// Serviço para chamada à API do backend que integra com o Kanbanize
const API_URL = 'https://kagestor-webapp-api.onrender.com/api/cards';

/**
 * Função para buscar os cards da API
 */
export async function getCards() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();

    // Log de depuração para entender o retorno
    console.log('🔍 Dados brutos da API:', data);

    // Verifica se é um array direto
    if (Array.isArray(data)) {
      return data;
    }

    // Verifica se está dentro de "data"
    if (Array.isArray(data.data)) {
      return data.data;
    }

    // Verifica se está dentro de "cards"
    if (Array.isArray(data.cards)) {
      return data.cards;
    }

    // Retorno vazio caso nenhum array seja encontrado
    console.warn('⚠️ Nenhum array de cards encontrado no retorno da API.');
    return [];
  } catch (error) {
    console.error('❌ Erro ao buscar os cards da API:', error);
    return [];
  }
}
