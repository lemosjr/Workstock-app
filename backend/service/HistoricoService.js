const historicoRepository = require('../repository/HistoricoRepository');
const serviceRepository = require('../repository/ServiceRepository');
const logger = require('../config/logger');

class HistoricoService {
    async addObservacao(serviceId, usuarioId, comentario, observacao) {
        // Verifica se serviço existe
        const service = await serviceRepository.findById(serviceId);
        if (!service) {
            throw new Error('Solicitação de serviço não encontrada.');
        }

        // Registra no histórico (mantém status atual)
        const historico = await historicoRepository.create({
            id_service: serviceId,
            status_anterior: service.status_solicitacao,
            status_novo: service.status_solicitacao,
            comentario: comentario || 'Observação adicionada',
            observacao: observacao
        });

        logger.info(`Observação adicionada ao serviço ID ${serviceId} pelo usuário ${usuarioId}`);
        return historico;
    }

    async getHistoricoByServiceId(serviceId) {
        const service = await serviceRepository.findById(serviceId);
        if (!service) {
            throw new Error('Solicitação de serviço não encontrada.');
        }
        return await historicoRepository.findByServiceId(serviceId);
    }

    async getAllHistorico() {
        return await historicoRepository.findAll();
    }

    async deleteHistoricoEntry(historicoId, usuarioId, userRole) {
        const historico = await historicoRepository.findById(historicoId);
        if (!historico) {
            throw new Error('Registro histórico não encontrado.');
        }

        // Apenas ADMIN pode deletar histórico
        if (userRole !== 'ADMIN') {
            throw new Error('Acesso negado. Apenas administradores podem deletar registros históricos.');
        }

        await historicoRepository.delete(historicoId);
        logger.info(`Registro histórico ID ${historicoId} deletado pelo admin ${usuarioId}`);
        return true;
    }
}

module.exports = new HistoricoService();