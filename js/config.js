/* ============================================
   CONFIG.JS - Configurações da Aplicação
   ============================================ */

const CONFIG = {
    // Supabase Configuration
    SUPABASE_URL: 'https://fetimotrijqyswrfoyzz.supabase.co',
    SUPABASE_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZldGltb3RyaWpxeXN3cmZveXp6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk1MTk5MTksImV4cCI6MjA3NTA5NTkxOX0.Wkiu887LiK1l3k4vHpoRB-ODsrxeUF_mJINJmJ2Xz4I',
    
    // App Configuration
    APP_NAME: 'MordomoPay',
    APP_VERSION: '3.0.0',
    
    // API Endpoints
    API_BASE: '/api',
    
    // Storage Keys
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
        {
            text: "Na casa do sábio há comida escolhida e azeite, mas o tolo tudo desperdiça.",
            reference: "Provérbios 21:20"
        },
        {
            text: "O prudente vê o mal e se esconde; mas os simples passam e sofrem a pena.",
            reference: "Provérbios 27:12"
        },
        {
            text: "Os pensamentos do diligente tendem só para a abundância; mas todo o apressado corre para a pobreza.",
            reference: "Provérbios 21:5"
        },
        {
            text: "Trazei todos os dízimos à casa do tesouro, para que haja mantimento na minha casa.",
            reference: "Malaquias 3:10"
        },
        {
            text: "Cada um contribua segundo propôs no seu coração; não com tristeza, ou por necessidade; porque Deus ama ao que dá com alegria.",
            reference: "2 Coríntios 9:7"
        },
        {
            text: "Mais bem-aventurado é dar do que receber.",
            reference: "Atos 20:35"
        },
        {
            text: "O rico domina o pobre; e o que toma emprestado é servo do que empresta.",
            reference: "Provérbios 22:7"
        },
        {
            text: "A mão frouxa empobrece, mas a mão do diligente enriquece.",
            reference: "Provérbios 10:4"
        }
    ],
    
    // Dicas
    TIPS: [
        {
            id: 1,
            title: "Registre Todas as Transações",
            category: "Organização",
            icon: "📝",
            content: "Manter um registro detalhado de todas as suas transações é fundamental para entender seus hábitos de gastos e identificar oportunidades de economia.",
            verse: "Provérbios 27:12 - O prudente vê o mal e se esconde; mas os simples passam e sofrem a pena."
        },
        {
            id: 2,
            title: "Estabeleça um Orçamento Mensal",
            category: "Planejamento",
            icon: "📊",
            content: "Defina um orçamento realista para cada categoria de gastos. Isso ajuda a controlar despesas e evitar gastos impulsivos.",
            verse: "Provérbios 21:5 - Os pensamentos do diligente tendem só para a abundância; mas todo o apressado corre para a pobreza."
        },
        {
            id: 3,
            title: "Crie um Fundo de Emergência",
            category: "Segurança",
            icon: "🛡️",
            content: "Economize de 3 a 6 meses de despesas em uma conta separada. Isso oferece segurança financeira e evita dívidas em caso de emergências.",
            verse: "Provérbios 21:20 - Na casa do sábio há comida escolhida e azeite, mas o tolo tudo desperdiça."
        },
        {
            id: 4,
            title: "Pratique o Dízimo com Alegria",
            category: "Espiritualidade",
            icon: "🙏",
            content: "O dízimo é uma expressão de fé e gratidão. Separe 10% de sua renda para dízimos e ofertas.",
            verse: "2 Coríntios 9:7 - Cada um contribua segundo propôs no seu coração; não com tristeza, ou por necessidade; porque Deus ama ao que dá com alegria."
        },
        {
            id: 5,
            title: "Evite Dívidas Desnecessárias",
            category: "Prudência",
            icon: "⚠️",
            content: "Antes de fazer uma compra no crédito, pergunte-se: 'Eu realmente preciso disso?' Evite juros altos e dívidas que comprometem seu futuro.",
            verse: "Provérbios 22:7 - O rico domina o pobre; e o que toma emprestado é servo do que empresta."
        },
        {
            id: 6,
            title: "Defina Metas de Economia",
            category: "Motivação",
            icon: "🎯",
            content: "Estabeleça metas claras e mensuráveis, como economizar para uma viagem, educação ou investimento.",
            verse: "Provérbios 10:4 - A mão frouxa empobrece, mas a mão do diligente enriquece."
        },
        {
            id: 7,
            title: "Revise Seus Gastos Regularmente",
            category: "Análise",
            icon: "📈",
            content: "Analise seus gastos mensalmente para identificar padrões e oportunidades de economia.",
            verse: "Provérbios 27:23 - Conhece bem o estado dos teus rebanhos e cuida bem dos teus gados."
        },
        {
            id: 8,
            title: "Invista em Educação Financeira",
            category: "Educação",
            icon: "📚",
            content: "Aprenda sobre investimentos, planejamento de aposentadoria e gestão de patrimônio.",
            verse: "Provérbios 18:15 - O coração do prudente adquire conhecimento, e o ouvido dos sábios busca conhecimento."
        }
    ],
    
    // Conquistas
    ACHIEVEMENTS: [
        {
            id: 1,
            name: "Dizimista Fiel",
            icon: "🙏",
            description: "3 meses consecutivos de dízimo",
            requirement: "tithe_3_months"
        },
        {
            id: 2,
            name: "Mordomo Sábio",
            icon: "💎",
            description: "30 dias sem gastos supérfluos",
            requirement: "no_unnecessary_spending"
        },
        {
            id: 3,
            name: "Gestor Diligente",
            icon: "🏆",
            description: "6 meses de economia positiva",
            requirement: "savings_6_months"
        },
        {
            id: 4,
            name: "Provedor Organizado",
            icon: "⭐",
            description: "Todas as categorias com limite definido",
            requirement: "all_categories_budgeted"
        }
    ]
};

// Utilitários
const Utils = {
    // Formatar moeda
    formatCurrency: (value) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(value);
    },
    
    // Formatar data
    formatDate: (date) => {
        return new Intl.DateTimeFormat('pt-BR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        }).format(new Date(date));
    },
    
    // Formatar data e hora
    formatDateTime: (date) => {
        return new Intl.DateTimeFormat('pt-BR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        }).format(new Date(date));
    },
    
    // Gerar ID único
    generateId: () => {
        return 'id_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    },
    
    // Validar email
    validateEmail: (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    },
    
    // Validar senha
    validatePassword: (password) => {
        return password && password.length >= 6;
    },
    
    // Calcular percentual
    calculatePercentage: (current, total) => {
        if (total === 0) return 0;
        return Math.round((current / total) * 100);
    },
    
    // Calcular dízimo
    calculateTithe: (income, percentage = 10) => {
        return (income * percentage) / 100;
    },
    
    // Obter mês anterior
    getPreviousMonth: (date = new Date()) => {
        const d = new Date(date);
        d.setMonth(d.getMonth() - 1);
        return d;
    },
    
    // Obter primeiro dia do mês
    getFirstDayOfMonth: (date = new Date()) => {
        return new Date(date.getFullYear(), date.getMonth(), 1);
    },
    
    // Obter último dia do mês
    getLastDayOfMonth: (date = new Date()) => {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0);
    },
    
    // Clonar objeto
    clone: (obj) => {
        return JSON.parse(JSON.stringify(obj));
    },
    
    // Debounce
    debounce: (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
};

// Exportar
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { CONFIG, Utils };
}
