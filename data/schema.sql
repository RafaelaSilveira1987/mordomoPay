/* ============================================
   SCHEMA.SQL - MordomoPay Database Schema
   Execute este script no SQL Editor do Supabase
   ============================================ */

-- ============================================
-- TABELA: usuarios
-- ============================================

CREATE TABLE IF NOT EXISTS usuarios (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) NOT NULL UNIQUE,
    nome VARCHAR(255),
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- TABELA: transacoes
-- ============================================

CREATE TABLE IF NOT EXISTS transacoes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    usuario_id UUID NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
    descricao VARCHAR(255) NOT NULL,
    tipo VARCHAR(50) NOT NULL CHECK (tipo IN ('entrada', 'saida')),
    categoria VARCHAR(100) NOT NULL,
    valor DECIMAL(10, 2) NOT NULL,
    data DATE NOT NULL,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Índices para melhor performance
CREATE INDEX idx_transacoes_usuario_id ON transacoes(usuario_id);
CREATE INDEX idx_transacoes_data ON transacoes(data);
CREATE INDEX idx_transacoes_tipo ON transacoes(tipo);

-- ============================================
-- TABELA: metas_financeiras
-- ============================================

CREATE TABLE IF NOT EXISTS metas_financeiras (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    usuario_id UUID NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
    nome VARCHAR(255) NOT NULL,
    valor_alvo DECIMAL(10, 2) NOT NULL,
    valor_atual DECIMAL(10, 2) DEFAULT 0,
    categoria VARCHAR(100) NOT NULL,
    data_limite DATE NOT NULL,
    status VARCHAR(50) DEFAULT 'ativa' CHECK (status IN ('ativa', 'concluida')),
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Índices para melhor performance
CREATE INDEX idx_metas_usuario_id ON metas_financeiras(usuario_id);
CREATE INDEX idx_metas_status ON metas_financeiras(status);

-- ============================================
-- TABELA: dizimos_ofertas
-- ============================================

CREATE TABLE IF NOT EXISTS dizimos_ofertas (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    usuario_id UUID NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
    valor DECIMAL(10, 2) NOT NULL,
    tipo VARCHAR(50) NOT NULL CHECK (tipo IN ('dizimo', 'oferta')),
    descricao VARCHAR(255),
    data DATE NOT NULL,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Índices para melhor performance
CREATE INDEX idx_dizimos_usuario_id ON dizimos_ofertas(usuario_id);
CREATE INDEX idx_dizimos_tipo ON dizimos_ofertas(tipo);
CREATE INDEX idx_dizimos_data ON dizimos_ofertas(data);

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

-- Habilitar RLS em todas as tabelas
ALTER TABLE usuarios ENABLE ROW LEVEL SECURITY;
ALTER TABLE transacoes ENABLE ROW LEVEL SECURITY;
ALTER TABLE metas_financeiras ENABLE ROW LEVEL SECURITY;
ALTER TABLE dizimos_ofertas ENABLE ROW LEVEL SECURITY;

-- Políticas para usuarios
CREATE POLICY "Usuários podem ver apenas seus próprios dados"
    ON usuarios
    FOR SELECT
    USING (auth.uid()::text = id::text);

CREATE POLICY "Usuários podem atualizar seus próprios dados"
    ON usuarios
    FOR UPDATE
    USING (auth.uid()::text = id::text);

-- Políticas para transacoes
CREATE POLICY "Usuários podem ver apenas suas transações"
    ON transacoes
    FOR SELECT
    USING (usuario_id = auth.uid());

CREATE POLICY "Usuários podem inserir suas próprias transações"
    ON transacoes
    FOR INSERT
    WITH CHECK (usuario_id = auth.uid());

CREATE POLICY "Usuários podem atualizar suas próprias transações"
    ON transacoes
    FOR UPDATE
    USING (usuario_id = auth.uid());

CREATE POLICY "Usuários podem deletar suas próprias transações"
    ON transacoes
    FOR DELETE
    USING (usuario_id = auth.uid());

-- Políticas para metas_financeiras
CREATE POLICY "Usuários podem ver apenas suas metas"
    ON metas_financeiras
    FOR SELECT
    USING (usuario_id = auth.uid());

CREATE POLICY "Usuários podem inserir suas próprias metas"
    ON metas_financeiras
    FOR INSERT
    WITH CHECK (usuario_id = auth.uid());

CREATE POLICY "Usuários podem atualizar suas próprias metas"
    ON metas_financeiras
    FOR UPDATE
    USING (usuario_id = auth.uid());

CREATE POLICY "Usuários podem deletar suas próprias metas"
    ON metas_financeiras
    FOR DELETE
    USING (usuario_id = auth.uid());

-- Políticas para dizimos_ofertas
CREATE POLICY "Usuários podem ver apenas seus dízimos"
    ON dizimos_ofertas
    FOR SELECT
    USING (usuario_id = auth.uid());

CREATE POLICY "Usuários podem inserir seus próprios dízimos"
    ON dizimos_ofertas
    FOR INSERT
    WITH CHECK (usuario_id = auth.uid());

CREATE POLICY "Usuários podem atualizar seus próprios dízimos"
    ON dizimos_ofertas
    FOR UPDATE
    USING (usuario_id = auth.uid());

CREATE POLICY "Usuários podem deletar seus próprios dízimos"
    ON dizimos_ofertas
    FOR DELETE
    USING (usuario_id = auth.uid());

-- ============================================
-- DADOS DE EXEMPLO (OPCIONAL)
-- ============================================

-- Inserir usuário de teste (substitua o UUID)
-- INSERT INTO usuarios (id, email, nome) VALUES
-- ('550e8400-e29b-41d4-a716-446655440000', 'teste@mordomopay.com', 'Usuário Teste');

-- Inserir transações de exemplo
-- INSERT INTO transacoes (usuario_id, descricao, tipo, categoria, valor, data) VALUES
-- ('550e8400-e29b-41d4-a716-446655440000', 'Salário', 'entrada', 'Renda', 5200.00, CURRENT_DATE),
-- ('550e8400-e29b-41d4-a716-446655440000', 'Aluguel', 'saida', 'Moradia', 1500.00, CURRENT_DATE),
-- ('550e8400-e29b-41d4-a716-446655440000', 'Supermercado', 'saida', 'Alimentação', 320.00, CURRENT_DATE);

-- Inserir metas de exemplo
-- INSERT INTO metas_financeiras (usuario_id, nome, valor_alvo, valor_atual, categoria, data_limite, status) VALUES
-- ('550e8400-e29b-41d4-a716-446655440000', 'Fundo de Emergência', 5000.00, 2000.00, 'Emergência', '2025-12-31', 'ativa');

-- Inserir dízimos de exemplo
-- INSERT INTO dizimos_ofertas (usuario_id, valor, tipo, descricao, data) VALUES
-- ('550e8400-e29b-41d4-a716-446655440000', 520.00, 'dizimo', 'Dízimo mensal', CURRENT_DATE);

-- ============================================
-- VIEWS ÚTEIS (OPCIONAL)
-- ============================================

-- View: Resumo Mensal por Usuário
CREATE OR REPLACE VIEW v_resumo_mensal AS
SELECT 
    t.usuario_id,
    DATE_TRUNC('month', t.data)::DATE as mes,
    SUM(CASE WHEN t.tipo = 'entrada' THEN t.valor ELSE 0 END) as total_entrada,
    SUM(CASE WHEN t.tipo = 'saida' THEN t.valor ELSE 0 END) as total_saida,
    SUM(CASE WHEN t.tipo = 'entrada' THEN t.valor ELSE -t.valor END) as saldo,
    COUNT(*) as total_transacoes
FROM transacoes t
GROUP BY t.usuario_id, DATE_TRUNC('month', t.data)
ORDER BY t.usuario_id, mes DESC;

-- View: Distribuição de Despesas por Categoria
CREATE OR REPLACE VIEW v_despesas_categoria AS
SELECT 
    t.usuario_id,
    t.categoria,
    SUM(t.valor) as total,
    COUNT(*) as quantidade,
    ROUND(SUM(t.valor) * 100.0 / (
        SELECT SUM(valor) FROM transacoes 
        WHERE usuario_id = t.usuario_id AND tipo = 'saida'
    ), 2) as percentual
FROM transacoes t
WHERE t.tipo = 'saida'
GROUP BY t.usuario_id, t.categoria
ORDER BY t.usuario_id, total DESC;

-- View: Progresso de Metas
CREATE OR REPLACE VIEW v_progresso_metas AS
SELECT 
    m.id,
    m.usuario_id,
    m.nome,
    m.valor_alvo,
    m.valor_atual,
    ROUND((m.valor_atual * 100.0 / m.valor_alvo), 2) as percentual_progresso,
    m.status,
    m.data_limite,
    CASE 
        WHEN m.status = 'concluida' THEN 'Concluída'
        WHEN m.data_limite < CURRENT_DATE THEN 'Vencida'
        WHEN ROUND((m.valor_atual * 100.0 / m.valor_alvo), 2) >= 100 THEN 'Pronta'
        ELSE 'Em Progresso'
    END as situacao
FROM metas_financeiras m
ORDER BY m.usuario_id, m.data_limite;

-- ============================================
-- TRIGGERS (OPCIONAL)
-- ============================================

-- Trigger: Atualizar atualizado_em automaticamente
CREATE OR REPLACE FUNCTION atualizar_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.atualizado_em = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Aplicar trigger em todas as tabelas
CREATE TRIGGER trigger_atualizar_usuarios
    BEFORE UPDATE ON usuarios
    FOR EACH ROW
    EXECUTE FUNCTION atualizar_timestamp();

CREATE TRIGGER trigger_atualizar_transacoes
    BEFORE UPDATE ON transacoes
    FOR EACH ROW
    EXECUTE FUNCTION atualizar_timestamp();

CREATE TRIGGER trigger_atualizar_metas
    BEFORE UPDATE ON metas_financeiras
    FOR EACH ROW
    EXECUTE FUNCTION atualizar_timestamp();

CREATE TRIGGER trigger_atualizar_dizimos
    BEFORE UPDATE ON dizimos_ofertas
    FOR EACH ROW
    EXECUTE FUNCTION atualizar_timestamp();

-- ============================================
-- COMENTÁRIOS
-- ============================================

COMMENT ON TABLE usuarios IS 'Tabela de usuários do sistema';
COMMENT ON TABLE transacoes IS 'Registro de todas as transações financeiras';
COMMENT ON TABLE metas_financeiras IS 'Metas de economia e investimento';
COMMENT ON TABLE dizimos_ofertas IS 'Registro de dízimos e ofertas';

COMMENT ON COLUMN transacoes.tipo IS 'Tipo de transação: entrada ou saida';
COMMENT ON COLUMN transacoes.categoria IS 'Categoria da transação (Alimentação, Moradia, etc)';
COMMENT ON COLUMN metas_financeiras.status IS 'Status da meta: ativa ou concluida';
COMMENT ON COLUMN dizimos_ofertas.tipo IS 'Tipo de doação: dizimo ou oferta';

-- ============================================
-- FIM DO SCHEMA
-- ============================================
