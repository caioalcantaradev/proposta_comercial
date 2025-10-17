# 🚀 Setup do Projeto - WEBuilder

## 📋 Pré-requisitos

- Node.js 18+ instalado
- Navegador moderno
- Editor de código (VS Code recomendado)

## 🛠️ Instalação e Execução

### 1. Clone o Repositório

```bash
git clone [URL_DO_REPOSITORIO]
cd proposta_comercial
```

### 2. Configurar Backend

```bash
cd backend
npm install
npm run dev
```

O backend estará rodando em: `http://localhost:3000`

### 3. Executar Frontend

Abra o arquivo `index.html` no navegador ou use um servidor local.

**Com Live Server (VS Code):**

- Instale a extensão "Live Server"
- Clique com botão direito em `index.html`
- Selecione "Open with Live Server"

**Com Python:**

```bash
python -m http.server 8000
```

Acesse: `http://localhost:8000`

## 🧪 Testando o Sistema

### 1. Teste Básico

1. Abra o frontend (`index.html`)
2. Preencha o formulário
3. Clique em "Gerar Proposta"
4. Copie o link gerado
5. Abra o link em nova aba

### 2. Teste da API

Acesse: `http://localhost:3000/api/propostas`

### 3. Exemplo de Proposta

Acesse: `http://localhost:3000/proposta/exemplo`

## 🔧 Configurações

### Personalizar Contatos

Edite em `backend/src/app/proposta/[id]/page.tsx`:

```typescript
// Linha ~200
href = "https://wa.me/5511999999999"; // Seu WhatsApp
href = "mailto:contato@webuilder.com"; // Seu Email
```

### Personalizar Cores

Edite em `style.css`:

```css
:root {
  --primary-color: #d2f547; // Sua cor primária
  --secondary-color: #1a1a1a; // Sua cor secundária
}
```

## 📱 Deploy

### Frontend (Netlify/Vercel)

1. Faça upload dos arquivos: `index.html`, `style.css`, `script.js`, `images/`
2. Configure o domínio

### Backend (Vercel/Netlify)

1. Conecte o repositório
2. Configure as variáveis de ambiente
3. Deploy automático

## 🐛 Troubleshooting

### Backend não inicia

```bash
cd backend
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### CORS Error

Verifique se o backend está rodando em `http://localhost:3000`

### Link não aparece

1. Abra o console do navegador (F12)
2. Verifique se há erros
3. Teste a API diretamente

## 📞 Suporte

Para problemas ou dúvidas, verifique:

1. Console do navegador (F12)
2. Logs do terminal
3. Status da API em `http://localhost:3000/api/propostas`
