const express = require('express');
const axios = require('axios');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get('/api/cards', async (req, res) => {
  try {
    const response = await axios.get('https://cnc.kanbanize.com/api/v2/cards?board_id=1&workflow_id=2', {
      headers: {
        apikey: process.env.KANBANIZE_API_TOKEN
      }
    });

    res.json(response.data);
  } catch (error) {
    console.error('Erro ao buscar cards Kanbanize:', error.message);
    res.status(500).json({ error: 'Erro no servidor ao buscar cards' });
  }
});

app.get('/api/users', (req, res) => {
  try {
    const filePath = path.join(__dirname, 'usuarios-fake.json');
    const data = fs.readFileSync(filePath, 'utf8');
    const usuarios = JSON.parse(data);

    res.json(usuarios);
  } catch (error) {
    console.error('Erro ao buscar usuários Kanbanize (fake):', error.message);
    res.status(500).json({ error: 'Erro no servidor ao buscar usuários' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
