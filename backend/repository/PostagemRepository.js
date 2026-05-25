const {Postagem } = require('../model/index');
const logger = require('../config/logger');

class PostagemRepository {
    async create(postagemData) {
        try {
            return await Postagem.create(postagemData);
        } catch (error) {
            logger.error(`Erro ao criar postagem: ${error.message}`);
            throw error;
        }
    }

    async findByPostId(id) {
        return await Postagem.findAll({
            where: { id },
            order: [['data_hora', 'DESC']]
        });
    }
    
    async findAll() {
        return await Postagem.findAll({
            order: [['data_hora', 'DESC']]
        });
    }

    async findById(id) {
        return await Postagem.findByPk(id);
    }

    async update(id, updateData) {
        const postagem = await this.findById(id);
        if (!postagem) return null;
        return await postagem.update(updateData);
    }

    async delete(id) {
        const postagem = await this.findById(id);
        if (!postagem) return false;
        await postagem.destroy();
        return true;
    }

    async deleteByPostId(id) {
        return await Postagem.destroy({ where: { id } });
    }
}