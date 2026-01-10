/* ============================================
   SUPABASE CLIENT - LOGIN POR TELEFONE (TESTE)
   ============================================ */

class SupabaseService {
    constructor(url, anonKey) {
        if (!window.supabase) {
            throw new Error('SDK do Supabase não carregado');
        }

        this.client = supabase.createClient(url, anonKey);
    }

    /* ========== LOGIN POR TELEFONE ========== */

    async loginWithPhone(phone, password) {
        const { data, error } = await this.client
            .from('users')
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
    }

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

/* 🔥 ALIAS PARA NÃO QUEBRAR app.js */
window.supabaseClient = window.supabaseService;

console.log('[SUPABASE] Cliente iniciado com sucesso');
