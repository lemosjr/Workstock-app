const { User } = require('../model/index');
const { Op } = require('sequelize');
const logger = require('../config/logger');

class UserRepository {
    async create(userData) {
        try {
            return await User.create(userData);
        } catch (error) {
            logger.error(`Erro ao criar registro no banco (Repository): ${error.message}`);
            throw error;
        }
    }

    async findByEmail(email) {
        return await User.findOne({ where: { email } });
    }

    async findByCpfCnpj(cpf_cnpj) {
        return await User.findOne({ where: { cpf_cnpj } });
    }

    async findById(id) {
        return await User.findByPk(id);
    }

    // ATUALIZADO: Com paginação
    async findAll(page = 1, limit = 10, filters = {}) {
        const offset = (page - 1) * limit;
        const where = {};
        
        if (filters.tipo_usuario) {
            where.tipo_usuario = filters.tipo_usuario;
        }
        if (filters.nome) {
            where.nome_razao = { [Op.iLike]: `%${filters.nome}%` };
        }

        const { count, rows } = await User.findAndCountAll({
            where,
            attributes: { exclude: ['senha_hash'] },
            order: [['nome_razao', 'ASC']],
            limit,
            offset
        });

        return { total: count, users: rows };
    }

    async update(id, updateData) {
        const user = await this.findById(id);
        if (!user) return null;
        return await user.update(updateData);
    }

    async delete(id) {
        const user = await this.findById(id);
        if (!user) return false;
        await user.destroy();
        return true;
    }
}

module.exports = new UserRepository();