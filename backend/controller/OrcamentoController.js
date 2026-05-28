const orcamentoService = require('../service/OrcamentoService');

class OrcamentoController {
    async create(req, res) {
        try {
            const { id_solicitacao, id_empresa, valor_mao_obra, valor_material, prazo_execucao, descricao } = req.body;

            if (!id_solicitacao || !id_empresa || !valor_mao_obra || !prazo_execucao || !descricao) {
                return res.status(400).json({ error: 'Preencha todos os campos obrigatórios para enviar o orçamento.' });
            }

            const novoOrcamento = await orcamentoService.createOrcamento({
                id_solicitacao, id_empresa, valor_mao_obra, valor_material, prazo_execucao, descricao
            });

            return res.status(201).json({
                message: 'Orçamento enviado com sucesso!',
                data: novoOrcamento
            });
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    // ➕ NOVO: Listar todos os orçamentos do sistema
    async getAll(req, res) {
        try {
            const orcamentos = await orcamentoService.getAllOrcamentos();
            return res.status(200).json(orcamentos);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    async getBySolicitacao(req, res) {
        try {
            const { id_solicitacao } = req.params;
            const orcamentos = await orcamentoService.getOrcamentosBySolicitacao(id_solicitacao);
            return res.status(200).json(orcamentos);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    async getById(req, res) {
        try {
            const { id } = req.params;
            const orcamento = await orcamentoService.getOrcamentoById(id);
            return res.status(200).json(orcamento);
        } catch (error) {
            return res.status(404).json({ error: error.message });
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params;
            const updated = await orcamentoService.updateOrcamento(id, req.body);
            return res.status(200).json({
                message: 'Orçamento atualizado com sucesso!',
                data: updated
            });
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params;
            await orcamentoService.deleteOrcamento(id);
            return res.status(200).json({
                message: 'Orçamento excluído com sucesso do sistema.'
            });
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
}

module.exports = new OrcamentoController();