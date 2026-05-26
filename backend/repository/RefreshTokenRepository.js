const { RefreshToken } = require('../model/index');
const { Op } = require('sequelize');
const logger = require('../config/logger');

class RefreshTokenRepository {
    async create(tokenData) {
        try {
            return await RefreshToken.create(tokenData);
        } catch (error) {
            logger.error(`Erro ao criar refresh token: ${error.message}`);
            throw error;
        }
    }

    async findByToken(token) {
        return await RefreshToken.findOne({ 
            where: { 
                token,
                revoked: false,
                expires_at: { [Op.gt]: new Date() }
            }
        });
    }

    async findAllByUsuarioId(id_usuario) {
        return await RefreshToken.findAll({
            where: { id_usuario, revoked: false },
            order: [['created_at', 'DESC']]
        });
    }

    async revokeToken(token) {
        const refreshToken = await RefreshToken.findOne({ where: { token } });
        if (!refreshToken) return false;
        
        refreshToken.revoked = true;
        refreshToken.revoked_at = new Date();
        await refreshToken.save();
        
        return true;
    }

    async revokeAllUserTokens(id_usuario) {
        return await RefreshToken.update(
            { revoked: true, revoked_at: new Date() },
            { where: { id_usuario, revoked: false } }
        );
    }

    async deleteExpiredTokens() {
        return await RefreshToken.destroy({
            where: {
                expires_at: { [Op.lt]: new Date() }
            }
        });
    }
}

module.exports = new RefreshTokenRepository();