/* ============================================
   APP.JS - Lógica Principal da Aplicação
   MordomoPay v3.0
   ============================================ */

class MordomoPayApp {
    constructor() {
        this.user = null;
        this.supabase = null;
        this.data = {
            transactions: [],
            goals: [],
            tithes: [],
            currentPage: 'dashboard'
        };
        this.init();
    }

    async init() {
        // Verificar se usuário já está logado
        const user = localStorage.getItem('mordomopay_user');
        if (user) {
            this.user = JSON.parse(user);
            this.initSupabase();
            this.showMainApp();
            await this.loadData();
        } else {
            this.showLoginPage();
        }

        this.attachEventListeners();
    }

    initSupabase() {
        this.supabase = initSupabase(CONFIG.SUPABASE_URL, CONFIG.SUPABASE_KEY);
    }

    // ============================================
    // AUTENTICAÇÃO
    // ============================================

    async handleLogin(e) {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;

        if (!Utils.validateEmail(email) || !Utils.validatePassword(password)) {
            this.showNotification('Email ou senha inválidos', 'error');
            return;
        }

        try {
            const result = await this.supabase.login(email, password);
            if (result.success) {
                this.user = result.user;
                this.initSupabase();
                this.showMainApp();
                await this.loadData();
                this.showNotification('Bem-vindo de volta!');
            } else {
                this.showNotification(result.error, 'error');
            }
        } catch (error) {
            this.showNotification('Erro ao fazer login', 'error');
        }
    }

    async handleRegister(e) {
        e.preventDefault();
        const name = document.getElementById('register-name').value;
        const email = document.getElementById('register-email').value;
        const password = document.getElementById('register-password').value;

        if (!name || !Utils.validateEmail(email) || !Utils.validatePassword(password)) {
            this.showNotification('Preencha todos os campos corretamente', 'error');
            return;
        }

        try {
            const result = await this.supabase.signup(email, password);
            if (result.success) {
                this.user = result.user;
                this.initSupabase();
                this.showMainApp();
                this.showNotification('Conta criada com sucesso!');
            } else {
                this.showNotification(result.error, 'error');
            }
        } catch (error) {
            this.showNotification('Erro ao criar conta', 'error');
        }
    }

    async logout() {
        if (confirm('Tem certeza que deseja sair?')) {
            await this.supabase.logout();
            this.user = null;
            this.showLoginPage();
            this.showNotification('Você foi desconectado');
        }
    }

    // ============================================
    // NAVEGAÇÃO
    // ============================================

    showLoginPage() {
        document.getElementById('login-page').classList.add('active');
        document.getElementById('register-page').classList.remove('active');
        document.getElementById('main-app').style.display = 'none';
    }

    showRegisterPage() {
        document.getElementById('login-page').classList.remove('active');
        document.getElementById('register-page').classList.add('active');
        document.getElementById('main-app').style.display = 'none';
    }

    showMainApp() {
        document.getElementById('login-page').classList.remove('active');
        document.getElementById('register-page').classList.remove('active');
        document.getElementById('main-app').style.display = 'flex';
        document.getElementById('user-info').textContent = this.user.email;
    }

