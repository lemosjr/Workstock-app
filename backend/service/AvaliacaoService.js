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

    // READ - GET (ALL)
    async getAllAvaliacao() {
        return await avaliacaoRepository.findAll()
    }
    
    // READ - GET (by id)
    async getAvaliacaoById(id) {
        const avaliacao = await avaliacaoRepository.findById(id);
        if (!avaliacao) {
            throw new Error('Avaliacao inexistente!');
        }
        return avaliacao;  
    }

    // UPDATE - PUT
    async updateAvaliacao(id, updateData) {
        const avaliacao = await avaliacaoRepository.findById(id);
        
        if (!avaliacao) {
            throw new Error('Empresa não encontrada.');    
        }
        return await avaliacaoRepository.update(id, updateData);      
    }

    async deleteAvaliacao(id) {
        const avaliacao = await avaliacaoRepository.findById(id)
        const service = await serviceRepository.findById(avaliacao.id_service);
        const usuario = await serviceRepository.findById(service.id_usuario);
        if (
            usuario.tipo_usuario === 'ADMIN'
        ) {
            return avaliacaoRepository.delete(id)
        }

    }
}
module.exports = new AvaliacaoService();