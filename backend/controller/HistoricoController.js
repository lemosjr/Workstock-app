const historicoService = require('../service/HistoricoService');
const serviceService = require('../service/ServiceService');
const logger = require('../config/logger');

class HistoricoController {
    // Adicionar observação manual ao histórico de um serviço
    async addObservacao(req, res) {
        try {
            const { id } = req.params; // ID do serviço
            const usuarioId = req.userId;
            const { comentario, observacao } = req.body;

            if (!comentario && !observacao) {
                return res.status(400).json({ 
                    error: 'É necessário fornecer um comentário ou observação.' 
                });
            }

            // Verifica se o usuário tem permissão (dono ou admin)
            const service = await serviceService.getRequestById(id);
            if (req.userRole !== 'ADMIN' && service.id_usuario !== usuarioId) {
                return res.status(403).json({ 
                    error: 'Acesso negado. Você não tem permissão para adicionar observações a este serviço.' 
                });
            }

            const historico = await historicoService.addObservacao(
                id, 
                usuarioId, 
                comentario, 
                observacao
            );

            return res.status(201).json({
                message: 'Observação adicionada ao histórico com sucesso!',
                data: {
                    id: historico.id,
                    id_service: historico.id_service,
                    status_anterior: historico.status_anterior,
                    status_novo: historico.status_novo,
                    comentario: historico.comentario,
                    observacao: historico.observacao,
                    data_hora: historico.data_hora
                }
            });
        } catch (error) {
            logger.error(`Erro ao adicionar observação: ${error.message}`);
            return res.status(400).json({ error: error.message });
        }
    }

    // Buscar histórico completo de um serviço específico
    async getHistoricoByServiceId(req, res) {
        try {
            const { id } = req.params; // ID do serviço
            const historico = await historicoService.getHistoricoByServiceId(id);

            return res.status(200).json({
                service_id: id,
                total_registros: historico.length,
                historico: historico.map(entry => ({
                    id: entry.id,
                    status_anterior: entry.status_anterior,
                    status_novo: entry.status_novo,
                    comentario: entry.comentario,
                    observacao: entry.observacao,
                    data_hora: entry.data_hora
                }))
            });
        } catch (error) {
            logger.error(`Erro ao buscar histórico: ${error.message}`);
            return res.status(404).json({ error: error.message });
        }
    }

    // Listar todo o histórico do sistema (apenas ADMIN)
    async getAllHistorico(req, res) {
        try {
            // Apenas ADMIN pode ver todo o histórico
            if (req.userRole !== 'ADMIN') {
                return res.status(403).json({ 
                    error: 'Acesso negado. Apenas administradores podem acessar o histórico completo do sistema.' 
                });
            }

            const historico = await historicoService.getAllHistorico();

            return res.status(200).json({
                total_registros: historico.length,
                historico: historico.map(entry => ({
                    id: entry.id,
                    id_service: entry.id_service,
                    status_anterior: entry.status_anterior,
                    status_novo: entry.status_novo,
                    comentario: entry.comentario,
                    observacao: entry.observacao,
                    data_hora: entry.data_hora
                }))
            });
        } catch (error) {
            logger.error(`Erro ao listar histórico: ${error.message}`);
            return res.status(400).json({ error: error.message });
        }
    }

    // Deletar um registro histórico específico (apenas ADMIN)
    async deleteHistoricoEntry(req, res) {
        try {
            const { historicoId } = req.params;
            const usuarioId = req.userId;
            const userRole = req.userRole;

            await historicoService.deleteHistoricoEntry(historicoId, usuarioId, userRole);

            return res.status(200).json({
                message: 'Registro histórico deletado com sucesso!'
            });
        } catch (error) {
            logger.error(`Erro ao deletar registro histórico: ${error.message}`);
            return res.status(400).json({ error: error.message });
        }
    }

    // Buscar timeline completa de um serviço (inclui mudanças automáticas e observações)
    async getServiceTimeline(req, res) {
        try {
            const { id } = req.params;
            
            // Busca serviço e histórico
            const service = await serviceService.getRequestById(id);
            const historico = await historicoService.getHistoricoByServiceId(id);

            return res.status(200).json({
                servico: {
                    id: service.id,
                    categoria: service.categoria,
                    status_atual: service.status_solicitacao,
                    data_criacao: service.data_criacao
                },
                timeline: historico.map(entry => ({
                    tipo: entry.status_anterior !== entry.status_novo ? 'MUDANÇA_STATUS' : 'OBSERVAÇÃO',
                    de: entry.status_anterior,
                    para: entry.status_novo,
                    comentario: entry.comentario,
                    observacao: entry.observacao,
                    data: entry.data_hora
                }))
            });
        } catch (error) {
            logger.error(`Erro ao buscar timeline: ${error.message}`);
            return res.status(404).json({ error: error.message });
        }
    }
}

module.exports = new HistoricoController();