const { Router } = require('express');
const empresaEspecialidadeController = require('../controller/EmpresaEspecialidadeController');
const empresaEspecialidadeValidation = require('../validation/EmpresaEspecialidadeValidation');
const authMiddleware = require('../middleware/AuthMiddleware');

const router = Router();

// ==========================================
// ROTAS PÚBLICAS (Acesso livre)
// ==========================================

// R - Listar todas as especialidades de uma empresa
router.get('/empresas/:empresaId/especialidades', empresaEspecialidadeController.getAll);

// ==========================================
// ROTAS PRIVADAS (Apenas EMPRESA dona do perfil)
// ==========================================

// C - Vincular uma especialidade à empresa autenticada
router.post(
    '/empresas/:empresaId/especialidades',
    authMiddleware.handle,
    authMiddleware.authorizeRoles('EMPRESA'),
    empresaEspecialidadeValidation.linkSchema,
    empresaEspecialidadeController.link
);

// D - Desvincular uma especialidade da empresa autenticada
router.delete(
    '/empresas/:empresaId/especialidades/:especialidadeId',
    authMiddleware.handle,
    authMiddleware.authorizeRoles('EMPRESA'),
    empresaEspecialidadeController.unlink
);

module.exports = router;