    navigateTo(page) {
        // Remover página ativa
        document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
        
        // Adicionar nova página ativa
        document.getElementById(`${page}-page`).classList.add('active');
        
        // Atualizar título
        const titles = {
            dashboard: 'Dashboard',
            transactions: 'Transações',
            goals: 'Metas Financeiras',
            tithe: 'Dízimos e Ofertas',
            tips: 'Dicas de Saúde Financeira',
            reports: 'Relatórios Financeiros'
        };
        document.getElementById('page-title').textContent = titles[page] || 'Dashboard';
        
        // Atualizar nav items
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
            if (item.dataset.page === page) {
                item.classList.add('active');
            }
        });
        
        // Fechar sidebar em mobile
        document.querySelector('.sidebar').classList.remove('open');
        
        // Carregar dados da página
        this.loadPageData(page);
        
        this.data.currentPage = page;
    }

    loadPageData(page) {
        switch(page) {
            case 'dashboard':
                this.renderDashboard();
                break;
            case 'transactions':
                this.renderTransactions();
                break;
            case 'goals':
                this.renderGoals();
                break;
            case 'tithe':
                this.renderTithe();
                break;
            case 'tips':
                this.renderTips();
                break;
            case 'reports':
                this.renderReports();
                break;
        }
    }

    // ============================================
    // CARREGAMENTO DE DADOS
    // ============================================

    async loadData() {
        try {
            // Carregar transações
            const transResult = await this.supabase.getTransactions(this.user.id);
            if (transResult.success) {
                this.data.transactions = transResult.data || [];
            }

            // Carregar metas
            const goalsResult = await this.supabase.getGoals(this.user.id);
            if (goalsResult.success) {
                this.data.goals = goalsResult.data || [];
            }

            // Carregar dízimos
            const tithesResult = await this.supabase.getTithes(this.user.id);
            if (tithesResult.success) {
                this.data.tithes = tithesResult.data || [];
            }

            // Renderizar página atual
            this.loadPageData(this.data.currentPage);
        } catch (error) {
            console.error('Erro ao carregar dados:', error);
        }
    }

    // ============================================
    // DASHBOARD
    // ============================================

    renderDashboard() {
        // Calcular resumo
        const income = this.data.transactions
            .filter(t => t.tipo === 'entrada')
            .reduce((sum, t) => sum + t.valor, 0);
        
        const expense = this.data.transactions
            .filter(t => t.tipo === 'saida')
            .reduce((sum, t) => sum + t.valor, 0);
        
        const balance = income - expense;
        const health = income > 0 ? Math.round((balance / income) * 100) : 0;

        // Atualizar stats
        document.getElementById('stat-income').textContent = Utils.formatCurrency(income);
        document.getElementById('stat-expense').textContent = Utils.formatCurrency(expense);
        document.getElementById('stat-balance').textContent = Utils.formatCurrency(balance);
        document.getElementById('stat-health').textContent = health + '%';

        // Renderizar metas
        this.renderDashboardGoals();

        // Renderizar versículo
        this.renderDashboardVerse();
    }

    renderDashboardGoals() {
        const container = document.getElementById('dashboard-goals');
        container.innerHTML = '';

        const goals = this.data.goals.slice(0, 3);
        
        if (goals.length === 0) {
            container.innerHTML = '<p style="color: var(--muted);">Nenhuma meta criada ainda</p>';
            return;
        }

        goals.forEach(goal => {
            const progress = Utils.calculatePercentage(goal.valor_atual, goal.valor_alvo);
            const html = `
                <div style="margin-bottom: var(--spacing-lg);">
                    <div style="display: flex; justify-content: space-between; margin-bottom: var(--spacing-sm);">
                        <strong>${goal.nome}</strong>
                        <span>${progress}%</span>
                    </div>
                    <div style="background: var(--border); height: 8px; border-radius: 4px; overflow: hidden;">
                        <div style="background: var(--primary); height: 100%; width: ${progress}%; transition: width 0.3s ease;"></div>
                    </div>
                    <small style="color: var(--muted);">${Utils.formatCurrency(goal.valor_atual)} de ${Utils.formatCurrency(goal.valor_alvo)}</small>
                </div>
            `;
            container.innerHTML += html;
        });
    }

    renderDashboardVerse() {
        const container = document.getElementById('dashboard-verse');
        const verse = CONFIG.VERSES[Math.floor(Math.random() * CONFIG.VERSES.length)];
        
        const html = `
            <p style="font-style: italic; margin-bottom: var(--spacing-md); line-height: 1.8;">"${verse.text}"</p>
            <p style="font-weight: 600; color: var(--primary); margin: 0;">${verse.reference}</p>
        `;
        container.innerHTML = html;
    }

    // ============================================
    // TRANSAÇÕES
    // ============================================

    renderTransactions() {
        // Atualizar stats
        const income = this.data.transactions
            .filter(t => t.tipo === 'entrada')
            .reduce((sum, t) => sum + t.valor, 0);
        
        const expense = this.data.transactions
            .filter(t => t.tipo === 'saida')
            .reduce((sum, t) => sum + t.valor, 0);

        document.getElementById('trans-income').textContent = Utils.formatCurrency(income);
        document.getElementById('trans-expense').textContent = Utils.formatCurrency(expense);
        document.getElementById('trans-balance').textContent = Utils.formatCurrency(income - expense);

        // Atualizar categorias no filtro
        const categories = new Set(this.data.transactions.map(t => t.categoria));
        const categorySelect = document.getElementById('trans-filter-category');
        categorySelect.innerHTML = '<option value="">Todas</option>';
        categories.forEach(cat => {
            const option = document.createElement('option');
            option.value = cat;
            option.textContent = cat;
            categorySelect.appendChild(option);
        });

        // Renderizar tabela
        this.renderTransactionsTable();
    }

    renderTransactionsTable() {
        const typeFilter = document.getElementById('trans-filter-type').value;
        const categoryFilter = document.getElementById('trans-filter-category').value;

        let filtered = this.data.transactions;

        if (typeFilter) {
            filtered = filtered.filter(t => t.tipo === typeFilter);
        }

        if (categoryFilter) {
            filtered = filtered.filter(t => t.categoria === categoryFilter);
        }

        const tbody = document.getElementById('transactions-list');
        tbody.innerHTML = '';

        if (filtered.length === 0) {
            tbody.innerHTML = '<tr><td colspan="5" style="text-align: center; padding: var(--spacing-lg);">Nenhuma transação encontrada</td></tr>';
            return;
        }

        filtered.forEach(trans => {
            const row = document.createElement('tr');
            const valueColor = trans.tipo === 'entrada' ? 'var(--success)' : 'var(--danger)';
            const valuePrefix = trans.tipo === 'entrada' ? '+' : '-';

            row.innerHTML = `
                <td>${trans.descricao}</td>
                <td><small style="background: var(--light-bg); padding: 0.25rem 0.5rem; border-radius: 4px;">${trans.categoria}</small></td>
                <td>${Utils.formatDate(trans.data)}</td>
                <td style="color: ${valueColor}; font-weight: 600;">${valuePrefix} ${Utils.formatCurrency(trans.valor)}</td>
                <td>
                    <button class="btn btn-sm" style="background: rgba(30, 58, 138, 0.1); color: var(--primary);" onclick="app.editTransaction('${trans.id}')">✏️</button>
                    <button class="btn btn-sm" style="background: rgba(239, 68, 68, 0.1); color: var(--danger);" onclick="app.deleteTransaction('${trans.id}')">🗑️</button>
                </td>
            `;
            tbody.appendChild(row);
        });
    }

    openTransactionModal(id = null) {
        const modal = document.getElementById('transaction-modal');
        const form = document.getElementById('transaction-form');

        if (id) {
            const trans = this.data.transactions.find(t => t.id === id);
            if (trans) {
                document.getElementById('transaction-id').value = trans.id;
                document.getElementById('transaction-description').value = trans.descricao;
                document.getElementById('transaction-type').value = trans.tipo;
                document.getElementById('transaction-category').value = trans.categoria;
                document.getElementById('transaction-amount').value = trans.valor;
                document.querySelector('#transaction-modal .modal-title').textContent = 'Editar Transação';
            }
        } else {
            form.reset();
            document.getElementById('transaction-id').value = '';
            document.querySelector('#transaction-modal .modal-title').textContent = 'Nova Transação';
        }

        modal.classList.add('show');
    }

    closeTransactionModal() {
        document.getElementById('transaction-modal').classList.remove('show');
    }

    async saveTransaction() {
        const id = document.getElementById('transaction-id').value;
        const descricao = document.getElementById('transaction-description').value;
        const tipo = document.getElementById('transaction-type').value;
        const categoria = document.getElementById('transaction-category').value;
        const valor = parseFloat(document.getElementById('transaction-amount').value);

        if (!descricao || !tipo || !categoria || !valor) {
            this.showNotification('Preencha todos os campos', 'error');
            return;
        }

        try {
            if (id) {
                // Atualizar
                const result = await this.supabase.update('transacoes', id, {
                    descricao,
                    tipo,
                    categoria,
                    valor
                });

                if (result.success) {
                    const index = this.data.transactions.findIndex(t => t.id === id);
                    if (index !== -1) {
                        this.data.transactions[index] = { ...this.data.transactions[index], descricao, tipo, categoria, valor };
                    }
                    this.showNotification('Transação atualizada com sucesso!');
                } else {
                    this.showNotification(result.error, 'error');
                }
            } else {
                // Criar
                const result = await this.supabase.addTransaction(this.user.id, {
                    descricao,
                    tipo,
                    categoria,
                    valor,
                    data: new Date().toISOString()
                });

                if (result.success) {
                    this.data.transactions.push(result.data[0]);
                    this.showNotification('Transação criada com sucesso!');
                } else {
                    this.showNotification(result.error, 'error');
                }
            }

            this.closeTransactionModal();
            this.renderTransactions();
        } catch (error) {
            this.showNotification('Erro ao salvar transação', 'error');
        }
    }

    async editTransaction(id) {
        this.openTransactionModal(id);
    }

    async deleteTransaction(id) {
        if (confirm('Tem certeza que deseja excluir esta transação?')) {
            try {
                const result = await this.supabase.delete('transacoes', id);
                if (result.success) {
                    this.data.transactions = this.data.transactions.filter(t => t.id !== id);
                    this.renderTransactions();
                    this.showNotification('Transação excluída com sucesso!');
                } else {
                    this.showNotification(result.error, 'error');
                }
            } catch (error) {
                this.showNotification('Erro ao excluir transação', 'error');
            }
        }
    }

    filterTransactions() {
        this.renderTransactionsTable();
    }

    // ============================================
    // METAS
    // ============================================

    renderGoals() {
        const container = document.getElementById('goals-list');
        container.innerHTML = '';

        if (this.data.goals.length === 0) {
            container.innerHTML = '<p style="grid-column: 1/-1; color: var(--muted);">Nenhuma meta criada ainda</p>';
            return;
        }

        this.data.goals.forEach(goal => {
            const progress = Utils.calculatePercentage(goal.valor_atual, goal.valor_alvo);
            const isCompleted = goal.status === 'concluida';

            const card = document.createElement('div');
            card.className = 'card';
            card.style.borderLeft = `4px solid ${isCompleted ? 'var(--success)' : 'var(--primary)'}`;

            card.innerHTML = `
                <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: var(--spacing-lg);">
                    <div>
                        <h4 style="margin: 0 0 var(--spacing-xs) 0;">${goal.nome}</h4>
                        <small style="color: var(--muted);">${goal.categoria}</small>
                    </div>
                    <div style="display: flex; gap: var(--spacing-sm);">
                        <button class="btn btn-sm btn-icon" style="background: rgba(30, 58, 138, 0.1); color: var(--primary);" onclick="app.openGoalModal('${goal.id}')">✏️</button>
                        <button class="btn btn-sm btn-icon" style="background: rgba(239, 68, 68, 0.1); color: var(--danger);" onclick="app.deleteGoal('${goal.id}')">🗑️</button>
                    </div>
                </div>

                <div style="margin-bottom: var(--spacing-lg);">
                    <div style="display: flex; justify-content: space-between; margin-bottom: var(--spacing-sm);">
                        <span>${progress}%</span>
                        <span style="font-size: 0.875rem; color: var(--muted);">${Utils.formatDate(goal.data_limite)}</span>
                    </div>
                    <div style="background: var(--border); height: 8px; border-radius: 4px; overflow: hidden;">
                        <div style="background: ${isCompleted ? 'var(--success)' : 'var(--primary)'}; height: 100%; width: ${progress}%; transition: width 0.3s ease;"></div>
                    </div>
                </div>

                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <span>${Utils.formatCurrency(goal.valor_atual)} de ${Utils.formatCurrency(goal.valor_alvo)}</span>
                    ${!isCompleted ? `<button class="btn btn-sm btn-primary" onclick="app.feedGoal('${goal.id}')">Alimentar</button>` : '<span style="color: var(--success); font-weight: 600;">✓ Concluída</span>'}
                </div>
            `;

            container.appendChild(card);
        });
    }

    openGoalModal(id = null) {
        const modal = document.getElementById('goal-modal');
        const form = document.getElementById('goal-form');

        // Preencher categorias
        const categorySelect = document.getElementById('goal-category');
        categorySelect.innerHTML = '';
        CONFIG.GOAL_CATEGORIES.forEach(cat => {
            const option = document.createElement('option');
            option.value = cat;
            option.textContent = cat;
            categorySelect.appendChild(option);
        });

        if (id) {
            const goal = this.data.goals.find(g => g.id === id);
            if (goal) {
                document.getElementById('goal-id').value = goal.id;
                document.getElementById('goal-name').value = goal.nome;
                document.getElementById('goal-target').value = goal.valor_alvo;
                document.getElementById('goal-category').value = goal.categoria;
                document.getElementById('goal-deadline').value = goal.data_limite;
                document.querySelector('#goal-modal .modal-title').textContent = 'Editar Meta';
            }
        } else {
            form.reset();
            document.getElementById('goal-id').value = '';
            document.querySelector('#goal-modal .modal-title').textContent = 'Nova Meta';
        }

        modal.classList.add('show');
    }

    closeGoalModal() {
        document.getElementById('goal-modal').classList.remove('show');
    }

    async saveGoal() {
        const id = document.getElementById('goal-id').value;
        const nome = document.getElementById('goal-name').value;
        const valor_alvo = parseFloat(document.getElementById('goal-target').value);
        const categoria = document.getElementById('goal-category').value;
        const data_limite = document.getElementById('goal-deadline').value;

        if (!nome || !valor_alvo || !categoria || !data_limite) {
            this.showNotification('Preencha todos os campos', 'error');
            return;
        }

        try {
            if (id) {
                // Atualizar
                const result = await this.supabase.update('metas_financeiras', id, {
                    nome,
                    valor_alvo,
                    categoria,
                    data_limite
                });

                if (result.success) {
                    const index = this.data.goals.findIndex(g => g.id === id);
                    if (index !== -1) {
                        this.data.goals[index] = { ...this.data.goals[index], nome, valor_alvo, categoria, data_limite };
                    }
                    this.showNotification('Meta atualizada com sucesso!');
                } else {
                    this.showNotification(result.error, 'error');
                }
            } else {
                // Criar
                const result = await this.supabase.addGoal(this.user.id, {
                    nome,
                    valor_alvo,
                    valor_atual: 0,
                    categoria,
                    data_limite,
                    status: 'ativa'
                });

                if (result.success) {
                    this.data.goals.push(result.data[0]);
                    this.showNotification('Meta criada com sucesso!');
                } else {
                    this.showNotification(result.error, 'error');
                }
            }

            this.closeGoalModal();
            this.renderGoals();
        } catch (error) {
            this.showNotification('Erro ao salvar meta', 'error');
        }
    }

    async deleteGoal(id) {
        if (confirm('Tem certeza que deseja excluir esta meta?')) {
            try {
                const result = await this.supabase.delete('metas_financeiras', id);
                if (result.success) {
                    this.data.goals = this.data.goals.filter(g => g.id !== id);
                    this.renderGoals();
                    this.showNotification('Meta excluída com sucesso!');
                } else {
                    this.showNotification(result.error, 'error');
                }
            } catch (error) {
                this.showNotification('Erro ao excluir meta', 'error');
            }
        }
    }

    feedGoal(id) {
        const goal = this.data.goals.find(g => g.id === id);
        if (!goal) return;

        const amount = prompt(`Quanto deseja adicionar à meta "${goal.nome}"?\n\nValor atual: ${Utils.formatCurrency(goal.valor_atual)}\nValor alvo: ${Utils.formatCurrency(goal.valor_alvo)}`);
        
        if (amount === null) return;

        const value = parseFloat(amount);
        if (isNaN(value) || value <= 0) {
            this.showNotification('Insira um valor válido', 'error');
            return;
        }

        this.updateGoalProgress(id, value);
    }

    async updateGoalProgress(id, amount) {
        const goal = this.data.goals.find(g => g.id === id);
        if (!goal) return;

        const newValue = Math.min(goal.valor_atual + amount, goal.valor_alvo);
        const status = newValue >= goal.valor_alvo ? 'concluida' : 'ativa';

        try {
            const result = await this.supabase.update('metas_financeiras', id, {
                valor_atual: newValue,
                status
            });

            if (result.success) {
                goal.valor_atual = newValue;
                goal.status = status;

                if (status === 'concluida') {
                    this.showNotification('🎉 Parabéns! Meta atingida!');
                } else {
                    this.showNotification(`${Utils.formatCurrency(amount)} adicionado à meta!`);
                }

                this.renderGoals();
            } else {
                this.showNotification(result.error, 'error');
            }
        } catch (error) {
            this.showNotification('Erro ao atualizar meta', 'error');
        }
    }

    // ============================================
    // DÍZIMOS
    // ============================================

    renderTithe() {
        // Atualizar categorias
        const categorySelect = document.getElementById('transaction-category');
        categorySelect.innerHTML = '';
        CONFIG.TRANSACTION_CATEGORIES.forEach(cat => {
            const option = document.createElement('option');
            option.value = cat;
            option.textContent = cat;
            categorySelect.appendChild(option);
        });

        // Calcular totais
        const tithes = this.data.tithes.filter(t => t.tipo === 'dizimo').reduce((sum, t) => sum + t.valor, 0);
        const offerings = this.data.tithes.filter(t => t.tipo === 'oferta').reduce((sum, t) => sum + t.valor, 0);

        document.getElementById('tithe-total').textContent = Utils.formatCurrency(tithes);
        document.getElementById('offering-total').textContent = Utils.formatCurrency(offerings);

        // Renderizar histórico
        this.renderTitheHistory();

        // Atualizar calculadora
        this.updateTitheCalculator();
    }

    updateTitheCalculator() {
        const income = parseFloat(document.getElementById('tithe-income').value) || 0;
        const percentage = parseFloat(document.getElementById('tithe-percentage').value) || 10;
        const calculated = Utils.calculateTithe(income, percentage);

        document.getElementById('tithe-calculated').textContent = Utils.formatCurrency(calculated);
    }

    async registerTithe() {
        const income = parseFloat(document.getElementById('tithe-income').value);
        const percentage = parseFloat(document.getElementById('tithe-percentage').value);

        if (!income || income <= 0) {
            this.showNotification('Insira uma renda válida', 'error');
            return;
        }

        const valor = Utils.calculateTithe(income, percentage);

        try {
            const result = await this.supabase.addTithe(this.user.id, {
                valor,
                tipo: 'dizimo',
                descricao: `Dízimo (${percentage}%)`,
                data: new Date().toISOString()
            });

            if (result.success) {
                this.data.tithes.push(result.data[0]);
                this.showNotification('Dízimo registrado com sucesso! 🙏');
                this.renderTithe();
            } else {
                this.showNotification(result.error, 'error');
            }
        } catch (error) {
            this.showNotification('Erro ao registrar dízimo', 'error');
        }
    }

    renderTitheHistory() {
        const container = document.getElementById('tithe-history');
        container.innerHTML = '';

        if (this.data.tithes.length === 0) {
            container.innerHTML = '<p style="color: var(--muted);">Nenhum registro de dízimo</p>';
            return;
        }

        const sorted = [...this.data.tithes].sort((a, b) => new Date(b.data) - new Date(a.data));

        sorted.forEach(tithe => {
            const typeColor = tithe.tipo === 'dizimo' ? 'var(--primary)' : 'var(--accent)';
            const typeLabel = tithe.tipo === 'dizimo' ? 'Dízimo' : 'Oferta';

            const html = `
                <div style="display: flex; justify-content: space-between; align-items: center; padding: var(--spacing-md); border-bottom: 1px solid var(--border);">
                    <div>
                        <strong>${tithe.descricao}</strong>
                        <br>
                        <small style="color: var(--muted);">${Utils.formatDate(tithe.data)}</small>
                    </div>
                    <div style="text-align: right;">
                        <div style="font-weight: 700; color: ${typeColor};">${Utils.formatCurrency(tithe.valor)}</div>
                        <small style="background: ${typeColor}20; color: ${typeColor}; padding: 0.25rem 0.5rem; border-radius: 4px; display: inline-block;">${typeLabel}</small>
                    </div>
                </div>
            `;
            container.innerHTML += html;
        });
    }

    // ============================================
    // DICAS
   // ============================================

    renderTips() {
        // Renderizar filtros
        const filtersContainer = document.getElementById('tips-filters');
        filtersContainer.innerHTML = '<button class="btn btn-primary btn-sm" onclick="app.filterTips()">Todos</button>';

        const categories = new Set(CONFIG.TIPS.map(t => t.category));
        categories.forEach(cat => {
            const btn = document.createElement('button');
            btn.className = 'btn btn-secondary btn-sm';
            btn.textContent = cat;
            btn.onclick = () => app.filterTips(cat);
            filtersContainer.appendChild(btn);
        });

        // Renderizar dicas
        this.filterTips();
    }

    filterTips(category = null) {
        const container = document.getElementById('tips-list');
        container.innerHTML = '';

        let tips = CONFIG.TIPS;
        if (category) {
            tips = tips.filter(t => t.category === category);
        }

        tips.forEach(tip => {
            const card = document.createElement('div');
            card.className = 'card';

            card.innerHTML = `
                <div style="display: flex; gap: var(--spacing-md); margin-bottom: var(--spacing-md);">
                    <span style="font-size: 2rem;">${tip.icon}</span>
                    <div>
                        <h4 style="margin: 0 0 var(--spacing-xs) 0;">${tip.title}</h4>
                        <small style="background: var(--light-bg); padding: 0.25rem 0.5rem; border-radius: 4px; display: inline-block;">${tip.category}</small>
                    </div>
                </div>
                <p style="margin-bottom: var(--spacing-md);">${tip.content}</p>
                <blockquote style="border-left: 4px solid var(--primary); padding-left: var(--spacing-md); margin: 0; font-style: italic; color: var(--muted);">
                    "${tip.verse}"
                </blockquote>
            `;

            container.appendChild(card);
        });
    }

    // ============================================
    // RELATÓRIOS
    // ============================================

    renderReports() {
        this.updateReport();
    }

    updateReport() {
        const period = parseInt(document.getElementById('report-period').value);
        const now = new Date();
        const startDate = new Date(now.getFullYear(), now.getMonth() - period + 1, 1);

        // Filtrar transações do período
        const periodTrans = this.data.transactions.filter(t => {
            const date = new Date(t.data);
            return date >= startDate && date <= now;
        });

        const income = periodTrans
            .filter(t => t.tipo === 'entrada')
            .reduce((sum, t) => sum + t.valor, 0);

        const expense = periodTrans
            .filter(t => t.tipo === 'saida')
            .reduce((sum, t) => sum + t.valor, 0);

        const tithes = this.data.tithes
            .filter(t => {
                const date = new Date(t.data);
                return date >= startDate && date <= now;
            })
            .reduce((sum, t) => sum + t.valor, 0);

        // Atualizar stats
        document.getElementById('report-income').textContent = Utils.formatCurrency(income);
        document.getElementById('report-expense').textContent = Utils.formatCurrency(expense);
        document.getElementById('report-balance').textContent = Utils.formatCurrency(income - expense);
        document.getElementById('report-tithe').textContent = Utils.formatCurrency(tithes);

        // Renderizar gráficos
        this.renderExpenseChart(periodTrans);
        this.renderMonthlyHistory(periodTrans);
    }

    renderExpenseChart(transactions) {
        const categories = {};
        transactions
            .filter(t => t.tipo === 'saida')
            .forEach(t => {
                categories[t.categoria] = (categories[t.categoria] || 0) + t.valor;
            });

        const ctx = document.getElementById('expenseChart').getContext('2d');
        
        if (window.expenseChart) {
            window.expenseChart.destroy();
        }

        window.expenseChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: Object.keys(categories),
                datasets: [{
                    data: Object.values(categories),
                    backgroundColor: [
                        '#1e3a8a',
                        '#6b7e3a',
                        '#d4af37',
                        '#10b981',
                        '#f59e0b',
                        '#ef4444'
                    ]
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
    }

    renderMonthlyHistory(transactions) {
        const container = document.getElementById('monthly-history');
        container.innerHTML = '';

        const months = {};
        transactions.forEach(t => {
            const date = new Date(t.data);
            const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
            
            if (!months[monthKey]) {
                months[monthKey] = { income: 0, expense: 0, tithes: 0 };
            }

            if (t.tipo === 'entrada') {
                months[monthKey].income += t.valor;
            } else {
                months[monthKey].expense += t.valor;
            }
        });

        this.data.tithes.forEach(t => {
            const date = new Date(t.data);
            const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
            
            if (months[monthKey]) {
                months[monthKey].tithes += t.valor;
            }
        });

        Object.entries(months)
            .sort()
            .reverse()
            .forEach(([month, data]) => {
                const balance = data.income - data.expense;
                const balanceColor = balance >= 0 ? 'var(--success)' : 'var(--danger)';

                const html = `
                    <div style="padding: var(--spacing-md); border-bottom: 1px solid var(--border);">
                        <div style="display: flex; justify-content: space-between; margin-bottom: var(--spacing-sm);">
                            <strong>${month}</strong>
                            <span style="color: ${balanceColor}; font-weight: 700;">${balance >= 0 ? '+' : ''}${Utils.formatCurrency(balance)}</span>
                        </div>
                        <small style="color: var(--muted);">
                            Renda: ${Utils.formatCurrency(data.income)} | 
                            Despesas: ${Utils.formatCurrency(data.expense)} | 
                            Dízimos: ${Utils.formatCurrency(data.tithes)}
                        </small>
                    </div>
                `;
                container.innerHTML += html;
            });
    }

    // ============================================
    // UTILITÁRIOS
    // ============================================

    showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;

        const bgColor = type === 'error' ? 'var(--danger)' : 'var(--primary)';
        notification.style.background = bgColor;

        document.body.appendChild(notification);
        setTimeout(() => notification.remove(), 3000);
    }

    toggleSidebar() {
        document.querySelector('.sidebar').classList.toggle('open');
    }

    attachEventListeners() {
        // Login
        const loginForm = document.getElementById('login-form');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => this.handleLogin(e));
        }

        // Register
        const registerForm = document.getElementById('register-form');
        if (registerForm) {
            registerForm.addEventListener('submit', (e) => this.handleRegister(e));
        }

        // Navigation
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', () => {
                this.navigateTo(item.dataset.page);
            });
        });

        // Tithe calculator
        const titheInputs = ['tithe-income', 'tithe-percentage'];
        titheInputs.forEach(id => {
            const el = document.getElementById(id);
            if (el) {
                el.addEventListener('input', () => this.updateTitheCalculator());
            }
        });

        // Transaction filters
        const filterInputs = ['trans-filter-type', 'trans-filter-category'];
        filterInputs.forEach(id => {
            const el = document.getElementById(id);
            if (el) {
                el.addEventListener('change', () => this.filterTransactions());
            }
        });
    }
}

// Funções globais para HTML
function showLogin() {
    app.showLoginPage();
}

function showRegister() {
    app.showRegisterPage();
}

function logout() {
    app.logout();
}

function toggleSidebar() {
    app.toggleSidebar();
}

function openTransactionModal(id) {
    app.openTransactionModal(id);
}

function closeTransactionModal() {
    app.closeTransactionModal();
}

function saveTransaction() {
    app.saveTransaction();
}

function filterTransactions() {
    app.filterTransactions();
}

function openGoalModal(id) {
    app.openGoalModal(id);
}

function closeGoalModal() {
    app.closeGoalModal();
}

function saveGoal() {
    app.saveGoal();
}

function updateReport() {
    app.updateReport();
}

// Inicializar aplicação
let app;
document.addEventListener('DOMContentLoaded', () => {
    app = new MordomoPayApp();
});
