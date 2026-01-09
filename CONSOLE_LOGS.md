# 📊 Guia de Console Logs - MordomoPay v3.0

Entenda todos os logs que aparecem no console do navegador para facilitar o debug.

---

## 🎯 Como Abrir o Console

- **Chrome/Edge/Firefox:** Pressione `F12`
- **Safari:** Pressione `Cmd+Option+I`
- **Alternativa:** Clique com botão direito → "Inspecionar" → Aba "Console"

---

## 📝 Tipos de Logs

### ✅ INFO (Azul)
Informações gerais sobre ações do sistema.

**Exemplo:**
```
[INFO] Iniciando login
[INFO] Testando conexão com Supabase
[INFO] Enviando código via WhatsApp
```

### ✅ SUCCESS (Verde)
Ações completadas com sucesso.

**Exemplo:**
```
[SUCCESS] Login bem-sucedido
[SUCCESS] Código enviado com sucesso
[SUCCESS] Conexão com Supabase estabelecida!
```

### ⚠️ WARN (Amarelo)
Avisos sobre possíveis problemas.

**Exemplo:**
```
[WARN] Telefone vazio
[WARN] Código inválido
```

### ❌ ERROR (Vermelho)
Erros que impedem a execução.

**Exemplo:**
```
[ERROR] Erro no login
[ERROR] Exceção ao fazer login
[ERROR] Falha ao conectar com Supabase
```

### 🔍 DEBUG (Verde Oliva)
Informações detalhadas para debug.

**Exemplo:**
```
[DEBUG] Enviando requisição de login
[DEBUG] Resposta recebida
[DEBUG] Dados: {...}
```

---

## 🚀 Fluxo de Login (O Que Você Deve Ver)

### 1. Ao Abrir a Página

```
[INFO] 🚀 MordomoPay iniciado
[INFO] === INFORMAÇÕES DO SISTEMA ===
[INFO] Navegador: Mozilla/5.0...
[INFO] Plataforma: Linux
[INFO] Linguagem: pt-BR
[INFO] Timezone: America/Sao_Paulo
[INFO] LocalStorage: ✅ Disponível
[INFO] SessionStorage: ✅ Disponível
[INFO] Cookies: ✅ Ativados
[INFO] Online: ✅ Online
[INFO] Logs Armazenados: 0
[INFO] Tempo de Execução: 0.15s
[SUCCESS] PhoneAuth inicializado
[SUCCESS] Auth Helpers carregado
```

### 2. Ao Clicar em "Entrar" (Email)

```
[INFO] Iniciando login
[DEBUG] Enviando requisição de login
[DEBUG] Resposta recebida (status: 200)
[SUCCESS] Login bem-sucedido
```

**OU (se houver erro):**

```
[INFO] Iniciando login
[DEBUG] Enviando requisição de login
[ERROR] Erro no login
[ERROR] Email ou senha incorretos
```

### 3. Ao Enviar Código (Celular)

```
[INFO] Iniciando envio de código para login
[INFO] Enviando código via WhatsApp
[DEBUG] Telefone validado
[SUCCESS] Código gerado para WhatsApp
[SUCCESS] Código enviado com sucesso
```

### 4. Ao Verificar Código

```
[INFO] Verificando código de login
[DEBUG] Verificando código
[SUCCESS] Código verificado com sucesso!
[INFO] Fazendo login com telefone
[SUCCESS] Login com telefone bem-sucedido
```

---

## 🔧 Comandos Úteis no Console

### Testar Conexão com Supabase

```javascript
logger.testSupabaseConnection(CONFIG.SUPABASE_URL, CONFIG.SUPABASE_KEY);
```

**Resposta esperada:**
```
[INFO] Testando conexão com Supabase
[DEBUG] Enviando requisição...
[SUCCESS] ✅ Conexão com Supabase estabelecida!
```

### Testar Autenticação

```javascript
logger.testAuthentication(
    CONFIG.SUPABASE_URL, 
    CONFIG.SUPABASE_KEY, 
    'seu@email.com', 
    'sua-senha'
);
```

**Resposta esperada (sucesso):**
```
[INFO] Testando autenticação
[DEBUG] Enviando requisição...
[SUCCESS] ✅ Autenticação bem-sucedida!
```

**Resposta esperada (erro):**
```
[INFO] Testando autenticação
[DEBUG] Enviando requisição...
[ERROR] ❌ Falha na autenticação
[ERROR] Email ou senha incorretos
```

### Exibir Informações do Sistema

```javascript
logger.showSystemInfo();
```

### Obter Todos os Logs

```javascript
logger.getLogs();
```

### Limpar Logs

```javascript
logger.clear();
```

### Exportar Logs

```javascript
logger.export();
```

---

## 🐛 Problemas Comuns e Logs Esperados

### Problema: "Não consigo fazer login"

**Logs que você verá:**

