/* ============================================
   LOGGER.JS - Sistema de Logs Detalhado
   ============================================ */

class Logger {
    constructor() {
        this.logs = [];
        this.maxLogs = 500;
        this.enableConsole = true;
        this.enableStorage = true;
        this.startTime = Date.now();
        
        // Cores para console
        this.colors = {
            info: '#1e3a8a',
            success: '#10b981',
            warning: '#f59e0b',
            error: '#ef4444',
            debug: '#6b7e3a'
        };
    }

    /**
     * Log de informação
     */
    info(message, data = null) {
        this.log('INFO', message, data, this.colors.info);
    }

    /**
     * Log de sucesso
     */
    success(message, data = null) {
        this.log('SUCCESS', message, data, this.colors.success);
    }

    /**
     * Log de aviso
     */
    warn(message, data = null) {
        this.log('WARN', message, data, this.colors.warning);
    }

    /**
     * Log de erro
     */
    error(message, data = null) {
        this.log('ERROR', message, data, this.colors.error);
    }

    /**
     * Log de debug
     */
    debug(message, data = null) {
        this.log('DEBUG', message, data, this.colors.debug);
    }

    /**
     * Log genérico
     */
    log(level, message, data = null, color = '#1f2937') {
        const timestamp = new Date().toLocaleTimeString('pt-BR', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            fractionalSecondDigits: 3
        });

        const elapsed = ((Date.now() - this.startTime) / 1000).toFixed(2);

        const logEntry = {
            timestamp,
            elapsed: `${elapsed}s`,
            level,
            message,
            data,
            url: window.location.href,
            userAgent: navigator.userAgent
        };

        this.logs.push(logEntry);

        // Manter limite de logs
        if (this.logs.length > this.maxLogs) {
            this.logs.shift();
        }

        // Log no console
        if (this.enableConsole) {
            this.logToConsole(logEntry, color);
        }

