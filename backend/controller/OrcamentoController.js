const OrcamentoService = require('../service/OrcamentoService');

class OrcamentoController {
  async create(req, res) {
    try {
      const novoOrcamento = await OrcamentoService.criarOrcamento(req.body);
      return res.status(201).json(novoOrcamento);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async show(req, res) {
    try {
      const orcamento = await OrcamentoService.buscarPorId(req.params.id);
      return res.status(200).json(orcamento);
    } catch (error) {
      return res.status(404).json({ error: error.message });
    }
  }
}

module.exports = new OrcamentoController();