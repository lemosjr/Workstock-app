const especialidadeService = require('../service/EspecialidadeService');
const logger = require('../config/logger');

class EspecialidadeController {
    // Listar todas as especialidades (público)
    async getAll(req, res) {
        try {
            const especialidades = await especialidadeService.getAll();
            return res.status(200).json(especialidades);
        } catch (error) {
            logger.error(`Erro ao listar especialidades: ${error.message}`);
            return res.status(400).json({ error: error.message });
        }
    }

    // Buscar especialidade por ID (público)
    async getById(req, res) {
        try {
            const { id } = req.params;
            const especialidade = await especialidadeService.getById(id);
            return res.status(200).json(especialidade);
        } catch (error) {
            logger.error(`Erro ao buscar especialidade: ${error.message}`);
            return res.status(404).json({ error: error.message });
        }
    }

    // Criar nova especialidade (apenas ADMIN)
    async create(req, res) {
        try {
            const { nome } = req.body;
            const especialidade = await especialidadeService.create({ nome });
            return res.status(201).json({
                message: 'Especialidade criada com sucesso!',
                data: especialidade
            });
        } catch (error) {
            logger.error(`Erro ao criar especialidade: ${error.message}`);
            return res.status(400).json({ error: error.message });
        }
    }

    // Atualizar especialidade (apenas ADMIN)
    async update(req, res) {
        try {
            const { id } = req.params;
            const { nome } = req.body;
            const especialidade = await especialidadeService.update(id, { nome });
            return res.status(200).json({
                message: 'Especialidade atualizada com sucesso!',
                data: especialidade
            });
        } catch (error) {
            logger.error(`Erro ao atualizar especialidade: ${error.message}`);
            return res.status(400).json({ error: error.message });
        }
    }

    // Deletar especialidade (apenas ADMIN)
    async delete(req, res) {
        try {
            const { id } = req.params;
            await especialidadeService.delete(id);
            return res.status(200).json({ message: 'Especialidade removida com sucesso!', id: parseInt(id) });
        } catch (error) {
            logger.error(`Erro ao deletar especialidade: ${error.message}`);
            return res.status(400).json({ error: error.message });
        }
    }
}

module.exports = new EspecialidadeController();
