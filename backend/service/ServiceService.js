const serviceRepository = require('../repository/ServiceRepository');

class ServiceService {
    async createRequest(serviceData, userId) {
        const payload = { ...serviceData, id_usuario: userId };
        return await serviceRepository.create(payload);
    }

    // ATUALIZADO: Com paginação + filtros
    async getAllRequests(page = 1, limit = 10, filters = {}) {
        return await serviceRepository.findAll(page, limit, filters);
    }

    async getRequestById(id) {
        const service = await serviceRepository.findById(id);
        if (!service) {
            throw new Error('Solicitação de serviço não encontrada.');
        }
        return service;
    }

    async updateRequest(id, updateData) {
        const validStatuses = ['ABERTO', 'EM_ANDAMENTO', 'CONCLUIDO', 'CANCELADO'];
        if (updateData.status_solicitacao && !validStatuses.includes(updateData.status_solicitacao)) {
            throw new Error('Status de serviço inválido. Use: ABERTO, EM_ANDAMENTO, CONCLUIDO ou CANCELADO.');
        }
        return await serviceRepository.update(id, updateData);
    }

    async deleteRequest(id) {
        return await serviceRepository.delete(id);
    }
}

module.exports = new ServiceService();