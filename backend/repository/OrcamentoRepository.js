const { Orcamento, Empresa, ServiceRequest } = require('../model/index');

class OrcamentoRepository {
    async create(dadosOrcamento) {
        return await Orcamento.create(dadosOrcamento);
    }

    async findBySolicitacao(idSolicitacao) {
        return await Orcamento.findAll({
            where: { id_solicitacao: idSolicitacao },
            include: [{ model: Empresa, as: 'prestador' }],
            order: [['valor_total', 'ASC']]
        });
    }

    async findById(id) {
        return await Orcamento.findByPk(id, {
            include: [
                { model: Empresa, as: 'prestador' },
                { model: ServiceRequest, as: 'solicitacao' }
            ]
        });
    }

    async update(id, dadosAtualizados) {
        const orcamento = await this.findById(id);
        if (!orcamento) return null;
        return await orcamento.update(dadosAtualizados);
    }

    async delete(id) {
        const orcamento = await this.findById(id);
        if (!orcamento) return false;
        await orcamento.destroy();
        return true;
    }
}

module.exports = new OrcamentoRepository();