# 💰 MordomoPay v3.0 - Gestão Cristã de Finanças

Sistema de controle financeiro cristão 100% puro em **HTML/CSS/JavaScript vanilla** com autenticação e banco de dados Supabase.

---

## 🎯 Características

✅ **Autenticação Completa** - Login/Registro com Supabase  
✅ **Dashboard Inteligente** - Resumo financeiro em tempo real  
✅ **Gerenciamento de Transações** - CRUD completo com filtros  
✅ **Metas Financeiras** - Acompanhamento com progresso visual  
✅ **Calculadora de Dízimos** - Cálculo automático e histórico  
✅ **Dicas de Saúde Financeira** - 8 dicas com versículos  
✅ **Relatórios Avançados** - Gráficos e análises mensais  
✅ **Design Responsivo** - Mobile, Tablet e Desktop  
✅ **Sem Frameworks** - Apenas HTML/CSS/JavaScript puro  
✅ **Minimalista Cristão** - Design elegante e profissional  

---

## 📋 Requisitos

- Conta Supabase (gratuita)
- Navegador moderno (Chrome, Firefox, Safari, Edge)
- Conexão com internet

---

## 🚀 Instalação Rápida

### 1. Clonar ou Descompactar o Projeto

```bash
# Se for ZIP
unzip mordomopay-puro-v3.zip
cd mordomopay-puro-v3

# Se for Git
git clone seu-repositorio
cd mordomopay-puro-v3
```

### 2. Configurar Supabase

#### 2.1 Criar Projeto no Supabase

