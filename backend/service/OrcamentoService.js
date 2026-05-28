const orcamentoRepository = require('../repository/OrcamentoRepository');
const { ServiceRequest } = require('../model/index');

class OrcamentoService {
    async createOrcamento(dadosOrcamento) {
        if (!dadosOrcamento.valor_mao_obra || Number(dadosOrcamento.valor_mao_obra) <= 0) {
            throw new Error('Informe um valor de mão de obra válido maior que zero.');
        }

        const solicitacao = await ServiceRequest.findByPk(dadosOrcamento.id_solicitacao);
        if (!solicitacao) {
            throw new Error('A solicitação de serviço informada não existe.');
        }

        // Soma dinâmica calculando o total automaticamente
        const maoObra = Number(dadosOrcamento.valor_mao_obra);
        const material = dadosOrcamento.valor_material ? Number(dadosOrcamento.valor_material) : 0;
        dadosOrcamento.valor_total = maoObra + material;

        return await orcamentoRepository.create(dadosOrcamento);
    }

    // ➕ NOVO: Método para listar todos os orçamentos do banco
    async getAllOrcamentos() {
        return await orcamentoRepository.findAll(); 
    }

    async getOrcamentosBySolicitacao(idSolicitacao) {
        return await orcamentoRepository.findBySolicitacao(idSolicitacao);
    }

    async getOrcamentoById(id) {
        const orcamento = await orcamentoRepository.findById(id);
        if (!orcamento) {
            throw new Error('Orçamento não encontrado.');
        }
        return orcamento;
    }

    async updateOrcamento(id, dadosAtualizados) {
        const statusValidos = ['pending', 'accepted', 'rejected'];
        if (dadosAtualizados.status_orcamento && !statusValidos.includes(dadosAtualizados.status_orcamento)) {
            throw new Error('Status de orçamento inválido.');
        }

        // 🔄 Recalcula o total se a mão de obra ou material forem alterados no update
        if (dadosAtualizados.valor_mao_obra || dadosAtualizados.valor_material) {
            const orcamentoAtual = await orcamentoRepository.findById(id);
            if (orcamentoCurrent) {
                const maoObra = dadosAtualizados.valor_mao_obra !== undefined ? Number(dadosAtualizados.valor_mao_obra) : Number(orcamentoAtual.valor_mao_obra);
                const material = dadosAtualizados.valor_material !== undefined ? Number(dadosAtualizados.valor_material) : Number(orcamentoAtual.valor_material);
                dadosAtualizados.valor_total = maoObra + material;
            }
        }

        const updated = await orcamentoRepository.update(id, dadosAtualizados);
        if (!updated) {
            throw new Error('Orçamento não encontrado para atualização.');
        }

        // Regra de Negócio: Se aprovado, muda o status da solicitação de serviço automaticamente
        if (dadosAtualizados.status_orcamento === 'accepted') {
            const solicitacao = await ServiceRequest.findByPk(updated.id_solicitacao);
            if (solicitacao) {
                await solicitacao.update({ status_solicitacao: 'in_progress' });
            }
        }

        return updated;
    }

    async deleteOrcamento(id) {
        const deletado = await orcamentoRepository.delete(id);
        if (!deletado) {
            throw new Error('Orçamento não encontrado para exclusão.');
        }
        return true;
    }
}

module.exports = new OrcamentoService();