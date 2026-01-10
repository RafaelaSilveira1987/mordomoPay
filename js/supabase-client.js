/* ============================================
   SUPABASE CLIENT - LOGIN POR TELEFONE (TESTE)
   ============================================ */

class SupabaseService {
    constructor(url, anonKey) {
        this.client = supabase.createClient(url, anonKey);
    }

    /* ========== LOGIN POR TELEFONE ========== */

    async loginWithPhone(phone, password) {
        try {
            const { data, error } = await this.client
                .from('users') // ou 'usuarios'
                .select('*')
                .eq('phone', phone)
                .eq('password', password)
                .single();

            if (error || !data) {
                return {
                    success: false,
                    error: 'Telefone ou senha inválidos'
                };
            }

            // sessão fake (para o app funcionar)
            const session = {
                user: {
                    id: data.id,
                    name: data.name,
                    phone: data.phone
                },
                loggedAt: new Date().toISOString()
            };

            localStorage.setItem(
                CONFIG.STORAGE_SESSION,
                JSON.stringify(session)
            );

            return {
                success: true,
                user: data,
                session
            };
        } catch (err) {
            console.error('[LOGIN PHONE]', err);
            return {
                success: false,
                error: 'Erro interno no login'
            };
        }
    }

    /* ========== SESSION ========== */

    getSession() {
        const raw = localStorage.getItem(CONFIG.STORAGE_SESSION);
        return raw ? JSON.parse(raw) : null;
    }

    logout() {
        localStorage.removeItem(CONFIG.STORAGE_SESSION);
    }
}

/* ========== INIT GLOBAL ========== */

window.supabaseService = new SupabaseService(
    CONFIG.SUPABASE_URL,
    CONFIG.SUPABASE_ANON_KEY
);

console.log('[SUPABASE] Serviço iniciado (login por telefone)');
