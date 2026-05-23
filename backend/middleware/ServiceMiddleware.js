const serviceService = require('../service/ServiceService');
const logger = require('../config/logger');

class ServiceMiddleware {
    // Garante que apenas o criador do serviço ou um ADMIN possa prosseguir
    async CompanysOrOwnership(req, res, next) {
        try {
            const { id } = req.params;
            const userId = req.userId; // Injetado pelo AuthMiddleware
            const userRole = req.userRole; // Injetado pelo AuthMiddleware

            // Busca o serviço para checar quem é o dono (id_usuario)
            const service = await serviceService.getRequestById(id);

            // Regra: Se não for ADMIN e o id_usuario do serviço for diferente do ID do token, barra!
            if (userRole !== 'ADMIN' && service.id_usuario !== userId) {
                logger.warn(`Usuário ${userId} tentou manipular o serviço ID ${id} sem ter permissão.`);
                return res.status(403).json({ 
                    error: 'Acesso negado. Você não é o proprietário desta solicitação de serviço.' 
                });
            }

            // Se passou na validação, anexa o serviço buscado na requisição (opcional, economiza consulta no controller)
            req.validatedService = service;
            
            next();
        } catch (error) {
            logger.error(`Erro no ServiceMiddleware: ${error.message}`);
            return res.status(404).json({ error: error.message });
        }
    }
}

module.exports = new ServiceMiddleware();