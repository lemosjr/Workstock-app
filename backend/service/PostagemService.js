const postagemRepository = require('../repository/PostagemRepository');
const userRepository = require('../repository/UserRepository');
const logger = require('../config/logger');

class PostagemService {

    /**
     * Cria uma nova postagem.
     * Apenas usuários do tipo EMPRESA podem publicar.
     */
    async createPostagem(postagemData, userId) {
        // Busca usuário uma única vez
        const user = await userRepository.findById(userId);
        if (!user) throw new Error('Usuário não encontrado.');

        if (user.tipo_usuario !== 'EMPRESA') {
            throw new Error('Apenas usuários do tipo EMPRESA podem criar postagens.');
        }

        this.#validatePostagemContent(postagemData);

        const payload = {
            id_usuario: userId,
            descricao: postagemData.descricao?.trim() || null,
            fotos: Array.isArray(postagemData.fotos) ? postagemData.fotos : null,
        };

        try {
            const postagem = await postagemRepository.create(payload);
            logger.info(`Postagem ${postagem.id} criada com sucesso pelo usuário ${userId}`);
            return postagem;
        } catch (error) {
            logger.error(`Erro ao criar postagem: ${error.message}`);
            throw new Error('Não foi possível criar a postagem.');
        }
    }

    /**
     * Atualiza uma postagem (apenas o dono pode editar)
     */
    async updatePostagem(id, updateData, userId) {
        const postagem = await postagemRepository.findById(id);
        if (!postagem) throw new Error('Postagem não encontrada.');

        if (postagem.id_usuario !== userId) {
            throw new Error('Você não tem permissão para editar esta postagem.');
        }

        this.#validatePostagemContent(updateData, true); // true = é update (pode atualizar parcialmente)

        const allowedFields = {};

        if (updateData.descricao !== undefined) {
            allowedFields.descricao = updateData.descricao?.trim() || null;
        }

        if (updateData.fotos !== undefined) {
            allowedFields.fotos = Array.isArray(updateData.fotos) ? updateData.fotos : null;
        }

        if (Object.keys(allowedFields).length === 0) {
            throw new Error('Nenhum campo válido foi informado para atualização.');
        }

        try {
            const updated = await postagemRepository.update(id, allowedFields);
            logger.info(`Postagem ${id} atualizada com sucesso pelo usuário ${userId}`);
            return updated;
        } catch (error) {
            logger.error(`Erro ao atualizar postagem ${id}: ${error.message}`);
            throw new Error('Não foi possível atualizar a postagem.');
        }
    }

    /**
     * Busca todas as postagens (feed geral)
     */
    async getAllPostagens(limit = 20, offset = 0) {
        return await postagemRepository.findAll(Math.min(limit, 100), offset);
    }

    /**
     * Busca uma postagem por ID
     */
    async getPostagemById(id) {
        const postagem = await postagemRepository.findById(id);
        if (!postagem) throw new Error('Postagem não encontrada.');
        return postagem;
    }

    /**
     * Busca postagens de um usuário específico
     */
    async getPostagensByUserId(userId, limit = 20, offset = 0) {
        const user = await userRepository.findById(userId);
        if (!user) throw new Error('Usuário não encontrado.');

        return await postagemRepository.findByUserid(userId, Math.min(limit, 100), offset);
    }

    /**
     * Deleta uma postagem (dono ou ADMIN)
     */
    async deletePostagem(id, userId) {
        const postagem = await postagemRepository.findById(id);
        if (!postagem) throw new Error('Postagem não encontrada.');

        const user = await userRepository.findById(userId);
        if (!user) throw new Error('Usuário não encontrado.');

        const isOwner = postagem.id_usuario === userId;
        const isAdmin = user.tipo_usuario === 'ADMIN';

        if (!isOwner && !isAdmin) {
            throw new Error('Você não tem permissão para excluir esta postagem.');
        }

        try {
            await postagemRepository.delete(id);
            logger.info(`Postagem ${id} excluída com sucesso pelo usuário ${userId}`);
            return { message: 'Postagem excluída com sucesso.' };
        } catch (error) {
            logger.error(`Erro ao excluir postagem ${id}: ${error.message}`);
            throw new Error('Não foi possível excluir a postagem.');
        }
    }

    // ====================== MÉTODO PRIVADO ======================

    /**
     * Valida o conteúdo da postagem (usado tanto no create quanto no update)
     * @param {Object} data - Dados da postagem
     * @param {boolean} isUpdate - Se é uma atualização parcial
     */
    #validatePostagemContent(data, isUpdate = false) {
        if (!data) throw new Error('Dados da postagem não fornecidos.');

        // No create, exige pelo menos descrição ou foto
        if (!isUpdate) {
            if (!data.descricao && (!data.fotos || data.fotos.length === 0)) {
                throw new Error('A postagem precisa ter ao menos uma descrição ou uma foto.');
            }
        }

        if (data.descricao !== undefined) {
            const descricao = data.descricao?.trim();
            if (descricao && descricao.length > 1400) {
                throw new Error('A descrição não pode exceder 1400 caracteres.');
            }
        }

        if (data.fotos !== undefined && data.fotos !== null) {
            if (!Array.isArray(data.fotos)) {
                throw new Error('O campo "fotos" deve ser uma lista de URLs.');
            }
        }
    }
}

module.exports = new PostagemService();