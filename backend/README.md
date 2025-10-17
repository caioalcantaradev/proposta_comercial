# Backend - Sistema de Propostas Comerciais

Backend desenvolvido com Next.js para gerenciar propostas comerciais com validade de 1 semana.

## 🚀 Funcionalidades

- ✅ **API REST** para CRUD de propostas
- ✅ **Banco SQLite** para armazenamento local
- ✅ **Expiração automática** (1 semana)
- ✅ **Página de visualização** das propostas
- ✅ **Validação de dados** completa
- ✅ **CORS configurado** para integração com frontend

## 📦 Instalação

### 1. Instalar dependências
```bash
cd backend
npm install
```

### 2. Configurar variáveis de ambiente
Crie um arquivo `.env.local` na raiz do backend:
```env
NEXT_PUBLIC_BASE_URL=http://localhost:3000
DATABASE_URL=./propostas.db
CORS_ORIGIN=http://localhost:5173
```

### 3. Executar o servidor
```bash
npm run dev
```

O servidor estará rodando em `http://localhost:3000`

## 🔗 Endpoints da API

### GET /api/propostas
Lista todas as propostas ativas
```json
{
  "propostas": [
    {
      "id": "uuid",
      "nomeCliente": "João Silva",
      "projeto": "Site Institucional",
      "valorTotal": 1500,
      "valorPix": "R$ 1.350,00",
      "valorCartao": "R$ 1.650,00",
      "dataProposta": "2024-01-15",
      "validadeProposta": "2024-01-22",
      "garantia": "90 dias",
      "dataCriacao": "2024-01-15T10:00:00.000Z",
      "expiraEm": "2024-01-22T10:00:00.000Z"
    }
  ]
}
```

### POST /api/propostas
Cria uma nova proposta
```json
{
  "nomeCliente": "João Silva",
  "projeto": "Site Institucional",
  "valorTotal": 1500,
  "valorPix": "R$ 1.350,00",
  "valorCartao": "R$ 1.650,00",
  "dataProposta": "2024-01-15",
  "validadeProposta": "2024-01-22",
  "garantia": "90 dias"
}
```

**Resposta:**
```json
{
  "success": true,
  "id": "uuid-gerado",
  "expiraEm": "2024-01-22T10:00:00.000Z",
  "link": "http://localhost:3000/proposta/uuid-gerado"
}
```

### GET /api/propostas/[id]
Busca uma proposta específica por ID

### DELETE /api/propostas/[id]
Remove uma proposta (marca como inativa)

## 📄 Páginas

### /proposta/[id]
Página pública para visualizar a proposta
- Design responsivo
- Tema escuro com acentos verdes
- Informações completas da proposta
- Validação de expiração

## 🗄️ Banco de Dados

### Tabela: propostas
- `id` (TEXT, PRIMARY KEY) - UUID único
- `nomeCliente` (TEXT) - Nome do cliente
- `projeto` (TEXT) - Descrição do projeto
- `valorTotal` (REAL) - Valor total
- `valorPix` (TEXT) - Valor formatado para PIX
- `valorCartao` (TEXT) - Valor formatado para cartão
- `dataProposta` (TEXT) - Data da proposta
- `validadeProposta` (TEXT) - Data de validade
- `garantia` (TEXT) - Período de garantia
- `dataCriacao` (TEXT) - Data de criação
- `expiraEm` (TEXT) - Data de expiração (1 semana)
- `ativo` (INTEGER) - Status ativo/inativo

## 🔄 Integração com Frontend

Para integrar com o frontend atual, substitua o localStorage por chamadas à API:

```javascript
// Antes (localStorage)
localStorage.setItem(`proposta_${dados.id}`, JSON.stringify(dados));

// Depois (API)
const response = await fetch('http://localhost:3000/api/propostas', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(dados)
});
const result = await response.json();
```

## 🛠️ Scripts Disponíveis

- `npm run dev` - Executa em modo desenvolvimento
- `npm run build` - Gera build de produção
- `npm run start` - Executa build de produção
- `npm run lint` - Executa linter

## 📝 Notas Importantes

1. **Expiração**: Propostas expiram automaticamente após 1 semana
2. **Banco SQLite**: Arquivo `propostas.db` é criado automaticamente
3. **CORS**: Configurado para aceitar requisições do frontend
4. **Validação**: Todos os campos obrigatórios são validados
5. **IDs únicos**: Gerados automaticamente com UUID v4
