const { Router } = require('express');
const authController = require('../controller/AuthController');
const userValidation = require('../validation/UserValidation');
const authMiddleware = require('../middleware/AuthMiddleware');
const userMiddleware = require('../middleware/UserMiddleware'); // NOVO middleware

const router = Router();

// ==========================================
// ROTAS PÚBLICAS (Validadas com Joi)
// ==========================================

// C - Cadastrar Conta [RF002] com validação estrutural do Joi
router.post('/auth/register', userValidation.registerSchema, authController.register);

// R - Efetuar Login [RF001] com validação estrutural do Joi (Gera Token JWT)
router.post('/auth/login', userValidation.loginSchema, authController.login);


// ==========================================
// ROTAS PRIVADAS (Protegidas por Token JWT)
// ==========================================

// R - Listar todos os usuários (Apenas administradores do sistema têm acesso)
router.get('/users', authMiddleware.handle, authMiddleware.authorizeRoles('ADMIN'), authController.getAll);

// R - Obter perfil por ID (Qualquer usuário logado pode consultar)
router.get('/users/:id', authMiddleware.handle, authController.getById);

// U - Editar dados de perfil [RF004] (Apenas o próprio usuário ou ADMIN)
router.put(
    '/users/:id', 
    authMiddleware.handle, 
    userMiddleware.checkUserOwnership, // NOVO: verifica se é o dono ou ADMIN
    authController.update
);

// D - Excluir conta de usuário (Apenas o próprio usuário ou ADMIN)
router.delete(
    '/users/:id', 
    authMiddleware.handle, 
    userMiddleware.checkUserOwnership, // NOVO: verifica se é o dono ou ADMIN
    authController.delete
);

module.exports = router;