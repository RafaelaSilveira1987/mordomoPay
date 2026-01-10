# 🚀 Setup Supabase - MordomoPay v3.0

Guia passo a passo para configurar o Supabase e começar a usar o MordomoPay.

---

## ✅ Passo 1: Credenciais Já Configuradas

As credenciais do Supabase já foram atualizadas em `js/config.js`:

```javascript
SUPABASE_URL: 'https://fetimotrijqyswrfoyzz.supabase.co'
SUPABASE_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
```

✅ **Pronto para usar!**

---

## ✅ Passo 2: Criar as Tabelas no Supabase

### 2.1 Acessar SQL Editor

1. Acesse: https://app.supabase.com
2. Clique no seu projeto
3. Vá para **SQL Editor** (no menu lateral esquerdo)

### 2.2 Executar Schema

1. Clique em **"New Query"**
2. Abra o arquivo `data/schema.sql` do projeto
3. Copie **TODO** o conteúdo
4. Cole no SQL Editor do Supabase
5. Clique em **"Run"** (ou Ctrl+Enter)

### 2.3 Verificar Tabelas

Depois de executar, você verá no console:

```
Query executed successfully
```

E as tabelas aparecerão em **Table Editor** no menu lateral:
- ✅ `usuarios`
- ✅ `transacoes`
- ✅ `metas_financeiras`
- ✅ `dizimos_ofertas`
- ✅ `logs_acesso`

---

## 🧪 Passo 3: Testar Conexão

### 3.1 Abrir Console

1. Abra `index.html` no navegador
2. Pressione **F12** para abrir o console

### 3.2 Testar Conexão

Cole este comando no console:

```javascript
logger.testSupabaseConnection(CONFIG.SUPABASE_URL, CONFIG.SUPABASE_KEY);
```

**Resposta esperada:**
```
[SUCCESS] ✅ Conexão com Supabase estabelecida!
```

**Se vir erro:**
```
[ERROR] ❌ Falha ao conectar com Supabase
```

Verifique:
- ✅ URL está correta em `js/config.js`
- ✅ Chave está correta em `js/config.js`
- ✅ Projeto Supabase está ativo
- ✅ Conexão com internet está OK

---

## 👤 Passo 4: Criar Primeira Conta

### 4.1 Clique em "Criar conta"

Na página de login, clique em **"Não tem conta? Criar conta"**

### 4.2 Preencha os Dados

- **Nome:** Seu nome completo
- **Email:** seu@email.com
- **Senha:** Mínimo 6 caracteres

### 4.3 Clique em "Criar Conta"

Se tudo estiver OK, você verá:
```
[SUCCESS] Conta criada com sucesso!
```

E será redirecionado para a página de login.

---

## 🔑 Passo 5: Fazer Login

### 5.1 Digite Credenciais

- **Email:** O email que criou
- **Senha:** A senha que definiu

### 5.2 Clique em "Entrar"

Se tudo estiver OK, você verá:
```
[SUCCESS] Login bem-sucedido
```

E será redirecionado para o **Dashboard**.

---

## 📱 Passo 6: Testar Login por Celular (Opcional)

### 6.1 Clique em "📱 Celular"

Na página de login, clique na aba **"📱 Celular"**

### 6.2 Digite Seu Celular

Exemplo: `+55 11 99999-9999`

### 6.3 Clique em "Enviar Código"

Você verá no console:
```
[SUCCESS] Código enviado com sucesso
```

E um código de 6 dígitos será exibido no console.

### 6.4 Copie o Código

Exemplo: `123456`

### 6.5 Cole no Campo

Digite o código no campo de verificação.

### 6.6 Clique em "Verificar Código"

Se tudo estiver OK:
```
[SUCCESS] Login com telefone bem-sucedido
```

---

## 🎯 Passo 7: Explorar o Dashboard

Parabéns! Você está logado! 🎉

Agora você pode:

