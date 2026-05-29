const userService = require('../service/UserService');
const logger = require('../config/logger');
const recuperacaoSenhaService = require('../service/RecuperacaoSenhaService');

class AuthController {
    async register(req, res) {
        try {
            const { nome_razao, email, cpf_cnpj, senha, telefone, foto_perfil, tipo_usuario } = req.body;
            
            // Captura informações do dispositivo
            const userAgent = req.headers['user-agent'];
            const ipAddress = req.ip || req.connection.remoteAddress;

            const result = await userService.registerAccount({
                nome_razao,
                email,
                cpf_cnpj,
                senha,
                telefone,
                foto_perfil,
                tipo_usuario
            }, userAgent, ipAddress);
            
            return res.status(201).json({
                message: 'Conta vinculada ao sistema com sucesso!',
                user: result.user,
                accessToken: result.accessToken,
                refreshToken: result.refreshToken
            });
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    async login(req, res) {
        try {
            const { email, senha } = req.body;
            
            // Captura informações do dispositivo
            const userAgent = req.headers['user-agent'];
            const ipAddress = req.ip || req.connection.remoteAddress;

            const result = await userService.authenticateLogin(email, senha, userAgent, ipAddress);

            return res.status(200).json({
                message: 'Login efetuado com sucesso!',
                user: result.user,
                accessToken: result.accessToken,
                refreshToken: result.refreshToken
            });
        } catch (error) {
            return res.status(401).json({ error: error.message });
        }
    }

    async refreshToken(req, res) {
        try {
            const { refreshToken } = req.body;
            
            if (!refreshToken) {
                return res.status(400).json({ error: 'Refresh token não fornecido.' });
            }

            const userAgent = req.headers['user-agent'];
            const ipAddress = req.ip || req.connection.remoteAddress;

            const result = await userService.refreshAccessToken(refreshToken, userAgent, ipAddress);

            return res.status(200).json({
                message: 'Token renovado com sucesso!',
                accessToken: result.accessToken,
                user: result.user
            });
        } catch (error) {
            return res.status(401).json({ error: error.message });
        }
    }

    async logout(req, res) {
        try {
            const { refreshToken } = req.body;
            
            if (!refreshToken) {
                return res.status(400).json({ error: 'Refresh token não fornecido.' });
            }

            await userService.logout(refreshToken);

            return res.status(200).json({
                message: 'Logout realizado com sucesso!'
            });
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    async logoutAllDevices(req, res) {
        try {
            const userId = req.userId;
            await userService.logoutAllDevices(userId);

            return res.status(200).json({
                message: 'Logout de todos os dispositivos realizado com sucesso!'
            });
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    async solicitarRecuperacao(req, res) {
        try {
            const { email } = req.body;
            const result = await recuperacaoSenhaService.solicitarRecuperacao(email);
            return res.status(200).json(result);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    async redefinirSenha(req, res) {
        try {
            const { email, otp, novaSenha, confirmarSenha } = req.body;
            const result = await recuperacaoSenhaService.redefinirSenha(email, otp, novaSenha, confirmarSenha);
            return res.status(200).json(result);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    // Resto dos métodos (getAll, getById, update, delete)
    async getAll(req, res) {
        try {
            // Apenas ADMIN pode listar todos os usuários
            if (req.userRole !== 'ADMIN') {
                return res.status(403).json({ 
                    error: 'Acesso negado. Apenas administradores podem listar todos os usuários.' 
                });
            }
    
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const { tipo_usuario, nome } = req.query;
    
            const result = await userService.getAllUsers(page, limit, { tipo_usuario, nome });
    
            return res.status(200).json({
                users: result.users,
                pagination: {
                    total: result.total,
                    page: page,
                    limit: limit,
                    totalPages: Math.ceil(result.total / limit)
                }
            });
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
    
    async getById(req, res) {
        try {
            const { id } = req.params;
            const user = await userService.getUserById(id);
            
            return res.status(200).json({
                id: user.id,
                nome_razao: user.nome_razao,
                email: user.email,
                cpf_cnpj: user.cpf_cnpj,
                telefone: user.telefone,
                foto_perfil: user.foto_perfil,
                tipo_usuario: user.tipo_usuario
            });
        } catch (error) {
            return res.status(404).json({ error: error.message });
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params;
            const updatedUser = await userService.updateUserProfile(id, req.body);
            
            return res.status(200).json({
                message: 'Dados de perfil atualizados com sucesso!',
                user: {
                    id: updatedUser.id,
                    nome_razao: updatedUser.nome_razao,
                    email: updatedUser.email,
                    tipo_usuario: updatedUser.tipo_usuario
                }
            });
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params;
            await userService.deleteUserAccount(id);
            
            return res.status(200).json({
                message: 'Conta de usuário excluída com sucesso do sistema.'
            });
        } catch (error) {
            return res.status(404).json({ error: error.message });
        }
    }
}

module.exports = new AuthController();