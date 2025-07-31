
import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

// Endpoint para cards do Kanbanize (já existente)
app.get('/api/cards', async (req, res) => {
  try {
    const response = await fetch('https://cnc.kanbanize.com/api/v2/boards/1/cards', {
      headers: {
        accept: 'application/json',
        apikey: process.env.KANBANIZE_API_TOKEN
      }
    });
    const data = await response.json();
    const filtered = data.filter(card => card.workflow_id === 2);
    res.json(filtered);
  } catch (error) {
    console.error('Erro ao buscar cards:', error);
    res.status(500).json({ error: 'Erro ao buscar cards do Kanbanize' });
  }
});

// Novo endpoint: proxy para obter usuários do Kanbanize
app.get('/api/users', async (req, res) => {
  try {
    const response = await fetch('https://cnc.kanbanize.com/api/v2/users/', {
      headers: {
        accept: 'application/json',
        apikey: process.env.KANBANIZE_API_TOKEN
      }
    });
    const data = await response.json();
    const filtered = data.filter(card => card.workflow_id === 2);
    res.json(filtered);
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
    res.status(500).json({ error: 'Erro ao buscar usuários do Kanbanize' });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Servidor rodando em http://localhost:${PORT}`);
});

