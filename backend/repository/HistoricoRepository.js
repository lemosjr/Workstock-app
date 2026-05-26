const { Historico } = require('../model/index');
const { Op } = require('sequelize');
const logger = require('../config/logger');

class HistoricoRepository {
    async create(historicoData) {
        try {
            return await Historico.create(historicoData);
        } catch (error) {
            logger.error(`Erro ao criar registro histórico: ${error.message}`);
            throw error;
        }
    }

    async findById(id) {
        return await Historico.findByPk(id);
    }

    async findByServiceId(id_service) {
        return await Historico.findAll({
            where: { id_service },
            order: [['data_hora', 'DESC']]
        });
    }

    async findAll(filters = {}) {
        const where = {};
        
        if (filters.id_service) {
            where.id_service = filters.id_service;
        }
        if (filters.status_anterior) {
            where.status_anterior = filters.status_anterior;
        }
        if (filters.status_novo) {
            where.status_novo = filters.status_novo;
        }
        
        if (filters.startDate && filters.endDate) {
            const start = new Date(filters.startDate);
            const end = new Date(filters.endDate);
            end.setHours(23, 59, 59);
            where.data_hora = {
                [Op.between]: [start, end]
            };
        }

        return await Historico.findAll({
            where,
            order: [['data_hora', 'DESC']],
            limit: filters.limit || 100,
            offset: filters.offset || 0
        });
    }

    async count(filters = {}) {
        const where = {};
        
        if (filters.id_service) {
            where.id_service = filters.id_service;
        }
        if (filters.status_anterior) {
            where.status_anterior = filters.status_anterior;
        }
        if (filters.status_novo) {
            where.status_novo = filters.status_novo;
        }
        
        if (filters.startDate && filters.endDate) {
            const start = new Date(filters.startDate);
            const end = new Date(filters.endDate);
            end.setHours(23, 59, 59);
            where.data_hora = {
                [Op.between]: [start, end]
            };
        }

        return await Historico.count({ where });
    }

    async update(id, updateData) {
        const historico = await this.findById(id);
        if (!historico) return null;
        
        const allowedUpdates = {};
        if (updateData.comentario !== undefined) allowedUpdates.comentario = updateData.comentario;
        if (updateData.observacao !== undefined) allowedUpdates.observacao = updateData.observacao;
        
        return await historico.update(allowedUpdates);
    }

    async delete(id) {
        const historico = await this.findById(id);
        if (!historico) return false;
        await historico.destroy();
        return true;
    }

    async deleteByServiceId(id_service) {
        return await Historico.destroy({ where: { id_service } });
    }
}

module.exports = new HistoricoRepository();