const postagemRepository = require('../repository/PostagemRepository');
const userRepository = require('../repository/UserRepository');
const logger = require('../config/logger');

class PostagemService {
    /**
     * Cria uma nova postagem.
     * Regra de negócio: apenas usuários do tipo EMPRESA podem publicar,
     * já que as postagens funcionam como marketing dos serviços prestados.
     */
    async createPostagem(postagemData, userId) {
        const user = await userRepository.findById(userId);

        if (!user) {
            throw new Error('Usuário não encontrado.');
        }

        if (user.tipo_usuario !== 'EMPRESA') {
            throw new Error('Apenas usuários do tipo EMPRESA podem criar postagens.');
        }

        if (!postagemData.descricao && (!postagemData.fotos || postagemData.fotos.length === 0)) {
            throw new Error('A postagem precisa ter ao menos uma descrição ou uma foto.');
        }

        if (postagemData.descricao && postagemData.descricao.length > 1400) {
            throw new Error('A descrição da postagem não pode exceder 1400 caracteres.');
        }

        if (postagemData.fotos && !Array.isArray(postagemData.fotos)) {
            throw new Error('O campo "fotos" deve ser uma lista de URLs.');
        }

        const payload = {
            id_usuario: userId,
            descricao: postagemData.descricao ?? null,
            fotos: postagemData.fotos ?? null,
        };

        try {
            const postagem = await postagemRepository.create(payload);
            logger.info(`Postagem ${postagem.id} criada pelo usuário ${userId}.`);
            return postagem;
        } catch (error) {
            logger.error(`Erro ao criar postagem: ${error.message}`);
            throw new Error('Não foi possível criar a postagem.');
        }
    }

    /**
     * Retorna o feed completo de postagens (mais recentes primeiro).
     * @param {number} limit - Limite de postagens (default: 20)
     * @param {number} offset - Deslocamento para paginação (default: 0)
     */
    async getAllPostagens(limit = 20, offset = 0) {
        return await postagemRepository.findAll(limit, offset);
    }

    /**
     * Busca uma postagem específica pelo seu ID.
     */
    async getPostagemById(id) {
        const postagem = await postagemRepository.findById(id);
        if (!postagem) {
            throw new Error('Postagem não encontrada.');
        }
        return postagem;
    }

    /**
     * Retorna todas as postagens de um usuário/empresa específico.
     * @param {number} userId - ID do usuário
     * @param {number} limit - Limite de postagens (default: 20)
     * @param {number} offset - Deslocamento para paginação (default: 0)
     */
    async getPostagensByUserId(userId, limit = 20, offset = 0) {
        const user = await userRepository.findById(userId);
        if (!user) {
            throw new Error('Usuário não encontrado.');
        }
        return await postagemRepository.findByUserid(userId, limit, offset);
    }

    /**
     * Atualiza uma postagem.
     * Só o autor (mesmo id_usuario) pode editar.
     */
    async updatePostagem(id, updateData, userId) {
        const postagem = await postagemRepository.findById(id);
        if (!postagem) {
            throw new Error('Postagem não encontrada.');
        }

        if (postagem.id_usuario !== userId) {
            throw new Error('Você não tem permissão para editar esta postagem.');
        }

        const allowedFields = {};
        if (updateData.descricao !== undefined) {
            if (updateData.descricao && updateData.descricao.length > 1400) {
                throw new Error('A descrição da postagem não pode exceder 1400 caracteres.');
            }
            allowedFields.descricao = updateData.descricao;
        }
        if (updateData.fotos !== undefined) {
            if (updateData.fotos && !Array.isArray(updateData.fotos)) {
                throw new Error('O campo "fotos" deve ser uma lista de URLs.');
            }
            allowedFields.fotos = updateData.fotos;
        }

        if (Object.keys(allowedFields).length === 0) {
            throw new Error('Nenhum campo válido informado para atualização.');
        }

        try {
            const updated = await postagemRepository.update(id, allowedFields);
            logger.info(`Postagem ${id} atualizada pelo usuário ${userId}.`);
            return updated;
        } catch (error) {
            logger.error(`Erro ao atualizar postagem ${id}: ${error.message}`);
            throw new Error('Não foi possível atualizar a postagem.');
        }
    }

    /**
     * Exclui uma postagem.
     * Permitido apenas para o autor ou para usuários ADMIN.
     */
    async deletePostagem(id, userId) {
        const postagem = await postagemRepository.findById(id);
        if (!postagem) {
            throw new Error('Postagem não encontrada.');
        }

        const user = await userRepository.findById(userId);
        if (!user) {
            throw new Error('Usuário não encontrado.');
        }

        const isOwner = postagem.id_usuario === userId;
        const isAdmin = user.tipo_usuario === 'ADMIN';

        if (!isOwner && !isAdmin) {
            throw new Error('Você não tem permissão para excluir esta postagem.');
        }

        try {
            const deleted = await postagemRepository.delete(id);
            logger.info(`Postagem ${id} excluída pelo usuário ${userId}.`);
            return deleted;
        } catch (error) {
            logger.error(`Erro ao excluir postagem ${id}: ${error.message}`);
            throw new Error('Não foi possível excluir a postagem.');
        }
    }
}

module.exports = new PostagemService();
