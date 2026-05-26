const { Router } = require('express');
const especialidadeController = require('../controller/EspecialidadeController');
const especialidadeValidation = require('../validation/EspecialidadeValidation');
const authMiddleware = require('../middleware/AuthMiddleware');

const router = Router();

// ==========================================
// ROTAS PÚBLICAS (Acesso livre)
// ==========================================

// Listar todas as especialidades disponíveis
router.get('/especialidades', especialidadeController.getAll);

// Buscar especialidade por ID
router.get('/especialidades/:id', especialidadeController.getById);

// ==========================================
// ROTAS PRIVADAS (Apenas ADMIN)
// ==========================================

// Criar nova especialidade
router.post(
    '/especialidades',
    authMiddleware.handle,
    authMiddleware.authorizeRoles('ADMIN'),
    especialidadeValidation.createOrUpdateSchema,
    especialidadeController.create
);

// Atualizar especialidade
router.put(
    '/especialidades/:id',
    authMiddleware.handle,
    authMiddleware.authorizeRoles('ADMIN'),
    especialidadeValidation.createOrUpdateSchema,
    especialidadeController.update
);

// Deletar especialidade
router.delete(
    '/especialidades/:id',
    authMiddleware.handle,
    authMiddleware.authorizeRoles('ADMIN'),
    especialidadeController.delete
);

module.exports = router;
