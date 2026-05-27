const empresaEspecialidadeService = require('../service/EmpresaEspecialidadeService');
const logger = require('../config/logger');

class EmpresaEspecialidadeController {
    // Listar especialidades de uma empresa (público)
    async listar(req, res) {
        try {
            const { empresaId } = req.params;
            const vinculos = await empresaEspecialidadeService.listar(empresaId);
            return res.status(200).json(vinculos);
        } catch (error) {
            logger.error(`Erro ao listar especialidades da empresa: ${error.message}`);
            return res.status(404).json({ error: error.message });
        }
    }

    // Vincular especialidade a uma empresa (apenas EMPRESA dona do perfil)
    async vincular(req, res) {
        try {
            const { empresaId } = req.params;
            const { id_especialidade } = req.body;
            const vinculo = await empresaEspecialidadeService.vincular(empresaId, id_especialidade);
            return res.status(201).json({
                message: 'Especialidade vinculada com sucesso!',
                data: vinculo
            });
        } catch (error) {
            logger.error(`Erro ao vincular especialidade: ${error.message}`);
            return res.status(400).json({ error: error.message });
        }
    }

    // Desvincular especialidade de uma empresa (apenas EMPRESA dona do perfil)
    async desvincular(req, res) {
        try {
            const { empresaId, especialidadeId } = req.params;
            await empresaEspecialidadeService.desvincular(empresaId, especialidadeId);
            return res.status(200).json({ message: 'Especialidade desvinculada com sucesso!' });
        } catch (error) {
            logger.error(`Erro ao desvincular especialidade: ${error.message}`);
            return res.status(400).json({ error: error.message });
        }
    }
}

module.exports = new EmpresaEspecialidadeController();
