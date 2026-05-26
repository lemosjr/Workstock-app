const { Especialidade } = require('../model/index');
const logger = require('../config/logger');

class EspecialidadeRepository {
    async create(data) {
        try {
            return await Especialidade.create(data);
        } catch (error) {
            logger.error(`Erro ao criar especialidade: ${error.message}`);
            throw error;
        }
    }

    async findAll() {
        return await Especialidade.findAll({
            order: [['nome', 'ASC']]
        });
    }

    async findById(id) {
        return await Especialidade.findByPk(id);
    }

    async findByNome(nome) {
        return await Especialidade.findOne({ where: { nome } });
    }

    async update(id, updateData) {
        const especialidade = await this.findById(id);
        if (!especialidade) return null;
        return await especialidade.update(updateData);
    }

    async delete(id) {
        const especialidade = await this.findById(id);
        if (!especialidade) return false;
        await especialidade.destroy();
        return true;
    }
}

module.exports = new EspecialidadeRepository();
