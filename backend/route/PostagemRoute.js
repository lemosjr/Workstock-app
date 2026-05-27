const { Router } = require('express');
const postagemController = require('../controller/PostagemController');
const authMiddleware = require('../middleware/AuthMiddleware');
const userMiddleware = require('../middleware/UserMiddleware');
const postagemValidation = require('../validation/PostagemValidation');

/**
 * Rotas de Postagem
 * Define todos os endpoints relacionados a postagens.
 * Inclui rotas públicas (leitura) e rotas privadas (criar, editar, deletar).
 */
const router = Router();

// ==========================================
// ROTAS PÚBLICAS (Acesso livre)
// ==========================================

// R - Buscar todas as postagens de um usuário/empresa
router.get('/postagens/usuario/:userId', postagemValidation.validateUserIdParam, postagemController.getByUserId);

// R - Buscar uma postagem específica pelo ID
router.get('/postagens/:id', postagemValidation.validatePostagemIdParam, postagemController.getById);

// R - Listar todas as postagens (feed geral)
router.get('/postagens', postagemController.getAll);



// ==========================================
// ROTAS PRIVADAS (Requerem autenticação JWT)
// ==========================================

// C - Criar uma nova postagem (apenas usuários autenticados - EMPRESA)
router.post(
    '/postagens',
    authMiddleware.handle,
    postagemValidation.createSchema,
    postagemController.create
);

// U - Atualizar uma postagem (apenas dono ou ADMIN)
router.put(
    '/postagens/:id',
    authMiddleware.handle,
    postagemValidation.validatePostagemIdParam,
    postagemValidation.updateSchema,
    postagemController.update
);

// D - Deletar uma postagem (apenas dono ou ADMIN)
router.delete(
    '/postagens/:id',
    authMiddleware.handle,
    postagemValidation.validatePostagemIdParam,
    postagemController.delete
);

module.exports = router;
