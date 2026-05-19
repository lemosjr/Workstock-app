const { ServiceRequest } = require('../model/index');

class ServiceRepository {
    // C - CREATE: Salva uma nova solicitação no banco
    async create(serviceData) {
        return await ServiceRequest.create(serviceData);
    }

    // R - READ (Lista todas): Busca todas as solicitações [RF013]
    async findAll() {
        return await ServiceRequest.findAll({
            order: [['createdAt', 'DESC']] // Mostra as mais recentes primeiro
        });
    }

    // R - READ (Filtros): Busca dinâmica baseada nos filtros do dashboard [RF014]
    async findWithFilters(whereConditions) {
        return await ServiceRequest.findAll({
            where: whereConditions,
            order: [['createdAt', 'DESC']]
        });
    }

    // R - READ (Por ID): Busca os detalhes completos de uma única solicitação [RF013]
    async findById(id) {
        return await ServiceRequest.findByPk(id);
    }

    // U - UPDATE: Atualiza os dados/status de uma solicitação [RF017]
    async update(id, updateData) {
        const service = await this.findById(id);
        if (!service) return null;
        
        return await service.update(updateData);
    }

    // D - DELETE: Remove uma solicitação do banco de dados
    async delete(id) {
        const service = await this.findById(id);
        if (!service) return false;
        
        await service.destroy();
        return true;
    }
}

module.exports = new ServiceRepository();