const axios = require('axios');

// Simular uma resposta da API Kanbanize com a estrutura aninhada
const mockResponse = {
  data: {
    pagination: { 
      all_pages: 1, 
      current_page: 1, 
      results_per_page: 200 
    },
    data: [
      {
        card_id: 1,
        title: "Card de Teste 1",
        description: "Descrição do card 1",
        owner_user_id: 2,
        type_id: 1,
        priority: "High"
      },
      {
        card_id: 2,
        title: "Card de Teste 2", 
        description: "Descrição do card 2",
        owner_user_id: 4,
        type_id: 2,
        priority: "Medium"
      }
    ]
  }
};

console.log('Estrutura da resposta simulada:');
console.log(JSON.stringify(mockResponse, null, 2));

// Testar a lógica de extração de dados
let cardsData = [];

if (mockResponse.data && mockResponse.data.data) {
  if (Array.isArray(mockResponse.data.data)) {
    cardsData = mockResponse.data.data;
    console.log('\n✅ Dados extraídos com sucesso usando response.data.data');
  } else if (mockResponse.data.data.data && Array.isArray(mockResponse.data.data.data)) {
    cardsData = mockResponse.data.data.data;
    console.log('\n✅ Dados extraídos com sucesso usando response.data.data.data');
  } else {
    console.log('\n❌ Estrutura de dados inesperada');
    cardsData = [];
  }
} else {
  console.log('\n❌ Resposta não contém dados esperados');
  cardsData = [];
}

console.log(`\nNúmero de cards encontrados: ${cardsData.length}`);
console.log('Cards extraídos:', cardsData);

