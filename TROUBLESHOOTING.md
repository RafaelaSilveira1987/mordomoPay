# 🔧 Troubleshooting - MordomoPay v3.0

Guia completo para resolver problemas de login e conexão com Supabase.

---

## 🐛 Usar o Painel de Debug

### Como Abrir?

**Opção 1:** Clique no botão 🐛 no canto inferior esquerdo da tela

**Opção 2:** No console do navegador (F12), execute:
```javascript
logger.showDebugPanel();
```

**Opção 3:** Na página de login, clique em "🐛 Debug"

### O Que Você Verá?

- **Últimos 10 logs** em tempo real
- **Timestamps** de cada ação
- **Dados enviados** e recebidos
- **Botões:** Exportar logs e Limpar

---

## 📋 Verificar Credenciais do Supabase

### Passo 1: Abrir o Console (F12)

1. Pressione **F12** no navegador
2. Vá para a aba **"Console"**
3. Execute este comando:

```javascript
logger.testSupabaseConnection(CONFIG.SUPABASE_URL, CONFIG.SUPABASE_KEY);
```

### Passo 2: Verificar Resposta

**Se vir ✅ Conexão com Supabase estabelecida!**
- Suas credenciais estão corretas
- O servidor Supabase está acessível

**Se vir ❌ Erro na conexão com Supabase**
- Verifique se a URL está correta
- Verifique se a chave API está correta
- Confirme que o projeto Supabase está ativo

---

## 🔑 Testar Autenticação

### Passo 1: Abrir o Console (F12)

1. Pressione **F12** no navegador
2. Vá para a aba **"Console"**
3. Execute este comando:

```javascript
logger.testAuthentication(
    CONFIG.SUPABASE_URL, 
    CONFIG.SUPABASE_KEY, 
    'seu@email.com', 
    'sua-senha'
);
```

### Passo 2: Verificar Resposta

**Se vir ✅ Autenticação bem-sucedida!**
- Seu email e senha estão corretos
- O usuário foi criado com sucesso

**Se vir ❌ Falha na autenticação**
- Verifique se o email está correto
- Verifique se a senha está correta
- Confirme que o usuário foi criado no Supabase

---

## 🚨 Erros Comuns e Soluções

### Erro: "SUPABASE_URL não configurado"

**Causa:** As credenciais não foram atualizadas em `js/config.js`

**Solução:**
1. Abra `js/config.js`
2. Procure por:
   ```javascript
   SUPABASE_URL: 'https://seu-projeto.supabase.co',
   SUPABASE_KEY: 'sua-chave-publica-aqui',
   ```
3. Substitua pelos valores reais do seu projeto Supabase
4. Salve o arquivo (Ctrl+S)
5. Recarregue a página (F5)

---

### Erro: "Email ou senha incorretos"

**Possíveis Causas:**
1. Email ou senha digitados errado
2. Usuário não foi criado
3. Banco de dados não foi inicializado

**Solução:**
1. Verifique se digitou email e senha corretamente
2. Tente criar uma nova conta
3. Se não conseguir criar, verifique se as tabelas foram criadas:
   - Acesse Supabase → SQL Editor
   - Execute: `SELECT COUNT(*) FROM usuarios;`
   - Deve retornar um número (mesmo que 0)

---

### Erro: "Não consigo fazer login"

**Passo 1:** Abra o Painel de Debug (🐛)
- Veja os últimos logs
- Procure por mensagens de erro

**Passo 2:** Verifique a conexão com Supabase
```javascript
logger.testSupabaseConnection(CONFIG.SUPABASE_URL, CONFIG.SUPABASE_KEY);
```

**Passo 3:** Verifique as credenciais
```javascript
logger.testAuthentication(CONFIG.SUPABASE_URL, CONFIG.SUPABASE_KEY, 'seu@email.com', 'senha');
```

**Passo 4:** Verifique o console do navegador (F12)
- Procure por mensagens de erro em vermelho
- Copie o erro completo

---

### Erro: "Página em branco"

**Possíveis Causas:**
1. Erro de JavaScript
2. Scripts não carregaram
3. Problema com CSS

