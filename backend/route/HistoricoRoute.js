const { Router } = require('express');
const historicoController = require('../controller/HistoricoController');
const authMiddleware = require('../middleware/AuthMiddleware');
const serviceMiddleware = require('../middleware/ServiceMiddleware');
const historicoValidation = require('../validation/HistoricoValidation');

const router = Router();

// ==========================================
// ROTAS PÚBLICAS (Acesso livre para consulta)
// ==========================================

// R - Buscar histórico completo de um serviço específico (público)
router.get('/services/:id/historico', historicoController.getHistoricoByServiceId);

// R - Buscar timeline completa de um serviço (inclui mudanças e observações)
router.get('/services/:id/timeline', historicoController.getServiceTimeline);


// ==========================================
// ROTAS PRIVADAS (Requerem autenticação JWT)
// ==========================================

// C - Adicionar observação manual ao histórico (dono do serviço ou ADMIN)
router.post(
    '/services/:id/historico/observacao',
    authMiddleware.handle,
    serviceMiddleware.CompanysOrOwnership,
    historicoValidation.addObservacaoSchema,
    historicoController.addObservacao
);


// ==========================================
// ROTAS ADMINISTRATIVAS (Apenas ADMIN)
// ==========================================

// R - Listar todo o histórico do sistema (apenas ADMIN)
router.get(
    '/admin/historico',
    authMiddleware.handle,
    authMiddleware.authorizeRoles('ADMIN'),
    historicoController.getAllHistorico
);

// D - Deletar um registro histórico específico (apenas ADMIN)
router.delete(
    '/admin/historico/:historicoId',
    authMiddleware.handle,
    authMiddleware.authorizeRoles('ADMIN'),
    historicoController.deleteHistoricoEntry
);

module.exports = router;