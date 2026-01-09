/* ============================================
   AUTH-HELPERS.JS - Funções de Suporte
   Autenticação e Validações
   ============================================ */

/**
 * Alternar entre abas de login (Email/Celular)
 */
function switchLoginTab(tab) {
    logger.info('Alternando aba de login', { tab });
    
    const emailForm = document.getElementById('login-form');
    const phoneForm = document.getElementById('phone-login-form');
    const tabs = document.getElementById('login-tabs');
    
    if (tab === 'email') {
        emailForm.style.display = 'block';
        phoneForm.style.display = 'none';
        tabs.children[0].style.background = 'var(--primary)';
        tabs.children[0].style.color = 'white';
        tabs.children[1].style.background = 'var(--border)';
        tabs.children[1].style.color = 'var(--foreground)';
    } else {
        emailForm.style.display = 'none';
        phoneForm.style.display = 'block';
        tabs.children[0].style.background = 'var(--border)';
        tabs.children[0].style.color = 'var(--foreground)';
        tabs.children[1].style.background = 'var(--primary)';
        tabs.children[1].style.color = 'white';
    }
}

/**
 * Alternar entre abas de registro (Email/Celular)
 */
function switchRegisterTab(tab) {
    logger.info('Alternando aba de registro', { tab });
    
    const emailForm = document.getElementById('register-form');
    const phoneForm = document.getElementById('phone-register-form');
    const tabs = document.getElementById('register-tabs');
    
    if (tab === 'email') {
        emailForm.style.display = 'block';
        phoneForm.style.display = 'none';
        tabs.children[0].style.background = 'var(--primary)';
        tabs.children[0].style.color = 'white';
        tabs.children[1].style.background = 'var(--border)';
        tabs.children[1].style.color = 'var(--foreground)';
    } else {
        emailForm.style.display = 'none';
        phoneForm.style.display = 'block';
        tabs.children[0].style.background = 'var(--border)';
        tabs.children[0].style.color = 'var(--foreground)';
        tabs.children[1].style.background = 'var(--primary)';
        tabs.children[1].style.color = 'white';
    }
}

/**
 * Enviar código de verificação para login por celular
 */
async function sendPhoneCode() {
    logger.info('Iniciando envio de código para login');
    
    const phone = document.getElementById('phone-login-input').value;
    
    if (!phone) {
        showNotification('Por favor, digite seu celular', 'error');
        logger.warn('Telefone vazio');
        return;
    }
    
    try {
        const result = await phoneAuth.sendWhatsAppCode(phone);
        
        if (result.success) {
            showNotification(result.message, 'success');
            document.getElementById('phone-code-section').style.display = 'block';
            logger.success('Código enviado com sucesso');
        } else {
            showNotification(result.error, 'error');
            logger.error('Erro ao enviar código', { error: result.error });
        }
    } catch (error) {
        showNotification('Erro ao enviar código: ' + error.message, 'error');
        logger.error('Exceção ao enviar código', { error: error.message });
    }
}

/**
 * Verificar código de login por celular
 */
async function verifyPhoneCode() {
    logger.info('Verificando código de login');
    
    const code = document.getElementById('phone-code-input').value;
    const phone = document.getElementById('phone-login-input').value;
    
    if (!code || code.length !== 6) {
        showNotification('Digite um código válido (6 dígitos)', 'error');
        logger.warn('Código inválido', { code });
        return;
    }
    
    try {
        const result = await phoneAuth.verifyCode(code, phoneAuth.sessionId);
        
        if (result.success) {
            showNotification('Código verificado! Fazendo login...', 'success');
            
            // Simular login
            const loginResult = await phoneAuth.loginWithPhone(phone, code);
            
            if (loginResult.success) {
                showNotification('Login realizado com sucesso!', 'success');
                logger.success('Login por celular bem-sucedido');
                
                // Aguardar e redirecionar
                setTimeout(() => {
                    window.location.reload();
                }, 1500);
            } else {
                showNotification(loginResult.error, 'error');
                logger.error('Erro ao fazer login', { error: loginResult.error });
            }
        } else {
            showNotification(result.error, 'error');
            logger.error('Código inválido', { error: result.error });
        }
    } catch (error) {
        showNotification('Erro ao verificar código: ' + error.message, 'error');
        logger.error('Exceção ao verificar código', { error: error.message });
    }
}