```
[INFO] Iniciando login
[DEBUG] Enviando requisição de login
[ERROR] Erro no login
[ERROR] Email ou senha incorretos
```

**O que fazer:**
1. Verifique se o email está correto
2. Verifique se a senha está correta
3. Tente criar uma nova conta
4. Execute: `logger.testAuthentication(...)`

---

### Problema: "Página em branco"

**Logs que você verá:**

```
[ERROR] Erro não capturado
[ERROR] TypeError: Cannot read property 'appendChild' of null
```

**O que fazer:**
1. Verifique se todos os arquivos estão no lugar
2. Recarregue a página (Ctrl+Shift+R)
3. Limpe o cache (Ctrl+Shift+Delete)

---

### Problema: "Não consigo conectar com Supabase"

**Logs que você verá:**

```
[INFO] Testando conexão com Supabase
[ERROR] ❌ Falha ao conectar com Supabase
[ERROR] Erro: Failed to fetch
```

**O que fazer:**
1. Verifique a URL do Supabase em `js/config.js`
2. Verifique a conexão com internet
3. Verifique se o projeto Supabase está ativo
4. Tente em outro navegador

---

### Problema: "Código não é aceito"

**Logs que você verá:**

```
[INFO] Verificando código de login
[DEBUG] Verificando código
[ERROR] Código inválido
```

**O que fazer:**
1. Copie o código exato que aparece no console
2. Cole sem espaços
3. Verifique se tem exatamente 6 dígitos
4. Tente enviar um novo código

---

## 📊 Estrutura de um Log

Cada log contém:

```javascript
{
    timestamp: "10:21:14",           // Hora exata
    elapsed: "1.23s",                // Tempo desde o início
    level: "INFO",                   // Tipo (INFO, SUCCESS, WARN, ERROR, DEBUG)
    message: "Iniciando login",      // Mensagem
    data: { email: "user@..." },     // Dados adicionais
    url: "http://localhost:8000",    // URL da página
    userAgent: "Mozilla/5.0..."      // Navegador
}
```

---

## 🎯 Checklist de Debug

- [ ] Abri o console (F12)
- [ ] Verifiquei se há erros em vermelho
- [ ] Copiei a mensagem de erro exata
- [ ] Testei a conexão com Supabase
- [ ] Testei a autenticação
- [ ] Verifiquei as credenciais em `js/config.js`
- [ ] Exportei os logs
- [ ] Limpei o cache do navegador
- [ ] Recarreguei a página (Ctrl+Shift+R)

---

## 📞 Quando Pedir Ajuda

Tenha em mãos:

1. **Logs exportados** (arquivo JSON)
   ```javascript
   logger.export();
   ```

2. **Mensagem de erro** exata do console
3. **Passos para reproduzir** o problema
4. **Navegador e versão** que está usando
5. **Credenciais do Supabase** (URL e chave)

---

## 🔒 Privacidade

Os logs contêm:
- ✅ Informações técnicas
- ✅ Mensagens de erro
- ✅ Timestamps
- ❌ Senhas (nunca são registradas)
- ❌ Tokens de sessão (nunca são registrados)

---

## 🎓 Exemplos Práticos

### Exemplo 1: Login Bem-Sucedido

```
[INFO] 10:21:14 (+0.00s) Iniciando login
[DEBUG] 10:21:14 (+0.05s) Enviando requisição de login
[DEBUG] 10:21:15 (+1.02s) Resposta recebida (status: 200)
[SUCCESS] 10:21:15 (+1.03s) Login bem-sucedido
```

### Exemplo 2: Erro de Conexão

```
[INFO] 10:21:14 (+0.00s) Testando conexão com Supabase
[DEBUG] 10:21:14 (+0.05s) Enviando requisição...
[ERROR] 10:21:15 (+1.05s) ❌ Falha ao conectar com Supabase
[ERROR] 10:21:15 (+1.05s) Erro: Failed to fetch
```

### Exemplo 3: Login por Celular

```
[INFO] 10:21:14 (+0.00s) Iniciando envio de código para login
[INFO] 10:21:14 (+0.05s) Enviando código via WhatsApp
[DEBUG] 10:21:14 (+0.10s) Telefone validado
[SUCCESS] 10:21:14 (+0.15s) Código gerado para WhatsApp
[SUCCESS] 10:21:14 (+1.20s) Código enviado com sucesso
[INFO] 10:21:20 (+6.00s) Verificando código de login
[DEBUG] 10:21:20 (+6.05s) Verificando código
[SUCCESS] 10:21:20 (+6.10s) Código verificado com sucesso!
[SUCCESS] 10:21:21 (+7.00s) Login com telefone bem-sucedido
```

---

**Boa sorte com o debug! 🚀**

*"Provérbios 22:3 - O prudente vê o perigo e se refugia, mas o inexperiente avança e sofre as consequências."*
