const avaliacaoService = require('../service/AvaliacaoService');
const logger = require('../config/logger');

class AvaliacaoController {
    // CREATE - POST
    async create(req, res) {
        try {
            const { id_service, id_empresa, nota, comentario } = req.body;

            if (!id_service || !id_empresa || nota === undefined) {
                return res.status(400).json({
                    error: 'Campos obrigatórios: id_service, id_empresa e nota.'
                });
            }

            if (!Number.isInteger(nota) || nota < 1 || nota > 5) {
                return res.status(400).json({
                    error: 'O campo nota deve ser um número inteiro entre 1 e 5.'
                });
            }

            const avaliacao = await avaliacaoService.createAvaliacao(
                { nota, comentario },
                id_service,
                id_empresa
            );

            return res.status(201).json({
                message: 'Avaliação registrada com sucesso!',
                data: {
                    id: avaliacao.id,
                    id_service: avaliacao.id_service,
                    id_empresa: avaliacao.id_empresa,
                    nota: avaliacao.nota,
                    comentario: avaliacao.comentario
                }
            });
        } catch (error) {
            logger.error(`Erro ao criar avaliação: ${error.message}`);
            return res.status(400).json({ error: error.message });
        }
    }

    // READ - GET (all)
    async getAll(req, res) {
        try {
            const avaliacoes = await avaliacaoService.getAllAvaliacao();
            return res.status(200).json(avaliacoes);
        } catch (error) {
            logger.error(`Erro ao listar avaliações: ${error.message}`);
            return res.status(400).json({ error: error.message });
        }
    }

    // READ - GET (by id)
    async getById(req, res) {
        try {
            const { id } = req.params;
            const avaliacao = await avaliacaoService.getAvaliacaoById(id);

            return res.status(200).json({
                id: avaliacao.id,
                id_service: avaliacao.id_service,
                id_empresa: avaliacao.id_empresa,
                nota: avaliacao.nota,
                comentario: avaliacao.comentario
            });
        } catch (error) {
            logger.error(`Erro ao buscar avaliação: ${error.message}`);
            return res.status(404).json({ error: error.message });
        }
    }

    // UPDATE - PUT 
    async update(req, res) {
        try {
            const { id } = req.params;
            const { nota, comentario } = req.body;

            if (nota !== undefined && (!Number.isInteger(nota) || nota < 1 || nota > 5)) {
                return res.status(400).json({
                    error: 'O campo nota deve ser um número inteiro entre 1 e 5.'
                });
            }

            const updatedAvaliacao = await avaliacaoService.updateAvaliacao(id, { nota, comentario });

            return res.status(200).json({
                message: 'Avaliação atualizada com sucesso!',
                data: {
                    id: updatedAvaliacao.id,
                    id_service: updatedAvaliacao.id_service,
                    id_empresa: updatedAvaliacao.id_empresa,
                    nota: updatedAvaliacao.nota,
                    comentario: updatedAvaliacao.comentario
                }
            });
        } catch (error) {
            logger.error(`Erro ao atualizar avaliação: ${error.message}`);
            return res.status(400).json({ error: error.message });
        }
    }

    // DELETE
    async delete(req, res) {
        try {
            const { id } = req.params;
            await avaliacaoService.deleteAvaliacao(id);

            return res.status(200).json({
                message: 'Avaliação excluída com sucesso do sistema.'
            });
        } catch (error) {
            logger.error(`Erro ao excluir avaliação: ${error.message}`);
            return res.status(404).json({ error: error.message });
        }
    }
}

module.exports = new AvaliacaoController();
