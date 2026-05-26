const { Router } = require('express');
const authController = require('../controller/AuthController');
const userValidation = require('../validation/UserValidation');
const authMiddleware = require('../middleware/AuthMiddleware');
const userMiddleware = require('../middleware/UserMiddleware');

const router = Router();

// ==========================================
// ROTAS PÚBLICAS
// ==========================================

router.post('/auth/register', userValidation.registerSchema, authController.register);
router.post('/auth/login', userValidation.loginSchema, authController.login);

// Nova rota: Refresh Token
router.post('/auth/refresh-token', authController.refreshToken);

// ==========================================
// ROTAS PRIVADAS (Requerem autenticação)
// ==========================================

// Nova rota: Logout
router.post('/auth/logout', authMiddleware.handle, authController.logout);

// Nova rota: Logout de todos dispositivos
router.post('/auth/logout-all', authMiddleware.handle, authController.logoutAllDevices);

// Rotas de usuário
router.get('/users', authMiddleware.handle, authMiddleware.authorizeRoles('ADMIN'), authController.getAll);
router.get('/users/:id', authMiddleware.handle, authController.getById);
router.put('/users/:id', authMiddleware.handle, userMiddleware.checkUserOwnership, authController.update);
router.delete('/users/:id', authMiddleware.handle, userMiddleware.checkUserOwnership, authController.delete);

module.exports = router;