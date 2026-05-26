const empresaService = require('../service/EmpresaService');
const logger = require('../config/logger');

class EmpresaController {
    // Criar ou atualizar perfil empresarial
    async createOrUpdatePerfil(req, res) {
        try {
            const usuarioId = req.userId; // Pego do token JWT
            const { descricao, avaliacao_media } = req.body;

            const empresa = await empresaService.createOrUpdatePerfil(usuarioId, {
                descricao,
                avaliacao_media
            });

            return res.status(200).json({
                message: 'Perfil empresarial salvo com sucesso!',
                data: {
                    id: empresa.id,
                    id_usuario: empresa.id_usuario,
                    descricao: empresa.descricao,
                    avaliacao_media: empresa.avaliacao_media
                }
            });
        } catch (error) {
            logger.error(`Erro ao salvar perfil empresarial: ${error.message}`);
            return res.status(400).json({ error: error.message });
        }
    }

    // Buscar meu próprio perfil empresarial
    async getMyPerfil(req, res) {
        try {
            const usuarioId = req.userId;
            const empresa = await empresaService.getPerfilByUsuarioId(usuarioId);

            return res.status(200).json({
                id: empresa.id,
                id_usuario: empresa.id_usuario,
                descricao: empresa.descricao,
                avaliacao_media: empresa.avaliacao_media
            });
        } catch (error) {
            logger.error(`Erro ao buscar perfil empresarial: ${error.message}`);
            return res.status(404).json({ error: error.message });
        }
    }

    // Buscar perfil empresarial por ID do usuário (público)
    async getPerfilByUsuarioId(req, res) {
        try {
            const { usuarioId } = req.params;
            const empresa = await empresaService.getPerfilByUsuarioId(usuarioId);

            return res.status(200).json({
                id: empresa.id,
                id_usuario: empresa.id_usuario,
                descricao: empresa.descricao,
                avaliacao_media: empresa.avaliacao_media
            });
        } catch (error) {
            logger.error(`Erro ao buscar perfil empresarial: ${error.message}`);
            return res.status(404).json({ error: error.message });
        }
    }

    // Listar todas as empresas (público)
    async getAllEmpresas(req, res) {
        try {
            const empresas = await empresaService.getAllEmpresas();
            
            return res.status(200).json(empresas.map(empresa => ({
                id: empresa.id,
                id_usuario: empresa.id_usuario,
                descricao: empresa.descricao,
                avaliacao_media: empresa.avaliacao_media
            })));
        } catch (error) {
            logger.error(`Erro ao listar empresas: ${error.message}`);
            return res.status(400).json({ error: error.message });
        }
    }

    // Atualizar avaliação média da empresa (quando receber feedback)
    async updateAvaliacao(req, res) {
        try {
            const { usuarioId } = req.params;
            const { avaliacao } = req.body;

            if (!avaliacao || avaliacao < 0 || avaliacao > 5) {
                return res.status(400).json({ error: 'Avaliação deve ser um número entre 0 e 5.' });
            }

            const empresa = await empresaService.updateAvaliacao(usuarioId, avaliacao);

            return res.status(200).json({
                message: 'Avaliação atualizada com sucesso!',
                avaliacao_media: empresa.avaliacao_media
            });
        } catch (error) {
            logger.error(`Erro ao atualizar avaliação: ${error.message}`);
            return res.status(404).json({ error: error.message });
        }
    }
}

module.exports = new EmpresaController();