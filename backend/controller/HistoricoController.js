const historicoService = require('../service/HistoricoService');
const serviceService = require('../service/ServiceService');
const logger = require('../config/logger');

class HistoricoController {
    // GET /services/:id/historico
    async getHistoricoByServiceId(req, res) {
        try {
            const { id } = req.params;
            const historico = await historicoService.getHistoricoByServiceId(id);

            return res.status(200).json({
                service_id: parseInt(id),
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

    // GET /services/:id/timeline
    async getServiceTimeline(req, res) {
        try {
            const { id } = req.params;
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
                    id: entry.id,
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

    // GET /historico/:historicoId
    async getHistoricoById(req, res) {
        try {
            const { historicoId } = req.params;
            const usuarioId = req.userId;
            const userRole = req.userRole;

            const historico = await historicoService.getHistoricoById(historicoId, usuarioId, userRole);

            return res.status(200).json({
                id: historico.id,
                id_service: historico.id_service,
                status_anterior: historico.status_anterior,
                status_novo: historico.status_novo,
                comentario: historico.comentario,
                observacao: historico.observacao,
                data_hora: historico.data_hora
            });
        } catch (error) {
            logger.error(`Erro ao buscar registro histórico: ${error.message}`);
            return res.status(404).json({ error: error.message });
        }
    }

    // POST /services/:id/historico/observacao
    async addObservacao(req, res) {
        try {
            const { id } = req.params;
            const usuarioId = req.userId;
            const { comentario, observacao } = req.body;

            if (!comentario && !observacao) {
                return res.status(400).json({
                    error: 'É necessário fornecer um comentário ou observação.'
                });
            }

            const service = await serviceService.getRequestById(id);
            if (req.userRole !== 'ADMIN' && service.id_usuario !== usuarioId) {
                return res.status(403).json({
                    error: 'Acesso negado. Você não tem permissão para adicionar observações a este serviço.'
                });
            }

            const historico = await historicoService.addObservacao(id, usuarioId, comentario, observacao);

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

    // PUT /historico/:historicoId
    async updateObservacao(req, res) {
        try {
            const { historicoId } = req.params;
            const usuarioId = req.userId;
            const userRole = req.userRole;
            const { comentario, observacao } = req.body;

            if (!comentario && !observacao) {
                return res.status(400).json({
                    error: 'É necessário fornecer um comentário ou observação para atualizar.'
                });
            }

            const updated = await historicoService.updateObservacao(
                historicoId,
                usuarioId,
                userRole,
                { comentario, observacao }
            );

            return res.status(200).json({
                message: 'Registro histórico atualizado com sucesso!',
                data: {
                    id: updated.id,
                    id_service: updated.id_service,
                    status_anterior: updated.status_anterior,
                    status_novo: updated.status_novo,
                    comentario: updated.comentario,
                    observacao: updated.observacao,
                    data_hora: updated.data_hora
                }
            });
        } catch (error) {
            logger.error(`Erro ao atualizar registro histórico: ${error.message}`);
            return res.status(400).json({ error: error.message });
        }
    }

    // DELETE /historico/:historicoId
    async deleteHistoricoEntry(req, res) {
        try {
            const { historicoId } = req.params;
            const usuarioId = req.userId;
            const userRole = req.userRole;

            await historicoService.deleteHistoricoEntry(historicoId, usuarioId, userRole);

            return res.status(200).json({
                message: 'Registro histórico removido com sucesso!'
            });
        } catch (error) {
            logger.error(`Erro ao deletar registro histórico: ${error.message}`);
            return res.status(400).json({ error: error.message });
        }
    }

    // DELETE /services/:id/historico
    async deleteAllServiceHistory(req, res) {
        try {
            const { id } = req.params;
            const usuarioId = req.userId;
            const userRole = req.userRole;

            const total = await historicoService.deleteAllServiceHistory(id, usuarioId, userRole);

            return res.status(200).json({
                message: 'Todo o histórico do serviço foi removido com sucesso!',
                total_removidos: total
            });
        } catch (error) {
            logger.error(`Erro ao deletar histórico do serviço: ${error.message}`);
            return res.status(400).json({ error: error.message });
        }
    }

    // GET /admin/historico
    // CORREÇÃO: Retornar total correto com paginação
    async getAllHistorico(req, res) {
        try {
            if (req.userRole !== 'ADMIN') {
                return res.status(403).json({
                    error: 'Acesso negado. Apenas administradores podem acessar o histórico completo do sistema.'
                });
            }
    
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 20;
            const offset = (page - 1) * limit;
            const { startDate, endDate, status_anterior, status_novo } = req.query;
    
            const filters = {
                limit,
                offset,
                startDate,
                endDate,
                status_anterior,
                status_novo
            };
    
            const [historico, total] = await Promise.all([
                historicoService.getAllHistorico(filters),
                historicoService.countHistorico(filters)
            ]);
    
            return res.status(200).json({
                total_registros: total,
                page: page,
                limit: limit,
                total_paginas: Math.ceil(total / limit),
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
}

module.exports = new HistoricoController();