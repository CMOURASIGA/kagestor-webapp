const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Configuração CORS melhorada para desenvolvimento e produção
app.use(cors({
  origin: [
    'https://kagestor-webapp.onrender.com', 
    'http://localhost:3000',
    'http://localhost:5173',
    process.env.CLIENT_URL
  ].filter(Boolean),
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'apikey']
}));

app.get('/', (req, res) => {
  res.send('✅ API do Kagestor está no ar!');
});

app.get('/api/cards', async (req, res) => {
  try {
    console.log('🔄 Buscando dados da API do Kanbanize...');
    console.log('📍 URL:', process.env.KANBANIZE_API_URL);
    
    const response = await axios.get(process.env.KANBANIZE_API_URL, {
      headers: {
        'accept': 'application/json',
        'apikey': process.env.KANBANIZE_API_TOKEN
      },
      timeout: 10000 // 10 segundos de timeout
    });
    
    console.log('✅ Dados recebidos com sucesso');
    console.log('📊 Total de registros:', response.data?.data?.data?.length || 0);
    
    res.json(response.data);
  } catch (error) {
    console.error('❌ Erro ao buscar dados da API do Kanbanize:');
    console.error('📝 Mensagem:', error.message);
    console.error('🔍 Status:', error.response?.status);
    console.error('📄 Dados:', error.response?.data);
    
    res.status(500).json({ 
      error: 'Erro ao buscar dados da API do Kanbanize',
      details: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});