const PostagemService = require('../service/PostagemService');
const logger = require('../config/logger');

/**
 * Controlador de Postagens
 * Responsável por gerenciar as requisições HTTP relacionadas a postagens.
 */
class PostagemController {

    async create(req, res) {
        try {
            const userId = req.userId;
            const postagemData = req.body;

            const postagem = await PostagemService.createPostagem(postagemData, userId);
            
            logger.info(`Postagem ${postagem.id} criada com sucesso pelo usuário ${userId}.`);
            res.status(201).json(postagem);
        } catch (error) {
            logger.error(`Erro ao criar postagem: ${error.message}`);
            res.status(400).json({ error: error.message });
        }
    }

    async getAll(req, res) {
        try {
            const limit = Math.min(parseInt(req.query.limit) || 20, 100);
            const offset = Math.max(parseInt(req.query.offset) || 0, 0);
            
            const postagens = await PostagemService.getAllPostagens(limit, offset);
            res.json(postagens);
        } catch (error) {
            logger.error(`Erro ao buscar postagens: ${error.message}`);
            res.status(500).json({ error: 'Erro ao buscar postagens.' });
        }
    }

    async getById(req, res) {
        try {
            const id = req.params.id;
            const postagem = await PostagemService.getPostagemById(id);
            res.json(postagem);
        } catch (error) {
            logger.error(`Erro ao buscar postagem ${id}: ${error.message}`);
            res.status(404).json({ error: error.message });
        }
    }

    async getByUserId(req, res) {
        try {
            const userId = req.params.userId;
            const limit = Math.min(parseInt(req.query.limit) || 20, 100);
            const offset = Math.max(parseInt(req.query.offset) || 0, 0);
            
            const postagens = await PostagemService.getPostagensByUserId(userId, limit, offset);
            res.json(postagens);
        } catch (error) {
            logger.error(`Erro ao buscar postagens do usuário ${userId}: ${error.message}`);
            res.status(404).json({ error: error.message });
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params;
            const updateData = req.body;
            const userId = req.userId;

            const updatedPostagem = await PostagemService.updatePostagem(id, updateData, userId);
            
            logger.info(`Postagem ${id} atualizada com sucesso pelo usuário ${userId}.`);
            res.json(updatedPostagem);
        } catch (error) {
            logger.error(`Erro ao atualizar postagem ${req.params.id}: ${error.message}`);
            
            // Tratamento inteligente de erro
            if (error.message.includes('permissão') || error.message.includes('não tem')) {
                return res.status(403).json({ error: error.message });
            }
            res.status(400).json({ error: error.message });
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params;
            const userId = req.userId;

            await PostagemService.deletePostagem(id, userId);
            
            logger.info(`Postagem ${id} deletada com sucesso pelo usuário ${userId}.`);
            res.json({ message: 'Postagem deletada com sucesso.' });
        } catch (error) {
            logger.error(`Erro ao deletar postagem ${req.params.id}: ${error.message}`);
            
            if (error.message.includes('permissão') || error.message.includes('não tem')) {
                return res.status(403).json({ error: error.message });
            }
            res.status(400).json({ error: error.message });
        }
    }
}

module.exports = new PostagemController();''