        // Salvar no localStorage
        if (this.enableStorage) {
            this.saveToStorage();
        }
    }

    /**
     * Log formatado no console
     */
    logToConsole(entry, color) {
        const style = `color: ${color}; font-weight: bold; font-size: 12px;`;
        const timeStyle = `color: #6b7280; font-size: 11px;`;
        const dataStyle = `color: #6b7e3a; font-size: 11px;`;

        console.log(
            `%c[${entry.level}] %c${entry.timestamp} (+${entry.elapsed})`,
            style,
            timeStyle
        );
        console.log(`%c${entry.message}`, `color: ${color}; font-weight: 600;`);

        if (entry.data) {
            console.log('%cDados:', dataStyle, entry.data);
        }
    }

    /**
     * Salvar logs no localStorage
     */
    saveToStorage() {
        try {
            localStorage.setItem('mordomopay_logs', JSON.stringify(this.logs));
        } catch (e) {
            console.warn('Não foi possível salvar logs no localStorage:', e);
        }
    }

    /**
     * Obter todos os logs
     */
    getLogs() {
        return this.logs;
    }

    /**
     * Obter logs do localStorage
     */
    getStoredLogs() {
        try {
            const stored = localStorage.getItem('mordomopay_logs');
            return stored ? JSON.parse(stored) : [];
        } catch (e) {
            return [];
        }
    }

    /**
     * Limpar logs
     */
    clear() {
        this.logs = [];
        try {
            localStorage.removeItem('mordomopay_logs');
        } catch (e) {
            console.warn('Não foi possível limpar logs do localStorage:', e);
        }
        console.log('%cLogs limpos!', 'color: #10b981; font-weight: bold;');
    }

    /**
     * Exportar logs como JSON
     */
    export() {
        const data = {
            exportedAt: new Date().toISOString(),
            logs: this.logs,
            systemInfo: {
                userAgent: navigator.userAgent,
                language: navigator.language,
                platform: navigator.platform,
                timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
                timestamp: new Date().toISOString()
            }
        };

        const json = JSON.stringify(data, null, 2);
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `mordomopay-logs-${Date.now()}.json`;
        a.click();
        URL.revokeObjectURL(url);

        this.success('Logs exportados com sucesso!');
    }

    /**
     * Exibir painel de debug
     */
    showDebugPanel() {
        const panel = document.createElement('div');
        panel.id = 'debug-panel';
        panel.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 400px;
            max-height: 500px;
            background: white;
            border: 2px solid #1e3a8a;
            border-radius: 8px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
            z-index: 9999;
            font-family: 'Courier New', monospace;
            font-size: 12px;
            overflow: hidden;
            display: flex;
            flex-direction: column;
        `;

        const header = document.createElement('div');
        header.style.cssText = `
            background: #1e3a8a;
            color: white;
            padding: 10px;
            font-weight: bold;
            display: flex;
            justify-content: space-between;
            align-items: center;
        `;
        header.innerHTML = `
            <span>🐛 Debug Panel (${this.logs.length} logs)</span>
            <button onclick="logger.closeDebugPanel()" style="background: none; border: none; color: white; cursor: pointer; font-size: 18px;">×</button>
        `;

        const content = document.createElement('div');
        content.style.cssText = `
            overflow-y: auto;
            flex: 1;
            padding: 10px;
            background: #f9fafb;
        `;

        const recentLogs = this.logs.slice(-10).reverse();
        content.innerHTML = recentLogs.map(log => `
            <div style="margin-bottom: 10px; padding: 8px; background: white; border-left: 3px solid ${this.colors[log.level.toLowerCase()] || '#1f2937'}; border-radius: 4px;">
                <div style="color: #6b7280; font-size: 11px;">${log.timestamp} (+${log.elapsed})</div>
                <div style="color: ${this.colors[log.level.toLowerCase()] || '#1f2937'}; font-weight: bold;">[${log.level}]</div>
                <div style="color: #1f2937; margin-top: 4px;">${log.message}</div>
                ${log.data ? `<div style="color: #6b7e3a; margin-top: 4px; font-size: 11px;">${JSON.stringify(log.data).substring(0, 100)}...</div>` : ''}
            </div>
        `).join('');

        const footer = document.createElement('div');
        footer.style.cssText = `
            background: #f3f4f6;
            padding: 10px;
            border-top: 1px solid #e5e7eb;
            display: flex;
            gap: 5px;
        `;
        footer.innerHTML = `
            <button onclick="logger.export()" style="flex: 1; padding: 5px; background: #1e3a8a; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 11px;">📥 Exportar</button>
            <button onclick="logger.clear()" style="flex: 1; padding: 5px; background: #ef4444; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 11px;">🗑️ Limpar</button>
        `;

        panel.appendChild(header);
        panel.appendChild(content);
        panel.appendChild(footer);

        document.body.appendChild(panel);
    }

    /**
     * Fechar painel de debug
     */
    closeDebugPanel() {
        const panel = document.getElementById('debug-panel');
        if (panel) {
            panel.remove();
        }
    }

    /**
     * Testar conexão com Supabase
     */
    async testSupabaseConnection(url, key) {
        this.info('Testando conexão com Supabase...', { url, key: key.substring(0, 10) + '...' });

        try {
            const response = await fetch(`${url}/rest/v1/`, {
                headers: {
                    'apikey': key
                }
            });

            if (response.ok) {
                this.success('✅ Conexão com Supabase estabelecida!', { status: response.status });
                return true;
            } else {
                this.error('❌ Erro na conexão com Supabase', { status: response.status, statusText: response.statusText });
                return false;
            }
        } catch (error) {
            this.error('❌ Falha ao conectar com Supabase', { error: error.message });
            return false;
        }
    }

    /**
     * Testar autenticação
     */
    async testAuthentication(url, key, email, password) {
        this.info('Testando autenticação...', { email });

        try {
            const response = await fetch(`${url}/auth/v1/token?grant_type=password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'apikey': key
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (response.ok && data.user) {
                this.success('✅ Autenticação bem-sucedida!', { user: data.user.email });
                return { success: true, user: data.user, token: data.access_token };
            } else {
                this.error('❌ Falha na autenticação', { error: data.error_description || data.message });
                return { success: false, error: data.error_description || 'Erro desconhecido' };
            }
        } catch (error) {
            this.error('❌ Erro ao testar autenticação', { error: error.message });
            return { success: false, error: error.message };
        }
    }

    /**
     * Exibir informações do sistema
     */
    showSystemInfo() {
        const info = {
            'Navegador': navigator.userAgent,
            'Plataforma': navigator.platform,
            'Linguagem': navigator.language,
            'Timezone': Intl.DateTimeFormat().resolvedOptions().timeZone,
            'LocalStorage': this.isLocalStorageAvailable() ? '✅ Disponível' : '❌ Indisponível',
            'SessionStorage': this.isSessionStorageAvailable() ? '✅ Disponível' : '❌ Indisponível',
            'Cookies': navigator.cookieEnabled ? '✅ Ativados' : '❌ Desativados',
            'Online': navigator.onLine ? '✅ Online' : '❌ Offline',
            'Logs Armazenados': this.logs.length,
            'Tempo de Execução': `${((Date.now() - this.startTime) / 1000).toFixed(2)}s`
        };

        console.log('%c=== INFORMAÇÕES DO SISTEMA ===', 'color: #1e3a8a; font-weight: bold; font-size: 14px;');
        Object.entries(info).forEach(([key, value]) => {
            console.log(`%c${key}:%c ${value}`, 'color: #1e3a8a; font-weight: bold;', 'color: #1f2937;');
        });
    }

    /**
     * Verificar disponibilidade de localStorage
     */
    isLocalStorageAvailable() {
        try {
            const test = '__localStorage_test__';
            localStorage.setItem(test, test);
            localStorage.removeItem(test);
            return true;
        } catch (e) {
            return false;
        }
    }

    /**
     * Verificar disponibilidade de sessionStorage
     */
    isSessionStorageAvailable() {
        try {
            const test = '__sessionStorage_test__';
            sessionStorage.setItem(test, test);
            sessionStorage.removeItem(test);
            return true;
        } catch (e) {
            return false;
        }
    }
}

// Instância global
const logger = new Logger();

// Interceptar erros globais
window.addEventListener('error', (event) => {
    logger.error('Erro não capturado', {
        message: event.message,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno
    });
});

// Interceptar promessas rejeitadas
window.addEventListener('unhandledrejection', (event) => {
    logger.error('Promise rejeitada não capturada', {
        reason: event.reason
    });
});

// Log inicial
logger.info('🚀 MordomoPay iniciado');
logger.showSystemInfo();
