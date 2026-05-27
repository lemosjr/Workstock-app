const { Router } = require('express');
const empresaController = require('../controller/EmpresaController');
const authMiddleware = require('../middleware/AuthMiddleware');
const empresaValidation = require('../validation/EmpresaValidation');
const empresaEspecialidadeController = require('../controller/EmpresaEspecialidadeController');

const router = Router();

// ==========================================
// ROTAS PÚBLICAS (Acesso livre)
// ==========================================

// R - Listar todas as empresas cadastradas
router.get('/empresas', empresaController.getAllEmpresas);

// R - Buscar perfil empresarial por ID do usuário (público)
router.get('/empresas/usuario/:usuarioId', empresaController.getPerfilByUsuarioId);

// U - Atualizar avaliação média da empresa (público - pode ser feito por clientes)
router.put('/empresas/:usuarioId/avaliacao', empresaValidation.updateAvaliacaoSchema, empresaController.updateAvaliacao);


// ==========================================
// ROTAS PRIVADAS (Requerem autenticação JWT)
// ==========================================

// C / U - Criar ou atualizar meu próprio perfil empresarial (apenas EMPRESA)
router.post(
    '/empresas/perfil', 
    authMiddleware.handle, 
    authMiddleware.authorizeRoles('EMPRESA'),
    empresaValidation.createOrUpdateSchema, 
    empresaController.createOrUpdatePerfil
);

// R - Buscar meu próprio perfil empresarial (apenas EMPRESA)
router.get(
    '/empresas/meu-perfil', 
    authMiddleware.handle, 
    authMiddleware.authorizeRoles('EMPRESA'), 
    empresaController.getMyPerfil
);

// Vincular especialidade a uma empresa
router.post(
    '/empresas/:empresaId/especialidades',
    authMiddleware.handle,
    authMiddleware.authorizeRoles('EMPRESA'),
    empresaEspecialidadeController.vincular
);

// Listar especialidades de uma empresa
router.get('/empresas/:empresaId/especialidades', empresaEspecialidadeController.listar);

// Desvincular especialidade de uma empresa
router.delete(
    '/empresas/:empresaId/especialidades/:especialidadeId',
    authMiddleware.handle,
    authMiddleware.authorizeRoles('EMPRESA'),
    empresaEspecialidadeController.desvincular
);

module.exports = router;