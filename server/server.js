const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Configuração CORS restrita ao CLIENT_URL
app.use(cors({
  origin: process.env.CLIENT_URL || '*'
}));

app.get('/', (req, res) => {
  res.send('✅ API do Kagestor está no ar!');
});

app.get('/api/cards', async (req, res) => {
  try {
    const response = await axios.get(process.env.KANBANIZE_API_URL, {
      headers: {
        'accept': 'application/json',
        'apikey': process.env.KANBANIZE_API_TOKEN
      }
    });
    res.json(response.data);
  } catch (error) {
    console.error('Erro ao buscar dados da API do Kanbanize:', error.message);
    res.status(500).json({ error: 'Erro ao buscar dados da API do Kanbanize' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});