const PostagemService = require('../service/PostagemService');
const logger = require('../config/logger');

/**
 * Controlador de Postagens
 * Responsável por gerenciar as requisições HTTP relacionadas a postagens.
 * Recebe requisições, valida dados, chama o serviço e retorna respostas ao cliente.
 */
class PostagemController {
    /**
     * Cria uma nova postagem.
     * @param {Object} req - Requisição HTTP com userId do token JWT e dados da postagem no body
     * @param {Object} res - Resposta HTTP
     * @returns {void} Retorna a postagem criada com status 201 ou erro com status 400
     */
    async create(req, res) {
        try {
            const userId = req.userId; // Pego do token JWT
            const postagemData = req.body;
            const postagem = await PostagemService.createPostagem(postagemData, userId);
            logger.info(`Postagem ${postagem.id} criada com sucesso pelo usuário ${userId}.`);
            res.status(201).json(postagem);
        } catch (error) {
            logger.error(`Erro ao criar postagem: ${error.message}`);
            res.status(400).json({ error: error.message });
        }
    }

    /**
     * Retorna todas as postagens (feed geral).
     * @param {Object} req - Requisição HTTP
     * @param {Object} res - Resposta HTTP
     * @returns {void} Retorna array de postagens com status 200 ou erro com status 500
     */
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

    /**
     * Busca uma postagem específica pelo ID.
     * @param {Object} req - Requisição HTTP com id nos parâmetros
     * @param {Object} res - Resposta HTTP
     * @returns {void} Retorna a postagem com status 200 ou erro com status 404
     */
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

    /**
     * Retorna todas as postagens de um usuário/empresa específico.
     * @param {Object} req - Requisição HTTP com userId nos parâmetros
     * @param {Object} res - Resposta HTTP
     * @returns {void} Retorna array de postagens com status 200 ou erro com status 404
     */
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

    /**
     * Atualiza uma postagem existente.
     * Apenas o autor ou administradores podem editar.
     * @param {Object} req - Requisição HTTP com id nos parâmetros, dados de atualização no body e userId do token JWT
     * @param {Object} res - Resposta HTTP
     * @returns {void} Retorna a postagem atualizada com status 200 ou erro com status 400
     */
    async update(req, res) {
        try {
            const id = req.params.id;
            const updateData = req.body;
            const userId = req.userId; // Pego do token JWT
            const updatedPostagem = await PostagemService.updatePostagem(id, updateData, userId);
            logger.info(`Postagem ${id} atualizada com sucesso pelo usuário ${userId}.`);
            res.json(updatedPostagem);
        } catch (error) {
            logger.error(`Erro ao atualizar postagem ${id}: ${error.message}`);
            res.status(400).json({ error: error.message });
        }
    }

    /**
     * Deleta uma postagem.
     * Apenas o autor ou administradores podem deletar.
     * @param {Object} req - Requisição HTTP com id nos parâmetros e userId do token JWT
     * @param {Object} res - Resposta HTTP
     * @returns {void} Retorna mensagem de sucesso com status 200 ou erro com status 400
     */
    async delete(req, res) {
        try {
            const id = req.params.id;
            const userId = req.userId; // Pego do token JWT
            await PostagemService.deletePostagem(id, userId);
            logger.info(`Postagem ${id} deletada com sucesso pelo usuário ${userId}.`);
            res.json({ message: 'Postagem deletada com sucesso.' });
        } catch (error) {
            logger.error(`Erro ao deletar postagem ${id}: ${error.message}`);
            res.status(400).json({ error: error.message });
        }
    }

}

module.exports = new PostagemController();