/* ============================================
   AUTH-PHONE.JS - Autenticação por Celular
   WhatsApp / SMS
   ============================================ */

class PhoneAuth {
    constructor(supabaseClient) {
        this.supabase = supabaseClient;
        this.verificationCode = null;
        this.sessionId = null;
    }

    /**
     * Enviar código de verificação via WhatsApp
     */
    async sendWhatsAppCode(phone) {
        logger.info('Enviando código via WhatsApp', { phone });

        try {
            // Validar telefone
            if (!this.validatePhone(phone)) {
                logger.error('Telefone inválido', { phone });
                return { success: false, error: 'Telefone inválido. Use o formato: +55 11 99999-9999' };
            }

            // Simular envio (em produção, usar API real como Twilio)
            const code = this.generateCode();
            this.verificationCode = code;
            this.sessionId = this.generateSessionId();

            logger.success('Código gerado para WhatsApp', { phone, code, sessionId: this.sessionId });

            // Em produção, fazer chamada real:
            // const response = await fetch('https://api.twilio.com/...', {
            //     method: 'POST',
            //     body: JSON.stringify({ phone, message: `Seu código MordomoPay: ${code}` })
            // });

            // Simular delay de envio
            await new Promise(resolve => setTimeout(resolve, 1000));

            return {
                success: true,
                message: `Código enviado para ${phone}`,
                sessionId: this.sessionId,
                expiresIn: 600 // 10 minutos
            };
        } catch (error) {
            logger.error('Erro ao enviar código WhatsApp', { error: error.message });
            return { success: false, error: error.message };
        }
    }

    /**
     * Enviar código de verificação via SMS
     */
    async sendSMSCode(phone) {
        logger.info('Enviando código via SMS', { phone });

        try {
            // Validar telefone
            if (!this.validatePhone(phone)) {
                logger.error('Telefone inválido', { phone });
                return { success: false, error: 'Telefone inválido. Use o formato: +55 11 99999-9999' };
            }

            // Gerar código
            const code = this.generateCode();
            this.verificationCode = code;
            this.sessionId = this.generateSessionId();

            logger.success('Código gerado para SMS', { phone, code, sessionId: this.sessionId });

            // Em produção, fazer chamada real:
            // const response = await fetch('https://api.twilio.com/...', {
            //     method: 'POST',
            //     body: JSON.stringify({ phone, message: `Seu código MordomoPay: ${code}` })
            // });

            // Simular delay de envio
            await new Promise(resolve => setTimeout(resolve, 1000));

            return {
                success: true,
                message: `Código enviado para ${phone}`,
                sessionId: this.sessionId,
                expiresIn: 600 // 10 minutos
            };
        } catch (error) {
            logger.error('Erro ao enviar código SMS', { error: error.message });
            return { success: false, error: error.message };
        }
    }

    /**
     * Verificar código de autenticação
     */
    async verifyCode(code, sessionId) {
        logger.info('Verificando código', { code: code.substring(0, 2) + '***', sessionId });

        try {
            if (!this.verificationCode || this.verificationCode !== code) {
                logger.error('Código inválido', { provided: code, expected: this.verificationCode });
                return { success: false, error: 'Código inválido' };
            }

            logger.success('Código verificado com sucesso!', { sessionId });

            return {
                success: true,
                message: 'Código verificado com sucesso!',
                sessionId
            };
        } catch (error) {
            logger.error('Erro ao verificar código', { error: error.message });
            return { success: false, error: error.message };
        }
    }

    /**
     * Registrar usuário com telefone
     */
    async registerWithPhone(phone, name, email) {
        logger.info('Registrando usuário com telefone', { phone, name, email });

        try {
            // Validações
            if (!this.validatePhone(phone)) {
                logger.error('Telefone inválido', { phone });
                return { success: false, error: 'Telefone inválido' };
            }

            if (!name || name.length < 3) {
                logger.error('Nome inválido', { name });
                return { success: false, error: 'Nome deve ter pelo menos 3 caracteres' };
            }

            if (!email || !this.validateEmail(email)) {
                logger.error('Email inválido', { email });
                return { success: false, error: 'Email inválido' };
            }

            // Criar usuário no Supabase
            const result = await this.supabase.signup(email, this.generatePassword());

            if (result.success) {
                logger.success('Usuário registrado com sucesso', { email, phone });

                // Salvar dados do telefone
                localStorage.setItem('mordomopay_phone', phone);
                localStorage.setItem('mordomopay_name', name);

                return {
                    success: true,
                    message: 'Usuário registrado com sucesso!',
                    user: result.user
                };
            } else {
                logger.error('Erro ao registrar usuário', { error: result.error });
                return { success: false, error: result.error };
            }
        } catch (error) {
            logger.error('Erro ao registrar com telefone', { error: error.message });
            return { success: false, error: error.message };
        }
    }

    /**
     * Login com telefone
     */
    async loginWithPhone(phone, code) {
        logger.info('Fazendo login com telefone', { phone });

        try {
            // Validar código
            const codeVerification = await this.verifyCode(code, this.sessionId);
            if (!codeVerification.success) {
                return codeVerification;
            }

            // Buscar usuário pelo telefone
            const storedPhone = localStorage.getItem('mordomopay_phone');
            const storedEmail = localStorage.getItem('mordomopay_email');

            if (storedPhone === phone && storedEmail) {
                logger.success('Login com telefone bem-sucedido', { phone });

                // Simular login
                const user = {
                    id: this.generateSessionId(),
                    phone,
                    email: storedEmail,
                    name: localStorage.getItem('mordomopay_name')
                };

                localStorage.setItem('mordomopay_user', JSON.stringify(user));
                localStorage.setItem('mordomopay_session', this.generateSessionId());

                return {
                    success: true,
                    message: 'Login realizado com sucesso!',
                    user
                };
            } else {
                logger.error('Usuário não encontrado', { phone });
                return { success: false, error: 'Usuário não encontrado. Faça o registro primeiro.' };
            }
        } catch (error) {
            logger.error('Erro ao fazer login com telefone', { error: error.message });
            return { success: false, error: error.message };
        }
    }

    /**
     * Validar formato de telefone
     */
    validatePhone(phone) {
        // Aceita formatos: +55 11 99999-9999 ou 11999999999
        const phoneRegex = /^(\+\d{1,3})?[\s-]?(\d{2})[\s-]?(\d{4,5})[\s-]?(\d{4})$/;
        return phoneRegex.test(phone.replace(/\s/g, ''));
    }

    /**
     * Validar email
     */
    validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    /**
     * Gerar código de 6 dígitos
     */
    generateCode() {
        return Math.floor(100000 + Math.random() * 900000).toString();
    }

    /**
     * Gerar ID de sessão
     */
    generateSessionId() {
        return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    /**
     * Gerar senha aleatória
     */
    generatePassword() {
        return Math.random().toString(36).slice(-12);
    }

    /**
     * Formatar telefone para exibição
     */
    formatPhone(phone) {
        const cleaned = phone.replace(/\D/g, '');
        if (cleaned.length === 11) {
            return `(${cleaned.substring(0, 2)}) ${cleaned.substring(2, 7)}-${cleaned.substring(7)}`;
        }
        return phone;
    }
}

// Instância global
let phoneAuth = null;

function initPhoneAuth(supabaseClient) {
    phoneAuth = new PhoneAuth(supabaseClient);
    logger.success('PhoneAuth inicializado');
    return phoneAuth;
}