1. Acesse [supabase.com](https://supabase.com)
2. Clique em "New Project"
3. Preencha os dados:
   - **Name:** MordomoPay
   - **Database Password:** (escolha uma senha forte)
   - **Region:** Selecione a mais próxima

#### 2.2 Criar Tabelas

1. Vá para "SQL Editor"
2. Cole o conteúdo do arquivo `data/schema.sql`
3. Clique em "Run"

#### 2.3 Copiar Credenciais

1. Vá para "Settings" → "API"
2. Copie:
   - **Project URL** → `SUPABASE_URL`
   - **anon public** → `SUPABASE_KEY`

### 3. Configurar Credenciais

Edite o arquivo `js/config.js`:

```javascript
const CONFIG = {
    SUPABASE_URL: 'https://seu-projeto.supabase.co',
    SUPABASE_KEY: 'sua-chave-publica-aqui',
    // ... resto da config
};
```

### 4. Executar Localmente

**Opção 1: Python (mais simples)**
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

**Opção 2: Node.js**
```bash
# Instalar http-server
npm install -g http-server

# Executar
http-server
```

**Opção 3: Live Server (VS Code)**
- Instale a extensão "Live Server"
- Clique com botão direito em `index.html`
- Selecione "Open with Live Server"

Acesse: `http://localhost:8000`

---

## 📱 Funcionalidades Detalhadas

### Dashboard
- Resumo de receitas, despesas, saldo e saúde financeira
- Metas ativas com progresso visual
- Versículos motivacionais
- Dicas de saúde financeira

### Transações
- Listar todas as transações
- Filtrar por tipo (entrada/saída) e categoria
- Criar nova transação
- Editar transação existente
- Excluir transação com confirmação
- Totalizadores de entrada, saída e saldo

### Metas
- Criar metas financeiras
- Acompanhar progresso com barra visual
- Alimentar metas progressivamente
- Editar e excluir metas
- Celebração ao atingir 100%

### Dízimos
- Calculadora automática de dízimo
- Registrar dízimos e ofertas
- Histórico de dízimos e ofertas
- Totalizadores por tipo

### Dicas
- 8 dicas de saúde financeira
- Filtrar por categoria (9 categorias)
- Versículos relacionados a cada dica

### Relatórios
- Seletor de período (1, 3, 6 ou 12 meses)
- Gráfico de distribuição de despesas (Doughnut Chart)
- Histórico mensal com detalhes
- KPIs: Renda, Despesas, Saldo, Dízimos

---

## 🗄️ Estrutura do Banco de Dados

### Tabela: usuarios
```sql
id (UUID) - Chave primária
email (string) - Email do usuário
nome (string) - Nome completo
criado_em (timestamp) - Data de criação
```

### Tabela: transacoes
```sql
id (UUID) - Chave primária
usuario_id (UUID) - FK para usuarios
descricao (string) - Descrição da transação
tipo (string) - 'entrada' ou 'saida'
categoria (string) - Categoria da transação
valor (decimal) - Valor da transação
data (date) - Data da transação
criado_em (timestamp) - Data de criação
```

### Tabela: metas_financeiras
```sql
id (UUID) - Chave primária
usuario_id (UUID) - FK para usuarios
nome (string) - Nome da meta
valor_alvo (decimal) - Valor alvo
valor_atual (decimal) - Valor atual
categoria (string) - Categoria da meta
data_limite (date) - Data limite
status (string) - 'ativa' ou 'concluida'
criado_em (timestamp) - Data de criação
```

### Tabela: dizimos_ofertas
```sql
id (UUID) - Chave primária
usuario_id (UUID) - FK para usuarios
valor (decimal) - Valor do dízimo/oferta
tipo (string) - 'dizimo' ou 'oferta'
descricao (string) - Descrição
data (date) - Data do dízimo/oferta
criado_em (timestamp) - Data de criação
```

---

## 🔐 Segurança

- **Autenticação:** Supabase Auth (email/senha)
- **Autorização:** Row Level Security (RLS) no Supabase
- **Isolamento:** Cada usuário vê apenas seus dados
- **HTTPS:** Recomendado em produção
- **Validação:** Frontend e backend

---

## 📦 Deploy

### Vercel (Recomendado)
```bash
# 1. Fazer login
vercel login

# 2. Deploy
vercel

# 3. Configurar variáveis de ambiente
# Adicione SUPABASE_URL e SUPABASE_KEY no Vercel
```

### Netlify
```bash
# 1. Fazer login
netlify login

# 2. Deploy
netlify deploy --prod --dir .
```

### GitHub Pages
```bash
# 1. Criar repositório
# 2. Push dos arquivos
# 3. Ativar GitHub Pages nas configurações
```

### Seu Servidor
```bash
# 1. Copiar arquivos para o servidor
scp -r mordomopay-puro-v3/* usuario@seu-servidor:/var/www/html/

# 2. Configurar HTTPS (Let's Encrypt)
# 3. Acessar via seu domínio
```

---

## 🛠️ Troubleshooting

### Erro: "SUPABASE_URL não configurado"
- Verifique se editou `js/config.js`
- Confirme que copiou a URL correta do Supabase

### Erro: "Não consigo fazer login"
- Verifique se as tabelas foram criadas no Supabase
- Confirme que a autenticação está ativada no Supabase
- Verifique o console do navegador (F12) para mais detalhes

### Erro: "Dados não aparecem"
- Verifique se o usuário está logado
- Confirme que há dados no banco de dados
- Verifique as permissões RLS no Supabase

### Erro: "Gráficos não aparecem"
- Verifique se Chart.js foi carregado (F12 → Network)
- Confirme que há dados de despesas

---

## 📚 Tecnologias

- **Frontend:** HTML5, CSS3, JavaScript (ES6+)
- **Backend:** Supabase (PostgreSQL + Auth)
- **Gráficos:** Chart.js 4.4.0
- **Autenticação:** Supabase Auth
- **Armazenamento:** Supabase PostgreSQL

---

## 📄 Arquivos Principais

```
mordomopay-puro-v3/
├── index.html              # Página principal (7 páginas + modais)
├── css/
│   └── styles.css          # Estilos (550 linhas)
├── js/
│   ├── config.js           # Configurações (300 linhas)
│   ├── supabase-client.js  # Cliente Supabase (250 linhas)
│   └── app.js              # Lógica principal (1200 linhas)
├── data/
│   └── schema.sql          # Schema do banco de dados
└── README.md               # Este arquivo
```

**Total: 2.728 linhas de código puro!**

---

## 🎨 Customização

### Alterar Cores

Edite `css/styles.css`:

```css
:root {
    --primary: #1e3a8a;        /* Azul primário */
    --secondary: #6b7e3a;      /* Verde oliva */
    --accent: #d4af37;         /* Ouro */
    --success: #10b981;        /* Verde */
    --danger: #ef4444;         /* Vermelho */
    /* ... mais cores */
}
```

### Adicionar Dicas

Edite `js/config.js`:

```javascript
TIPS: [
    {
        id: 9,
        title: "Sua Nova Dica",
        category: "Categoria",
        icon: "🎯",
        content: "Descrição da dica...",
        verse: "Versículo relacionado..."
    },
    // ... mais dicas
]
```

### Adicionar Categorias

Edite `js/config.js`:

```javascript
TRANSACTION_CATEGORIES: [
    'Alimentação',
    'Sua Categoria',
    // ... mais categorias
]
```

---

## 📞 Suporte

Para dúvidas ou problemas:

1. Consulte a seção **Troubleshooting**
2. Verifique o console do navegador (F12)
3. Confira a documentação do Supabase
4. Abra uma issue no GitHub

---

## 📝 Licença

Este projeto é fornecido como está, para uso pessoal e educacional.

---

## 🙏 Créditos

Desenvolvido com ❤️ para gestão cristã de finanças.

**Versão:** 3.0.0  
**Última atualização:** Janeiro 2026  
**Status:** Pronto para produção ✅

---

*"Provérbios 22:3 - O prudente vê o perigo e se refugia, mas o inexperiente avança e sofre as consequências."*
