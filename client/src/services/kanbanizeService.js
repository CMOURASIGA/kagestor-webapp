
const API_URL_CARDS = 'https://kagestor-webapp-api.onrender.com/api/cards';
const API_URL_USERS = 'https://cnc.kanbanize.com/api/v2/users/';

export async function getCards() {
  try {
    const [cardsRes, usersRes] = await Promise.all([
      fetch(API_URL_CARDS),
      fetch(API_URL_USERS)
    ]);

    const cardsJson = await cardsRes.json();
    const usersJson = await usersRes.json();

    const userMap = {};
    if (usersJson?.data) {
      usersJson.data.forEach(user => {
        userMap[user.user_id] = user.username;
      });
    }

    if (!cardsJson?.data?.data) {
      console.warn("⚠️ Estrutura de cards inválida:", cardsJson);
      return [];
    }

    const cards = cardsJson.data.data.map(card => ({
      ...card,
      owner_username: userMap[card.owner_user_id] || `ID: ${card.owner_user_id}`
    }));

    return cards;
  } catch (error) {
    console.error('❌ Erro ao buscar dados da API:', error);
    return [];
  }
}
