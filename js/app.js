/* ============================================
   MordomoPay - Login celular + senha (TESTE)
   ============================================ */

let app = null;

class MordomoPayApp {
    constructor() {
        this.user = null;
        this.supabase = window.supabaseClient;
        this.init();
    }

    init() {
        this.showLoginPage();
        this.attachEvents();
    }

    attachEvents() {
        const loginForm = document.getElementById('login-form');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => this.handleLogin(e));
        }
    }

    /* ========== LOGIN ========== */

    async handleLogin(e) {
        e.preventDefault();

        const phoneRaw = document.getElementById('login-phone')?.value;
        const password = document.getElementById('login-password')?.value;

        if (!phoneRaw || !password) {
            this.notify('Informe celular e senha', 'error');
            return;
        }

        const phone = phoneRaw.replace(/\D/g, '');

        try {
            const user = await this.supabase.getUserByPhone(phone);

            if (!user) {
                this.notify('Usuário não encontrado', 'error');
                return;
            }

            // ⚠️ senha em texto puro (APENAS PARA TESTES)
            if (user.senha !== password) {
                this.notify('Senha incorreta', 'error');
                return;
            }

            this.user = {
                id: user.id,
                nome: user.nome,
                celular: user.celular
            };

            localStorage.setItem(
                CONFIG.STORAGE_USER,
                JSON.stringify(this.user)
            );

            this.showMainApp();
            this.notify('Login realizado com sucesso');

        } catch (err) {
            console.error('[LOGIN ERROR]', err);
            this.notify('Erro ao realizar login', 'error');
        }
    }

    /* ========== UI ========== */

    showLoginPage() {
        document.getElementById('login-page').style.display = 'flex';
        document.getElementById('main-app').style.display = 'none';
    }

    showMainApp() {
        document.getElementById('login-page').style.display = 'none';
        document.getElementById('main-app').style.display = 'block';

        const userInfo = document.getElementById('user-info');
        if (userInfo && this.user) {
            userInfo.textContent =
                `${this.user.nome} (${this.user.celular})`;
        }
    }

    logout() {
        localStorage.removeItem(CONFIG.STORAGE_USER);
        localStorage.removeItem(CONFIG.STORAGE_SESSION);
        location.reload();
    }

    notify(msg, type = 'success') {
        // simples e funcional para testes
        alert(msg);
    }
}

/* ========== GLOBAL HELPERS ========== */

function logout() {
    if (app) app.logout();
}

/* ========== INIT ========== */

document.addEventListener('DOMContentLoaded', () => {
    app = new MordomoPayApp();
});
