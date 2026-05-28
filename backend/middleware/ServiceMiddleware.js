const logger = require('../config/logger');
const serviceService = require('../service/ServiceService');

class ServiceMiddleware {
    // Garante que apenas o criador do serviço ou um ADMIN possa prosseguir
    async CompanysOrOwnership(req, res, next) {
        try {
            const { id } = req.params;
            const userId = req.userId;     
            const userRole = req.userRole; 

            // Busca o serviço para checar quem é o dono
            const service = await serviceService.getRequestById(id);

            if (userRole !== 'ADMIN' && service.userId !== userId) {
                logger.warn(`Usuário ${userId} tentou manipular o serviço ID ${id} sem ter permissão.`);
                return res.status(403).json({ 
                    error: 'Acesso negado. Você não é o proprietário desta solicitação de serviço.' 
                });
            }

            req.validatedService = service;
            
            next();
        } catch (error) {
            logger.error(`Erro no ServiceMiddleware: ${error.message}`);
            return res.status(error.message.includes('não encontrada') ? 404 : 500).json({ 
                error: error.message 
            });
        }
    }
}

module.exports = new ServiceMiddleware();