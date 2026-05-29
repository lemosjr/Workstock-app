const avaliacaoRepository = require('../repository/AvaliacaoRepository');
const serviceRepository = require('../repository/ServiceRepository');
const empresaRepository = require('../repository/EmpresaRepository');
const userRepository = require('../repository/UserRepository');
const logger = require('../config/logger');


class AvaliacaoService {
    // CREATE - POST
    async createAvaliacao(avaliacaoData, serviceId, empresaId) {
        // Garantir existência do serviço
        const service = await serviceRepository.findById(serviceId);
        if (!service) {
            throw new Error('Serviço não encontrado.');
        }

        // Garantir que o serviço está concluído
        if (service.status_solicitacao !== 'CONCLUIDO') {
            throw new Error('Serviço cancelado ou ainda não finalizado.');
        }

        // Garantir existência da empresa 
        const empresa = await empresaRepository.findById(empresaId);
        if (!empresa) {
            throw new Error('Empresa não encontrada.');
        }

        const avaliacao = await avaliacaoRepository.create({
            nota: avaliacaoData.nota,
            comentario: avaliacaoData.comentario,
            id_service: serviceId,
            id_empresa: empresaId
        });

        logger.info(`Avaliação criada para o serviço ID ${serviceId} e empresa ID ${empresaId}`);
        return avaliacao;
    }

    // READ - GET (ALL)
    async getAllAvaliacao() {
        return await avaliacaoRepository.findAll();
    }

    // READ - GET (by id)
    async getAvaliacaoById(id) {
        const avaliacao = await avaliacaoRepository.findById(id);
        if (!avaliacao) {
            throw new Error('Avaliação inexistente!');
        }
        return avaliacao;
    }

    // UPDATE - PUT
    async updateAvaliacao(id, updateData) {
        const avaliacao = await avaliacaoRepository.findById(id);
       
        if (!avaliacao) {
            throw new Error('Avaliação não encontrada.');
        }
        return await avaliacaoRepository.update(id, updateData);
    }

    // DELETE
    async deleteAvaliacao(id) {
        const avaliacao = await avaliacaoRepository.findById(id);
        if (!avaliacao) {
            throw new Error('Avaliação não encontrada.');
        }

        const service = await serviceRepository.findById(avaliacao.id_service);
        if (!service) {
            throw new Error('Serviço vinculado à avaliação não encontrado.');
        }

        // Buscar o usuário
        const usuario = await userRepository.findById(service.id_usuario);
        if (!usuario) {
            throw new Error('Usuário vinculado ao serviço não encontrado.');
        }

        // Lançar erro caso o usuário não seja ADMIN
        if (usuario.tipo_usuario !== 'ADMIN') {
            throw new Error('Apenas administradores podem excluir avaliações.');
        }

        logger.info(`Avaliação ID ${id} excluída pelo administrador (usuário ID ${usuario.id})`);
        return await avaliacaoRepository.delete(id);
    }
}

module.exports = new AvaliacaoService();