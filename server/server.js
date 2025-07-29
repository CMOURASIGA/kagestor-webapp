require('dotenv').config();
const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Libera acesso CORS para seu frontend
app.use(cors({
  origin: '*', // Se quiser limitar, substitua por: 'https://kagestor-webapp.onrender.com'
}));

// Endpoint para buscar cards
app.get('/api/cards', async (req, res) => {
  try {
    const response = await fetch('https://cnc.kanbanize.com/api/v2/boards/1/workflows/2/cards?expand=details,custom_fields,comments,stickers,tags', {
      headers: {
        accept: 'application/json',
        apikey: process.env.KANBANIZE_API_TOKEN
      }
    });

    if (!response.ok) {
      return res.status(response.status).json({ error: 'Erro ao buscar cards do Kanbanize' });
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Erro no endpoint /api/cards:', error);
    res.status(500).json({ error: 'Erro no servidor ao buscar cards' });
  }
});

// Endpoint para buscar usuários
app.get('/api/users', async (req, res) => {
  try {
    const response = await fetch('https://cnc.kanbanize.com/api/v2/users/', {
      headers: {
        accept: 'application/json',
        apikey: process.env.KANBANIZE_API_TOKEN
      }
    });

    if (!response.ok) {
      return res.status(response.status).json({ error: 'Erro ao buscar usuários do Kanbanize' });
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Erro no endpoint /api/users:', error);
    res.status(500).json({ error: 'Erro no servidor ao buscar usuários' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
