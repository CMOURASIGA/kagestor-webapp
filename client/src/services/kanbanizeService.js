// Serviço para chamada à API do Kanbanize
const API_URL = 'https://kagestor-webapp-api.onrender.com/api/cards';

export const getCards = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const json = await response.json();
    return json.data.data; // Acessando o array de cards
  } catch (error) {
    console.error('Failed to fetch cards:', error);
    return []; // Retorna um array vazio em caso de erro
  }
};
