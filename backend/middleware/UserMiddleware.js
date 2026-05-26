const logger = require('../config/logger');

class UserMiddleware {
    // Verifica se o usuário logado é o dono da conta ou ADMIN
    async checkUserOwnership(req, res, next) {
        try {
            const { id } = req.params; // ID do usuário que será alterado
            const userId = req.userId; // ID do usuário logado (do token)
            const userRole = req.userRole; // Role do usuário logado

            // Se for ADMIN, permite tudo
            if (userRole === 'ADMIN') {
                return next();
            }

            // Se não for ADMIN, verifica se está tentando modificar a própria conta
            if (parseInt(id) !== userId) {
                logger.warn(`Usuário ${userId} tentou modificar a conta de outro usuário (${id}) sem permissão.`);
                return res.status(403).json({ 
                    error: 'Acesso negado. Você só pode modificar sua própria conta.' 
                });
            }

            // Se passou na validação, continua
            next();
        } catch (error) {
            logger.error(`Erro no UserMiddleware: ${error.message}`);
            return res.status(500).json({ error: 'Erro interno ao verificar permissões.' });
        }
    }
}

module.exports = new UserMiddleware();