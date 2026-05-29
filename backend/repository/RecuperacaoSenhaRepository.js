const { RecuperacaoSenha } = require('../model/index');
const { Op } = require('sequelize');
const logger = require('../config/logger');

class RecuperacaoSenhaRepository {
    async create(data) {
        try {
            return await RecuperacaoSenha.create(data);
        } catch (error) {
            logger.error(`Erro ao criar OTP: ${error.message}`);
            throw error;
        }
    }

    async findValidByUsuarioId(id_usuario, otp) {
        return await RecuperacaoSenha.findOne({
            where: {
                id_usuario,
                otp,
                usado: false,
                expires_at: { [Op.gt]: new Date() }
            }
        });
    }

    async invalidarTokensAnteriores(id_usuario) {
        return await RecuperacaoSenha.update(
            { usado: true },
            { where: { id_usuario, usado: false } }
        );
    }

    async marcarComoUsado(id) {
        return await RecuperacaoSenha.update(
            { usado: true },
            { where: { id } }
        );
    }
}

module.exports = new RecuperacaoSenhaRepository();