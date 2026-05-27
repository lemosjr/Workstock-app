const OrcamentoRepository = require('../repository/OrcamentoRepository');

class OrcamentoService {
  async criarOrcamento(dadosOrcamento) {
    if (dadosOrcamento.valor_estimado <= 0) {
      throw new Error('O valor estimado deve ser maior que zero.');
    }
    
    return await OrcamentoRepository.create(dadosOrcamento);
  }

  async buscarPorId(id) {
    const orcamento = await OrcamentoRepository.findById(id);
    if (!orcamento) throw new Error('Orçamento não encontrado.');
    return orcamento;
  }
}

module.exports = new OrcamentoService();