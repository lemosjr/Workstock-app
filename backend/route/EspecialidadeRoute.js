const { Router } = require('express');
const especialidadeController = require('../controller/EspecialidadeController');
const especialidadeValidation = require('../validation/EspecialidadeValidation');
const authMiddleware = require('../middleware/AuthMiddleware');

const router = Router();

// ==========================================
// ROTAS PÚBLICAS (Acesso livre)
// ==========================================

// R - Listar todas as especialidades disponíveis no sistema
router.get('/especialidades', especialidadeController.getAll);

// R - Buscar especialidade por ID
router.get('/especialidades/:id', especialidadeController.getById);

// ==========================================
// ROTAS PRIVADAS (Apenas ADMIN)
// ==========================================

// C - Criar nova especialidade
router.post(
    '/especialidades',
    authMiddleware.handle,
    authMiddleware.authorizeRoles('ADMIN'),
    especialidadeValidation.createOrUpdateSchema,
    especialidadeController.create
);

// U - Atualizar especialidade existente
router.put(
    '/especialidades/:id',
    authMiddleware.handle,
    authMiddleware.authorizeRoles('ADMIN'),
    especialidadeValidation.createOrUpdateSchema,
    especialidadeController.update
);

// D - Deletar especialidade (bloqueado se houver empresas vinculadas)
router.delete(
    '/especialidades/:id',
    authMiddleware.handle,
    authMiddleware.authorizeRoles('ADMIN'),
    especialidadeController.delete
);

module.exports = router;
