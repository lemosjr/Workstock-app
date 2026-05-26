const { Empresa } = require('../model/index');
const logger = require('../config/logger');

class EmpresaRepository {
    async create(empresaData) {
        try {
            return await Empresa.create(empresaData);
        } catch (error) {
            logger.error(`Erro ao criar empresa: ${error.message}`);
            throw error;
        }
    }

    async findById(id) {
        return await Empresa.findByPk(id);
    }

    async findByUsuarioId(id_usuario) {
        return await Empresa.findOne({ where: { id_usuario } });
    }

    async findAll() {
        return await Empresa.findAll({
            order: [['id', 'ASC']]
        });
    }

    async update(id, updateData) {
        const empresa = await this.findById(id);
        if (!empresa) return null;
        return await empresa.update(updateData);
    }

    async updateByUsuarioId(id_usuario, updateData) {
        const empresa = await this.findByUsuarioId(id_usuario);
        if (!empresa) return null;
        return await empresa.update(updateData);
    }

    async delete(id) {
        const empresa = await this.findById(id);
        if (!empresa) return false;
        await empresa.destroy();
        return true;
    }
}

module.exports = new EmpresaRepository();