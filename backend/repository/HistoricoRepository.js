const { Historico } = require('../model/index');
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

    async findByServiceId(id_service) {
        return await Historico.findAll({
            where: { id_service },
            order: [['data_hora', 'DESC']]
        });
    }

    async findAll() {
        return await Historico.findAll({
            order: [['data_hora', 'DESC']]
        });
    }

    async findById(id) {
        return await Historico.findByPk(id);
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