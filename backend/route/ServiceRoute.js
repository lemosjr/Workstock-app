const { Router } = require('express');
const serviceController = require('../controller/ServiceController');

const router = Router();

// Endpoints do CRUD de Solicitações de Serviço
router.post('/services', serviceController.create);       // C - Criar solicitação
router.get('/services', serviceController.getAll);        // R - Listar todas (ou filtrar por query)
router.get('/services/:id', serviceController.getById);   // R - Buscar detalhes por ID
router.put('/services/:id', serviceController.update);    // U - Atualizar dados/status
router.delete('/services/:id', serviceController.delete); // D - Deletar do sistema

module.exports = router;