/* ============================================
   APP.JS - MordomoPay (CORRIGIDO)
   ============================================ */

let app = null;

class MordomoPayApp {
    constructor() {
        this.user = null;
        this.supabase = null;

        this.initSupabase();
        this.init();
    }

    initSupabase() {
        this.supabase = initSupabase(CONFIG.SUPABASE_URL, CONFIG.SUPABASE_KEY);
    }

    async init() {
        const savedUser = localStorage.getItem('mordomopay_user');

        if (savedUser) {
            this.user = JSON.parse(savedUser);
            this.showMainApp();
            await this.loadData();
        } else {
            this.showLoginPage();
        }

        this.attachEventListeners();
    }

    /* ================= AUTH ================= */

    async handleLogin(e) {
        e.preventDefault();

        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;

        try {
            const result = await this.supabase.login(email, password);

            if (!result.success) {
                this.showNotification(result.error || 'Erro no login', 'error');
                return;
            }

            this.user = result.user;
            localStorage.setItem('mordomopay_user', JSON.stringify(this.user));

            this.showMainApp();
            await this.loadData();
            this.showNotification('Bem-vindo!');

        } catch (err) {
            console.error(err);
            this.showNotification('Erro ao autenticar', 'error');
        }
    }

    async handleRegister(e) {
        e.preventDefault();

        const name = document.getElementById('register-name').value;
        const email = document.getElementById('register-email').value;
        const password = document.getElementById('register-password').value;

        try {
            const result = await this.supabase.signup(email, password);

            if (!result.success) {
                this.showNotification(result.error || 'Erro ao cadastrar', 'error');
                return;
            }

            this.user = result.user;
            localStorage.setItem('mordomopay_user', JSON.stringify(this.user));

            this.showMainApp();
            this.showNotification('Conta criada com sucesso!');

        } catch (err) {
            console.error(err);
            this.showNotification('Erro no cadastro', 'error');
        }
    }

    async logout() {
        await this.supabase.logout();
        localStorage.removeItem('mordomopay_user');
        this.user = null;
        this.showLoginPage();
    }

    /* ================= NAV ================= */

    showLoginPage() {
        this.setActivePage('login-page');
        document.getElementById('main-app').style.display = 'none';
    }

    showRegisterPage() {
        this.setActivePage('register-page');
        document.getElementById('main-app').style.display = 'none';
    }

    showMainApp() {
        document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
        document.getElementById('main-app').style.display = 'flex';
        document.getElementById('user-info').textContent = this.user.email;
    }

    setActivePage(id) {
        document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
        document.getElementById(id).classList.add('active');
    }

    /* ================= EVENTS ================= */

    attachEventListeners() {
        const loginForm = document.getElementById('login-form');
        if (loginForm) {
            loginForm.addEventListener('submit', e => this.handleLogin(e));
        }

        const registerForm = document.getElementById('register-form');
        if (registerForm) {
            registerForm.addEventListener('submit', e => this.handleRegister(e));
        }
    }

    /* ================= UTILS ================= */

    showNotification(msg, type = 'success') {
        const n = document.createElement('div');
        n.className = 'notification';
        n.textContent = msg;
        n.style.background = type === 'error' ? 'var(--danger)' : 'var(--primary)';
        document.body.appendChild(n);
        setTimeout(() => n.remove(), 3000);
    }
}

/* ========= FUNÇÕES GLOBAIS SEGURAS ========= */

function showLogin() {
    if (!app) return;
    app.showLoginPage();
}

function showRegister() {
    if (!app) return;
    app.showRegisterPage();
}

function logout() {
    if (!app) return;
    app.logout();
}

/* ========= BOOT ========= */

document.addEventListener('DOMContentLoaded', () => {
    app = new MordomoPayApp();
});
