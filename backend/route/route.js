const { Router } = require('express');
const userController = require('../controller/controller');

const router = Router();

// Definição dos endpoints RESTful [NF022]
router.post('/auth/register', userController.register); // Rota para Cadastrar Conta [RF002]
router.post('/auth/login', userController.login);       // Rota para Efetuar Login [RF001]

module.exports = router;