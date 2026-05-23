const { ServiceRequest, User } = require('../model/index');

class ServiceRepository {
    async create(serviceData) {
        return await ServiceRequest.create(serviceData);
    }

    async findAll() {
        return await ServiceRequest.findAll({
            include: [{ model: User, as: 'cliente', attributes: ['id', 'nome_razao', 'email', 'telefone'] }],
            order: [['data_criacao', 'DESC']]
        });
    }

    async findWithFilters(whereConditions) {
        return await ServiceRequest.findAll({
            where: whereConditions,
            include: [{ model: User, as: 'cliente', attributes: ['id', 'nome_razao', 'email', 'telefone'] }],
            order: [['data_criacao', 'DESC']]
        });
    }

    async findById(id) {
        return await ServiceRequest.findByPk(id, {
            include: [{ model: User, as: 'cliente', attributes: ['id', 'nome_razao', 'email', 'telefone'] }]
        });
    }

    async update(id, updateData) {
        const service = await ServiceRequest.findByPk(id);
        if (!service) return null;
        return await service.update(updateData);
    }

    async delete(id) {
        const service = await ServiceRequest.findByPk(id);
        if (!service) return false;
        await service.destroy();
        return true;
    }
}

module.exports = new ServiceRepository();