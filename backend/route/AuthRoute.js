const { Router } = require('express');
const authController = require('../controller/AuthController');

const router = Router();

// Definição dos endpoints de autenticação [cite: 71, 352]
router.post('/auth/register', authController.register); // Cadastrar Conta [cite: 99]
router.post('/auth/login', authController.login);       // Efetuar Login [cite: 77]

module.exports = router;