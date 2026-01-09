# ⚡ Debug Rápido - Login MordomoPay

Solução rápida para problemas de login em 3 passos!

---

## 🚨 Problema: "Não consigo fazer login"

### Passo 1: Abrir Console (F12)

Pressione `F12` no navegador e vá para a aba **"Console"**

### Passo 2: Testar Conexão

Cole este comando e pressione Enter:

```javascript
logger.testSupabaseConnection(CONFIG.SUPABASE_URL, CONFIG.SUPABASE_KEY);
```

**Você verá:**
- ✅ `[SUCCESS] ✅ Conexão com Supabase estabelecida!` → Tudo OK!
- ❌ `[ERROR] ❌ Falha ao conectar com Supabase` → Verifique as credenciais

### Passo 3: Testar Autenticação

Cole este comando (substitua pelos seus dados):

```javascript
logger.testAuthentication(
    CONFIG.SUPABASE_URL, 
    CONFIG.SUPABASE_KEY, 
    'seu@email.com', 
    'sua-senha'
);
```

**Você verá:**
- ✅ `[SUCCESS] ✅ Autenticação bem-sucedida!` → Usuário existe!
- ❌ `[ERROR] ❌ Falha na autenticação` → Email/senha incorretos

---

## 🔧 Se Não Funcionar

### Erro: "SUPABASE_URL não configurado"

**Solução:**
1. Abra `js/config.js`
2. Procure por:
   ```javascript
   SUPABASE_URL: 'https://seu-projeto.supabase.co',
   SUPABASE_KEY: 'sua-chave-publica-aqui',
   ```
3. Substitua pelos valores reais
4. Salve (Ctrl+S)
5. Recarregue a página (Ctrl+Shift+R)

### Erro: "Email ou senha incorretos"

**Solução:**
1. Verifique se o email está correto
2. Verifique se a senha está correta
3. Tente criar uma nova conta
4. Se não conseguir criar, as tabelas não foram criadas

### Erro: "Página em branco"

**Solução:**
1. Abra o console (F12)
2. Procure por erros em vermelho
3. Copie o erro completo
4. Recarregue sem cache (Ctrl+Shift+R)

---

## 📱 Login por Celular

### Como Testar?

1. Clique em "📱 Celular" na página de login
2. Digite seu celular: `+55 11 99999-9999`
3. Clique em "Enviar Código"
4. Abra o console (F12)
5. Procure por: `[SUCCESS] Código gerado para WhatsApp`
6. Copie o código de 6 dígitos
7. Cole no campo de verificação
8. Clique em "Verificar Código"

---

## 🐛 Abrir Painel de Debug

### Opção 1: Botão 🐛
Clique no botão 🐛 no canto inferior esquerdo

### Opção 2: Console
```javascript
logger.showDebugPanel();
```

### O Que Você Verá?
- Últimos 10 logs
- Botão "📥 Exportar" para baixar logs
- Botão "🗑️ Limpar" para limpar logs

---

## 📊 Exportar Logs

### Como Fazer?

1. Abra o Painel de Debug (🐛)
2. Clique em "📥 Exportar"
3. Um arquivo JSON será baixado
4. Envie este arquivo para suporte

---

## ✅ Checklist Rápido

- [ ] Abri o console (F12)
- [ ] Testei a conexão com Supabase (✅ verde)
- [ ] Testei a autenticação (✅ verde)
- [ ] Verifiquei as credenciais em `js/config.js`
- [ ] Recarreguei a página sem cache (Ctrl+Shift+R)
- [ ] Limpei o cache (Ctrl+Shift+Delete)

---

## 🎯 Próximos Passos

Se tudo estiver ✅ verde:
1. Criar uma conta
2. Fazer login
3. Explorar o dashboard

Se ainda tiver problemas:
1. Exportar logs (📥)
2. Consultar `TROUBLESHOOTING.md`
3. Consultar `CONSOLE_LOGS.md`

---

**Boa sorte! 🚀**
