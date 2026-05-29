const { Router } = require('express');
const avaliacaoController = require('../controller/AvaliacaoController');
const authMiddleware = require('../middleware/AuthMiddleware');

const router = Router();

// POST /avaliacoes - Registrar nova avaliação (autenticado)
router.post('/avaliacoes', authMiddleware.handle, avaliacaoController.create);

// GET /avaliacoes - Listar todas as avaliações (público)
router.get('/avaliacoes', avaliacaoController.getAll);

// GET /avaliacoes/:id - Buscar avaliação por ID (público)
router.get('/avaliacoes/:id', avaliacaoController.getById);

// PUT /avaliacoes/:id - Atualizar avaliação (autenticado)
router.put('/avaliacoes/:id', authMiddleware.handle, avaliacaoController.update);

// DELETE /avaliacoes/:id - Excluir avaliação (autenticado - apenas ADMIN, validado no service)
router.delete('/avaliacoes/:id', authMiddleware.handle, authMiddleware.authorizeRoles('ADMIN'), avaliacaoController.delete);

module.exports = router;