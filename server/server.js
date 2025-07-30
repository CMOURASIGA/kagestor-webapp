const express = require('express');
const axios = require('axios');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const OpenAI = require('openai');

require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 3001;

// Carregar usuários do arquivo JSON
const usuariosPath = path.join(__dirname, 'usuarios-fake.json');
const usuarios = JSON.parse(fs.readFileSync(usuariosPath, 'utf8'));

// Configuração do OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.use(cors());
app.use(express.json());

app.get('/api/cards', async (req, res) => {
  // Adicionado para depuração
  if (!process.env.KANBANIZE_API_TOKEN) {
    console.error('A variável de ambiente KANBANIZE_API_TOKEN não está definida.');
    return res.status(500).json({ 
      error: 'Configuração de servidor incompleta', 
      details: 'A chave da API Kanbanize não foi fornecida no arquivo .env do servidor.' 
    });
  }
  
  try {
    const params = new URLSearchParams({
      board_ids: '1',
      workflow_ids: '2',
      fields: 'card_id,title,description,custom_id,owner_user_id,type_id,size,priority,color,deadline,reporter,created_at,revision,last_modified,in_current_position_since,board_id,workflow_id,column_id,lane_id,section,position,last_column_id,last_lane_id,version_id,archived_at,reason_id,discard_comment,discarded_at,is_blocked,block_reason,current_block_time,current_logged_time,current_cycle_time,child_card_stats,finished_subtask_count,unfinished_subtask_count,comment_count,first_request_time,first_start_time,first_end_time,last_request_time,last_start_time,last_end_time',
      expand: 'custom_fields,stickers,tag_ids,co_owner_ids,watcher_ids,attachments,cover_image,checked_column_checklist_items,initiative_details,annotations,subtasks,linked_cards,transitions,block_times,logged_times,logged_times_for_child_cards,lead_time_per_column,outcomes,outcome_current_values'
    });

    const response = await axios.get(`https://cnc.kanbanize.com/api/v2/cards?${params.toString()}`, {
      headers: {
        apikey: process.env.KANBANIZE_API_TOKEN
      }
    });

    // Log da estrutura da resposta para depuração
    console.log('Estrutura da resposta da API Kanbanize:', JSON.stringify(response.data, null, 2));
    
    // Extrair dados de forma mais robusta
    let cardsData = [];
    
    if (response.data && response.data.data) {
      if (Array.isArray(response.data.data)) {
        cardsData = response.data.data;
      } else if (response.data.data.data && Array.isArray(response.data.data.data)) {
        cardsData = response.data.data.data;
      } else {
        console.warn('Estrutura de dados inesperada na resposta da API Kanbanize');
        cardsData = [];
      }
    } else {
      console.warn('Resposta da API Kanbanize não contém dados esperados');
      cardsData = [];
    }

    console.log(`Número de cards encontrados: ${cardsData.length}`);

    const cardsComUsuarios = cardsData.map(card => {
      const usuario = usuarios.find(u => u.id === card.owner_user_id);
      return {
        ...card,
        owner_username: usuario ? usuario.username : 'N/A'
      };
    });

    res.json({ data: cardsComUsuarios });

  } catch (error) {
    console.error('Erro detalhado ao buscar cards Kanbanize:', error);

    const errorDetails = error.response?.data?.error?.details || error.response?.data || error.message;

    if (error.response) {
      console.error('Data:', error.response.data);
      console.error('Status:', error.response.status);
      console.error('Headers:', error.response.headers);
    } else if (error.request) {
      console.error('Request:', error.request);
    } else {
      console.error('Error', error.message);
    }
    res.status(500).json({
      error: 'Erro no servidor ao buscar cards',
      details: errorDetails
    });
  }
});

app.get('/api/users', (req, res) => {
  try {
    res.json(usuarios);
  } catch (error) {
    console.error('Erro ao buscar usuários Kanbanize (fake):', error.message);
    res.status(500).json({ error: 'Erro no servidor ao buscar usuários' });
  }
});

// Novo endpoint para gerar resumo com OpenAI
app.post('/api/summarize', async (req, res) => {
  const { card } = req.body;

  if (!card) {
    return res.status(400).json({ error: 'Dados do card não fornecidos.' });
  }
  
  if (!process.env.OPENAI_API_KEY) {
    return res.status(500).json({ error: 'A chave da API da OpenAI não foi configurada no servidor.' });
  }

  try {
    // Remove tags HTML da descrição para limpar o texto
    const cleanDescription = card.description ? card.description.replace(/<[^>]*>/g, ' ') : 'Nenhuma';

    const prompt = `
      Você é um assistente de gerenciamento de projetos. Sua tarefa é criar um resumo claro e conciso de um card do Kanban.
      A resposta deve ser em português do Brasil.
      O resumo deve ser fácil de entender para qualquer pessoa da equipe, focando nos pontos mais importantes.
      
      Aqui estão os detalhes do card:
      - Título: ${card.title}
      - Descrição: ${cleanDescription}
      - Prioridade: ${card.priority || 'Não definida'}
      - Responsável: ${card.owner_username || 'Não atribuído'}
      - Prazo Final: ${card.deadline ? new Date(card.deadline).toLocaleDateString('pt-BR') : 'Não definido'}

      Com base nesses dados, gere um resumo objetivo em um único parágrafo.
    `;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "system", content: prompt }],
      temperature: 0.5, // Um pouco de criatividade, mas ainda focado
      max_tokens: 150, // Limita o tamanho do resumo
    });

    const summary = completion.choices[0].message.content.trim();
    res.json({ summary });

  } catch (error) {
    console.error('Erro ao gerar resumo com OpenAI:', error);
    res.status(500).json({ error: 'Falha ao se comunicar com a API da OpenAI.' });
  }
});


app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});