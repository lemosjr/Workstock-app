const logger = require('../config/logger');

class ServiceMiddleware {
    // Versão limpa de teste para ver se o servidor liga
    async CompanysOrOwnership(req, res, next) {
        try {
            // Pulando a consulta ao serviceService temporariamente para testar
            next();
        } catch (error) {
            logger.error(`Erro no ServiceMiddleware: ${error.message}`);
            return res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new ServiceMiddleware();