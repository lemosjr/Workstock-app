const avaliacaoRepository = require('../repository/AvaliacaoRepository');
const serviceRepository = require('../repository/ServiceRepository');
const empresaRepository = require('../repository/EmpresaRepository');
const logger = require('../config/logger');


class AvaliacaoService {
    // CREATE  =  POST
    // Valida campos obrigatórios e existência de serviço e empresa antes de criar a avalição
    async createAvaliacao(avaliacaoData, serviceId, empresaId) {

        // Garantir existencia do serviço
        const service = await serviceRepository.findById(serviceId);
        if (!service) {
            throw new Error('Serviço não encontrada.');
        }

        // Garantir status do serviço finalizado
        if (service.status_solicitacao !== 'CONCLUIDO'){
            throw new Error('Serviço cancelado ou ainda não finalizado.');
        }

        // Garantir existencia da empresa
        const empresa = await serviceRepository.findById(empresaId);
        if (!empresa) {
            throw new Error('Serviço não encontrada.');
        }
    }

    // async getAllAvaliacao(filters = {}) {
      
    // }

    // async getAvaliacaoById(id) {

    // }

    // async updateAvaliacao(id, updateData) {

    // }

    // async deleteAvaliacao(id) {

    // }
}

module.exports = new AvaliacaoService();