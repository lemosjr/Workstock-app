const jwt = require('jsonwebtoken');
const logger = require('../config/logger');

class AuthMiddleware {
    // Interceptador para verificar se o usuário está autenticado via JWT
    handle(req, res, next) {
        const authHeader = req.headers.authorization;

        // Verifica se o cabeçalho Authorization foi enviado
        if (!authHeader) {
            logger.warn('Tentativa de acesso a rota protegida sem cabeçalho de autenticação.');
            return res.status(401).json({ error: 'Token de autenticação não fornecido.' });
        }

        // O cabeçalho geralmente vem no formato: "Bearer <TOKEN>"
        const parts = authHeader.split(' ');

        if (parts.length !== 2 || !/^Bearer$/i.test(parts[0])) {
            logger.warn('Formato de token inválido enviado no cabeçalho.');
            return res.status(401).json({ error: 'Token malformatado.' });
        }

        const token = parts[1];

        try {
            // Verifica e decodifica o token usando a chave secreta do .env
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            
            // Injeta os dados do usuário decodificado na requisição para uso posterior
            req.userId = decoded.id;
            req.userEmail = decoded.email;
            req.userRole = decoded.tipo_usuario; // Baseado na coluna do diagrama banco_de_dados.jpg

            return next();
        } catch (error) {
            logger.error(`Token JWT inválido ou expirado: ${error.message}`);
            return res.status(401).json({ error: 'Token inválido ou expirado. Faça login novamente.' });
        }
    }

    // Middleware opcional para restrição por nível de acesso (Ex: Apenas EMPRESA)
    authorizeRoles(...allowedRoles) {
        return (req, res, next) => {
            if (!req.userRole || !allowedRoles.includes(req.userRole)) {
                logger.warn(`Usuário ${req.userId} com role ${req.userRole} tentou acessar rota restrita para: ${allowedRoles}`);
                return res.status(403).json({ error: 'Acesso negado. Você não tem permissão para esta ação.' });
            }
            next();
        };
    }
}

module.exports = new AuthMiddleware();