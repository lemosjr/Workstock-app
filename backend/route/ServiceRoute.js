const { Router } = require('express');
const serviceController = require('../controller/ServiceController');
const serviceValidation = require('../validation/ServiceValidation');
const authMiddleware = require('../middleware/AuthMiddleware');
const serviceMiddleware = require('../middleware/ServiceMiddleware'); // Nosso novo middleware

const router = Router();

// C - Criar solicitação (Qualquer usuário logado pode criar uma)
router.post(
    '/services', 
    authMiddleware.handle, 
    serviceValidation.createSchema, 
    serviceController.create
);

// R - Listar e Detalhar (Acesso livre ou controlado)
router.get('/services', serviceController.getAll);
router.get('/services/:id', serviceController.getById);

// U - Atualizar dados/status (Apenas Dono do Serviço ou ADMIN + Validação Joi)
router.put(
    '/services/:id', 
    authMiddleware.handle, 
    serviceMiddleware.CompanysOrOwnership, 
    serviceValidation.updateSchema, 
    serviceController.update
);

// D - Deletar registro (Apenas Dono do Serviço ou ADMIN)
router.delete(
    '/services/:id', 
    authMiddleware.handle, 
    serviceMiddleware.CompanysOrOwnership, 
    serviceController.delete
);

module.exports = router;