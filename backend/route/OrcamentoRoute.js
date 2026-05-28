const { Router } = require('express');
const orcamentoController = require('../controller/OrcamentoController');

const router = Router();

router.post('/orcamentos', orcamentoController.create);

router.get('/orcamentos/:id', orcamentoController.getById);
router.get('/orcamentos/solicitacao/:id_solicitacao', orcamentoController.getBySolicitacao);
router.put('/orcamentos/:id', orcamentoController.update);
router.delete('/orcamentos/:id', orcamentoController.delete);

module.exports = router;