const empresaEspecialidadeRepository = require('../repository/EmpresaEspecialidadeRepository');
const empresaRepository = require('../repository/EmpresaRepository');
const especialidadeRepository = require('../repository/EspecialidadeRepository');
const logger = require('../config/logger');

class EmpresaEspecialidadeController {
    async vincular(req, res) {
        try {
            const { empresaId } = req.params;
            const { id_especialidade } = req.body;

            let empresa = await empresaRepository.findById(empresaId);
            if (!empresa) empresa = await empresaRepository.findByUsuarioId(empresaId);
            if (!empresa) return res.status(404).json({ error: 'Empresa não encontrada.' });

            const especialidade = await especialidadeRepository.findById(id_especialidade);
            if (!especialidade) return res.status(404).json({ error: 'Especialidade não encontrada.' });

            const vinculo = await empresaEspecialidadeRepository.vincular(empresa.id, id_especialidade);
            return res.status(201).json({ message: 'Especialidade vinculada com sucesso!', data: vinculo });
        } catch (error) {
            logger.error(`Erro ao vincular especialidade: ${error.message}`);
            return res.status(400).json({ error: error.message });
        }
    }

    async listar(req, res) {
        try {
            const { empresaId } = req.params;
            let empresa = await empresaRepository.findById(empresaId);
            if (!empresa) empresa = await empresaRepository.findByUsuarioId(empresaId);
            if (!empresa) return res.status(404).json({ error: 'Empresa não encontrada.' });
            const vinculos = await empresaEspecialidadeRepository.findByEmpresaId(empresa.id);
            return res.status(200).json(vinculos);
        } catch (error) {
            logger.error(`Erro ao listar especialidades da empresa: ${error.message}`);
            return res.status(400).json({ error: error.message });
        }
    }

    async desvincular(req, res) {
        try {
            const { empresaId, especialidadeId } = req.params;
            let empresa = await empresaRepository.findById(empresaId);
            if (!empresa) empresa = await empresaRepository.findByUsuarioId(empresaId);
            if (!empresa) return res.status(404).json({ error: 'Empresa não encontrada.' });
            const removido = await empresaEspecialidadeRepository.desvincular(empresa.id, especialidadeId);
            if (!removido) return res.status(404).json({ error: 'Vínculo não encontrado.' });
            return res.status(200).json({ message: 'Especialidade desvinculada com sucesso!' });
        } catch (error) {
            logger.error(`Erro ao desvincular especialidade: ${error.message}`);
            return res.status(400).json({ error: error.message });
        }
    }
}

module.exports = new EmpresaEspecialidadeController();
