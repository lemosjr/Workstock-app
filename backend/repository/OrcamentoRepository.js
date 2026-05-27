const OrcamentoModel = require('../model/OrcamentoModel');

class OrcamentoRepository {
  async create(data) {
    return await OrcamentoModel.create(data);
  }

  async findById(id) {
    return await OrcamentoModel.findByPk(id, {
      include: ['servico', 'empresa'] 
    });
  }

}

module.exports = new OrcamentoRepository();