**Solução:**
1. Abra o console (F12)
2. Procure por erros em vermelho
3. Copie o erro completo
4. Verifique se todos os arquivos estão no lugar:
   - `js/logger.js`
   - `js/config.js`
   - `js/supabase-client.js`
   - `js/auth-phone.js`
   - `js/app.js`
   - `css/styles.css`

---

### Erro: "Gráficos não aparecem"

**Possíveis Causas:**
1. Chart.js não carregou
2. Sem dados de despesas
3. Erro no navegador

**Solução:**
1. Abra o console (F12)
2. Execute:
   ```javascript
   console.log(typeof Chart);
   ```
3. Se retornar `undefined`, Chart.js não carregou
4. Verifique a conexão com internet
5. Tente limpar o cache (Ctrl+Shift+Delete)

---

## 📱 Login por Celular

### Como Funciona?

1. **Enviar Código:** Clique em "Enviar Código"
2. **Receber Código:** Você receberá um código de 6 dígitos (em desenvolvimento, veja no console)
3. **Verificar Código:** Digite o código e clique em "Verificar Código"
4. **Login:** Você será logado automaticamente

### Testar Localmente

Em desenvolvimento, o código é exibido no console:

1. Abra o console (F12)
2. Procure por: `[SUCCESS] Código gerado para WhatsApp`
3. Copie o código de 6 dígitos
4. Cole no campo de verificação

---

## 📊 Exportar Logs para Análise

### Como Fazer?

1. Abra o Painel de Debug (🐛)
2. Clique em **"📥 Exportar"**
3. Um arquivo JSON será baixado
4. Envie este arquivo para suporte

### O Que Contém?

- Todos os logs da sessão
- Informações do sistema
- Timestamp de cada ação
- Dados enviados/recebidos

---

## 🔍 Verificar Informações do Sistema

### No Console, Execute:

```javascript
logger.showSystemInfo();
```

Você verá:
- Navegador e versão
- Plataforma
- Linguagem
- Timezone
- Disponibilidade de LocalStorage
- Status de cookies
- Status online/offline
- Tempo de execução

---

## 📞 Quando Pedir Ajuda

Tenha em mãos:
1. **Logs exportados** (arquivo JSON)
2. **Mensagem de erro** exata
3. **Passos para reproduzir** o problema
4. **Navegador e versão** que está usando
5. **Credenciais do Supabase** (URL e chave)

---

## 🛠️ Dicas Úteis

### Limpar Cache do Navegador

**Chrome/Edge:**
- Pressione Ctrl+Shift+Delete
- Selecione "Todos os tempos"
- Clique em "Limpar dados"

**Firefox:**
- Pressione Ctrl+Shift+Delete
- Clique em "Limpar Tudo"

### Recarregar Página

- **Recarregar simples:** F5
- **Recarregar sem cache:** Ctrl+Shift+R (Windows) ou Cmd+Shift+R (Mac)

### Abrir Console

- **Chrome/Edge/Firefox:** F12
- **Safari:** Cmd+Option+I

---

## 📝 Checklist de Troubleshooting

- [ ] Verifiquei se as credenciais estão corretas em `js/config.js`
- [ ] Testei a conexão com Supabase (✅ verde)
- [ ] Testei a autenticação (✅ verde)
- [ ] Criei as tabelas no Supabase (executei `schema.sql`)
- [ ] Limpei o cache do navegador
- [ ] Recarreguei a página (Ctrl+Shift+R)
- [ ] Verifiquei o console (F12) procurando por erros
- [ ] Exportei os logs para análise

---

## 🎯 Próximos Passos

Se ainda tiver problemas:

1. **Exportar logs** (botão 📥 no Painel de Debug)
2. **Anotar o erro** exato que aparece
3. **Descrever os passos** que levaram ao erro
4. **Consultar a documentação** do Supabase

---

**Boa sorte! 🚀**

*"Provérbios 22:3 - O prudente vê o perigo e se refugia, mas o inexperiente avança e sofre as consequências."*
