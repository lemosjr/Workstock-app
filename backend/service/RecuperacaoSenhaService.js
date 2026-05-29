const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const userRepository = require('../repository/UserRepository');
const refreshTokenRepository = require('../repository/RefreshTokenRepository');
const recuperacaoRepository = require('../repository/RecuperacaoSenhaRepository');
const emailService = require('./EmailService');
const logger = require('../config/logger');

class RecuperacaoSenhaService {
    gerarOtp() {
        return Math.floor(100000 + Math.random() * 900000).toString();
    }

    async solicitarRecuperacao(email) {
        const user = await userRepository.findByEmail(email);
        if (!user) {
            logger.info(`Recuperação tentada para email não cadastrado: ${email}`);
            return { message: 'Se o e-mail existir, enviaremos um código.' };
        }

        const otp = this.gerarOtp();
        const expiresAt = new Date();
        expiresAt.setMinutes(expiresAt.getMinutes() + 10);

        await recuperacaoRepository.invalidarTokensAnteriores(user.id);

        await recuperacaoRepository.create({
            id_usuario: user.id,
            otp,
            expires_at: expiresAt
        });

        await emailService.enviarOtpRecuperacao(user.email, user.nome_razao, otp);

        logger.info(`OTP enviado para usuário ID ${user.id}`);
        return { message: 'Código de recuperação enviado para seu e-mail.' };
    }

    async redefinirSenha(email, otp, novaSenha, confirmarSenha) {
        if (novaSenha !== confirmarSenha) {
            throw new Error('As senhas não coincidem.');
        }

        const user = await userRepository.findByEmail(email);
        if (!user) {
            throw new Error('Usuário não encontrado.');
        }

        const recuperacao = await recuperacaoRepository.findValidByUsuarioId(user.id, otp);
        if (!recuperacao) {
            throw new Error('Código inválido ou expirado.');
        }

        const salt = await bcrypt.genSalt(10);
        const senhaHash = await bcrypt.hash(novaSenha, salt);

        await userRepository.update(user.id, { senha_hash: senhaHash });
        await recuperacaoRepository.marcarComoUsado(recuperacao.id);
        await refreshTokenRepository.revokeAllUserTokens(user.id);

        logger.info(`Senha redefinida para usuário ID ${user.id}`);
        return { message: 'Senha redefinida com sucesso.' };
    }
}

module.exports = new RecuperacaoSenhaService();