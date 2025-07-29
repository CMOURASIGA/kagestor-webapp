const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 10080;

app.use(cors());
app.use(express.json());

// Endpoint de teste
app.get('/', (req, res) => {
  res.send('✅ API do Kagestor está no ar!');
});

// Endpoint para simular dados do Kanbanize (será trocado pela integração real)
app.get('/api/cards', (req, res) => {
  res.json({ message: 'Aqui virão os cards do Kanbanize 🚀' });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});