const avaliacaoRepository = require('../repository/AvaliacaoRepository');
const serviceRepository = require('../repository/ServiceRepository');
const empresaRepository = require('../repository/EmpresaRepository');

class AvaliacaoService {
    // CREATE  =  POST
    // Valida campos obrigatórios e existência de serviço e empresa antes de criar a avalição
    async createAvaliacao(avaliacaoData) {

        // Garantir existencia do serviço
        // Garantir status do serviço finalizado
        // Garantir existencia da empresa

    }

    async getAllAvaliacao(filters = {}) {
      
    }

    async getAvaliacaoById(id) {

    }

    async updateAvaliacao(id, updateData) {

    }

    async deleteAvaliacao(id) {

    }
}

module.exports = new ServiceService();