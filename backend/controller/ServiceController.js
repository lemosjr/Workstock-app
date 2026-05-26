const serviceService = require('../service/ServiceService');

class ServiceController {
    async create(req, res) {
        try {
            const { categoria, tipo_imovel, endereco, coordenadas, prazo_urgencia, faixa_preco, foto } = req.body;

            if (!categoria || !tipo_imovel || !endereco || !prazo_urgencia || !faixa_preco) {
                return res.status(400).json({ error: 'Campos obrigatórios: categoria, tipo_imovel, endereco, prazo_urgencia e faixa_preco.' });
            }

            const newRequest = await serviceService.createRequest(
                { categoria, tipo_imovel, endereco, coordenadas, prazo_urgencia, faixa_preco, foto },
                req.userId
            );

            return res.status(201).json({
                message: 'Solicitação de serviço aberta com sucesso!',
                data: newRequest
            });
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    async getAll(req, res) {
        try {
            const { category, tipo_imovel, status } = req.query;
            const requests = await serviceService.getAllRequests({ category, tipo_imovel, status });
            return res.status(200).json(requests);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    async getById(req, res) {
        try {
            const { id } = req.params;
            const request = await serviceService.getRequestById(id);
            return res.status(200).json(request);
        } catch (error) {
            return res.status(404).json({ error: error.message });
        }
    }

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