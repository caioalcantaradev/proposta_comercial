# 🚀 WEBuilder - Gerador de Proposta Comercial

Sistema completo para geração de propostas comerciais personalizadas com landing pages automáticas.

## 📋 Funcionalidades

- ✅ **Formulário de Proposta**: Interface intuitiva para criação de propostas
- ✅ **Cálculos Automáticos**: PIX (10% desconto) e Cartão (10% acréscimo)
- ✅ **Validade Automática**: 7 dias a partir da data da proposta
- ✅ **Landing Page Personalizada**: Proposta profissional para cada cliente
- ✅ **Backend Completo**: API REST com banco de dados SQLite
- ✅ **Design Responsivo**: Funciona em desktop e mobile

## 🛠️ Tecnologias

### Frontend
- HTML5, CSS3, JavaScript (Vanilla)
- Fonte: Syne
- Cores: Verde limão (#D2F547) + tons de cinza

### Backend
- Next.js 14
- React 18
- TypeScript
- SQLite
- Tailwind CSS

## 🚀 Como Usar

### 1. Configuração do Backend

```bash
cd backend
npm install
npm run dev
```

O backend estará rodando em: `http://localhost:3000`

### 2. Configuração do Frontend

Abra o arquivo `index.html` no navebador ou use um servidor local (Live Server).

### 3. Criando uma Proposta

1. Preencha o formulário com os dados do cliente
2. Clique em "Gerar Proposta"
3. Copie o link gerado
4. Envie para o cliente

### 4. Visualizando a Proposta

O cliente acessa o link e vê uma landing page profissional com:
- Detalhes do projeto
- Valores e formas de pagamento
- Botões de contato (WhatsApp/Email)
- Design responsivo

## 📁 Estrutura do Projeto

```
proposta_comercial/
├── 📄 index.html          # Formulário gerador
├── 🎨 style.css           # Estilos do frontend
├── ⚡ script.js           # Lógica do frontend
├── 📁 images/             # Logo e favicon
├── 📁 backend/            # API e landing page
│   ├── 📁 src/app/
│   │   ├── 📁 api/        # Endpoints da API
│   │   └── 📁 proposta/   # Landing pages
│   └── 📄 package.json
└── 📄 README.md
```

## 🔧 API Endpoints

- `GET /api/propostas` - Listar todas as propostas
- `POST /api/propostas` - Criar nova proposta
- `GET /api/propostas/[id]` - Buscar proposta por ID
- `DELETE /api/propostas/[id]` - Deletar proposta

## 🎨 Personalização

### Cores
Edite as variáveis CSS em `style.css`:
```css
:root {
  --primary-color: #d2f547;
  --secondary-color: #1a1a1a;
}
```

### Contatos
Atualize os links de contato em `backend/src/app/proposta/[id]/page.tsx`:
```typescript
href="https://wa.me/5511999999999"  // WhatsApp
href="mailto:contato@webuilder.com" // Email
```

## 📱 Responsividade

O sistema é totalmente responsivo e funciona em:
- ✅ Desktop
- ✅ Tablet
- ✅ Mobile

## 🔒 Segurança

- Validação de dados no frontend e backend
- Sanitização de inputs
- Validação de datas e valores
- CORS configurado

## 📄 Licença

Este projeto é de uso pessoal/comercial.

## 🤝 Suporte

Para dúvidas ou sugestões, entre em contato.

---

**Desenvolvido com ❤️ para WEBuilder**