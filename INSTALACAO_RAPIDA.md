# ⚡ Instalação Rápida - MordomoPay v3.0

Siga estes 5 passos para ter o MordomoPay funcionando em menos de 10 minutos!

---

## 📋 Pré-requisitos

- Conta no [Supabase](https://supabase.com) (gratuita)
- Navegador moderno
- Editor de texto (VS Code, Notepad++, etc)

---

## 🚀 Passo 1: Criar Projeto no Supabase

1. Acesse [supabase.com](https://supabase.com)
2. Clique em **"New Project"**
3. Preencha:
   - **Name:** `MordomoPay`
   - **Database Password:** (escolha uma senha)
   - **Region:** Selecione a mais próxima
4. Clique em **"Create new project"**
5. Aguarde 2-3 minutos até o projeto estar pronto

---

## 🗄️ Passo 2: Criar Tabelas no Banco de Dados

1. No painel do Supabase, vá para **"SQL Editor"**
2. Clique em **"New Query"**
3. Copie todo o conteúdo do arquivo **`data/schema.sql`**
4. Cole na janela de SQL
5. Clique em **"Run"**
6. Aguarde a mensagem de sucesso

---

## 🔑 Passo 3: Copiar Credenciais

1. No painel do Supabase, vá para **"Settings"** → **"API"**
2. Copie os valores:
   - **Project URL** (ex: `https://seu-projeto.supabase.co`)
   - **anon public** (chave pública)

---

## ⚙️ Passo 4: Configurar Credenciais

1. Abra o arquivo **`js/config.js`** em um editor de texto
2. Procure por estas linhas:
   ```javascript
   SUPABASE_URL: 'https://seu-projeto.supabase.co',
   SUPABASE_KEY: 'sua-chave-publica-aqui',
   ```
3. Substitua pelos valores que você copiou no Passo 3
4. Salve o arquivo (Ctrl+S ou Cmd+S)

---

## 🌐 Passo 5: Executar Localmente

Escolha uma das opções:

### Opção A: Python (Mais Simples)
```bash
cd mordomopay-puro-v3
python -m http.server 8000
```
Acesse: `http://localhost:8000`

### Opção B: Live Server (VS Code)
1. Instale a extensão "Live Server"
2. Clique com botão direito em `index.html`
3. Selecione "Open with Live Server"

### Opção C: Node.js
```bash
npm install -g http-server
cd mordomopay-puro-v3
http-server
```
Acesse: `http://localhost:8080`

---

## ✅ Pronto!

Você deve ver a tela de login do MordomoPay!

1. Clique em **"Criar conta"**
2. Preencha email e senha
3. Clique em **"Criar Conta"**
4. Você será redirecionado para o Dashboard

---

## 🎯 Próximos Passos

1. **Explorar o Dashboard** - Veja o resumo financeiro
2. **Criar uma Transação** - Teste a funcionalidade
3. **Criar uma Meta** - Adicione uma meta de economia
4. **Registrar um Dízimo** - Use a calculadora
5. **Ver Relatórios** - Analise seus dados

---

## 🚨 Troubleshooting Rápido

### Erro: "Não consigo fazer login"
- Verifique se as tabelas foram criadas (Passo 2)
- Confirme que copiou as credenciais corretamente (Passo 3-4)

### Erro: "SUPABASE_URL não configurado"
- Verifique se salvou o arquivo `js/config.js`
- Confirme que não há espaços extras nas URLs

### Erro: "Página em branco"
- Abra o console (F12) e veja se há erros
- Verifique a conexão com internet
- Tente limpar o cache do navegador (Ctrl+Shift+Delete)

---

## 📞 Precisa de Ajuda?

Consulte o **`README.md`** para documentação completa!

---

**Divirta-se gerenciando suas finanças com sabedoria cristã! 💰🙏**
