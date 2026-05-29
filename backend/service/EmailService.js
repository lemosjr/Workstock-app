const nodemailer = require('nodemailer');
const logger = require('../config/logger');

class EmailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: parseInt(process.env.SMTP_PORT),
            secure: false, // porta 587 usa STARTTLS, não SSL direto
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS
            },
            tls: {
                rejectUnauthorized: false
            }
        });
    }

    async enviarOtpRecuperacao(email, nome, otp) {
        try {
            const info = await this.transporter.sendMail({
                from: `"WorkStock" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
                to: email,
                subject: 'Recuperação de Senha - WorkStock',
                html: `
                    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                        <h2 style="color: #333;">Olá ${nome},</h2>
                        <p>Você solicitou a recuperação de senha no WorkStock.</p>
                        <p>Seu código de verificação é:</p>
                        <div style="background: #f0f0f0; padding: 15px; text-align: center; border-radius: 8px;">
                            <h1 style="font-size: 36px; letter-spacing: 8px; margin: 0; color: #007bff;">${otp}</h1>
                        </div>
                        <p>Este código expira em <strong>10 minutos</strong>.</p>
                        <p>Se não foi você quem solicitou, ignore este e-mail.</p>
                        <hr style="margin: 20px 0;">
                        <small style="color: #666;">WorkStock - Sua plataforma de reformas</small>
                    </div>
                `
            });
            
            logger.info(`✅ E-mail enviado para ${email} - ID: ${info.messageId}`);
            return true;
        } catch (error) {
            logger.error(`❌ Erro ao enviar e-mail para ${email}: ${error.message}`);
            throw new Error('Não foi possível enviar o e-mail de recuperação. Tente novamente.');
        }
    }

    async verificarConexao() {
        try {
            await this.transporter.verify();
            logger.info('✅ Conexão SMTP com Brevo estabelecida com sucesso!');
            return true;
        } catch (error) {
            logger.error(`❌ Falha na conexão SMTP: ${error.message}`);
            return false;
        }
    }
}

module.exports = new EmailService();