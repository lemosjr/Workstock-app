const {Postagem } = require('../model/index');
const logger = require('../config/logger');

/**
 * Repositório de Postagem
 * Responsável por toda comunicação com o banco de dados relativa a postagens.
 * Implementa operações CRUD e consultas customizadas.
 */
class PostagemRepository {
    /**
     * Cria uma nova postagem no banco de dados.
     * @param {Object} postagemData - Dados da postagem (id_usuario, descricao, fotos)
     * @returns {Promise<Postagem>} A postagem criada
     * @throws {Error} Erro ao criar postagem
     */
    async create(postagemData) {
        try {
            return await Postagem.create(postagemData);
        } catch (error) {
            logger.error(`Erro ao criar postagem: ${error.message}`);
            throw error;
        }
    }

    /**
     * Busca todas as postagens de um usuário específico.
     * Ordena por data/hora mais recentes primeiro.
     * @param {number} id - ID do usuário
     * @param {number} limit - Limite de postagens (default: 20)
     * @param {number} offset - Deslocamento para paginação (default: 0)
     * @returns {Promise<Array>} Array de postagens do usuário
     */
    async findByUserid(id, limit = 20, offset = 0) {
        return await Postagem.findAll({
            where: { id_usuario: id },
            order: [['data_hora', 'DESC']],
            limit,
            offset
        });
    }
    
    /**
     * Busca todas as postagens do sistema (feed geral).
     * Ordena por data/hora mais recentes primeiro.
     * @param {number} limit - Limite de postagens (default: 20)
     * @param {number} offset - Deslocamento para paginação (default: 0)
     * @returns {Promise<Array>} Array de todas as postagens
     */
    async findAll(limit = 20, offset = 0) {
        return await Postagem.findAll({
            order: [['data_hora', 'DESC']],
            limit,
            offset
        });
    }

    /**
     * Busca uma postagem específica pelo ID.
     * @param {number} id - ID da postagem
     * @returns {Promise<Postagem|null>} A postagem encontrada ou null
     */
    async findById(id) {
        return await Postagem.findByPk(id);
    }

    /**
     * Atualiza uma postagem existente.
     * @param {number} id - ID da postagem
     * @param {Object} updateData - Dados a atualizar (descricao, fotos)
     * @returns {Promise<Postagem|null>} A postagem atualizada ou null se não encontrada
     */
    async update(id, updateData) {
        const postagem = await this.findById(id);
        if (!postagem) return null;
        return await postagem.update(updateData);
    }

    /**
     * Deleta uma postagem pelo ID.
     * @param {number} id - ID da postagem
     * @returns {Promise<boolean>} true se deletado com sucesso, false se não encontrado
     */
    async delete(id) {
        const postagem = await this.findById(id);
        if (!postagem) return false;
        await postagem.destroy();
        return true;
    }

    /**
     * Deleta uma postagem pelo ID (alternativa).
     * @param {number} id - ID da postagem
     * @returns {Promise<number>} Número de linhas deletadas
     */
    async deleteByPostId(id) {
        return await Postagem.destroy({ where: { id } });
    }
}