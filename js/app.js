/* ============================================
   MordomoPay - Login celular + senha (TESTE)
   ============================================ */

let app = null;

class MordomoPayApp {
    constructor() {
        this.user = null;
        this.init();
    }

    init() {
        this.showLoginPage();
        this.attachEvents();
    }

    attachEvents() {
        const loginForm = document.getElementById('login-form');
        if (loginForm) {
            loginForm.addEventListener('submit', e => this.handleLogin(e));
        }
    }

    async handleLogin(e) {
        e.preventDefault();

        const phoneRaw = document.getElementById('login-phone').value;
        const password = document.getElementById('login-password').value;

        if (!phoneRaw || !password) {
            this.notify('Informe celular e senha', 'error');
            return;
        }

        const phone = phoneRaw.replace(/\D/g, '');

        try {
            const { data: users, error } = await supabaseClient
                .from('usuarios')
                .select('*')
                .eq('celular', phone)
                .limit(1);

            if (error) throw error;

            if (!users || users.length === 0) {
                this.notify('Usuário não encontrado', 'error');
                return;
            }

            const user = users[0];

            // ⚠️ senha em texto puro (TEMPORÁRIO)
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
                'mordomopay_user',
                JSON.stringify(this.user)
            );

            this.showMainApp();
            this.notify('Login realizado com sucesso');

        } catch (err) {
            console.error(err);
            this.notify('Erro ao realizar login', 'error');
        }
    }

    showLoginPage() {
        document.getElementById('login-page').style.display = 'flex';
        document.getElementById('main-app').style.display = 'none';
    }

    showMainApp() {
        document.getElementById('login-page').style.display = 'none';
        document.getElementById('main-app').style.display = 'block';
        document.getElementById('user-info').textContent =
            this.user.nome + ' (' + this.user.celular + ')';
    }

    logout() {
        localStorage.removeItem('mordomopay_user');
        location.reload();
    }

    notify(msg, type = 'success') {
        alert(msg); // simples e funcional para testes
    }
}

/* ========= GLOBAL ========= */

function logout() {
    if (app) app.logout();
}

document.addEventListener('DOMContentLoaded', () => {
    app = new MordomoPayApp();
});
