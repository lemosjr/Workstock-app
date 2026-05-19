const serviceRepository = require('../repository/ServiceRepository');

class ServiceService {
    // Regra para Criar Solicitação (C)
    async createRequest(serviceData) {
        // Exceção (E01) - Impede que o valor seja inválido, igual ou menor que zero
        if (!serviceData.estimatedBudget || Number(serviceData.estimatedBudget) <= 0) {
            throw new Error('Informe um valor válido maior que zero para o orçamento estimado.');
        }
        return await serviceRepository.create(serviceData);
    }

    // Regra para Listar com Filtros Dinâmicos (R) [RF014]
    async getAllRequests(filters = {}) {
        const { category, propertyType, status } = filters;
        const whereConditions = {};

        // Monta o objeto de busca condicional para o Sequelize conforme os filtros passados
        if (category) whereConditions.category = category;
        if (propertyType) whereConditions.propertyType = propertyType;
        if (status) whereConditions.status = status;

        // Se houver filtros, chama a busca filtrada; senão, traz tudo [RF013]
        if (Object.keys(whereConditions).length > 0) {
            return await serviceRepository.findWithFilters(whereConditions);
        }

        return await serviceRepository.findAll();
    }

    // Regra para Buscar por ID (R) [RF013]
    async getRequestById(id) {
        const service = await serviceRepository.findById(id);
        if (!service) {
            throw new Error('Solicitação de serviço não encontrada.');
        }
        return service;
    }

    // Regra para Atualizar Dados/Status (U) [RF017]
    async updateRequest(id, updateData) {
        // Impede a alteração para um status que não esteja mapeado nas regras de negócio
        const validStatuses = ['open', 'in_progress', 'completed', 'canceled'];
        if (updateData.status && !validStatuses.includes(updateData.status)) {
            throw new Error('Status de serviço inválido.');
        }

        const updatedService = await serviceRepository.update(id, updateData);
        if (!updatedService) {
            throw new Error('Solicitação de serviço não encontrada para atualização.');
        }

        return updatedService;
    }

    // Regra para Deletar/Remover (D)
    async deleteRequest(id) {
        const isDeleted = await serviceRepository.delete(id);
        if (!isDeleted) {
            throw new Error('Solicitação de serviço não encontrada para exclusão.');
        }
        return true;
    }
}

module.exports = new ServiceService();