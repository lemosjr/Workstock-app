const historicoRepository = require('../repository/HistoricoRepository');
const serviceRepository = require('../repository/ServiceRepository');
const userRepository = require('../repository/UserRepository'); // CORRIGIDO
const logger = require('../config/logger');

class HistoricoService {
    async addObservacao(serviceId, usuarioId, comentario, observacao) {
        const service = await serviceRepository.findById(serviceId);
        if (!service) {
            throw new Error('Solicitação de serviço não encontrada.');
        }

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

    async getHistoricoById(historicoId, usuarioId, userRole) {
        const historico = await historicoRepository.findById(historicoId);
        if (!historico) {
            throw new Error('Registro histórico não encontrado.');
        }

        const service = await serviceRepository.findById(historico.id_service);
        if (service.id_usuario !== usuarioId && userRole !== 'ADMIN') {
            throw new Error('Acesso negado. Você não tem permissão para visualizar este registro.');
        }

        return historico;
    }

    async getHistoricoByIdForPermission(historicoId) {
        const historico = await historicoRepository.findById(historicoId);
        if (!historico) {
            throw new Error('Registro histórico não encontrado.');
        }
        return historico;
    }

    async updateObservacao(historicoId, usuarioId, userRole, updateData) {
        const historico = await historicoRepository.findById(historicoId);
        if (!historico) {
            throw new Error('Registro histórico não encontrado.');
        }

        const service = await serviceRepository.findById(historico.id_service);
        if (service.id_usuario !== usuarioId && userRole !== 'ADMIN') {
            throw new Error('Acesso negado. Você só pode editar observações dos seus próprios serviços.');
        }

        if (historico.status_anterior !== historico.status_novo) {
            throw new Error('Não é possível editar registros automáticos de mudança de status.');
        }

        const updated = await historicoRepository.update(historicoId, updateData);
        if (!updated) {
            throw new Error('Erro ao atualizar registro histórico.');
        }

        logger.info(`Observação ID ${historicoId} atualizada pelo usuário ${usuarioId}`);
        return updated;
    }

    async deleteHistoricoEntry(historicoId, usuarioId, userRole) {
        const historico = await historicoRepository.findById(historicoId);
        if (!historico) {
            throw new Error('Registro histórico não encontrado.');
        }

        if (userRole !== 'ADMIN') {
            throw new Error('Acesso negado. Apenas administradores podem deletar registros históricos.');
        }

        await historicoRepository.delete(historicoId);
        logger.info(`Registro histórico ID ${historicoId} deletado pelo admin ${usuarioId}`);
        return true;
    }

    async deleteAllServiceHistory(serviceId, usuarioId, userRole) {
        const service = await serviceRepository.findById(serviceId);
        if (!service) {
            throw new Error('Solicitação de serviço não encontrada.');
        }

        if (userRole !== 'ADMIN') {
            throw new Error('Acesso negado. Apenas administradores podem deletar histórico completo de serviços.');
        }

        const total = await historicoRepository.deleteByServiceId(serviceId);
        logger.info(`Histórico do serviço ID ${serviceId} deletado pelo admin ${usuarioId} - ${total} registros removidos`);
        return total;
    }

    async getAllHistorico(filters = {}) {
        return await historicoRepository.findAll(filters);
    }

    async countHistorico(filters = {}) {
        return await historicoRepository.count(filters);
    }
}

module.exports = new HistoricoService();