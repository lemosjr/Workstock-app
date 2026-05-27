const { ServiceRequest, User } = require('../model/index');
const { Op } = require('sequelize');

class ServiceRepository {
    async create(serviceData) {
        return await ServiceRequest.create(serviceData);
    }

    // ATUALIZADO: Com paginação (unifica findAll e findWithFilters)
    async findAll(page = 1, limit = 10, filters = {}) {
        const offset = (page - 1) * limit;
        const where = {};
        
        if (filters.categoria) {
            where.categoria = { [Op.iLike]: `%${filters.categoria}%` };
        }
        if (filters.tipo_imovel) {
            where.tipo_imovel = { [Op.iLike]: `%${filters.tipo_imovel}%` };
        }
        if (filters.status) {
            where.status_solicitacao = filters.status;
        }
        if (filters.id_usuario) {
            where.id_usuario = filters.id_usuario;
        }

        const { count, rows } = await ServiceRequest.findAndCountAll({
            where,
            include: [{ model: User, as: 'cliente', attributes: ['id', 'nome_razao', 'email', 'telefone'] }],
            order: [['data_criacao', 'DESC']],
            limit,
            offset
        });

        return { total: count, services: rows };
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