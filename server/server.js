const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 10080;
const CLIENT_URL = process.env.CLIENT_URL || '*';

app.use(cors({ origin: CLIENT_URL }));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('✅ API do Kagestor está no ar!');
});

app.get('/projetos', (req, res) => {
  res.json([
    { id: 1, nome: 'Kanban CNC', status: 'ativo' },
    { id: 2, nome: 'CRM Educacional', status: 'em planejamento' }
  ]);
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
