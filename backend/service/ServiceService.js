const serviceRepository = require('../repository/ServiceRepository');

class ServiceService {
    async createRequest(serviceData, userId) {
        const payload = { ...serviceData, id_usuario: userId };
        return await serviceRepository.create(payload);
    }

    async getAllRequests(filters = {}) {
        const { category, tipo_imovel, status } = filters;
        const whereConditions = {};

        if (category) whereConditions.categoria = category;
        if (tipo_imovel) whereConditions.tipo_imovel = tipo_imovel;
        if (status) whereConditions.status_solicitacao = status;

        if (Object.keys(whereConditions).length > 0) {
            return await serviceRepository.findWithFilters(whereConditions);
        }
        return await serviceRepository.findAll();
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