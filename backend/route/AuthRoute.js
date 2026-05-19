const { Router } = require('express');
const authController = require('../controller/AuthController');

const router = Router();

// Endpoints de Autenticação e Cadastro
router.post('/auth/register', authController.register); // C - Cadastrar Conta [RF002]
router.post('/auth/login', authController.login);       // R - Efetuar Login [RF001]

// Endpoints Adicionais do CRUD de Usuários
router.get('/users', authController.getAll);            // R - Listar todos os usuários
router.get('/users/:id', authController.getById);        // R - Obter perfil por ID
router.put('/users/:id', authController.update);        // U - Editar dados de perfil [RF004]
router.delete('/users/:id', authController.delete);     // D - Excluir conta de usuário

module.exports = router;