/**
 * Enviar código de verificação para registro por celular
 */
async function sendPhoneRegisterCode() {
    logger.info('Iniciando envio de código para registro');
    
    const phone = document.getElementById('phone-register-input').value;
    const name = document.getElementById('phone-register-name').value;
    const email = document.getElementById('phone-register-email').value;
    
    if (!phone || !name || !email) {
        showNotification('Por favor, preencha todos os campos', 'error');
        logger.warn('Campos vazios no registro', { phone, name, email });
        return;
    }
    
    try {
        const result = await phoneAuth.sendWhatsAppCode(phone);
        
        if (result.success) {
            showNotification(result.message, 'success');
            document.getElementById('phone-register-code-section').style.display = 'block';
            
            // Salvar dados temporariamente
            localStorage.setItem('temp_phone_register', JSON.stringify({ phone, name, email }));
            
            logger.success('Código enviado para registro');
        } else {
            showNotification(result.error, 'error');
            logger.error('Erro ao enviar código de registro', { error: result.error });
        }
    } catch (error) {
        showNotification('Erro ao enviar código: ' + error.message, 'error');
        logger.error('Exceção ao enviar código de registro', { error: error.message });
    }
}

/**
 * Verificar código de registro por celular
 */
async function verifyPhoneRegisterCode() {
    logger.info('Verificando código de registro');
    
    const code = document.getElementById('phone-register-code-input').value;
    const tempData = JSON.parse(localStorage.getItem('temp_phone_register') || '{}');
    
    if (!code || code.length !== 6) {
        showNotification('Digite um código válido (6 dígitos)', 'error');
        logger.warn('Código inválido no registro', { code });
        return;
    }
    
    try {
        const result = await phoneAuth.verifyCode(code, phoneAuth.sessionId);
        
        if (result.success) {
            showNotification('Código verificado! Criando conta...', 'success');
            
            // Registrar usuário
            const registerResult = await phoneAuth.registerWithPhone(
                tempData.phone,
                tempData.name,
                tempData.email
            );
            
            if (registerResult.success) {
                showNotification('Conta criada com sucesso!', 'success');
                logger.success('Registro por celular bem-sucedido');
                
                // Limpar dados temporários
                localStorage.removeItem('temp_phone_register');
                
                // Aguardar e redirecionar
                setTimeout(() => {
                    showLogin();
                }, 1500);
            } else {
                showNotification(registerResult.error, 'error');
                logger.error('Erro ao registrar', { error: registerResult.error });
            }
        } else {
            showNotification(result.error, 'error');
            logger.error('Código inválido no registro', { error: result.error });
        }
    } catch (error) {
        showNotification('Erro ao verificar código: ' + error.message, 'error');
        logger.error('Exceção ao verificar código de registro', { error: error.message });
    }
}

/**
 * Mostrar página de login
 */
function showLogin() {
    logger.info('Exibindo página de login');
    document.getElementById('login-page').classList.add('active');
    document.getElementById('register-page').classList.remove('active');
}

/**
 * Mostrar página de registro
 */
function showRegister() {
    logger.info('Exibindo página de registro');
    document.getElementById('login-page').classList.remove('active');
    document.getElementById('register-page').classList.add('active');
}

/**
 * Mostrar notificação
 */
function showNotification(message, type = 'info') {
    logger.log(type.toUpperCase(), message);
    
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 16px 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#1e3a8a'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        animation: slideIn 0.3s ease;
        font-weight: 500;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

/**
 * Adicionar estilos de animação
 */
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

logger.success('Auth Helpers carregado');
