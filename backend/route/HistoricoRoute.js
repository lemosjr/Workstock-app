const { Router } = require('express');
const historicoController = require('../controller/HistoricoController');
const historicoService = require('../service/HistoricoService');
const serviceService = require('../service/ServiceService');
const authMiddleware = require('../middleware/AuthMiddleware');
const serviceMiddleware = require('../middleware/ServiceMiddleware');
const historicoValidation = require('../validation/HistoricoValidation');

const router = Router();

// ==========================================
// ROTAS PÚBLICAS (Acesso livre para consulta)
// ==========================================

router.get('/services/:id/historico', historicoController.getHistoricoByServiceId);
router.get('/services/:id/timeline', historicoController.getServiceTimeline);

// ==========================================
// ROTAS PRIVADAS (Requerem autenticação)
// ==========================================

router.get(
    '/historico/:historicoId',
    authMiddleware.handle,
    historicoController.getHistoricoById
);

router.post(
    '/services/:id/historico/observacao',
    authMiddleware.handle,
    serviceMiddleware.CompanysOrOwnership,
    historicoValidation.addObservacaoSchema,
    historicoController.addObservacao
);

// PUT com verificação de ownership
router.put(
    '/historico/:historicoId',
    authMiddleware.handle,
    async (req, res, next) => {
        try {
            const { historicoId } = req.params;
            const historico = await historicoService.getHistoricoByIdForPermission(historicoId);
            const service = await serviceService.getRequestById(historico.id_service);
            
            if (req.userRole !== 'ADMIN' && service.id_usuario !== req.userId) {
                return res.status(403).json({
                    error: 'Acesso negado. Você só pode editar observações dos seus próprios serviços.'
                });
            }
            next();
        } catch (error) {
            return res.status(404).json({ error: error.message });
        }
    },
    historicoValidation.updateObservacaoSchema,
    historicoController.updateObservacao
);

// DELETE - Apenas ADMIN
router.delete(
    '/historico/:historicoId',
    authMiddleware.handle,
    authMiddleware.authorizeRoles('ADMIN'),
    historicoController.deleteHistoricoEntry
);

router.delete(
    '/services/:id/historico',
    authMiddleware.handle,
    authMiddleware.authorizeRoles('ADMIN'),
    historicoController.deleteAllServiceHistory
);

router.get(
    '/admin/historico',
    authMiddleware.handle,
    authMiddleware.authorizeRoles('ADMIN'),
    historicoController.getAllHistorico
);

module.exports = router;