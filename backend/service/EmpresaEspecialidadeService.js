const empresaEspecialidadeRepository = require('../repository/EmpresaEspecialidadeRepository');
const empresaRepository = require('../repository/EmpresaRepository');
const especialidadeRepository = require('../repository/EspecialidadeRepository');
const logger = require('../config/logger');

class EmpresaEspecialidadeService {
    async getAll(empresaId) {
        // Verifica se a empresa existe antes de listar
        const empresa = await empresaRepository.findById(empresaId);
        if (!empresa) {
            throw new Error('Empresa não encontrada.');
        }

        return await empresaEspecialidadeRepository.findByEmpresaId(empresa.id);
    }

    async link(empresaId, id_especialidade) {
        // Verifica se a empresa existe pelo ID direto ou pelo ID do usuário
        let empresa = await empresaRepository.findById(empresaId);
        if (!empresa) empresa = await empresaRepository.findByUsuarioId(empresaId);
        if (!empresa) {
            throw new Error('Empresa não encontrada.');
        }

        // Verifica se a especialidade existe
        const especialidade = await especialidadeRepository.findById(id_especialidade);
        if (!especialidade) {
            throw new Error('Especialidade não encontrada.');
        }

        // Verifica se o vínculo já existe para evitar duplicatas
        const vinculos = await empresaEspecialidadeRepository.findByEmpresaId(empresa.id);
        const jaVinculada = vinculos.some(v => v.id_especialidade === parseInt(id_especialidade));
        if (jaVinculada) {
            throw new Error('Esta especialidade já está vinculada à empresa.');
        }

        const vinculo = await empresaEspecialidadeRepository.link(empresa.id, id_especialidade);
        logger.info(`Especialidade ID ${id_especialidade} vinculada à empresa ID ${empresa.id}`);
        return vinculo;
    }

    async unlink(empresaId, especialidadeId) {
        // Verifica se a empresa existe pelo ID direto ou pelo ID do usuário
        let empresa = await empresaRepository.findById(empresaId);
        if (!empresa) empresa = await empresaRepository.findByUsuarioId(empresaId);
        if (!empresa) {
            throw new Error('Empresa não encontrada.');
        }

        const removido = await empresaEspecialidadeRepository.unlink(empresa.id, especialidadeId);
        if (!removido) {
            throw new Error('Vínculo não encontrado.');
        }

        logger.info(`Especialidade ID ${especialidadeId} desvinculada da empresa ID ${empresa.id}`);
    }
}

module.exports = new EmpresaEspecialidadeService();
