/* ============================================
   SUPABASE-CLIENT.JS - Cliente Supabase
   ============================================ */

class SupabaseClient {
    constructor(url, key) {
        this.url = url;
        this.key = key;
        this.headers = {
            'Content-Type': 'application/json',
            'apikey': key,
            'Authorization': `Bearer ${key}`
        };
        this.user = null;
    }

    // ============================================
    // AUTENTICAÇÃO
    // ============================================

    async signup(email, password) {
        logger.info('Iniciando registro', { email });
        try {
            logger.debug('Enviando requisição de signup', { url: this.url });
            
            const response = await fetch(`${this.url}/auth/v1/signup`, {
                method: 'POST',
                headers: this.headers,
                body: JSON.stringify({
                    email,
                    password
                })
            });

            logger.debug('Resposta recebida', { status: response.status, statusText: response.statusText });
            
            const data = await response.json();
            
            if (data.user) {
                this.user = data.user;
                localStorage.setItem('mordomopay_user', JSON.stringify(data.user));
                localStorage.setItem('mordomopay_session', data.session.access_token);
                logger.success('Registro bem-sucedido', { email, userId: data.user.id });
                return { success: true, user: data.user };
            }
            
            const error = data.error_description || 'Erro ao registrar';
            logger.error('Erro no registro', { error, data });
            return { success: false, error };
        } catch (error) {
            logger.error('Exceção ao registrar', { error: error.message, stack: error.stack });
            return { success: false, error: error.message };
        }
    }

    async login(email, password) {
        logger.info('Iniciando login', { email });
        try {
            logger.debug('Enviando requisição de login', { url: this.url, email });
            
            const response = await fetch(`${this.url}/auth/v1/token?grant_type=password`, {
                method: 'POST',
                headers: this.headers,
                body: JSON.stringify({
                    email,
                    password
                })
            });

            logger.debug('Resposta recebida', { status: response.status, statusText: response.statusText });
            
            const data = await response.json();
            
            if (data.user) {
                this.user = data.user;
                localStorage.setItem('mordomopay_user', JSON.stringify(data.user));
                localStorage.setItem('mordomopay_session', data.access_token);
                this.headers['Authorization'] = `Bearer ${data.access_token}`;
                logger.success('Login bem-sucedido', { email, userId: data.user.id });
                return { success: true, user: data.user };
            }
            
            const error = data.error_description || 'Email ou senha incorretos';
            logger.error('Erro no login', { error, data });
            return { success: false, error };
        } catch (error) {
            logger.error('Exceção ao fazer login', { error: error.message, stack: error.stack });
            return { success: false, error: error.message };
        }
    }

    async logout() {
        logger.info('Fazendo logout');
        try {
            localStorage.removeItem('mordomopay_user');
            localStorage.removeItem('mordomopay_session');
            this.user = null;
            logger.success('Logout realizado com sucesso');
            return { success: true };
        } catch (error) {
            logger.error('Erro ao fazer logout', { error: error.message });
            return { success: false, error: error.message };
        }
    }

    async getCurrentUser() {
        try {
            const token = localStorage.getItem('mordomopay_session');
            if (!token) return null;

            this.headers['Authorization'] = `Bearer ${token}`;
            const response = await fetch(`${this.url}/auth/v1/user`, {
                headers: this.headers
            });

            const data = await response.json();
            if (data.id) {
                this.user = data;
                return data;
            }
            return null;
        } catch (error) {
            return null;
        }
    }

    // ============================================
    // CRUD GENÉRICO
    // ============================================

    async insert(table, data) {
        try {
            const response = await fetch(`${this.url}/rest/v1/${table}`, {
                method: 'POST',
                headers: this.headers,
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                const error = await response.json();
                return { success: false, error: error.message };
            }

            const result = await response.json();
            return { success: true, data: result };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    async select(table, options = {}) {
        try {
            let url = `${this.url}/rest/v1/${table}`;
            
            if (options.filter) {
                url += `?${options.filter}`;
            }
            if (options.order) {
                url += `${options.filter ? '&' : '?'}order=${options.order}`;
            }
            if (options.limit) {
                url += `${options.filter || options.order ? '&' : '?'}limit=${options.limit}`;
            }

            const response = await fetch(url, {
                headers: this.headers
            });

            if (!response.ok) {
                const error = await response.json();
                return { success: false, error: error.message };
            }

            const data = await response.json();
            return { success: true, data };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    async update(table, id, data) {
        try {
            const response = await fetch(`${this.url}/rest/v1/${table}?id=eq.${id}`, {
                method: 'PATCH',
                headers: this.headers,
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                const error = await response.json();
                return { success: false, error: error.message };
            }

            const result = await response.json();
            return { success: true, data: result };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    async delete(table, id) {
        try {
            const response = await fetch(`${this.url}/rest/v1/${table}?id=eq.${id}`, {
                method: 'DELETE',
                headers: this.headers
            });

            if (!response.ok) {
                const error = await response.json();
                return { success: false, error: error.message };
            }

            return { success: true };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    // ============================================
    // OPERAÇÕES ESPECÍFICAS
    // ============================================

    async getTransactions(userId) {
        return this.select('transacoes', {
            filter: `usuario_id=eq.${userId}`,
            order: 'data.desc'
        });
    }

    async addTransaction(userId, data) {
        return this.insert('transacoes', {
            usuario_id: userId,
            ...data
        });
    }

    async getGoals(userId) {
        return this.select('metas_financeiras', {
            filter: `usuario_id=eq.${userId}`,
            order: 'criado_em.desc'
        });
    }

    async addGoal(userId, data) {
        return this.insert('metas_financeiras', {
            usuario_id: userId,
            ...data
        });
    }

    async getTithes(userId) {
        return this.select('dizimos_ofertas', {
            filter: `usuario_id=eq.${userId}`,
            order: 'data.desc'
        });
    }

    async addTithe(userId, data) {
        return this.insert('dizimos_ofertas', {
            usuario_id: userId,
            ...data
        });
    }
}

// Instância global
let supabase = null;

function initSupabase(url, key) {
    supabase = new SupabaseClient(url, key);
    return supabase;
}

function getSupabase() {
    return supabase;
}
