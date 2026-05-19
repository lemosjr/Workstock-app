const serviceService = require('../service/ServiceService');

class ServiceController {
    // C - CREATE: Criar uma nova solicitação de serviço
    async create(req, res) {
        try {
            const { clientName, category, propertyType, description, locationApprox, urgencyDeadline, estimatedBudget } = req.body;

            // Validação de presença para garantir integridade dos dados obrigatórios
            if (!clientName || !category || !propertyType || !description || !locationApprox || !urgencyDeadline || !estimatedBudget) {
                return res.status(400).json({ error: 'Todos os campos são obrigatórios para abrir uma solicitação.' });
            }

            const newRequest = await serviceService.createRequest({
                clientName,
                category,
                propertyType,
                description,
                locationApprox,
                urgencyDeadline,
                estimatedBudget
            });

            return res.status(201).json({
                message: 'Solicitação de serviço criada com sucesso!',
                data: newRequest
            });
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    // R - READ: Listar solicitações (Suporta filtros opcionais via Query String) [RF013, RF014]
    async getAll(req, res) {
        try {
            // Captura filtros opcionais enviados na URL (ex: ?category=Pintura) [RF014]
            const { category, propertyType, status } = req.query;
            
            const requests = await serviceService.getAllRequests({ category, propertyType, status });
            return res.status(200).json(requests);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    // R - READ: Buscar os detalhes de uma única solicitação por ID [RF013]
    async getById(req, res) {
        try {
            const { id } = req.params;
            const request = await serviceService.getRequestById(id);
            return res.status(200).json(request);
        } catch (error) {
            return res.status(404).json({ error: error.message });
        }
    }

    // U - UPDATE: Atualizar dados ou trocar status da solicitação [RF017]
    async update(req, res) {
        try {
            const { id } = req.params;
            const updatedRequest = await serviceService.updateRequest(id, req.body);
            
            return res.status(200).json({
                message: 'Solicitação de serviço atualizada com sucesso!',
                data: updatedRequest
            });
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    // D - DELETE: Deletar/remover uma solicitação de serviço do sistema
    async delete(req, res) {
        try {
            const { id } = req.params;
            await serviceService.deleteRequest(id);
            
            return res.status(200).json({
                message: 'Solicitação de serviço excluída com sucesso do sistema.'
            });
        } catch (error) {
            return res.status(404).json({ error: error.message });
        }
    }
}

module.exports = new ServiceController();