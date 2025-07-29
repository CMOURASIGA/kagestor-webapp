// Serviço para chamada à API do Kanbanize
const API_URL = 'https://kagestor-webapp-api.onrender.com/api/cards';

// Dados mock para desenvolvimento local
const mockCards = [
  {
    card_id: 1,
    title: "Implementar autenticação de usuários",
    description: "Criar sistema de login e registro para a aplicação",
    color: "#3B82F6",
    priority: "High",
    reporter: { value: "João Silva" },
    created_at: "2024-01-15T10:30:00Z",
    owner_user_id: "joao.silva",
    current_cycle_time: 5,
    column_id: 88
  },
  {
    card_id: 2,
    title: "Otimizar performance do dashboard",
    description: "Melhorar tempo de carregamento dos gráficos e métricas",
    color: "#EF4444",
    priority: "Critical",
    reporter: { value: "Maria Santos" },
    created_at: "2024-01-16T14:20:00Z",
    owner_user_id: "maria.santos",
    current_cycle_time: 3,
    column_id: 89
  },
  {
    card_id: 3,
    title: "Documentar API endpoints",
    description: "Criar documentação completa da API REST",
    color: "#10B981",
    priority: "Medium",
    reporter: { value: "Pedro Costa" },
    created_at: "2024-01-17T09:15:00Z",
    owner_user_id: "pedro.costa",
    current_cycle_time: 2,
    column_id: 90
  },
  {
    card_id: 4,
    title: "Implementar testes unitários",
    description: "Adicionar cobertura de testes para componentes críticos",
    color: "#F59E0B",
    priority: "Low",
    reporter: { value: "Ana Oliveira" },
    created_at: "2024-01-18T16:45:00Z",
    owner_user_id: "ana.oliveira",
    current_cycle_time: 7,
    column_id: 88
  },
  {
    card_id: 5,
    title: "Configurar CI/CD pipeline",
    description: "Automatizar deploy e testes da aplicação",
    color: "#8B5CF6",
    priority: "Medium",
    reporter: { value: "Carlos Lima" },
    created_at: "2024-01-19T11:30:00Z",
    owner_user_id: "carlos.lima",
    current_cycle_time: 4,
    column_id: 89
  }
];

export const getCards = async () => {
  try {
    console.log('🔄 Fetching cards from:', API_URL);
    
    // Tentar API real primeiro
    const response = await fetch(API_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include'
    });
    
    console.log('📡 Response status:', response.status);
    console.log('📡 Response ok:', response.ok);
    
    if (!response.ok) {
      console.warn('⚠️ API não disponível, usando dados mock para desenvolvimento');
      return mockCards;
    }
    
    const json = await response.json();
    console.log('📦 Received data structure:', {
      hasData: !!json.data,
      hasNestedData: !!json.data?.data,
      dataLength: json.data?.data?.length || 0
    });
    
    // Validação robusta da estrutura de dados
    const cards = json.data?.data || json.data || [];
    console.log('✅ Cards processed:', cards.length);
    
    return Array.isArray(cards) ? cards : mockCards;
  } catch (error) {
    console.warn('⚠️ Erro ao conectar com API, usando dados mock:', error.message);
    console.log('🔧 Usando dados de desenvolvimento para demonstração');
    return mockCards;
  }
};

