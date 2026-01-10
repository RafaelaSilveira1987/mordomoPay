/* ============================================
   CONFIG.JS - Configurações da Aplicação
   ============================================ */

window.CONFIG = {
    // Supabase
    SUPABASE_URL: 'https://fetimotrijqyswrfoyzz.supabase.co',
    SUPABASE_ANON_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZldGltb3RyaWpxeXN3cmZveXp6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk1MTk5MTksImV4cCI6MjA3NTA5NTkxOX0.Wkiu887LiK1l3k4vHpoRB-ODsrxeUF_mJINJmJ2Xz4I',

    // App
    APP_NAME: 'MordomoPay',
    APP_VERSION: '3.0.0',

    // Storage
    STORAGE_USER: 'mordomopay_user',
    STORAGE_SESSION: 'mordomopay_session',
    STORAGE_THEME: 'mordomopay_theme',

    // Categorias
    TRANSACTION_CATEGORIES: [
        'Alimentação',
        'Moradia',
        'Transporte',
        'Saúde',
        'Educação',
        'Lazer',
        'Espiritual',
        'Renda',
        'Renda Extra'
    ],

    GOAL_CATEGORIES: [
        'Emergência',
        'Férias',
        'Investimento',
        'Educação',
        'Saúde',
        'Outro'
    ],

    // Versículos
    VERSES: [
        { text: 'Na casa do sábio há comida escolhida e azeite, mas o tolo tudo desperdiça.', reference: 'Provérbios 21:20' },
        { text: 'O prudente vê o mal e se esconde; mas os simples passam e sofrem a pena.', reference: 'Provérbios 27:12' },
        { text: 'Os pensamentos do diligente tendem só para a abundância.', reference: 'Provérbios 21:5' },
        { text: 'Trazei todos os dízimos à casa do tesouro.', reference: 'Malaquias 3:10' }
    ]
};

/* ============================================
   UTILS - Utilitários Globais
   ============================================ */

window.Utils = {
    formatCurrency(value) {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(value || 0);
    },

    formatDate(date) {
        return new Intl.DateTimeFormat('pt-BR').format(new Date(date));
    },

    generateId() {
        return 'id_' + Date.now() + '_' + Math.random().toString(36).slice(2);
    },

    validatePhone(phone) {
        return /^\d{10,13}$/.test(phone);
    }
};

console.log('[CONFIG] Configurações carregadas com sucesso');
