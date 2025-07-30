const express = require('express');
const axios = require('axios');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 3001;

// Carregar usuários do arquivo JSON
const usuariosPath = path.join(__dirname, 'usuarios-fake.json');
const usuarios = JSON.parse(fs.readFileSync(usuariosPath, 'utf8'));

app.use(cors());
app.use(express.json());

app.get('/api/cards', async (req, res) => {
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

    const cards = response.data.data;

    const cardsComUsuarios = cards.map(card => {
      const usuario = usuarios.find(u => u.user_id === card.owner_user_id);
      return {
        ...card,
        owner_username: usuario ? usuario.username : 'N/A'
      };
    });

    res.json({ data: cardsComUsuarios });

  } catch (error) {
    console.error('Erro ao buscar cards Kanbanize:', error.message);
    res.status(500).json({ error: 'Erro no servidor ao buscar cards' });
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

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});