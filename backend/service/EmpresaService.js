const empresaRepository = require('../repository/EmpresaRepository');
const userRepository = require('../repository/UserRepository');
const logger = require('../config/logger');

class EmpresaService {
    async createOrUpdatePerfil(usuarioId, empresaData) {
        // Verifica se usuário existe e é do tipo EMPRESA
        const user = await userRepository.findById(usuarioId);
        if (!user) {
            throw new Error('Usuário não encontrado.');
        }
        if (user.tipo_usuario !== 'EMPRESA') {
            throw new Error('Apenas usuários do tipo EMPRESA podem ter perfil empresarial.');
        }

        // Verifica se já existe perfil
        let empresa = await empresaRepository.findByUsuarioId(usuarioId);
        
        if (empresa) {
            // Atualiza existente
            empresa = await empresaRepository.update(empresa.id, empresaData);
            logger.info(`Perfil empresarial atualizado para usuário ID ${usuarioId}`);
        } else {
            // Cria novo
            empresa = await empresaRepository.create({
                id_usuario: usuarioId,
                ...empresaData
            });
            logger.info(`Perfil empresarial criado para usuário ID ${usuarioId}`);
        }
        
        return empresa;
    }

    async getPerfilByUsuarioId(usuarioId) {
        const empresa = await empresaRepository.findByUsuarioId(usuarioId);
        if (!empresa) {
            throw new Error('Perfil empresarial não encontrado para este usuário.');
        }
        return empresa;
    }

    async getAllEmpresas() {
        return await empresaRepository.findAll();
    }

    async updateAvaliacao(usuarioId, novaAvaliacao) {
        const empresa = await empresaRepository.findByUsuarioId(usuarioId);
        if (!empresa) {
            throw new Error('Empresa não encontrada.');
        }
        
        // Calcula nova média (simplificado - idealmente viria de avaliações reais)
        const mediaAtual = parseFloat(empresa.avaliacao_media) || 0;
        const novaMedia = (mediaAtual + novaAvaliacao) / 2;
        
        return await empresaRepository.update(empresa.id, { 
            avaliacao_media: Math.min(5, Math.max(0, novaMedia)) 
        });
    }
}

module.exports = new EmpresaService();