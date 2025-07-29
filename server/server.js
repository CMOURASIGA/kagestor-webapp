const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Configurações da API do Kanbanize
const KANBANIZE_API_BASE = process.env.KANBANIZE_API_BASE || 'https://cnc.kanbanize.com/api/v2';
const KANBANIZE_API_TOKEN = process.env.KANBANIZE_API_TOKEN;

// Middleware CORS
app.use(cors());
app.use(express.json());

// Endpoint para buscar cards
app.get('/api/cards', async (req, res) => {
  try {
    const response = await axios.get(`${KANBANIZE_API_BASE}/boards/1/workflows/2/items`, {
      headers: {
        accept: 'application/json',
        apikey: KANBANIZE_API_TOKEN
      },
      params: {
        expand: 'fields'
      }
    });

    const cards = response.data.items || [];
    res.json(cards);
  } catch (error) {
    console.error('❌ Erro ao buscar cards Kanbanize:', error.message);
    if (error.response) {
      console.error('↳ Status:', error.response.status);
      console.error('↳ Data:', error.response.data);
    }
    res.status(500).json({ error: 'Erro no servidor ao buscar cards' });
  }
});

// Endpoint para buscar usuários
app.get('/api/users', async (req, res) => {
  try {
    const response = await axios.get(`${KANBANIZE_API_BASE}/users/`, {
      headers: {
        accept: 'application/json',
        apikey: KANBANIZE_API_TOKEN
      }
    });

    const users = response.data.users.map(user => ({
      id: user.user_id,
      name: user.username
    }));

    res.json(users);
  } catch (error) {
    console.error('❌ Erro ao buscar usuários Kanbanize:', error.message);
    if (error.response) {
      console.error('↳ Status:', error.response.status);
      console.error('↳ Data:', error.response.data);
    }
    res.status(500).json({ error: 'Erro no servidor ao buscar usuários' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor backend rodando na porta ${PORT}`);
});
