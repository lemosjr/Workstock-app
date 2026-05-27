const { Empresa, User } = require('../model/index');
const { Op } = require('sequelize');
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

    // ATUALIZADO: Com paginação e filtros
    async findAll(page = 1, limit = 10, filters = {}) {
        const offset = (page - 1) * limit;
        const where = {};
        
        if (filters.avaliacao_min) {
            where.avaliacao_media = { [Op.gte]: filters.avaliacao_min };
        }
        if (filters.descricao) {
            where.descricao = { [Op.iLike]: `%${filters.descricao}%` };
        }

        const { count, rows } = await Empresa.findAndCountAll({
            where,
            include: [{ 
                model: User, 
                as: 'usuario', 
                attributes: ['id', 'nome_razao', 'email', 'telefone', 'foto_perfil'] 
            }],
            order: [['avaliacao_media', 'DESC']],
            limit,
            offset
        });

        return { total: count, empresas: rows };
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