✅ **Dashboard** - Ver resumo financeiro  
✅ **Transações** - Registrar gastos e receitas  
✅ **Metas** - Criar e acompanhar metas  
✅ **Dízimos** - Calcular e registrar dízimos  
✅ **Dicas** - Ler dicas de saúde financeira  
✅ **Relatórios** - Analisar gastos  

---

## 🐛 Troubleshooting

### Problema: "Não consigo conectar com Supabase"

**Solução:**
1. Verifique se a URL está correta em `js/config.js`
2. Verifique se a chave está correta em `js/config.js`
3. Verifique se o projeto Supabase está ativo
4. Tente em outro navegador

### Problema: "Erro ao criar conta"

**Solução:**
1. Verifique se o email é válido
2. Verifique se a senha tem pelo menos 6 caracteres
3. Verifique se as tabelas foram criadas (execute `schema.sql`)
4. Abra o console (F12) e procure por erros

### Problema: "Erro ao fazer login"

**Solução:**
1. Verifique se o email está correto
2. Verifique se a senha está correta
3. Verifique se a conta foi criada
4. Tente criar uma nova conta

### Problema: "Página em branco"

**Solução:**
1. Abra o console (F12)
2. Procure por erros em vermelho
3. Recarregue a página (Ctrl+Shift+R)
4. Limpe o cache (Ctrl+Shift+Delete)

---

## 📊 Verificar Dados no Supabase

### Ver Usuários Criados

1. Acesse: https://app.supabase.com
2. Vá para **Table Editor**
3. Clique em **`usuarios`**
4. Você verá todos os usuários criados

### Ver Transações

1. Vá para **Table Editor**
2. Clique em **`transacoes`**
3. Você verá todas as transações registradas

### Ver Metas

1. Vá para **Table Editor**
2. Clique em **`metas_financeiras`**
3. Você verá todas as metas criadas

---

## 🔐 Segurança

### Row Level Security (RLS)

O schema SQL já inclui RLS configurado:
- ✅ Usuários só veem seus próprios dados
- ✅ Dados são isolados por usuário
- ✅ Sem risco de vazamento de dados

### Senhas

- ✅ Nunca são salvas em texto plano
- ✅ Supabase usa hash seguro
- ✅ Você nunca verá a senha no banco

---

## 📞 Próximos Passos

1. ✅ Configurar Supabase
2. ✅ Criar as tabelas
3. ✅ Testar conexão
4. ✅ Criar primeira conta
5. ✅ Fazer login
6. ✅ Explorar dashboard
7. ⏭️ Fazer deploy em Vercel/Netlify
8. ⏭️ Integrar com N8N para WhatsApp

---

## 🎓 Dicas Úteis

### Backup de Dados

No Supabase, você pode fazer backup:
1. Vá para **Settings**
2. Clique em **Backups**
3. Clique em **"Create backup now"**

### Exportar Dados

Para exportar dados:
1. Vá para **Table Editor**
2. Clique na tabela
3. Clique em **"Download"** (ícone de seta)

### Resetar Banco

Se quiser resetar tudo:
1. Vá para **SQL Editor**
2. Execute:
   ```sql
   DROP TABLE IF EXISTS logs_acesso CASCADE;
   DROP TABLE IF EXISTS dizimos_ofertas CASCADE;
   DROP TABLE IF EXISTS metas_financeiras CASCADE;
   DROP TABLE IF EXISTS transacoes CASCADE;
   DROP TABLE IF EXISTS usuarios CASCADE;
   ```
3. Execute novamente o `schema.sql`

---

## ✅ Checklist de Setup

- [ ] Acessei https://app.supabase.com
- [ ] Criei as tabelas (executei `schema.sql`)
- [ ] Testei a conexão (✅ verde)
- [ ] Criei primeira conta
- [ ] Fiz login com sucesso
- [ ] Testei login por celular
- [ ] Explorei o dashboard
- [ ] Verifiquei dados no Supabase

---

## 🎉 Pronto!

Seu MordomoPay está totalmente configurado e pronto para usar! 🚀

---

*"Provérbios 22:3 - O prudente vê o perigo e se refugia, mas o inexperiente avança e sofre as consequências."*
