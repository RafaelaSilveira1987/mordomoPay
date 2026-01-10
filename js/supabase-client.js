/* ============================================
   SUPABASE CLIENT - AUTH V2 (CORRIGIDO)
   ============================================ */

class SupabaseService {
    constructor(url, anonKey) {
        this.client = supabase.createClient(url, anonKey);
    }

    /* ========== AUTH ========== */

    async signup(email, password) {
        const { data, error } = await this.client.auth.signUp({
            email,
            password
        });

        if (error) {
            console.error('[Supabase][Signup]', error);
            return {
                success: false,
                error: error.message
            };
        }

        return {
            success: true,
            user: data.user
        };
    }

    async login(email, password) {
        const { data, error } = await this.client.auth.signInWithPassword({
            email,
            password
        });

        if (error) {
            console.error('[Supabase][Login]', error);
            return {
                success: false,
                error: error.message
            };
        }

        return {
            success: true,
            user: data.user,
            session: data.session
        };
    }

    async logout() {
        const { error } = await this.client.auth.signOut();
        if (error) {
            console.error('[Supabase][Logout]', error);
        }
    }

    /* ========== SESSION ========== */

    async getSession() {
        const { data } = await this.client.auth.getSession();
        return data?.session || null;
    }

    onAuthStateChange(callback) {
        return this.client.auth.onAuthStateChange(callback);
    }
}

/* ========== INIT HELPER ========== */

function initSupabase(url, anonKey) {
    return new SupabaseService(url, anonKey);
}
