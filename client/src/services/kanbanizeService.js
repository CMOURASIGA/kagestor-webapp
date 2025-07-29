const API_URL = 'https://kagestor-webapp-api.onrender.com/api/cards';

/**
 * Busca os cards reais vindos da API Kanbanize (via backend)
 */
export async function getCards() {
  try {
    const response = await fetch(API_URL);
    const result = await response.json();

    console.log('🔍 Dados brutos da API:', result);

    // Acessa o array em: result.data.data
    if (
      result &&
      result.data &&
      Array.isArray(result.data.data)
    ) {
      return result.data.data;
    }

    console.warn('⚠️ Estrutura inesperada no retorno da API.');
    return [];
  } catch (error) {
    console.error('❌ Erro ao buscar os cards da API:', error);
    return [];
  }
}
