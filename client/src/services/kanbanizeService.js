export async function getCards() {
  try {
    const response = await fetch('/api/cards');
    if (!response.ok) {
      throw new Error('Erro ao buscar cards');
    }
    const data = await response.json();
    return data.cards || []; // garante que vem array
  } catch (error) {
    console.error('❌ Erro ao buscar dados da API:', error);
    return [];
  }
}

export async function getUsuarios() {
  try {
    const response = await fetch('/api/users');
    if (!response.ok) {
      throw new Error('Erro ao buscar usuários');
    }
    const usuarios = await response.json();
    return usuarios;
  } catch (error) {
    console.error('❌ Erro ao buscar usuários da API:', error);
    return [];
  }
}
